import React from 'react'
import FolderCard from './FolderCard'
import { getFoldersWithBoomarks } from '../api/folderApi';
import { useQuery } from '@tanstack/react-query'
import useSearchStore  from '../store/useSearchStore';
function FolderContainer() {
  const { folderSearchTerm } = useSearchStore();

  const { data, isPending,isError,error } = useQuery({
    queryKey: ['foldersWithBookmarks'],
    queryFn: getFoldersWithBoomarks,
  });
  console.log(data)
  console
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

  const filteredFolders = folderSearchTerm
    ? data.filter((folder) => 
        folder.name.toLowerCase().includes(folderSearchTerm.toLowerCase())
      )
    : data;
  
  // Si no hay resultados después de filtrar
  if (filteredFolders.length === 0 && folderSearchTerm) {
    return (
      <div className="p-4 text-center">
        No se encontraron carpetas con el término: <strong>{folderSearchTerm}</strong>
      </div>
    );
  }
  // Fallback si no hay datos
  return (
    <div className='bg-base-100 gap-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 p-4 rounded-box '>
        {
            filteredFolders?.map((folder) => (
                <FolderCard key={folder._id} folder={folder} />
            ))
        }
        
        
        
      
    </div>
  )
}

export default FolderContainer
