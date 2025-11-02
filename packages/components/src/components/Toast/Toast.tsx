/**
 * Toast Component - React Adapter
 * Provides React hooks for the toast notification system
 *
 * Usage:
 * ```tsx
 * import { toast } from '@hikmaui/components';
 *
 * toast.success('Profile updated!');
 * toast.error('Failed to save');
 * toast.promise(saveData(), {
 *   loading: 'Saving...',
 *   success: 'Saved!',
 *   error: 'Failed to save'
 * });
 * ```
 */

import { toast as toastCore } from './Toast';

// Re-export the toast API for React
export const toast = toastCore;

export type { ToastProps, ToastOptions, ToastType, ToastPosition, ToastAction } from './Toast';
export default toast;
