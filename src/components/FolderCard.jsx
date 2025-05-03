import React, { useState } from 'react'
import BookmarkList from './BookmarkList'
import FolderMenuDropdown from './FolderMenuDropdown'

function FolderCard({ folder: initialFolder }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentFolder, setCurrentFolder] = useState(initialFolder)
  const [folderHistory, setFolderHistory] = useState([])
  
  // Datos de ejemplo - en un caso real esto vendría de una API o base de datos
  const subfolders = [
    {
      _id: 'sub1', 
      name: 'CSS',
      bookmarks: [
        { _id: 'css1', title: 'CSS Tricks', url: 'https://css-tricks.com', description: 'Trucos de CSS' },
        { _id: 'css2', title: 'MDN CSS', url: 'https://developer.mozilla.org/es/docs/Web/CSS', description: 'Documentación de CSS' }
      ],
      bookmarkCount: 2,
      subfolders: []
    },
    {
      _id: 'sub2',
      name: 'JavaScript',
      bookmarks: [
        { _id: 'js1', title: 'JavaScript.info', url: 'https://javascript.info', description: 'Tutorial moderno de JS' }
      ],
      bookmarkCount: 1,
      subfolders: [
        { _id: 'subsub1', name: 'React', bookmarks: [], bookmarkCount: 0 },
        { _id: 'subsub2', name: 'Vue', bookmarks: [], bookmarkCount: 0 }
      ]
    },
    {
      _id: 'sub3',
      name: 'Backend',
      bookmarks: [],
      bookmarkCount: 0,
      subfolders: []
    }
  ]

  // Actualiza la subcarpeta actual basada en el ID
  const handleFolderClick = (folder) => {
    // Guarda la carpeta actual en el historial
    setFolderHistory([...folderHistory, currentFolder])
    // Establece la nueva carpeta actual
    setCurrentFolder(folder)
  }

  // Navega hacia atrás en el historial
  const handleGoBack = () => {
    if (folderHistory.length > 0) {
      // Obtiene la última carpeta del historial
      const previousFolder = folderHistory[folderHistory.length - 1]
      // Actualiza el historial removiendo la última carpeta
      setFolderHistory(folderHistory.slice(0, -1))
      // Establece la carpeta anterior como actual
      setCurrentFolder(previousFolder)
    }
  }

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <div className="card bg-base-200 w-full h-[400px] shadow-sm border border-base-200">
      <div className="card-body space-y-2">
        {/* Header de la carpeta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold text-lg">
            {folderHistory.length > 0 && (
              <button 
                onClick={handleGoBack} 
                className="btn btn-circle btn-sm btn-ghost mr-1"
              >
                <i className="ri-arrow-left-line"></i>
              </button>
            )}
            <span className="text-base-content/70"><i className="ri-folder-line"></i></span>
            {currentFolder.name}
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-neutral text-xs">{currentFolder.bookmarkCount}</span>
            <FolderMenuDropdown />
            {/* Botón toggle solo en móviles */}
            <button
              className="md:hidden text-xl text-base-content"
              onClick={toggleOpen}
              aria-label="Toggle bookmarks"
            >
              <i className={isOpen ? 'ri-skip-up-line' : 'ri-skip-down-line'}></i>
            </button>
          </div>
        </div>

        {/* Lista de bookmarks */}
        <div className={`transition-all duration-300 ${isOpen ? '' : 'hidden'} md:block`}>
          {
            (currentFolder.bookmarkCount === 0 && (!currentFolder.subfolders || currentFolder.subfolders.length === 0)) ? (
              <div className="text-center text-base-content/70">
                <p>No hay contenido en esta carpeta.</p>
              </div>
            ) : (
              <>
                {/* Lista de bookmarks y subcarpetas */}
                <BookmarkList 
                  bookmarks={currentFolder.bookmarks || []} 
                  subfolders={currentFolder.subfolders || subfolders} 
                  onFolderClick={handleFolderClick}
                />
              </>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default FolderCard
