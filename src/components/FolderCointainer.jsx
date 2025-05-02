import React from 'react'
import { foldermockData } from '../mock/mockData'
import FolderCard from './FolderCard'
import { getFoldersWithBoomarks } from '../api/folderApi';
import { useQuery } from '@tanstack/react-query'
function FolderContainer() {

  const { data: foldersWithBookmarks, isPending,isError,error } = useQuery({
    queryKey: ['foldersWithBookmarks'],
    queryFn: getFoldersWithBoomarks,
  });
  if (isPending) {
    return <p className="p-4">Cargando carpetas...</p>;
  }
  if (isError) {
    return (
      <div className="p-4 text-red-500">
        Ocurrió un error al cargar las carpetas: {error.message}
      </div>
    );
  }
  // Fallback si no hay datos
  const folderData = foldersWithBookmarks || foldermockData;
  return (
    <div className='bg-base-100 gap-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 p-4 rounded-box '>
        {
            folderData.map((folder) => (
                <FolderCard key={folder._id} folder={folder} />
            ))
        }
        
        
      
    </div>
  )
}

export default FolderContainer
