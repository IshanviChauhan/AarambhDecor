
'use client';

import { useState, useRef, type MouseEvent, type ReactNode, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface LensProps {
  zoomFactor?: number;
  lensSize?: number;
  isStatic?: boolean;
  ariaLabel?: string;
  children: ReactNode; // Expecting an <img> element
  className?: string;
  imgClassName?: string; // Class for the internal image
}

export function Lens({
  zoomFactor = 2,
  lensSize = 150,
  isStatic = false,
  ariaLabel = 'Zoomed image area',
  children,
  className,
  imgClassName,
}: LensProps) {
  const [lensVisible, setLensVisible] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState('0% 0%');
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [imgDimensions, setImgDimensions] = useState({ width: 0, height: 0 });

  // Extract src and alt from the child img element
  let imgSrc = '';
  let imgAlt = 'Zoomed image';
  if (React.isValidElement(children) && children.type === 'img') {
    imgSrc = children.props.src;
    imgAlt = children.props.alt || imgAlt;
  }

  useEffect(() => {
    if (imgRef.current) {
      // Ensure image is loaded to get correct dimensions
      const image = imgRef.current;
      const updateDimensions = () => {
        setImgDimensions({ width: image.offsetWidth, height: image.offsetHeight });
      };

      if (image.complete) {
        updateDimensions();
      } else {
        image.onload = updateDimensions;
      }
      // Update dimensions if window resizes
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, [imgSrc, children]); // Re-run if imgSrc changes (e.g. carousel slide)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isStatic || !containerRef.current || !imgRef.current || imgDimensions.width === 0 || imgDimensions.height === 0) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to the container (which is the image bounds)
    let x = e.clientX - containerRect.left;
    let y = e.clientY - containerRect.top;

    // Ensure mouse position is within image bounds (using actual rendered dimensions)
    x = Math.max(0, Math.min(x, imgDimensions.width));
    y = Math.max(0, Math.min(y, imgDimensions.height));
    
    // Calculate lens position so it's centered on the mouse cursor
    // and constrained within the container.
    const lensX = x - lensSize / 2;
    const lensY = y - lensSize / 2;

    setLensPosition({
      x: Math.max(0, Math.min(lensX, imgDimensions.width - lensSize)),
      y: Math.max(0, Math.min(lensY, imgDimensions.height - lensSize)),
    });

    // Calculate background position for the zoomed image
    const bgX = (x / imgDimensions.width) * 100;
    const bgY = (y / imgDimensions.height) * 100;
    setBackgroundPosition(`${bgX}% ${bgY}%`);
  };

  const handleMouseEnter = () => {
    if (!isStatic && imgDimensions.width > 0 && imgDimensions.height > 0) { // Only show if image has dimensions
        setLensVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isStatic) setLensVisible(false);
  };


  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden w-full h-full", !isStatic && "cursor-crosshair", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={ariaLabel}
      role="img"
    >
      {React.isValidElement(children) ? React.cloneElement(children as React.ReactElement, { 
        ref: imgRef, 
        className: cn('w-full h-full object-contain block select-none', imgClassName),
        // Prevent browser's default image drag behavior
        onDragStart: (e: MouseEvent) => e.preventDefault(),
      }) : children}

      {!isStatic && lensVisible && (
        <div
          style={{
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            top: `${lensPosition.y}px`,
            left: `${lensPosition.x}px`,
            backgroundImage: `url(${imgSrc})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: `${imgDimensions.width * zoomFactor}px ${imgDimensions.height * zoomFactor}px`,
            backgroundPosition: backgroundPosition,
            border: '2px solid hsl(var(--primary))',
            borderRadius: '50%', 
            boxShadow: '0 0 15px rgba(0,0,0,0.3)',
            pointerEvents: 'none', 
            position: 'absolute',
            zIndex: 10,
            // Improve performance with will-change
            willChange: 'transform, top, left',
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
