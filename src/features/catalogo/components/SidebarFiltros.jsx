import { Link } from 'react-router-dom';
import { useCategorias } from '../../../hooks/useCategorias';
import { useGarage } from '../../../context/GarageContext';
import { getGarageVehicleImage } from '../../../assets/garage-vehicles';

const iconosCategoria = {
  'repuestos-generales': '⚙️',
  'desempeno-tuning': '🏎️',
  'cauchos-rines': '🛞',
  'aceites-fluidos': '🛢️',
  'cuidado-vehiculo': '🧼',
  'accesorios-interiores': '💺',
  'accesorios-exteriores': '🛡️',
  'herramientas': '🧰'
};

export default function SidebarFiltros({ categoriaActiva, setCategoriaActiva, precioMin, setPrecioMin, precioMax, setPrecioMax }) {
  const { categorias, isLoadingCat } = useCategorias();
  const { vehiculoActivo } = useGarage();

  const resetPrecio = () => {
    setPrecioMin('');
    setPrecioMax('');
  };

  return (
    <aside className="w-full xl:w-[290px] xl:flex-shrink-0">
      <div className="xl:sticky xl:top-6 flex flex-col gap-4">
        <div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/90 p-4 shadow-[0_18px_55px_-32px_rgba(15,23,42,0.95)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.32em] text-blue-300">
              Mi Garage
            </h3>
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-emerald-300">
              activo
            </span>
          </div>

          {vehiculoActivo ? (
            <div className="flex items-center gap-3 rounded-[1.25rem] bg-slate-800/60 p-3 border border-slate-700">
              <div className="h-20 w-20 overflow-hidden rounded-[1.15rem] bg-gradient-to-br from-blue-500/20 to-slate-900 ring-1 ring-white/10 flex items-center justify-center flex-shrink-0">
                {getGarageVehicleImage(vehiculoActivo) ? (
                  <img
                    src={getGarageVehicleImage(vehiculoActivo)}
                    alt={`${vehiculoActivo.marca} ${vehiculoActivo.modelo}`}
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <span className="text-3xl text-blue-300">🚗</span>
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-white">
                  {vehiculoActivo.marca} {vehiculoActivo.modelo}
                </p>
                <p className="text-xs text-slate-400">Año {vehiculoActivo.ano}</p>
              </div>
            </div>
          ) : (
            <div className="text-center rounded-[1.25rem] bg-slate-800/40 p-4 border border-slate-700/60">
              <p className="text-xs text-slate-400 mb-3">Navegación general activada.</p>
              <Link 
                to="/perfil" 
                className="px-3 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-full transition-colors block w-full"
              >
                Seleccionar Vehículo
              </Link>
            </div>
          )}
        </div>

        <div className="rounded-[1.5rem] border border-slate-800 bg-slate-900/90 p-4 flex-1 shadow-[0_18px_55px_-32px_rgba(15,23,42,0.95)]">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-[0.32em] text-blue-300">
                Filtros de Categoría
              </h3>
              <p className="mt-1 text-[11px] text-slate-400">
                Explora por sección y presupuesto
              </p>
            </div>
            <span className="rounded-full bg-slate-800 px-2.5 py-1 text-[10px] font-semibold text-slate-300">
              {categorias.length} secciones
            </span>
          </div>

          {isLoadingCat ? (
            <p className="text-sm text-slate-500 animate-pulse">Cargando filtros...</p>
          ) : (
            <div className="space-y-3">
              <button 
                onClick={() => setCategoriaActiva(null)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[1rem] font-medium text-sm transition-all duration-200 ${
                  categoriaActiva === null 
                    ? 'bg-gradient-to-r from-blue-600/20 to-cyan-500/10 text-blue-200 border border-blue-500/30 shadow-[0_10px_25px_-12px_rgba(59,130,246,0.9)]' 
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent'
                }`}
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-lg">📦</span>
                <span className="flex-1 text-left">Todos los repuestos</span>
                <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                  {categorias.reduce((acc, cat) => acc + Number(cat.cantidad || 0), 0)}
                </span>
              </button>

              <ul className="space-y-2">
                {categorias.map((cat) => (
                  <li key={cat.id}>
                    <button 
                      onClick={() => setCategoriaActiva(cat.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-[1rem] font-medium text-sm transition-all duration-200 ${
                        categoriaActiva === cat.id 
                          ? 'bg-gradient-to-r from-blue-600/20 to-cyan-500/10 text-blue-200 border border-blue-500/30 shadow-[0_10px_25px_-12px_rgba(59,130,246,0.9)]' 
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white border border-transparent'
                      }`}
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-lg">{iconosCategoria[cat.id] || '🧩'}</span>
                      <span className="flex-1 text-left">{cat.nombre}</span>
                      <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-bold text-slate-300">
                        {cat.cantidad || 0}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="rounded-[1rem] border border-slate-800 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-3 mt-2">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h4 className="text-[11px] font-bold uppercase tracking-[0.28em] text-amber-300">
                    Rango de precio
                  </h4>
                  <button
                    type="button"
                    onClick={resetPrecio}
                    className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-300 hover:text-white"
                  >
                    Limpiar
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <label className="space-y-1">
                    <span className="block text-[10px] uppercase tracking-[0.22em] text-slate-400">Mínimo</span>
                    <input
                      type="number"
                      min="0"
                      value={precioMin}
                      onChange={(e) => setPrecioMin(e.target.value)}
                      placeholder="0"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-2.5 py-2 text-sm text-white outline-none transition focus:border-blue-400"
                    />
                  </label>

                  <label className="space-y-1">
                    <span className="block text-[10px] uppercase tracking-[0.22em] text-slate-400">Máximo</span>
                    <input
                      type="number"
                      min="0"
                      value={precioMax}
                      onChange={(e) => setPrecioMax(e.target.value)}
                      placeholder="9999"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-2.5 py-2 text-sm text-white outline-none transition focus:border-blue-400"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}