import React from 'react'
import { foldermockData } from '../mock/mockData'
import FolderCard from './FolderCard'
function FolderContainer() {
  return (
    <div className='bg-base-100 gap-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 p-4 rounded-box '>
        {
            foldermockData.map((folder) => (
                <FolderCard key={folder.id} folder={folder} />
            ))
        }
        
        
      
    </div>
  )
}

export default FolderContainer
