import React from 'react';

import Button from '../../../components/ui/Button';

const PaginationControls = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange, 
  onItemsPerPageChange 
}) => {
  const pageSizeOptions = [10, 25, 50, 100];
  
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1) {
    return null;
  }

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 bg-surface border border-border rounded-lg p-4">
      {/* Items per page selector */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-text-secondary">Show:</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="px-3 py-1 border border-border rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary bg-surface"
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="text-sm text-text-secondary">per page</span>
      </div>

      {/* Page info */}
      <div className="text-sm text-text-secondary">
        Showing {startItem} to {endItem} of {totalItems} results
      </div>

      {/* Pagination controls */}
      <div className="flex items-center space-x-1">
        {/* Previous button */}
        <Button
          variant="ghost"
          size="sm"
          iconName="ChevronLeft"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
        />

        {/* Page numbers */}
        <div className="flex items-center space-x-1">
          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-1 text-text-muted">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(page)}
                  className={`min-w-[2.5rem] ${
                    currentPage === page 
                      ? 'text-primary-foreground' 
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next button */}
        <Button
          variant="ghost"
          size="sm"
          iconName="ChevronRight"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default PaginationControls;