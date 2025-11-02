/**
 * Modal Component - React Adapter
 * Wraps the framework-agnostic Modal core for React
 *
 * Usage:
 * ```tsx
 * import { Modal } from '@hikmaui/components';
 *
 * const [open, setOpen] = useState(false);
 *
 * <Modal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Confirm Action"
 *   description="Are you sure you want to proceed?"
 * >
 *   <p>Modal content here</p>
 * </Modal>
 * ```
 */

import React, { useRef, useEffect, type ReactNode } from 'react';
import { Modal as ModalCore, type ModalProps as ModalCoreProps } from './Modal';

export interface ModalProps extends Omit<ModalCoreProps, 'content' | 'headerContent' | 'footerContent'> {
  /**
   * Modal content (children)
   */
  children?: ReactNode;

  /**
   * Custom header content
   */
  header?: ReactNode;

  /**
   * Custom footer content
   */
  footer?: ReactNode;
}

/**
 * Modal Component for React
 *
 * @example
 * ```tsx
 * // Basic modal
 * const [open, setOpen] = useState(false);
 *
 * <Button onClick={() => setOpen(true)}>Open Modal</Button>
 *
 * <Modal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Modal Title"
 * >
 *   <p>Your content here</p>
 * </Modal>
 *
 * // With description
 * <Modal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Delete Item"
 *   description="This action cannot be undone."
 * >
 *   <p>Are you sure you want to delete this item?</p>
 * </Modal>
 *
 * // With custom footer
 * <Modal
 *   open={open}
 *   onClose={() => setOpen(false)}
 *   title="Confirm"
 *   footer={
 *     <>
 *       <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
 *       <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
 *     </>
 *   }
 * >
 *   <p>Modal content</p>
 * </Modal>
 *
 * // Different sizes
 * <Modal size="sm" {...props}>Small modal</Modal>
 * <Modal size="md" {...props}>Medium modal</Modal>
 * <Modal size="lg" {...props}>Large modal</Modal>
 * <Modal size="xl" {...props}>Extra large modal</Modal>
 * <Modal size="full" {...props}>Full screen modal</Modal>
 *
 * // With backdrop blur
 * <Modal backdropBlur="sm" {...props}>Small blur</Modal>
 * <Modal backdropBlur="md" {...props}>Medium blur</Modal>
 * <Modal backdropBlur="lg" {...props}>Large blur</Modal>
 *
 * // Prevent closing on backdrop click
 * <Modal closeOnBackdropClick={false} {...props}>
 *   Must use close button
 * </Modal>
 *
 * // Prevent closing on ESC
 * <Modal closeOnEscape={false} {...props}>
 *   Must use close button
 * </Modal>
 * ```
 */
export const Modal: React.FC<ModalProps> = (props) => {
  const {
    children,
    header,
    footer,
    open,
    onClose,
    ...coreProps
  } = props;

  const modalCoreRef = useRef<ModalCore | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  // Create modal instance
  useEffect(() => {
    // Create content container for React children
    const contentContainer = document.createElement('div');
    contentRef.current = contentContainer;

    // Create header container if custom header
    let headerContainer: HTMLDivElement | undefined;
    if (header) {
      headerContainer = document.createElement('div');
      headerRef.current = headerContainer;
    }

    // Create footer container if custom footer
    let footerContainer: HTMLDivElement | undefined;
    if (footer) {
      footerContainer = document.createElement('div');
      footerRef.current = footerContainer;
    }

    // Create modal core instance
    modalCoreRef.current = new ModalCore({
      open,
      onClose,
      content: contentContainer,
      headerContent: headerContainer,
      footerContent: footerContainer,
      ...coreProps,
    });

    // Create and mount element (portal appends to body automatically)
    modalCoreRef.current.createElement();

    // Cleanup
    return () => {
      modalCoreRef.current?.destroy();
    };
  }, [
    onClose,
    coreProps.title,
    coreProps.description,
    coreProps.size,
    coreProps.showCloseButton,
    coreProps.closeOnBackdropClick,
    coreProps.closeOnEscape,
    coreProps.backdropBlur,
    coreProps.lockScroll,
  ]);

  // Update open state dynamically
  useEffect(() => {
    if (modalCoreRef.current) {
      if (open) {
        modalCoreRef.current.open();
      } else {
        modalCoreRef.current.close();
      }
    }
  }, [open]);

  // Render children into content container
  useEffect(() => {
    if (contentRef.current && children) {
      const root = (contentRef.current as any)._reactRoot;
      if (root) {
        root.render(children);
      }
    }
  }, [children]);

  // Render header into header container
  useEffect(() => {
    if (headerRef.current && header) {
      const root = (headerRef.current as any)._reactRoot;
      if (root) {
        root.render(header);
      }
    }
  }, [header]);

  // Render footer into footer container
  useEffect(() => {
    if (footerRef.current && footer) {
      const root = (footerRef.current as any)._reactRoot;
      if (root) {
        root.render(footer);
      }
    }
  }, [footer]);

  // Portal is rendered by core, no React rendering needed
  return null;
};

Modal.displayName = 'Modal';

/**
 * Export types for TypeScript users
 */
export type { ModalProps };
export default Modal;
