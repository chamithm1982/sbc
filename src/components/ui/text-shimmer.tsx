
"use client";

import type { CSSProperties, FC, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TextShimmerProps {
  children: ReactNode;
  className?: string;
  duration?: number; // Duration in seconds
}

const TextShimmer: FC<TextShimmerProps> = ({
  children,
  className,
  duration = 2, // Default duration
}) => {
  // CSS variables for colors (--base-color, --base-gradient-color)
  // are expected to be set via the `className` prop using Tailwind's arbitrary property syntax, e.g.,
  // className="[--base-color:theme(colors.blue.500)] [--base-gradient-color:theme(colors.slate.200)]"

  const shimmerStyle: CSSProperties = {
    '--shimmer-duration': `${duration}s`,
    animation: 'text_shimmer_animation var(--shimmer-duration) infinite linear',
    // Default gradient, expecting --base-color and --base-gradient-color to be set via className
    background: `linear-gradient(to right, var(--base-color, currentColor) 20%, var(--base-gradient-color, white) 50%, var(--base-color, currentColor) 80%)`,
    backgroundSize: '200% auto',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text', // For Safari compatibility
    WebkitTextFillColor: 'transparent', // For Safari compatibility
    color: 'transparent', // Fallback for browsers that don't support -webkit-text-fill-color or background-clip
    display: 'inline-block', // Ensures the span behaves correctly for background clipping
  } as CSSProperties;

  return (
    <span style={shimmerStyle} className={cn(className)}>
      {children}
    </span>
  );
};

export { TextShimmer };
