import React, { useState } from 'react';
import { Compass } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Sri Lanka scenery',
  className = '',
  fallbackTitle,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-emerald-900/90 to-teal-950 text-emerald-100 p-6 select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <Compass className="w-8 h-8 text-emerald-400 mb-2 opacity-80" />
        <span className="text-xs font-medium tracking-wide uppercase text-emerald-300">
          {fallbackTitle || alt || 'Sri Lanka Scenic View'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      {...props}
    />
  );
};
