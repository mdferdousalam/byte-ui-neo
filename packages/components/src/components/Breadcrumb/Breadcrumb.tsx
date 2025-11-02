/**
 * Breadcrumb Component - React Adapter
 * Provides React bindings for the Breadcrumb component
 *
 * Usage:
 * ```tsx
 * import { Breadcrumb } from '@hikmaui/components';
 *
 * const items = [
 *   { label: 'Home', href: '/' },
 *   { label: 'Products', href: '/products' },
 *   { label: 'Electronics', href: '/products/electronics' },
 *   { label: 'Laptops' }, // Current page (no href)
 * ];
 *
 * <Breadcrumb items={items} showHomeIcon />
 *
 * // With truncation
 * <Breadcrumb items={longPathItems} maxItems={4} />
 * ```
 */

import React, { useEffect, useRef } from 'react';
import { Breadcrumb as BreadcrumbCore, type BreadcrumbProps as BreadcrumbCoreProps } from './Breadcrumb';

export type BreadcrumbProps = BreadcrumbCoreProps;
export type { BreadcrumbItem } from './Breadcrumb';

export const Breadcrumb: React.FC<BreadcrumbProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const breadcrumbCoreRef = useRef<BreadcrumbCore | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create core breadcrumb instance
    breadcrumbCoreRef.current = new BreadcrumbCore(props);
    const element = breadcrumbCoreRef.current.createElement();

    // Mount to container
    containerRef.current.appendChild(element);

    // Cleanup
    return () => {
      breadcrumbCoreRef.current?.destroy();
      breadcrumbCoreRef.current = null;
    };
  }, [props.items, props.separator, props.maxItems, props.showHomeIcon]);

  return <div ref={containerRef} />;
};

export default Breadcrumb;
