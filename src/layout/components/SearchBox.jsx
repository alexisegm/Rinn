export default function SearchBox({
  inputValue,
  onInputChange,
  onFocus,
  onBlur,
  onSubmit,
  showDropdown,
  historial,
  onHistoryClick,
  onClearHistory
}) {
  return (
    <div className="hidden md:flex flex-1 max-w-xl mx-8 relative">
      <form onSubmit={onSubmit} className="w-full relative">
        <input 
          type="text" 
          id="search-input"
          name="search-input"
          value={inputValue}
          onChange={onInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder="Buscar por repuesto, SKU o categoría..." 
          className="w-full bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 px-4 py-3 rounded-3xl shadow-[0_18px_50px_-35px_rgba(15,23,42,0.8)] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300"
        />
        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
        </button>
      </form>

      {showDropdown && historial.length > 0 && (
        <div className="absolute top-full left-0 mt-1 w-full bg-slate-800 border border-slate-700 rounded-md shadow-2xl z-50 overflow-hidden">
          <div className="p-2 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Últimas Búsquedas</span>
            <button 
              onMouseDown={(e) => { e.preventDefault(); onClearHistory(); }} 
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Limpiar
            </button>
          </div>
          <ul className="max-h-48 overflow-y-auto">
            {historial.map((item, index) => (
              <li key={index}>
                <button 
                  onMouseDown={(e) => { e.preventDefault(); onHistoryClick(item); }}
                  className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-2"
                >
                  <span className="text-slate-500 text-lg">🕒</span> {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
