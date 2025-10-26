import { useState, useEffect } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { placeholderImages } from '@/lib/image-utils';

type ImageCategory = 'misc' | 'background' | 'products' | 'logo';

interface ImageProps extends Omit<NextImageProps, 'src' | 'onError'> {
  src: string;
  category?: ImageCategory;
  itemId?: string | number;
  fallback?: string;
}

export function Image({
  src,
  category,
  itemId,
  alt = '',
  className = '',
  fallback,
  ...props
}: ImageProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (hasError) return;
    
    if (fallback) {
      setImgSrc(fallback);
    } else if (category) {
      // @ts-ignore - We know category is valid if it's defined
      setImgSrc(placeholderImages[category](itemId));
    }
    
    setHasError(true);
  };

  return (
    <NextImage
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}

// Usage examples:
/*
// Basic usage with fallback
<Image 
  src="/images/products/123.jpg" 
  alt="Product" 
  width={300} 
  height={300}
  category="products"
  itemId={123}
/>

// With custom fallback
<Image 
  src="https://example.com/image.jpg" 
  alt="Example" 
  width={300} 
  height={200}
  fallback="/fallback.jpg"
/>
*/
