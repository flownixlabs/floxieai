import React from 'react';
import OptimizedImage from './ui/OptimizedImage';

function Image({
  src,
  alt,
  className,
  ...props
}) {

   return (
    <OptimizedImage
      src={src}
      alt={alt}
      className={className}
      placeholder="/assets/images/no_image.png"
      lazy={true}
      {...props}
    />
  );
}

export default Image;