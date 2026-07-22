import { useMemo, useState } from 'react';

export default function FichaRepuesto({ repuesto, esCompatible, vehiculoActivo, esFav, onToggleFavorito, onAgregarPedido }) {
  const imagenes = useMemo(() => {
    const items = Array.isArray(repuesto?.imagenes) && repuesto.imagenes.length > 0
      ? repuesto.imagenes
      : repuesto?.imagenUrl
        ? [repuesto.imagenUrl]
        : [];

    return items;
  }, [repuesto]);

  const [indiceImagen, setIndiceImagen] = useState(0);

  const imagenActual = imagenes[indiceImagen] || null;

  const irAImagen = (direccion) => {
    if (imagenes.length <= 1) return;

    setIndiceImagen((prev) => {
      if (direccion === 'next') {
        return prev === imagenes.length - 1 ? 0 : prev + 1;
      }

      return prev === 0 ? imagenes.length - 1 : prev - 1;
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 md:p-10 shadow-2xl mb-8">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
        <div className="w-full md:w-1/2 bg-slate-800 rounded-[1.5rem] aspect-video flex flex-col items-center justify-center border border-slate-700 relative overflow-hidden group shadow-[0_18px_50px_-32px_rgba(15,23,42,0.95)]">
          {imagenActual ? (
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={imagenActual}
                alt={repuesto.nombre}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.55),transparent_55%)]" />
            </div>
          ) : (
            <span className="text-slate-500 font-mono text-sm tracking-widest">IMAGEN NO DISPONIBLE</span>
          )}

          {imagenes.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => irAImagen('prev')}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/80 px-3 py-2 text-white hover:bg-slate-900 transition"
              >
                ←
              </button>
              <button
                type="button"
                onClick={() => irAImagen('next')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-slate-950/80 px-3 py-2 text-white hover:bg-slate-900 transition"
              >
                →
              </button>
            </>
          )}

          <button 
            onClick={onToggleFavorito}
            className="absolute top-4 right-4 p-3 bg-slate-900/80 backdrop-blur-sm rounded-full hover:bg-slate-700 transition-colors border border-slate-700"
          >
            <span className={`text-xl ${esFav ? 'text-red-500' : 'text-slate-400'}`}>
              {esFav ? '❤️' : '🤍'}
            </span>
          </button>

          {imagenes.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
              {imagenes.map((_, index) => (
                <button
                  key={`${repuesto.sku}-${index}`}
                  type="button"
                  onClick={() => setIndiceImagen(index)}
                  className={`h-2 w-8 rounded-full transition ${index === indiceImagen ? 'bg-white' : 'bg-white/40'}`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="mb-2">
            <span className="inline-block px-3 py-1 bg-slate-800 border border-slate-700 text-blue-400 text-xs font-bold uppercase tracking-widest rounded">
              {repuesto.categoria}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
            {repuesto.nombre}
          </h1>
          
          <p className="text-sm font-mono text-slate-400 mb-8 border-b border-slate-800 pb-6">
            SKU: {repuesto.sku}
          </p>
          
          <div className="flex items-end gap-8 mb-8">
            <div>
              <span className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Precio Unitario</span>
              <span className="text-4xl font-black text-emerald-400">${repuesto.precio}</span>
            </div>
            <div>
              <span className="block text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Disponibilidad</span>
              <span className={`text-lg font-medium ${repuesto.stock > 0 ? 'text-slate-200' : 'text-red-400'}`}>
                {repuesto.stock > 0 ? `${repuesto.stock} uds. en inventario` : 'Sin stock'}
              </span>
            </div>
          </div>

          {vehiculoActivo && (
            <div className={`mb-6 p-4 rounded-lg border flex items-start gap-3 ${
              esCompatible ? 'bg-emerald-900/20 border-emerald-500/30' : 'bg-amber-900/20 border-amber-500/30'
            }`}>
              <span className="text-xl mt-0.5">{esCompatible ? '✅' : '⚠️'}</span>
              <div>
                <h4 className={`font-bold ${esCompatible ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {esCompatible ? 'Ajuste exacto' : 'Compatibilidad no confirmada'}
                </h4>
                <p className="text-sm text-slate-300 mt-1">
                  {esCompatible 
                    ? `Esta pieza está garantizada para tu ${vehiculoActivo.marca} ${vehiculoActivo.modelo} ${vehiculoActivo.ano}.`
                    : `No tenemos registro de que esta pieza encaje en tu ${vehiculoActivo.marca} ${vehiculoActivo.modelo} ${vehiculoActivo.ano}. Verifica las especificaciones antes de comprar.`}
                </p>
              </div>
            </div>
          )}

          <button 
            onClick={onAgregarPedido}
            disabled={repuesto.stock === 0}
            className={`w-full py-4 rounded font-bold transition-colors text-lg flex items-center justify-center gap-2 ${
              repuesto.stock > 0 ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            {repuesto.stock > 0 ? 'Añadir al Pedido' : 'Agotado'}
          </button>
        </div>
      </div>
    </div>
  );
}
