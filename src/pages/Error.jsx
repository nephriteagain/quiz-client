import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Error() {
  const navigate = useNavigate()

  console.log('you reached the error page')
  
  useEffect(() => {
    navigate('/')
  },[])

  return (
    <div>
      Go Back!!!
    </div>
  )
}

export default Error