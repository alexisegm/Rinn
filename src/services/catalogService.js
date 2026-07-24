import { globalStoreSupabase } from './globalStoreSupabase';
import { getRepuestoImagenes } from '../assets/repuestos';

const repuestosStore = globalStoreSupabase('repuestos');
const categoriasStore = globalStoreSupabase('categorias');
const tiendasStore = globalStoreSupabase('tiendas');
const compatibilidadesStore = globalStoreSupabase('compatibilidades');

export const catalogService = {
  async getCatalogo({ categoriaId = null, searchTerm = '', vehiculoId = null, vehiculoIds = [], precioMin = null, precioMax = null } = {}) {
    let query = repuestosStore.getAll(`
      id, sku, nombre, categoria_id, es_universal,
      categorias (nombre),
      inventario_tienda (precio_usd, stock)
    `);

    const { data, error } = await query;

    if (error) throw error;

    const repuestosFormateados = data.map((item) => {
      const imagenes = getRepuestoImagenes(item.nombre);

      return {
        id: item.id,
        sku: item.sku,
        nombre: item.nombre,
        precio: item.inventario_tienda?.[0]?.precio_usd || '0.00',
        stock: item.inventario_tienda?.[0]?.stock || 0,
        categoria_id: item.categoria_id,
        categoria: item.categorias?.nombre || 'General',
        es_universal: item.es_universal || false,
        imagenUrl: imagenes[0] || null,
        imagenes
      };
    });

    let filtered = repuestosFormateados;

    const idsVehiculos = Array.isArray(vehiculoIds)
      ? vehiculoIds.filter(Boolean)
      : [];

    if (vehiculoId) {
      idsVehiculos.push(vehiculoId);
    }

    if (idsVehiculos.length > 0) {
      const { data: compatData, error: compatError } = await compatibilidadesStore.getAll('*', { vehiculo_id: idsVehiculos });
      if (compatError) throw compatError;
      const compatibleIds = new Set((compatData || []).map((item) => item.repuesto_id));
      
      // Nueva regla de negocio inclusiva: es compatible OR es universal
      filtered = filtered.filter((item) => compatibleIds.has(item.id) || item.es_universal);
    }

    if (categoriaId) {
      filtered = filtered.filter((item) => item.categoria_id === categoriaId);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter((item) => {
        const nombre = String(item.nombre || '').toLowerCase();
        const sku = String(item.sku || '').toLowerCase();
        const categoria = String(item.categoria || '').toLowerCase();

        return nombre.includes(term) || sku.includes(term) || categoria.includes(term);
      });
    }

    const precioMinParsed = Number(precioMin);
    const precioMaxParsed = Number(precioMax);

    if (!Number.isNaN(precioMinParsed) && precioMinParsed > 0) {
      filtered = filtered.filter((item) => Number(item.precio) >= precioMinParsed);
    }

    if (!Number.isNaN(precioMaxParsed) && precioMaxParsed > 0) {
      filtered = filtered.filter((item) => Number(item.precio) <= precioMaxParsed);
    }

    return { data: filtered, error: null };
  },

  async getCategoriasConConteo() {
    const { data, error } = await repuestosStore.getAll('id, categoria_id');

    if (error) throw error;

    const conteos = (data || []).reduce((acc, item) => {
      const key = item.categoria_id;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const { data: categoriasData, error: categoriasError } = await categoriasStore.getAll('id, nombre', {}, { orderBy: { column: 'nombre' } });

    if (categoriasError) throw categoriasError;

    return {
      data: (categoriasData || []).map((categoria) => ({
        ...categoria,
        cantidad: conteos[categoria.id] || 0
      })),
      error: null
    };
  },

  async getRepuestoBySku(sku, vehiculoId = null) {
    const { data, error } = await repuestosStore.getOne(`
      id, 
      sku, 
      nombre,
      descripcion,
      especificaciones,
      es_universal,
      categorias (nombre),
      inventario_tienda (
        precio_usd, 
        stock,
        tiendas (nombre, direccion, coordenadas)
      )
    `, { sku });

    if (error) throw error;
    if (!data) return { data: null, error: null };

    const totalStock = data.inventario_tienda?.reduce((acc, curr) => acc + (curr.stock || 0), 0) || 0;
    const precioRef = data.inventario_tienda?.[0]?.precio_usd || '0.00';
    const tiendasDisponibles = (data.inventario_tienda || [])
      .filter((inv) => inv.stock > 0)
      .map((inv) => ({
        nombre: inv.tiendas?.nombre,
        direccion: inv.tiendas?.direccion,
        coordenadas: inv.tiendas?.coordenadas,
        stock: inv.stock
      }));

    const imagenes = getRepuestoImagenes(data.nombre);

    const repuestoFormateado = {
      id: data.id,
      sku: data.sku,
      nombre: data.nombre,
      descripcion: data.descripcion || 'Sin descripción detallada disponible.',
      especificaciones: data.especificaciones || null,
      categoria: data.categorias?.nombre || 'General',
      es_universal: data.es_universal || false,
      precio: precioRef,
      stock: totalStock,
      disponibilidad: tiendasDisponibles,
      imagenUrl: imagenes[0] || null,
      imagenes
    };

    let compatibilidad = null;
    if (vehiculoId) {
      const { data: compatData, error: compatError } = await compatibilidadesStore.getOne('*', {
        repuesto_id: data.id,
        vehiculo_id: vehiculoId
      });
      if (compatError) throw compatError;
      compatibilidad = !!compatData;
    }

    return { data: { repuesto: repuestoFormateado, esCompatible: compatibilidad }, error: null };
  },

  async getCategorias() {
    const { data, error } = await categoriasStore.getAll('id, nombre', {}, { orderBy: { column: 'nombre' } });
    return { data: data || [], error };
  },

  async getTiendas() {
    const { data, error } = await tiendasStore.getAll('id, nombre, direccion');
    return { data: data || [], error };
  }
};