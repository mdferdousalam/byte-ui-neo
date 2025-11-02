/**
 * Modal Component Exports
 * Framework-agnostic modal with React adapter
 */

// Core modal (framework-agnostic)
export { Modal as ModalCore, createModal, type ModalProps as ModalCoreProps } from './Modal';

// React adapter (default export)
export { Modal, type ModalProps } from './Modal.tsx';
export { default } from './Modal.tsx';
