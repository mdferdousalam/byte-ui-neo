/**
 * Skeleton Component - React Adapter
 * Provides React bindings for the Skeleton component
 *
 * Usage:
 * ```tsx
 * import { Skeleton } from '@hikmaui/components';
 *
 * // Text skeleton
 * <Skeleton variant="text" />
 * <Skeleton variant="text" lines={3} />
 *
 * // Avatar skeleton
 * <Skeleton variant="circular" width={48} height={48} />
 *
 * // Rectangular skeleton
 * <Skeleton variant="rectangular" width="100%" height={200} />
 *
 * // Custom animation
 * <Skeleton animation="shimmer" />
 * ```
 */

import React, { useEffect, useRef } from 'react';
import { Skeleton as SkeletonCore, type SkeletonProps as SkeletonCoreProps } from './Skeleton';

export type SkeletonProps = SkeletonCoreProps;
export type { SkeletonVariant, SkeletonAnimation } from './Skeleton';

export const Skeleton: React.FC<SkeletonProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const skeletonCoreRef = useRef<SkeletonCore | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create core skeleton instance
    skeletonCoreRef.current = new SkeletonCore(props);
    const element = skeletonCoreRef.current.createElement();

    // Mount to container
    containerRef.current.appendChild(element);

    // Cleanup
    return () => {
      skeletonCoreRef.current?.destroy();
      skeletonCoreRef.current = null;
    };
  }, [props.variant, props.animation, props.width, props.height, props.lines]);

  return <div ref={containerRef} />;
};

export default Skeleton;
