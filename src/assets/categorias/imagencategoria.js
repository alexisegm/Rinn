import { normalizeCategoriaValue } from '../../features/catalogo/utils/catalogoRoutes';
import accesoriosExteriores from './Accesorios-exteriores.png';
import accesoriosInteriores from './Accesorios-interiores.png';
import aceitesFluidos from './Aceites-y-fluidos.png';
import cauchosRines from './Cauchos-y-rines.png';
import cuidadoVehiculo from './Cuidado-del-vehiculo.png';
import desempenoTuning from './desempeno-y-tuning.png';
import herramientas from './Herramientas.png';
import repuestosGenerales from './repuestos-generales.png';

const imagenesCategorias = {
  'accesorios-exteriores': accesoriosExteriores,
  'accesorios-interiores': accesoriosInteriores,
  'aceites-fluidos': aceitesFluidos,
  'aceites-y-fluidos': aceitesFluidos,
  'cauchos-rines': cauchosRines,
  'cauchos-y-rines': cauchosRines,
  'cuidado-vehiculo': cuidadoVehiculo,
  'cuidado-del-vehiculo': cuidadoVehiculo,
  'desempeno-tuning': desempenoTuning,
  'desempeno-y-tuning': desempenoTuning,
  'desempeño-y-tuning': desempenoTuning,
  'herramientas': herramientas,
  'repuestos-generales': repuestosGenerales,
};

export function getImagenCategoria(value = '') {
  if (!value) return null;

  const key = normalizeCategoriaValue(value);
  return imagenesCategorias[key] || null;
}
