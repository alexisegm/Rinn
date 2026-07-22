import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { useGarage } from '../../context/GarageContext';
import { useCategorias } from '../../hooks/useCategorias';
import { buildCatalogoUrl } from '../catalogo/utils/catalogoRoutes';
import { getImagenCategoria } from '../../assets/categorias/imagencategoria';
import GarageSetupPanel from './components/GarageSetupPanel';

const categoriasFallback = [
  { id: 'repuestos-generales', nombre: 'Repuestos Generales', icono: '⚙️' },
  { id: 'desempeno-tuning', nombre: 'Desempeño y Tuning', icono: '🏎️' },
  { id: 'cauchos-rines', nombre: 'Cauchos y Rines', icono: '🛞' },
  { id: 'aceites-fluidos', nombre: 'Aceites y Fluidos', icono: '🛢️' },
  { id: 'cuidado-vehiculo', nombre: 'Cuidado del Vehículo', icono: '🧼' },
  { id: 'accesorios-interiores', nombre: 'Accesorios Interiores', icono: '💺' },
  { id: 'accesorios-exteriores', nombre: 'Accesorios Exteriores', icono: '🛡️' },
  { id: 'herramientas', nombre: 'Herramientas', icono: '🧰' }
];

function getIconoCategoria(nombre = '') {
  const nombreLower = nombre.toLowerCase();

  if (nombreLower.includes('herramient')) return '🧰';
  if (nombreLower.includes('tuning') || nombreLower.includes('desempeño')) return '🏎️';
  if (nombreLower.includes('caucho') || nombreLower.includes('rin')) return '🛞';
  if (nombreLower.includes('aceite') || nombreLower.includes('fluido')) return '🛢️';
  if (nombreLower.includes('cuidado')) return '🧼';
  if (nombreLower.includes('interior')) return '💺';
  if (nombreLower.includes('exterior')) return '🛡️';

  return '⚙️';
}

