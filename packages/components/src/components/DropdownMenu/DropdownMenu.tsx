/**
 * Dropdown Menu Component - React Adapter
 * Provides React bindings for the Dropdown Menu component
 *
 * Usage:
 * ```tsx
 * import { DropdownMenu } from '@hikmaui/components';
 *
 * const items = [
 *   { id: '1', label: 'Profile', icon: '<svg>...</svg>', onClick: () => {} },
 *   { type: 'separator' },
 *   { id: '2', label: 'Settings', shortcut: '⌘S', onClick: () => {} },
 *   {
 *     id: '3',
 *     label: 'More',
 *     submenu: [
 *       { id: '3-1', label: 'Nested Item', onClick: () => {} }
 *     ]
 *   },
 * ];
 *
 * <DropdownMenu items={items} trigger={buttonRef.current} />
 * ```
 */

import React, { useEffect, useRef } from 'react';
import {
  DropdownMenu as DropdownMenuCore,
  type DropdownMenuProps as DropdownMenuCoreProps,
} from './DropdownMenu';

export type DropdownMenuProps = DropdownMenuCoreProps;
export type { DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel, DropdownMenuItemType } from './DropdownMenu';

export const DropdownMenu: React.FC<DropdownMenuProps> = (props) => {
  const dropdownCoreRef = useRef<DropdownMenuCore | null>(null);

  useEffect(() => {
    if (!props.trigger) return;

    // Create core dropdown instance
    dropdownCoreRef.current = new DropdownMenuCore(props);
    dropdownCoreRef.current.createElement();

    // Cleanup
    return () => {
      dropdownCoreRef.current?.destroy();
      dropdownCoreRef.current = null;
    };
  }, [props.trigger, props.items, props.position]);

  return null; // Dropdown is rendered via portal
};

export default DropdownMenu;
