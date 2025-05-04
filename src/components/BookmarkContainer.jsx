import React, { useEffect } from 'react';
import BookmarkCard from './BookmarkCard';
import BookmarkTable from './BookmarkTable';
import { useViewStore } from '../store/viewStore';
import { useQuery } from '@tanstack/react-query';
import { getBookmarks } from '../api/bookmarkApi';
import { useFilterStore } from '../store/filterStore';
import useSearchStore from '../store/useSearchStore';
import PaginationBookmark from './PaginationBookmark';

function BookmarkContainer() {
  const { view } = useViewStore();
  const { selectedFilter } = useFilterStore();
  const { searchTerm, currentPage } = useSearchStore();

  // Query con opciones mejoradas para reducir llamadas innecesarias
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['bookmarks', selectedFilter, searchTerm, currentPage],
    queryFn: () => getBookmarks(selectedFilter, currentPage, 10, searchTerm),
    keepPreviousData: true,
    staleTime: 60000, // Considera los datos "frescos" por 1 minuto
    refetchOnWindowFocus: false, // No refrescar al volver a la ventana
    refetchOnMount: false, // No refrescar al montar si los datos no son obsoletos
    refetchOnReconnect: false, // No refrescar al reconectar
  });
  
  // Eliminar el efecto de debounce ya que useSearchStore maneja esto
  
  if (isPending) {
    return <p className="p-4">Cargando bookmarks...</p>;
  }
  
  if (isError) {
    return (
      <div className="p-4 text-red-500">
        Ocurrió un error al cargar los bookmarks: {error.message}
      </div>
    );
  }

  // Obtener datos de bookmarks de la nueva estructura
  const bookmarks = data?.data?.bookmarks || [];
  const pagination = data?.data?.pagination || { totalPages: 1, currentPage: 1, totalItems: 0 };
  
  // Si no hay resultados después de buscar
  if (bookmarks.length === 0 && searchTerm) {
    return (
      <div className="p-4 text-center">
        No se encontraron bookmarks con el término: <strong>{searchTerm}</strong>
      </div>
    );
  }

  return (
    <>
      {view === 'grid' ? (
        <div className="grid-fluid bg-base-100 p-4 rounded-box">
          {bookmarks.map((bookmark) => (
            <BookmarkCard key={bookmark._id} bookmark={bookmark} />
          ))}
        </div>
      ) : (
        <div>
          <BookmarkTable bookmarks={bookmarks} />
        </div>
      )}
      
      {pagination.totalPages > 1 && (
        <div className="flex justify-center my-4">
          <PaginationBookmark 
            currentPage={pagination.currentPage} 
            totalPages={pagination.totalPages} 
          />
        </div>
      )}
    </>
  );
}

export default BookmarkContainer;
