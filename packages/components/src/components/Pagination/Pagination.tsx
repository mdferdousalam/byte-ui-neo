/**
 * Pagination Component - React Adapter
 * Provides React bindings for the Pagination component
 *
 * Usage:
 * ```tsx
 * import { Pagination } from '@hikmaui/components';
 *
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={20}
 *   totalItems={200}
 *   pageSize={10}
 *   onPageChange={(page) => setCurrentPage(page)}
 *   showPrevNext
 *   showFirstLast
 * />
 *
 * // With page size selector
 * <Pagination
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   pageSize={pageSize}
 *   pageSizeOptions={[10, 25, 50, 100]}
 *   showPageSize
 *   onPageSizeChange={(size) => setPageSize(size)}
 * />
 * ```
 */

import React, { useEffect, useRef } from 'react';
import { Pagination as PaginationCore, type PaginationProps as PaginationCoreProps } from './Pagination';

export type PaginationProps = PaginationCoreProps;

export const Pagination: React.FC<PaginationProps> = (props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const paginationCoreRef = useRef<PaginationCore | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create core pagination instance
    paginationCoreRef.current = new PaginationCore(props);
    const element = paginationCoreRef.current.createElement();

    // Mount to container
    containerRef.current.appendChild(element);

    // Cleanup
    return () => {
      paginationCoreRef.current?.destroy();
      paginationCoreRef.current = null;
    };
  }, [
    props.currentPage,
    props.totalPages,
    props.totalItems,
    props.pageSize,
    props.pageSizeOptions,
    props.siblingCount,
    props.showPrevNext,
    props.showFirstLast,
    props.showPageSize,
  ]);

  return <div ref={containerRef} />;
};

export default Pagination;
