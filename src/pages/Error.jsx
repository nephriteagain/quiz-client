import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Error() {
  const navigate = useNavigate()

  console.log('you reached the error page')
  
  useEffect(() => {
    navigate('/')
  },[])

  return (
    <div className="dark:bg-[#22092C] w-screen h-screen text-5xl flex items-center justify-center">
      Go Back!!!
    </div>
  )
}

export default Error