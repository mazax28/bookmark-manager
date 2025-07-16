import React from 'react'
import FolderContainer from '../components/FolderContainer'
import FolderHeader from '../components/FolderHeader'
import DeleteModal from '../components/DeleteModal'
function FolderPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        <FolderHeader />
        <FolderContainer />
      
    </div>
  )
}

export default FolderPage
