import { useEffect, useRef  } from 'react'
import axios from 'axios'


import { BsCheck2 } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'




export default function DeleteModal({setShowDeleteModal, deleteQuizId, deleteRef, setQuizDeleteId, showDeleteModal, fetchUserData}) {

  const modalRef = useRef()
  
  async function deleteQuiz(id) {

    axios.post(`http://localhost:3000/api/v1/delete`, {id}, {withCredentials: true})
      .then(async (res) => {
        await fetchUserData()
      })
      .catch((err) => {
        console.log(err)
      })
      
    setShowDeleteModal(false)
    setQuizDeleteId(null)
  }

  function cancelDelete() {
    setShowDeleteModal(false)
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      setShowDeleteModal(false)
    })
    window.addEventListener('scroll', () => {
      setShowDeleteModal(false)
    })
  }, [])


  useEffect(() => {
    if (deleteRef.current === null) return

    const deleteRect = deleteRef.current.getBoundingClientRect()

    modalRef.current.style.width = `${parseInt(deleteRect.width)}px`
    modalRef.current.style.top = `${parseInt(deleteRect.top) + (parseInt(deleteRect.height)/2.4)}px`
    modalRef.current.style.left = `${parseInt(deleteRect.left)}px` 

  }, [deleteQuizId])



  return (
    <div className='absolute w-fit h-fit bg-red-200 rounded-md' ref={modalRef}>
      <div className='text-center font-semibold text-lg mt-2 mb-4'>
        Confirm Delete?
      </div>
      <div>
        <div className='text-center pb-3'>
          <button className='bg-red-500 text-white px-2 py-1 rounded-md me-2 shadow-md drop-shadow-md hover:bg-red-600 transition-all duration-100 active:scale-95'
            onClick={() => deleteQuiz(deleteQuizId)}
          >
          <BsCheck2 className='inline me-1'/>Delete 
          </button>
          <button className='bg-green-500 text-white px-2 py-1 rounded-md ms-2 shadow-md drop-shadow-md hover:bg-green-600 transition-all duration-100 active:scale-95'
            onClick={cancelDelete}
          >
          <RxCross2 className='inline me-1'/>Cancel
          </button>
        </div>
      </div>
    </div>
  )
}