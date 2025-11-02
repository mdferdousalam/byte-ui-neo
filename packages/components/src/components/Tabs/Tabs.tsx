/**
 * Tabs Component - React Adapter
 * Provides React bindings for the Tabs component
 *
 * Usage:
 * ```tsx
 * import { Tabs } from '@hikmaui/components';
 *
 * const items = [
 *   { id: '1', label: 'Tab 1', content: <div>Content 1</div> },
 *   { id: '2', label: 'Tab 2', content: <div>Content 2</div> },
 *   { id: '3', label: 'Tab 3', content: <div>Content 3</div>, disabled: true },
 * ];
 *
 * <Tabs items={items} defaultActiveIndex={0} />
 *
 * // Vertical orientation
 * <Tabs items={items} orientation="vertical" />
 * ```
 */

import React, { useEffect, useRef } from 'react';
import { Tabs as TabsCore, type TabsProps as TabsCoreProps, type TabItem } from './Tabs';

export type TabsProps = Omit<TabsCoreProps, 'items'> & {
  items: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
  }>;
};

export type { TabItem };

export const Tabs: React.FC<TabsProps> = ({ items, ...props }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tabsCoreRef = useRef<TabsCore | null>(null);
  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (!containerRef.current) return;

    // Create content containers for React children
    const coreItems = items.map((item) => {
      const contentContainer = document.createElement('div');
      contentRefs.current.set(item.id, contentContainer);

      return {
        id: item.id,
        label: item.label,
        content: contentContainer,
        disabled: item.disabled,
      };
    });

    // Create core tabs instance
    tabsCoreRef.current = new TabsCore({
      items: coreItems,
      ...props,
    });

    const element = tabsCoreRef.current.createElement();
    containerRef.current.appendChild(element);

    // Cleanup
    return () => {
      tabsCoreRef.current?.destroy();
      tabsCoreRef.current = null;
      contentRefs.current.clear();
    };
  }, []);

  // Update active index when controlled prop changes
  useEffect(() => {
    if (tabsCoreRef.current && props.activeIndex !== undefined) {
      tabsCoreRef.current.setActive(props.activeIndex);
    }
  }, [props.activeIndex]);

  return (
    <>
      <div ref={containerRef} />
      {items.map((item) => {
        const container = contentRefs.current.get(item.id);
        if (!container) return null;

        return React.createPortal(item.content, container, item.id);
      })}
    </>
  );
};

export default Tabs;
