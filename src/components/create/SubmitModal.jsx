import axios from "axios"

import { useLayoutEffect, useRef } from "react"
import { useGlobalContext } from "../../context/UserContext"
import { RotatingLines } from "react-loader-spinner"
import { useToast } from "../shadcn/ui/use-toast"


function SubmitModal({formData, setFormData ,setShowSubmitModal, bgModalHeight, loading, setLoading, titleRef}) {

  const { fetchUserData, fetchQuizList, setQuizPage } = useGlobalContext()
  const { toast } = useToast()

  const submitBtnRef = useRef(null)

  /**
   * @description submits the newly created quiz to the server
   */
  async function submitData(e) {
    e.preventDefault()

    setLoading(true)
    await axios.post(`${import.meta.env.PROD ? import.meta.env.VITE_PROD : import.meta.env.VITE_DEV}/api/v1/`, formData, {withCredentials: true})
      .then((res) => {
        if (res.status === 201) {
          toast({
            title: 'success',
            description: 'Quiz successfully created!',
            duration: 2000,
          })
          titleRef.current.focus
        }
        const title = document.querySelector('.title')
        title.value = ''        
        setFormData({})
        fetchUserData()
        fetchQuizList(1)
          .then(res => {
            setQuizPage(1)
          })
          .catch(err => console.log(err))
      })
      .catch((err) => {
        console.log(err)
        toast({
          title: 'Error',
          description: 'something went wrong',          
          variant: 'destructive'
        })
      })
      .finally(() => setLoading(false))
      setShowSubmitModal(false)
  }

  function cancelSubmit() {
    setShowSubmitModal(false)
  }


  useLayoutEffect(() => {
    submitBtnRef.current.focus()
  }, [])

  return (
    <div className="absolute top-0 left-0 z-[2] w-[100vw]" style={{height: `${bgModalHeight}px`}} >
      <div className="absolute bg-black opacity-70 z-[3] w-[100vw] h-[100%]">

      </div>
      <form onSubmit={submitData} className="dark:bg-blue-950 min-w-[350px] min-h-[250px] absolute top-[50vh] left-[50vw] -translate-x-1/2 -translate-y-1/2 px-4 py-4 bg-slate-200 z-[4] rounded-xl">
        <h1 className="text-4xl text-center font-bold mt-6">
          Save Quiz
        </h1>
        <div className="w-full flex mt-[80px]">
        <button 
          className="dark:bg-blue-400 dark:hover:bg-blue-600 flex items-center justify-center min-w-[5.6rem] bg-blue-200 text-3xl px-2 py-1 rounded-md ms-auto me-4 shadow-md drop-shadow-md hover:text-white hover:bg-blue-600 transition-all duration-100 disabled:opacity-70"
          disabled={loading}
          type="submit"
          ref={submitBtnRef}
        >
          {
          loading ?
          <RotatingLines 
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="35"
            visible={true}
          /> : 
          'Confirm'
          }
        </button>
        <button 
          type='button'
          onClick={cancelSubmit}
          className="dark:bg-orange-400 dark:hover:bg-orange-600 bg-orange-200 text-3xl px-2 py-1 rounded-md me-auto ms-4 shadow-md drop-shadow-md hover:text-white hover:bg-orange-400 transition-all duration-100"
        >
          Cancel
        </button>
        </div>
        
      </form> 
    </div>
  )
}

export default SubmitModal