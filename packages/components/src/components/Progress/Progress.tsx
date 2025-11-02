/**
 * Progress Component - React Adapter
 * Provides React bindings for the Progress component
 *
 * Usage:
 * ```tsx
 * import { Progress } from '@hikmaui/components';
 *
 * // Linear progress
 * <Progress value={75} showLabel label="Uploading..." />
 *
 * // Circular progress
 * <Progress value={60} variant="circular" size="lg" showLabel />
 *
 * // Indeterminate
 * <Progress indeterminate />
 * <Progress indeterminate variant="circular" />
 * ```
 */

import React, { useEffect, useRef } from 'react';
import { Progress as ProgressCore, type ProgressProps as ProgressCoreProps } from './Progress';

export type ProgressProps = ProgressCoreProps;
export type { ProgressVariant, ProgressSize } from './Progress';

export const Progress: React.FC<ProgressProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressCoreRef = useRef<ProgressCore | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create core progress instance
    progressCoreRef.current = new ProgressCore(props);
    const element = progressCoreRef.current.createElement();

    // Mount to container
    containerRef.current.appendChild(element);

    // Cleanup
    return () => {
      progressCoreRef.current?.destroy();
      progressCoreRef.current = null;
    };
  }, [props.variant, props.size, props.indeterminate, props.showLabel, props.label, props.color, props.max]);

  // Update value when it changes
  useEffect(() => {
    if (progressCoreRef.current && props.value !== undefined && !props.indeterminate) {
      progressCoreRef.current.setValue(props.value);
    }
  }, [props.value, props.indeterminate]);

  return <div ref={containerRef} />;
};

export default Progress;
