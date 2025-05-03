import React from 'react';
import { bookmarkmockData } from '../mock/mockData';
import BookmarkCard from './BookmarkCard';
import BookmarkTable from './BookmarkTable';
import { useViewStore } from '../store/viewStore';
import { useQuery } from '@tanstack/react-query';
import { getBookmarks } from '../api/bookmarkApi';
import { useFilterStore } from '../store/filterStore';

function BookmarkContainer() {
  const { view } = useViewStore();
  const { selectedFilter } = useFilterStore();


  const { data: bookmarks, isPending, isError, error } = useQuery({
    queryKey: ['bookmarks', selectedFilter], // cambia el queryKey para que se actualice cuando cambie el filtro
    queryFn: () => getBookmarks(selectedFilter), // pasa el filtro como argumento
  });
  console.log(bookmarks);

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

  // Fallback si no hay datos
  const bookmarkData = bookmarks.bookmarks || bookmarkmockData;

  return view === 'grid' ? (
    <div className="grid-fluid bg-base-100 p-4 rounded-box">
      {bookmarkData.map((bookmark) => (
        <BookmarkCard key={bookmark._id} bookmark={bookmark} />
      ))}
    </div>
  ) : (
    <div>
      <BookmarkTable bookmarks={bookmarkData} />
    </div>
  );
}

export default BookmarkContainer;
