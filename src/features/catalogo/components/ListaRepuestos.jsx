import RepuestoCard from './RepuestoCard';

export default function ListaRepuestos({ repuestos, vista = 'grid' }) {
  return (
    <div className={vista === 'list' ? 'grid grid-cols-1 gap-4' : 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'}>
      {repuestos.map((repuesto) => (
        <RepuestoCard
          key={repuesto.id}
          id={repuesto.id}
          sku={repuesto.sku}
          nombre={repuesto.nombre}
          precio={repuesto.precio}
          stock={repuesto.stock}
          imagenUrl={repuesto.imagenUrl || null}
          vista={vista}
        />
      ))}
    </div>
  );
}