function titleCase(text = '') {
  return text
    .replace(/-/g, ' ')
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function HomeView() {
  const { vehiculoActivo, vehiculosDisponibles, seleccionarVehiculo, limpiarGarage, isLoadingGarage } = useGarage();
  const { categorias: categoriasDesdeApi, isLoadingCat } = useCategorias();
  const [filtroAno, setFiltroAno] = useState('');
  const [filtroMarca, setFiltroMarca] = useState('');
  const [filtroModelo, setFiltroModelo] = useState('');

  const categorias = categoriasDesdeApi.length > 0
    ? categoriasDesdeApi.map((cat) => ({
        id: cat.id,
        nombre: cat.nombre,
        icono: getIconoCategoria(cat.nombre)
      }))
    : !isLoadingCat
      ? categoriasFallback
      : [];

  const añosDisponibles = useMemo(() => {
    return [...new Set(vehiculosDisponibles.map((vehiculo) => vehiculo.ano))].sort((a, b) => b - a);
  }, [vehiculosDisponibles]);

  const marcasDisponibles = useMemo(() => {
    return [...new Set(vehiculosDisponibles.map((vehiculo) => vehiculo.marca))].sort();
  }, [vehiculosDisponibles]);

  const modelosDisponibles = useMemo(() => {
    return [...new Set(
      vehiculosDisponibles
        .filter((vehiculo) => (!filtroAno || String(vehiculo.ano) === filtroAno) && (!filtroMarca || vehiculo.marca === filtroMarca))
        .map((vehiculo) => `${vehiculo.marca} ${vehiculo.modelo}`)
    )].sort();
  }, [vehiculosDisponibles, filtroAno, filtroMarca]);

  const vehiculosFiltrados = useMemo(() => {
    return vehiculosDisponibles.filter((vehiculo) => {
      const cumpleAno = !filtroAno || String(vehiculo.ano) === filtroAno;
      const cumpleMarca = !filtroMarca || vehiculo.marca === filtroMarca;
      const cumpleModelo = !filtroModelo || `${vehiculo.marca} ${vehiculo.modelo}` === filtroModelo;
      return cumpleAno && cumpleMarca && cumpleModelo;
    });
  }, [vehiculosDisponibles, filtroAno, filtroMarca, filtroModelo]);

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="bg-slate-900 border border-slate-800 rounded-[2rem] p-6 sm:p-8 flex flex-col xl:flex-row items-stretch gap-5 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.9)]">
        <div className="flex-1 min-w-0 flex flex-col justify-between gap-5 xl:pr-2">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 text-blue-300 text-[11px] font-bold uppercase tracking-[0.32em]">
              Compatibilidad garantizada
            </span>
            <h1 className="mt-5 text-4xl sm:text-5xl font-black text-white leading-tight">Encuentra el repuesto exacto para tu auto.</h1>
            <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed">Selecciona o añade un vehículo a tu garage virtual. Filtraremos automáticamente solo las piezas 100% compatibles con tu motor y año.</p>
          </div>

          <div className="rounded-[1.5rem] border border-slate-800 bg-slate-950/90 p-5 shadow-[0_20px_45px_-30px_rgba(15,23,42,0.85)]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-blue-300 font-semibold">Búsqueda rápida por vehículo</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setFiltroAno('');
                    setFiltroMarca('');
                    setFiltroModelo('');
                  }}
                  className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition disabled:opacity-40 disabled:cursor-not-allowed"
                  disabled={!filtroAno && !filtroMarca && !filtroModelo}
                >
                  Limpiar búsqueda
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
              <label className="flex flex-col gap-2 text-sm text-slate-300">
                <span className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Año</span>
                <select
                  value={filtroAno}
                  onChange={(e) => { setFiltroAno(e.target.value); setFiltroModelo(''); }}
                  className="bg-slate-900 border border-slate-800 rounded-3xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                >
                  <option value="">Año...</option>
                  {añosDisponibles.map((ano) => (
                    <option key={ano} value={ano}>{ano}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm text-slate-300">
                <span className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Marca</span>
                <select
                  value={filtroMarca}
                  onChange={(e) => { setFiltroMarca(e.target.value); setFiltroModelo(''); }}
                  className="bg-slate-900 border border-slate-800 rounded-3xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                >
                  <option value="">Marca...</option>
                  {marcasDisponibles.map((marca) => (
                    <option key={marca} value={marca}>{marca}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2 text-sm text-slate-300">
                <span className="text-[11px] uppercase tracking-[0.28em] text-slate-500">Modelo</span>
                <select
                  value={filtroModelo}
                  onChange={(e) => setFiltroModelo(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded-3xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                >
                  <option value="">Modelo...</option>
                  {modelosDisponibles.map((modelo) => (
                    <option key={modelo} value={modelo}>{modelo}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-900/80 px-3 py-2 shadow-[0_15px_40px_-28px_rgba(15,23,42,0.9)] border border-slate-800 text-slate-200">
                <span className="text-blue-400">🚚</span> Despacho Nacional
              </span>
              <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-900/80 px-3 py-2 shadow-[0_15px_40px_-28px_rgba(15,23,42,0.9)] border border-slate-800 text-slate-200">
                <span className="text-blue-400">↩️</span> Devolución Gratuita
              </span>
              <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-900/80 px-3 py-2 shadow-[0_15px_40px_-28px_rgba(15,23,42,0.9)] border border-slate-800 text-slate-200">
                <span className="text-blue-400">🔧</span> Piezas Certificadas
              </span>
            </div>
          </div>
        </div>

        <GarageSetupPanel
          vehiculoActivo={vehiculoActivo}
          vehiculosDisponibles={vehiculosDisponibles}
          seleccionarVehiculo={seleccionarVehiculo}
          limpiarGarage={limpiarGarage}
          isLoadingGarage={isLoadingGarage}
          vehiculosFiltrados={vehiculosFiltrados}
        />
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          Explorar Catálogo
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {categorias.map((cat) => {
            const imagenCategoria = getImagenCategoria(cat.nombre);
            const tituloCategoria = titleCase(cat.nombre);

            return (
              <Link 
                key={cat.id} 
                to={buildCatalogoUrl(cat.id)}
                className="group relative overflow-hidden rounded-[28px] border border-slate-800 bg-slate-900 shadow-[0_20px_40px_-26px_rgba(15,23,42,0.9)] transition duration-300 hover:-translate-y-0.5 hover:border-blue-500 hover:bg-slate-800/95"
              >
                <div className="relative overflow-hidden">
                  {imagenCategoria ? (
                    <img
                      src={imagenCategoria}
                      alt={cat.nombre}
                      className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-32 flex items-center justify-center bg-slate-800">
                      <span className="text-4xl">{cat.icono}</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="absolute top-3 right-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Explorar
                  </span>
                </div>

                <div className="p-5">
                  <span className="block text-base font-semibold text-slate-100 group-hover:text-white leading-snug">{tituloCategoria}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}