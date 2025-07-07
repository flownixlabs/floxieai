import React, { memo, useMemo } from 'react';
import { useVirtualization } from '../../hooks/useVirtualization';

const VirtualizedTable = memo(({ 
  data, 
  columns, 
  rowHeight = 60, 
  containerHeight = 400,
  onRowClick,
  className = ""
}) => {
  const { visibleItems, handleScroll, totalHeight } = useVirtualization(
    data, 
    rowHeight, 
    containerHeight
  );

  const memoizedRows = useMemo(() => {
    return visibleItems.items.map((item, index) => (
      <tr
        key={item.id || visibleItems.startIndex + index}
        className="hover:bg-surface-hover transition-colors duration-150 cursor-pointer"
        style={{ height: rowHeight }}
        onClick={() => onRowClick?.(item)}
      >
        {columns.map((column) => (
          <td key={column.key} className="px-4 py-2 text-sm">
            {column.render ? column.render(item) : item[column.key]}
          </td>
        ))}
      </tr>
    ));
  }, [visibleItems, columns, rowHeight, onRowClick]);

  return (
    <div className={`bg-surface rounded-lg border border-border overflow-hidden ${className}`}>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-hover sticky top-0 z-10">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
      
      <div
        className="overflow-auto"
        style={{ height: containerHeight }}
        onScroll={handleScroll}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <table className="w-full">
            <tbody
              style={{
                transform: `translateY(${visibleItems.offsetY}px)`,
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0
              }}
            >
              {memoizedRows}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
});

VirtualizedTable.displayName = 'VirtualizedTable';

export default VirtualizedTable;