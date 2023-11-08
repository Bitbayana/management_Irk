import React from 'react';

import rightSVG from '../icons/rightarrow.svg';
import leftSVG from '../icons/leftarrow.svg';

interface PaginationProps {
  currentPage: number;
  maxPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  const { currentPage, maxPages, onPageChange } = props;
  const totalPages = maxPages;

  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  const pageNumbers = Array.from({ length: maxPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <img src={leftSVG} alt="del" width="30" height="30" />
      </button>
      
      <div className="pagination__buttons">
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={page === currentPage ? 'active' : ''}
          >
            {page}
          </button>
        ))}
      </div>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <img src={rightSVG} alt="del" width="30" height="30" />
      </button>
    </div>
  );
};

export default Pagination;
