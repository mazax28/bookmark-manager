import React from 'react';
import useSearchStore from '../store/useSearchStore';
import { useQueryClient } from '@tanstack/react-query';

function PaginationBookmark({ currentPage, totalPages }) {
  const { setCurrentPage } = useSearchStore();
  const queryClient = useQueryClient();
  
  // Cambiar de página y refrescar datos
  const handlePageChange = (page) => {
    setCurrentPage(page);
    queryClient.invalidateQueries(['bookmarks']);
  };
  
  // Crear array de páginas a mostrar
  const getPageNumbers = () => {
    const pages = [];
    // Mostrar hasta 5 páginas, con la actual en el centro si es posible
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + 4);
    
    // Ajustar startPage si estamos cerca del final
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };
  
  return (
    <div className="join">
      {/* Botón primera página */}
      {currentPage > 1 && (
        <button 
          className="join-item btn btn-sm"
          onClick={() => handlePageChange(1)}
          aria-label="Primera página"
        >
          <i className="ri-arrow-left-double-line"></i>
        </button>
      )}
      
      {/* Botón anterior */}
      {currentPage > 1 && (
        <button 
          className="join-item btn btn-sm"
          onClick={() => handlePageChange(currentPage - 1)}
          aria-label="Página anterior"
        >
          <i className="ri-arrow-left-s-line"></i>
        </button>
      )}
      
      {/* Números de página */}
      {getPageNumbers().map((page) => (
        <button 
          key={page}
          className={`join-item btn btn-sm ${currentPage === page ? 'btn-active' : ''}`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      
      {/* Botón siguiente */}
      {currentPage < totalPages && (
        <button 
          className="join-item btn btn-sm"
          onClick={() => handlePageChange(currentPage + 1)}
          aria-label="Página siguiente"
        >
          <i className="ri-arrow-right-s-line"></i>
        </button>
      )}
      
      {/* Botón última página */}
      {currentPage < totalPages && (
        <button 
          className="join-item btn btn-sm"
          onClick={() => handlePageChange(totalPages)}
          aria-label="Última página"
        >
          <i className="ri-arrow-right-double-line"></i>
        </button>
      )}
    </div>
  );
}

export default PaginationBookmark;
