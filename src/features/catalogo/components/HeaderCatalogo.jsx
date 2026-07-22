import { Link } from 'react-router-dom';
import { useGarage } from '../../../context/GarageContext';

export default function HeaderCatalogo({
  vehiculoActivo,
  isLoadingGarage,
  searchTerm,
  ejecutarBusqueda,
  orden,
  setOrden,
  vista,
  setVista,
  filtrosActivos,
  setCategoriaActiva,
  limpiarGarage
}) {
  const { vehiculosDisponibles, seleccionarVehiculo } = useGarage();

  const limpiarFiltrosCatalogo = () => {
    ejecutarBusqueda('');
    setCategoriaActiva?.(null);
    limpiarGarage?.();
  };

  return (
    <div className="flex-1 flex flex-col">
      {!isLoadingGarage && (
        vehiculoActivo ? (
          <div className="rounded-[1.5rem] border border-emerald-500/25 bg-emerald-500/10 p-4 mb-6 flex flex-col gap-4 shadow-[0_18px_45px_-30px_rgba(16,185,129,0.65)]">
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-emerald-500/15 border border-emerald-400/30 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-emerald-300">
                Compatibilidad activa
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">✅</span>
                <div>
                  <p className="text-emerald-300 font-bold text-sm">Mostrando repuestos garantizados para:</p>
                  <p className="text-white font-black text-lg">
                    {vehiculoActivo.marca} {vehiculoActivo.modelo} <span className="text-slate-400 font-normal">{vehiculoActivo.ano}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-slate-950/80 border border-emerald-500/20 px-3 py-2 shadow-[0_15px_40px_-28px_rgba(16,185,129,0.7)]">
                <span className="text-[11px] uppercase tracking-[0.28em] text-emerald-300">Cambiar</span>
                <select
                  value={vehiculoActivo?.id ?? ''}
                  onChange={(e) => {
                    const seleccionado = vehiculosDisponibles.find((vehiculo) => String(vehiculo.id) === e.target.value);
                    if (seleccionado) seleccionarVehiculo(seleccionado);
                  }}
                  className="bg-transparent text-sm text-white outline-none appearance-none cursor-pointer"
                >
                  {vehiculosDisponibles.map((vehiculo) => (
                    <option key={vehiculo.id} value={vehiculo.id} className="bg-slate-900 text-white">
                      {vehiculo.marca} {vehiculo.modelo} • {vehiculo.ano}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-[1.5rem] border border-slate-800 bg-[linear-gradient(135deg,rgba(15,23,42,0.96),rgba(15,23,42,0.84))] p-4 mb-6 flex flex-col gap-4 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.95)]">
            <div className="flex items-center gap-2 mb-1">
              <span className="rounded-full bg-blue-500/15 border border-blue-400/30 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.28em] text-blue-300">
                Modo navegación general
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/15 text-2xl shadow-inner shadow-blue-500/10">🚗</span>
                <div>
                  <p className="text-white font-bold">Navegación general activada</p>
                  <p className="text-slate-400 text-sm">Selecciona un auto para ver piezas exactas o sigue navegando sin compatibilidad.</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-full bg-slate-950/90 border border-slate-700 px-3 py-2 shadow-[0_18px_40px_-28px_rgba(59,130,246,0.55)]">
                <span className="text-[11px] uppercase tracking-[0.28em] text-blue-300">Vehículo</span>
                <select
                  value={vehiculoActivo?.id ?? ''}
                  onChange={(e) => {
                    const seleccionado = vehiculosDisponibles.find((vehiculo) => String(vehiculo.id) === e.target.value);
                    if (seleccionado) seleccionarVehiculo(seleccionado);
                  }}
                  className="bg-transparent text-sm text-white outline-none min-w-[220px] appearance-none cursor-pointer"
                >
                  <option value="" className="bg-slate-900 text-slate-400">Seleccionar vehículo</option>
                  {vehiculosDisponibles.map((vehiculo) => (
                    <option key={vehiculo.id} value={vehiculo.id} className="bg-slate-900 text-white">
                      {vehiculo.marca} {vehiculo.modelo} • {vehiculo.ano}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link to="/perfil" className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-full transition-colors shadow-lg shadow-blue-900/20">
                Configurar mi Garage
              </Link>
            </div>
          </div>
        )
      )}

      <div className="mb-6 rounded-[1.5rem] border border-slate-800 bg-slate-900/90 p-4 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.95)]">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] uppercase tracking-[0.28em] text-blue-300 font-bold">Filtros activos</span>
            {filtrosActivos.length === 0 ? (
              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">Sin filtros</span>
            ) : (
              filtrosActivos.map((chip) => (
                <span key={chip} className="rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs text-blue-300 font-semibold">
                  {chip}
                </span>
              ))
            )}

            {(searchTerm || vehiculoActivo || filtrosActivos.length > 0) && (
              <button
                type="button"
                onClick={limpiarFiltrosCatalogo}
                className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-blue-500 hover:text-white transition"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch gap-2">
            <label className="flex items-center gap-2 rounded-full bg-slate-950/90 border border-slate-700 px-3 py-2 text-sm text-slate-300 shadow-[0_18px_40px_-28px_rgba(59,130,246,0.45)]">
              <span className="text-[11px] uppercase tracking-[0.28em] text-blue-300">Ordenar</span>
              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="bg-slate-900 text-white outline-none px-3 py-1.5 rounded-full cursor-pointer appearance-none"
              >
                <option value="popularidad" className="bg-slate-900 text-white">Popularidad</option>
                <option value="precio-asc" className="bg-slate-900 text-white">Menor precio</option>
                <option value="precio-desc" className="bg-slate-900 text-white">Mayor precio</option>
                <option value="marca" className="bg-slate-900 text-white">Marca</option>
              </select>
            </label>

            <div className="flex items-center rounded-full bg-slate-800 p-1">
              <button
                type="button"
                onClick={() => setVista('grid')}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${vista === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
              >
                Grilla
              </button>
              <button
                type="button"
                onClick={() => setVista('list')}
                className={`rounded-full px-3 py-1.5 text-sm font-semibold transition ${vista === 'list' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-white'}`}
              >
                Lista
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <h2 className="text-2xl font-bold text-white">Catálogo de Repuestos</h2>
          <p className="text-sm text-slate-400">Explora nuestro inventario disponible.</p>
        </div>

        {searchTerm && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-slate-400">Resultados para:</span>
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-full text-sm font-medium">
              “{searchTerm}”
              <button onClick={() => ejecutarBusqueda('')} className="hover:text-white transition-colors" title="Limpiar búsqueda">×</button>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
