import React from 'react';
import { bookmarkmockData } from '../mock/mockData';
import BookmarkCard from './BookmarkCard';
import BookmarkTable from './BookmarkTable';
import { useViewStore } from '../store/viewStore';
import { useQuery } from '@tanstack/react-query';
import { getBookmarks } from '../api/bookmarkApi';
import { useFilterStore } from '../store/filterStore';
import useSearchStore from '../store/useSearchStore';

function BookmarkContainer() {
  const { view } = useViewStore();
  const { selectedFilter } = useFilterStore();
  const { searchTerm } = useSearchStore();

  const { data: bookmarks, isPending, isError, error } = useQuery({
    queryKey: ['bookmarks', selectedFilter],
    queryFn: () => getBookmarks(selectedFilter),
  });
  
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

  // Obtener datos de bookmarks
  const bookmarkData = bookmarks.bookmarks || bookmarkmockData;
  
  // Filtrar los bookmarks según el término de búsqueda
  const filteredBookmarks = searchTerm
    ? bookmarkData.filter((bookmark) => 
        bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (bookmark.description && bookmark.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : bookmarkData;

  // Si no hay resultados después de filtrar
  if (filteredBookmarks.length === 0 && searchTerm) {
    return (
      <div className="p-4 text-center">
        No se encontraron bookmarks con el término: <strong>{searchTerm}</strong>
      </div>
    );
  }

  return view === 'grid' ? (
    <div className="grid-fluid bg-base-100 p-4 rounded-box">
      {filteredBookmarks.map((bookmark) => (
        <BookmarkCard key={bookmark._id} bookmark={bookmark} />
      ))}
    </div>
  ) : (
    <div>
      <BookmarkTable bookmarks={filteredBookmarks} />
    </div>
  );
}

export default BookmarkContainer;
