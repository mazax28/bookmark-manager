import AddDropdown from "./AddDropdown"
import BookmarkFilter from "./BookmarkFilter"
import BookmarkModal from "./BookmarkModal"
import FolderModal from "./FolderModal"
import ViewSelector from "./ViewSelector"
function FolderHeader() {
  return (
    <div className='flex items-center justify-between bg-base-200 px-4 py-2 rounded-box'>
        <div className='flex items-center gap-4'>
            <input type="text" placeholder="Type here" className="input" />
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
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
