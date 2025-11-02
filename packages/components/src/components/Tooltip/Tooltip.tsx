/**
 * Tooltip Component - React Adapter
 * Provides React bindings for the Tooltip component
 *
 * Usage:
 * ```tsx
 * import { Tooltip } from '@hikmaui/components';
 *
 * // Basic usage
 * <Tooltip content="Click to copy" trigger={buttonRef.current} />
 *
 * // With custom position
 * <Tooltip content="Help text" trigger={helpIconRef.current} position="right" />
 *
 * // With delays
 * <Tooltip
 *   content="Detailed information"
 *   trigger={elementRef.current}
 *   showDelay={500}
 *   hideDelay={100}
 * />
 * ```
 */

import React, { useEffect, useRef } from 'react';
import { Tooltip as TooltipCore, type TooltipProps as TooltipCoreProps } from './Tooltip';

export type TooltipProps = TooltipCoreProps;

export const Tooltip: React.FC<TooltipProps> = (props) => {
  const tooltipCoreRef = useRef<TooltipCore | null>(null);

  useEffect(() => {
    if (!props.trigger) return;

    // Create core tooltip instance
    tooltipCoreRef.current = new TooltipCore(props);
    tooltipCoreRef.current.createElement();

    // Cleanup
    return () => {
      tooltipCoreRef.current?.destroy();
      tooltipCoreRef.current = null;
    };
  }, [props.trigger, props.content, props.position, props.showDelay, props.hideDelay]);

  return null; // Tooltip is rendered via portal
};

export default Tooltip;
