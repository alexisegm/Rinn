import { Link } from 'react-router-dom';
import { getGarageVehicleImage } from '../../../assets/garage-vehicles';

export default function GarageSetupPanel({
  vehiculoActivo,
  vehiculosDisponibles,
  seleccionarVehiculo,
  limpiarGarage,
  isLoadingGarage,
  vehiculosFiltrados,
}) {
  const vehiculosMostrados = vehiculosFiltrados ?? vehiculosDisponibles;

  return (
    <div className="w-full xl:w-[480px] xl:min-w-[480px] bg-slate-950 border border-slate-800 rounded-[2rem] p-5 shadow-[0_24px_60px_-30px_rgba(15,23,42,0.9)]">
      <div className="flex flex-col gap-3 mb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-blue-300">Vehículos en tu garage</p>
          <h2 className="mt-2 text-2xl font-bold text-white">Vehículos en tu garage</h2>
        </div>
        <span className="inline-flex items-center rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-semibold text-blue-300">
          {vehiculosDisponibles.length} Guardados
        </span>
      </div>

      <div className="flex flex-col gap-3.5">
        {isLoadingGarage ? (
          <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/90 p-5 text-sm text-slate-400">Cargando vehículos...</div>
        ) : vehiculosDisponibles.length === 0 ? (
          <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/90 p-5 text-sm text-slate-400">Aún no hay vehículos guardados.</div>
        ) : vehiculosMostrados.length === 0 ? (
          <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/90 p-5 text-sm text-slate-400">No hay vehículos para los filtros actuales.</div>
        ) : (
          vehiculosMostrados.map((vehiculo) => {
            const activo = vehiculoActivo?.id === vehiculo.id;
            return (
              <button
                key={vehiculo.id}
                onClick={() => seleccionarVehiculo(vehiculo)}
                className={`w-full flex items-center gap-4 rounded-[1.5rem] border px-4 py-4 text-left transition ${activo ? 'border-blue-500 bg-blue-500/10 shadow-[0_18px_45px_-30px_rgba(59,130,246,0.65)]' : 'border-slate-800 bg-slate-900/90 hover:border-blue-500/70 hover:bg-slate-800/90'}`}
              >
                <div className="h-20 w-20 overflow-hidden rounded-[1.3rem] bg-slate-900 flex items-center justify-center flex-shrink-0">
                  {getGarageVehicleImage(vehiculo) ? (
                    <img src={getGarageVehicleImage(vehiculo)} alt={`${vehiculo.marca} ${vehiculo.modelo}`} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-4xl text-blue-300">🚗</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className={`text-sm font-semibold ${activo ? 'text-blue-200' : 'text-white'}`}>{vehiculo.marca} {vehiculo.modelo}</p>
                    {activo ? (
                      <span className="rounded-full bg-blue-500/20 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-blue-200">Activo</span>
                    ) : (
                      <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">Seleccionar</span>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{vehiculo.ano} • Motor {vehiculo.motor}</p>
                </div>
              </button>
            );
          })
        )}
      </div>

      <Link
        to="/perfil"
        className="mt-4 inline-flex w-full items-center justify-center rounded-[1.25rem] bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
      >
        + Agregar Nuevo Vehículo
      </Link>
    </div>
  );
}
