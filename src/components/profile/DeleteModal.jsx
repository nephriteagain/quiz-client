import { useEffect, useRef  } from 'react'
import axios from 'axios'


import { BsCheck2 } from 'react-icons/bs'
import { RxCross2 } from 'react-icons/rx'
import { RotatingLines } from 'react-loader-spinner'
import { useToast } from '../shadcn/ui/use-toast'


export default function DeleteModal({setShowDeleteModal, deleteQuizId, deleteRef, setQuizDeleteId, showDeleteModal, fetchUserData, loading, setLoading}) {

  const modalRef = useRef()
  const { toast } = useToast()
  
  /**
   * 
   * @param {string} id quiz id
   * @description permanently delete the selected quiz from the db
   */
  async function deleteQuiz(id) {
    setLoading(true)
    await axios.post(`${import.meta.env.PROD ? import.meta.env.VITE_PROD : import.meta.env.VITE_DEV}/api/v1/delete`, {id}, {withCredentials: true})
      .then(async (res) => {
        await fetchUserData()
        toast({
          title: 'deleted',
          description: 'quiz deleted successfully',
          duration: 3000
        })
      })
      .catch((err) => {
        console.log(err)
        toast({
          title: 'error',
          description: 'something went wrong',
          duration: 3000,
          variant: 'destructive'
        })
      })
      .finally(() => {
        setShowDeleteModal(false)
        setLoading(false)
        setQuizDeleteId(null)
      })
      
  }

  /**
   * close the delete confirmation modal
   */
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
          <button className='bg-red-500 text-white px-2 py-1 rounded-md me-2 shadow-md drop-shadow-md hover:bg-red-600 transition-all duration-100 active:scale-95 disabled:opacity-70'
            onClick={() => deleteQuiz(deleteQuizId)}
            disabled={loading}
          >                        
            <BsCheck2 className='inline me-1'/>{loading ? 'Deleting...' : 'Delete'}
          
          </button>
          <button className='bg-green-500 text-white px-2 py-1 rounded-md ms-2 shadow-md drop-shadow-md hover:bg-green-600 transition-all duration-100 active:scale-95 disabled:opacity-70'
            onClick={cancelDelete}
            disabled={loading}
          >
          <RxCross2 className='inline me-1'/>Cancel
          </button>
        </div>
      </div>
    </div>
  )
}