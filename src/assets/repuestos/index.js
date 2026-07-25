// Carpeta local para almacenar imágenes reales de repuestos.
// Puedes subir aquí tus imágenes y luego enlazarlas por nombre.

export function resolveRepuestoImage(filename = '') {
  if (!filename) return null;
  try {
    return new URL(`./${filename}`, import.meta.url).href;
  } catch {
    return null;
  }
}

export function getRepuestoImagenes(nombre = '') {
  const texto = String(nombre || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  const reglas = [
    {
      keywords: ['bujia', 'iridium'],
      images: [
        resolveRepuestoImage('Bujias-Iridium-ford-focus-2014.jpg'),
        resolveRepuestoImage('Bujias-Iridium-ford-focus-2014-parte2.jpg')
      ]
    },
    {
      keywords: ['bomba de agua', 'bomba', 'agua'],
      images: [
        resolveRepuestoImage('Bomba-de-agua-original-ford-fusion-2014.jpg'),
        resolveRepuestoImage('Bomba-de-agua-original-ford-fusion-2014-parte2.jpg')
      ]
    },
    {
      keywords: ['filtro de aire', 'aire', 'cabina'],
      images: [
        resolveRepuestoImage('filtro-de-aire-de-cabina-ford-fusion-2014.jpg'),
        resolveRepuestoImage('filtro-de-aire-de-cabina-ford-fusion-2014-parte 2.jpg')
      ]
    },
    {
      keywords: ['pastilla', 'freno', 'frontal'],
      images: [
        resolveRepuestoImage('pastillas-de-freno-delanteras-ceramica-ford-fusion2014.jpg'),
        resolveRepuestoImage('pastillas-de-freno-delanteras-ceramica-ford-fusion2014-parte-atras.jpg')
      ]
    },
    {
      keywords: ['caucho', 'bfgoodrich', 'allterrain', '4runner'],
      images: [
        resolveRepuestoImage('caucho-bfgoodrich-allterrain-toyota-4runner-2021.jpg')
      ]
    },
    {
      keywords: ['bateria', 'duncan', 'amperios'],
      images: [
        resolveRepuestoImage('bateria-1100-amperios-duncan.jpeg'),
        resolveRepuestoImage('bateria-1100-amperios-duncan-parte2.jpeg')
      ]
    },
    {
      keywords: ['valvula', 'blow off', 'blowoff'],
      images: [
        resolveRepuestoImage('valvula-blow-off-toyota-4runnner2021.jpg'),
        resolveRepuestoImage('valvula-blow-off-toyota-4runnner2021-parte2.jpg')
      ]
    },
    // Nuevas reglas integradas:
    {
      keywords: ['aceite', 'sintetico', 'motul'],
      images: [
        resolveRepuestoImage('aceite-sintetico-motul.jpg')
      ]
    },
    {
      keywords: ['alfombra', 'weathertech', 'medida'],
      images: [
        resolveRepuestoImage('ALFOMBRAS-WEATHERTECH-A-LA-MEDIDA.jpg'),
        resolveRepuestoImage('ALFOMBRAS-WEATHERTECH-A-LA-MEDIDA-2.jpg')
      ]
    },
    {
      keywords: ['bombillo', 'led', 'h11', 'canbus'],
      images: [
        resolveRepuestoImage('bombillos--led-h11-canbus.jpg')
      ]
    },
    {
      keywords: ['cera', 'carnauba', 'pasta'],
      images: [
        resolveRepuestoImage('cera-carnauba-en-pasta.jpg')
      ]
    },
    {
      keywords: ['champu', 'meguiars', 'gold'],
      images: [
        resolveRepuestoImage('Champu-meguiars-gold-class.jpg')
      ]
    },
    {
      keywords: ['forro', 'volante', 'cuero'],
      images: [
        resolveRepuestoImage('forro-de-volante-en--cuero.jpg')
      ]
    },
    {
      keywords: ['gato', 'hidraulico', 'caiman', 'toneladas'],
      images: [
        resolveRepuestoImage('gato-hidraulico-tipo-caiman-2-toneladas.jpg')
      ]
    },
    {
      keywords: ['juego', 'dados', 'piezas', 'truper'],
      images: [
        resolveRepuestoImage('juego-de-dados -108-piezas-truper.jpg')
      ]
    },
    {
      keywords: ['refrigerante', 'prestone'],
      images: [
        resolveRepuestoImage('refrigerante-Prestone.jpg')
      ]
    },
    {
      keywords: ['snorkel', 'safari'],
      images: [
        resolveRepuestoImage('snorkel-safari-original.jpg')
      ]
    }
  ];

  for (const regla of reglas) {
    if (regla.keywords.some((keyword) => texto.includes(keyword))) {
      return regla.images.filter(Boolean).slice(0, 2);
    }
  }

  return [];
}

export const repuestosAssetsFolder = 'src/assets/repuestos/';