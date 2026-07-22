import { Link } from 'react-router-dom';
import FallbackImage from '../../../ui/FallbackImage';
import { useFavoritos } from '../../../context/FavoritosContext';

export default function RepuestoCard({ id, sku, nombre, precio, stock, imagenUrl, vista = 'grid' }) {
  const { toggleFavorito, isFavorito } = useFavoritos();
  const esFav = isFavorito(id);
  const isList = vista === 'list';

  const handleToggle = (e) => {
    e.preventDefault();
    toggleFavorito({ id, sku, nombre, precio, stock, imagenUrl });
  };

  return (
    <article className={`group overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-900/90 shadow-[0_18px_45px_-30px_rgba(15,23,42,0.95)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-500/60 ${isList ? 'flex flex-col sm:flex-row' : 'flex flex-col'}`}>
      <div className={`relative overflow-hidden ${isList ? 'sm:w-52 sm:h-auto h-48' : 'h-48'} border-b border-slate-800 sm:border-b-0 sm:border-r sm:border-slate-800`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_58%)]" />
        <FallbackImage src={imagenUrl} alt={nombre} />

        <button
          onClick={handleToggle}
          className="absolute top-2 left-2 p-1.5 bg-slate-900/80 rounded-full hover:bg-slate-800 transition-colors z-10 border border-slate-700"
          title={esFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <span className={`text-lg transition-colors ${esFav ? 'text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'text-slate-400 opacity-70 hover:opacity-100'}`}>
            {esFav ? '❤️' : '🤍'}
          </span>
        </button>

        {stock > 0 && stock <= 5 && (
          <span className="absolute top-2 right-2 rounded-full border border-amber-300/50 bg-amber-500/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.28em] text-white shadow-[0_6px_20px_-8px_rgba(245,158,11,0.95)]">
            ¡Solo {stock} disponibles!
          </span>
        )}
      </div>

      <div className={`flex flex-col flex-1 p-4 ${isList ? 'justify-between' : ''}`}>
        <div>
          <span className="text-[11px] font-mono uppercase tracking-[0.28em] text-slate-500">SKU: {sku}</span>
          <h4 className="mt-2 text-[15px] font-bold text-slate-100 leading-snug line-clamp-2 group-hover:text-blue-300 transition-colors">
            {nombre}
          </h4>
        </div>

        <div className="mt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Precio ref.</p>
            <p className="text-xl font-black text-emerald-400">${precio}</p>
          </div>
          <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${stock > 0 ? 'border-slate-700 bg-slate-800 text-slate-300' : 'border-red-900 bg-red-950/40 text-red-300'}`}>
            {stock > 0 ? `Stock: ${stock}` : 'Agotado'}
          </span>
        </div>

        <div className={`mt-4 flex gap-2 ${isList ? 'justify-end' : 'flex-col'}`}>
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-500">
            <span>🛒</span> Añadir
          </button>
          <Link
            to={`/repuesto/${sku}`}
            className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:text-white"
          >
            Ver Detalles
          </Link>
        </div>
      </div>
    </article>
  );
}