/**
 * Avatar Component - React Adapter
 * Provides React bindings for the Avatar component
 *
 * Usage:
 * ```tsx
 * import { Avatar } from '@hikmaui/components';
 *
 * // With image
 * <Avatar src="/user.jpg" alt="John Doe" size="lg" status="online" />
 *
 * // With initials fallback
 * <Avatar name="John Doe" size="md" />
 *
 * // With icon fallback
 * <Avatar size="sm" />
 *
 * // Square shape
 * <Avatar name="Jane Smith" shape="square" />
 * ```
 */

import React, { useEffect, useRef } from 'react';
import { Avatar as AvatarCore, type AvatarProps as AvatarCoreProps } from './Avatar';

export type AvatarProps = AvatarCoreProps;

export const Avatar: React.FC<AvatarProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const avatarCoreRef = useRef<AvatarCore | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create core avatar instance
    avatarCoreRef.current = new AvatarCore(props);
    const element = avatarCoreRef.current.createElement();

    // Mount to container
    containerRef.current.appendChild(element);

    // Cleanup
    return () => {
      avatarCoreRef.current?.destroy();
      avatarCoreRef.current = null;
    };
  }, []);

  // Handle src updates
  useEffect(() => {
    if (avatarCoreRef.current && props.src) {
      avatarCoreRef.current.updateSrc(props.src);
    }
  }, [props.src]);

  return <div ref={containerRef} />;
};

export default Avatar;
