/**
 * Accordion Component - React Adapter
 * Provides React bindings for the Accordion component
 *
 * Usage:
 * ```tsx
 * import { Accordion } from '@hikmaui/components';
 *
 * const items = [
 *   {
 *     id: '1',
 *     title: 'What is HikmaUI?',
 *     content: <p>HikmaUI is a zero-dependency component library.</p>,
 *     defaultExpanded: true,
 *   },
 *   {
 *     id: '2',
 *     title: 'How do I install it?',
 *     content: <p>Run: pnpm add @hikmaui/components</p>,
 *   },
 * ];
 *
 * <Accordion items={items} allowMultiple />
 * ```
 */

import React, { useEffect, useRef } from 'react';
import {
  Accordion as AccordionCore,
  type AccordionProps as AccordionCoreProps,
  type AccordionItem as AccordionItemCore,
} from './Accordion';

export type AccordionItem = Omit<AccordionItemCore, 'content'> & {
  content: React.ReactNode;
};

export type AccordionProps = Omit<AccordionCoreProps, 'items'> & {
  items: AccordionItem[];
};

export const Accordion: React.FC<AccordionProps> = ({ items, ...props }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const accordionCoreRef = useRef<AccordionCore | null>(null);
  const contentRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (!containerRef.current) return;

    // Create content containers for React children
    const coreItems = items.map((item) => {
      const contentContainer = document.createElement('div');
      contentRefs.current.set(item.id, contentContainer);

      return {
        id: item.id,
        title: item.title,
        content: contentContainer,
        defaultExpanded: item.defaultExpanded,
        disabled: item.disabled,
      };
    });

    // Create core accordion instance
    accordionCoreRef.current = new AccordionCore({
      items: coreItems,
      ...props,
    });

    const element = accordionCoreRef.current.createElement();
    containerRef.current.appendChild(element);

    // Cleanup
    return () => {
      accordionCoreRef.current?.destroy();
      accordionCoreRef.current = null;
      contentRefs.current.clear();
    };
  }, []);

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

export default Accordion;
