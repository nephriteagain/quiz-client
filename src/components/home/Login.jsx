import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useGlobalContext } from "../../context/UserContext"
import SignOut from "../user/Signout"
import Switch from "./Switch"

import axios from "axios"

function Login() {
  const { user, setUser } = useGlobalContext()
  const [ showLogin, setShowLogin ] = useState(true)
  const [ loading, setLoading ] = useState(false)

  const navigate = useNavigate()

  /**
   * @description redirects user to signin route
   */
  function handleSignIn() {
    return navigate('/user/signin')
  }

  /**
   * @description redirects user to signup route
   */
  function handleSignUp() {
    return navigate('/user/signup')
  }

  /**
   * @description you what this do right
   */
  async function logOut() {  
    setLoading(true)
    await axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_PROD : import.meta.env.VITE_DEV}/api/v1/user/signout`, {withCredentials: true})
      .then(res => {
        setUser(null)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {

    if (user !== null) {
      setShowLogin(false)
    } else {
      setShowLogin(true)
    }
  }, [user])



  if (showLogin) return (
    <section className="absolute top-4 right-4 flex flex-row gap-6">
      <Switch />
      <button onClick={handleSignIn}
        className=" px-2 py-1  bg-blue-200 dark:bg-blue-700 shadow-md dark:text-white rounded-md text-lg drop-shadow-md hover:scale-110 hover:bg-blue-300 active:scale-95 transition-all duration-75"
      >
        Sign In
      </button>
      <button onClick={handleSignUp}
        className=" px-2 py-1  bg-indigo-200 dark:bg-indigo-700 shadow-md dark:text-white rounded-md text-lg drop-shadow-md hover:scale-110 hover:bg-indigo-300 active:scale-95 transition-all duration-75"
      >
        Sign Up
      </button> 
    </section>
  )

  else if (!showLogin) return (
    <section className="absolute top-4 right-4 flex flex-row gap-6">
        <Switch />
        <SignOut 
          className='text-md px-3 py-1 bg-blue-100  rounded-xl text-stone-500 shadow-md drop-shadow-md hover:scale-110 active:scale-100 transition-all duration-150'
          handleClick={logOut}
          loading={loading}
        />
    </section>
  )

}




export default Login