import AddDropdown from "./AddDropdown"
import BookmarkFilter from "./BookmarkFilter"
import BookmarkModal from "./BookmarkModal"
import FolderModal from "./FolderModal"
import ViewSelector from "./ViewSelector"
import useSearchStore from "../store/useSearchStore"

function FolderHeader() {
  const { folderSearchTerm, setFolderSearchTerm, clearFolderSearch } = useSearchStore();
  
  return (
    <div className='flex items-center justify-between bg-base-200 px-4 py-2 rounded-box'>
        <div className='flex items-center gap-4'>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Buscar carpetas..." 
                className="input" 
                value={folderSearchTerm}
                onChange={(e) => setFolderSearchTerm(e.target.value)}
              />
              {folderSearchTerm && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  onClick={clearFolderSearch}
                  aria-label="Limpiar búsqueda"
                >
                  <i className="ri-close-line"></i>
                </button>
              )}
            </div>
            <BookmarkModal />
            <FolderModal />
            <AddDropdown />
        </div>
        <div className="flex items-center gap-4">
          {/* <BookmarkFilter /> */}
        </div>
    </div>
  )
}

export default FolderHeader
