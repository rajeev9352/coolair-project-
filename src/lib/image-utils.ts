type ImageCategory = 'misc' | 'background' | 'products' | 'logo';

const PLACEHOLDER_BASE_URL = 'https://placehold.co';

export function getPlaceholderImage(
  category: ImageCategory, 
  id?: string | number, 
  width = 600, 
  height = 400,
  backgroundColor = 'f5f5f5',
  textColor = '000000'
): string {
  const text = encodeURIComponent(`${category}${id ? `-${id}` : ''}`);
  return `${PLACEHOLDER_BASE_URL}/${width}x${height}/${backgroundColor}/${textColor}?text=${text}`;
}

export const placeholderImages = {
  misc: (id: string | number = 15) => getPlaceholderImage('misc', id),
  background: (id: string | number = 19) => getPlaceholderImage('background', id, 1920, 1080),
  products: (id: string | number = 1) => getPlaceholderImage('products', id, 800, 800),
  logo: () => getPlaceholderImage('logo', 'black', 200, 50, '000000', 'ffffff')
};

export function getImageUrl(path: string, category?: ImageCategory, id?: string | number): string {
  // If it's already a full URL, return as is
  if (path?.startsWith('http')) {
    return path;
  }

  // If path is empty or undefined, return a placeholder
  if (!path) {
    if (!category) return '';
    return placeholderImages[category](id);
  }

  // If it's a local path, try to load it
  return path;
}
