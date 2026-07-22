import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SidebarFiltros from './components/SidebarFiltros';
import LoadingState from '../../ui/LoadingState';
import ErrorMessage from '../../ui/ErrorMessage';
import EmptyState from '../../ui/EmptyState';
import { useCatalogo } from '../../hooks/useCatalogo';
import { useSearch } from '../../context/SearchContext';
import { useGarage } from '../../context/GarageContext';
import HeaderCatalogo from './components/HeaderCatalogo';
import ListaRepuestos from './components/ListaRepuestos';
import { getCategoriaFromSearch } from './utils/catalogoRoutes';

export default function CatalogoView() {
  const location = useLocation();
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const [orden, setOrden] = useState('popularidad');
  const [vista, setVista] = useState('grid');
  const [precioMin, setPrecioMin] = useState('');
  const [precioMax, setPrecioMax] = useState('');
  const { searchTerm, ejecutarBusqueda } = useSearch();
  const { vehiculoActivo, vehiculosDisponibles, isLoadingGarage, limpiarGarage } = useGarage();
  const vehiculoIds = useMemo(() => {
    if (vehiculoActivo?.id) {
      return [vehiculoActivo.id];
    }

    return vehiculosDisponibles.map((vehiculo) => vehiculo.id);
  }, [vehiculoActivo, vehiculosDisponibles]);
  const { repuestos, isLoading, error, refetch } = useCatalogo(categoriaActiva, searchTerm, vehiculoActivo?.id, vehiculoIds, precioMin, precioMax);

  useEffect(() => {
    const categoriaDesdeUrl = getCategoriaFromSearch(location.search);
    setCategoriaActiva(categoriaDesdeUrl || null);
  }, [location.search]);

  const showLoading = isLoading || isLoadingGarage;

  const repuestosOrdenados = useMemo(() => {
    const lista = [...repuestos];

    switch (orden) {
      case 'precio-asc':
        return lista.sort((a, b) => Number(a.precio) - Number(b.precio));
      case 'precio-desc':
        return lista.sort((a, b) => Number(b.precio) - Number(a.precio));
      case 'marca':
        return lista.sort((a, b) => String(a.nombre).localeCompare(String(b.nombre)));
      default:
        return lista;
    }
  }, [repuestos, orden]);

  const filtrosActivos = [
    searchTerm ? `Buscar: “${searchTerm}”` : null,
    categoriaActiva ? 'Categoría activa' : null
  ].filter(Boolean);

  return (
    <div className="xl:grid xl:grid-cols-[290px_minmax(0,1fr)] gap-6 w-full">
      <SidebarFiltros 
        categoriaActiva={categoriaActiva} 
        setCategoriaActiva={setCategoriaActiva}
        precioMin={precioMin}
        setPrecioMin={setPrecioMin}
        precioMax={precioMax}
        setPrecioMax={setPrecioMax}
      />

      <div className="flex-1 flex flex-col">
        <HeaderCatalogo
          vehiculoActivo={vehiculoActivo}
          isLoadingGarage={isLoadingGarage}
          searchTerm={searchTerm}
          ejecutarBusqueda={ejecutarBusqueda}
          orden={orden}
          setOrden={setOrden}
          vista={vista}
          setVista={setVista}
          filtrosActivos={filtrosActivos}
          setCategoriaActiva={setCategoriaActiva}
          limpiarGarage={limpiarGarage}
        />
        
        {showLoading && (
          <div className="mt-8">
            <LoadingState />
          </div>
        )}

        {!showLoading && error && (
          <div className="mt-8">
            <ErrorMessage mensaje={error} onRetry={refetch} />
          </div>
        )}

        {!showLoading && !error && repuestosOrdenados.length === 0 && (
          <div className="mt-8">
            <EmptyState 
              titulo="Sin resultados" 
              mensaje={searchTerm 
                ? `No encontramos ningún repuesto que coincida con "${searchTerm}". Intenta con otros términos o SKU.`
                : "No hay repuestos disponibles en esta categoría actualmente."
              } 
            />
          </div>
        )}

        {!showLoading && !error && repuestosOrdenados.length > 0 && (
          <ListaRepuestos repuestos={repuestosOrdenados} vista={vista} />
        )}
      </div>
    </div>
  );
}