import React from 'react'

function DeleteModal() {
  return (
    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
        <h3 className="font-bold text-lg text-red-600">Confirm Deletion</h3>
        <p className="py-4">
          Are you sure you want to delete this item? This action cannot be undone.
        </p>
            <div className="modal-action">
            <form method="dialog">
                <button
                className="btn bg-red-600 text-white hover:bg-red-700"
                >
                    Yes, Delete
                </button>
            <button
              className="btn"
            >
              Cancel
            </button>
                
            </form>
            </div>
        </div>
    </dialog>
      
  )
}

export default DeleteModal
