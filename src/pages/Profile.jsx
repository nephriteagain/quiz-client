import { useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

import { useGlobalContext } from "../context/UserContext"

import UserQuizList from "../components/profile/UserQuizList"



function Profile() {


  const { user, userQuiz, setUserQuiz, fetchUserData } = useGlobalContext()

  const buttonRef = useRef(null)

  const navigate = useNavigate()

  
  


  
  

  useEffect(() => {
    if (user === null ) {
      return navigate('/')
    }
  }, [user])







  return (  
    <div className="mt-[15%]">      
      <UserQuizList userQuiz={userQuiz} setUserQuiz={setUserQuiz} fetchUserData={fetchUserData}/>

      <div className='text-xl bg-yellow-100 px-2 py-1 rounded-lg shadow-md drop-shadow-md w-fit mx-auto mt-8 mb-4 hover:scale-110 active:scale-95 transition-all duration-100'>
        <Link to="/"
        >
          Back To Home
        </Link>
      </div>
    </div>

  )
}

export default Profile