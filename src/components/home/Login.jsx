import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../../context/UserContext"
import SignOut from "../user/Signout"

function Login() {
  const { user } = useGlobalContext()
  const [ showLogin, setShowLogin ] = useState(true)
  

  const navigate = useNavigate()

  function handleSignIn() {
    return navigate('/user/signin')
  }

  function handleSignUp() {
    return navigate('/user/signup')
  }

  useEffect(() => {

    if (user !== null) {
      setShowLogin(false)
    } else {
      setShowLogin(true)
    }
  }, [user])



  if (showLogin) return (
    <section className="absolute top-4 right-4">
      <button onClick={handleSignIn}
        className="me-4 px-2 py-1  bg-blue-200 shadow-md rounded-md text-lg drop-shadow-md hover:scale-110 hover:bg-blue-300 active:scale-95 transition-all duration-75"
      >
        Sign In
      </button>
      <button onClick={handleSignUp}
        className="me-4 px-2 py-1  bg-indigo-200 shadow-md rounded-md text-lg drop-shadow-md hover:scale-110 hover:bg-indigo-300 active:scale-95 transition-all duration-75"
      >
        Sign Up
      </button> 
    </section>
  )

  else if (!showLogin) return (
    <section className="absolute top-4 right-4">
        <SignOut />
    </section>
  )

}




export default Login