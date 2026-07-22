import fordFusion from './ford-fusion.jpg';
import toyota4Runner from './Toyota-4runner-2021.jpg';

const vehicleImages = {
  'ford fusion': fordFusion,
  'toyota 4runner': toyota4Runner,
  'toyota 4runner 2021': toyota4Runner,
};

export function getGarageVehicleImage(vehiculo = {}) {
  if (!vehiculo) return null;

  const key = `${vehiculo.marca || ''} ${vehiculo.modelo || ''}`.trim().toLowerCase();
  return vehicleImages[key] || null;
}
