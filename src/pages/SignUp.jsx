import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate} from 'react-router-dom'

import { AiOutlineCheck } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'
import { useGlobalContext } from "../context/UserContext"

import {
  matchPasswordChecker,
  passwordLengthChecker,
  passwordCharacterChecker,
  specialSymbolChecker
} from '../lib/helper/signUpFormChecker'




function SignUp() {
  const [ password, setPassword ] = useState('')
  const [ confirmPass, setConfirmPass ] = useState('')
  const [ samePassword, setSamePassword ] = useState(false)
  const [ digitBool, setDigitBool ] = useState(false)
  const [ symbolBool, setSymbolBool ] = useState(false)
  const [ hasNoSpecialSymbolBool, sethasNoSpecialSymbolBool ] = useState(false)

  const { user } = useGlobalContext()

  const navigate = useNavigate()


  function handleSubmit(e) {
    e.preventDefault()

    if ( !samePassword || !digitBool || !symbolBool || !hasNoSpecialSymbolBool) {
      return
    }


    let formData = new FormData(e.currentTarget)
    formData = Object.fromEntries(formData)    


    axios.post(`https://quizzle-createandsolvequizzes.onrender.com/api/v1/user/signup`, formData)
      .then((res) => {
        console.log(res.data)
        if (res.data?.email) {
          navigate('/user/signin')
        }
        else if (res.data?.code === 11000) {
          alert('user email already exist')
        }
      })
      .catch((err) => console.log(err.message))
  }

  useEffect(() => {

    matchPasswordChecker(password, confirmPass, setSamePassword)
    passwordLengthChecker(password, setDigitBool)
    passwordCharacterChecker(password, setSymbolBool)
    specialSymbolChecker(password, sethasNoSpecialSymbolBool)

  }, [password, confirmPass])

  useEffect(() => {
    if (user !== null) {
      navigate('/')
    }
  }, [user])

  return (
    <div className="mx-auto max-w-[500px]">
        <h1 className="text-3xl font-bold mt-10 mb-12">
          Create a New Account
        </h1>
        <form onSubmit={handleSubmit}           
        >
          <div>
            <label htmlFor="email" className="font-semibold text-md">
              Email
            </label>
            <input type="email" name="email" required 
              className="block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[80%] max-w-[400px] min-w-[250px] focus:bg-blue-200"
            />
          </div>
          <div>
            <label htmlFor="firstName" className="font-semibold text-md">
              First Name
            </label>
            <input type="text" name="firstName" required 
              className="block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[80%] max-w-[400px] min-w-[250px] focus:bg-blue-200"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="font-semibold text-md">
              Last Name
            </label>
            <input type="text" name="lastName" required 
              className="block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[80%] max-w-[400px] focus:bg-blue-200"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="font-semibold text-md">
              Password
            </label>
            <input 
              className="block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[80%] max-w-[400px] focus:bg-blue-200 relative"
              type="password" 
              name="password" 
              required
              onChange={(e) => setPassword(e.currentTarget.value)}          
            />
          </div>
          <div className="relative">
            <label htmlFor="confirmPass" className="font-semibold text-md">
              Confirm Password
            </label>
            <input 
              className="block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[80%] max-w-[400px] focus:bg-blue-200"
              type="password" 
              name="confirmPass" 
              required
              onChange={(e) => setConfirmPass(e.currentTarget.value)}
      
            />
          </div>
            {
            samePassword ?
            <div className="text-green-600 text-sm">
              <AiOutlineCheck className="inline me-4"/>
              Pasword Matched
            </div> :
            <div 
              className="text-red-600 text-sm"
            >
              <RxCross2 className="inline me-4"/>
              Password Don't Matched
            </div>
          }
          {
            digitBool ?
            <div className="text-green-600 text-sm">
              <AiOutlineCheck className="inline me-4"/>
              Pasword Must Be At Least 6 Characters
            </div> :
            <div 
              className="text-red-600 text-sm"
            >
              <RxCross2 className="inline me-4"/>
              Pasword Must Be At Least 6 Characters
              
            </div>
          }
          {
            symbolBool ?
            <div className="text-green-600 text-sm">
              <AiOutlineCheck className="inline me-4"/>
              Pasword Must Contain Characters A-Z a-z 0-9
            </div> :
            <div 
              className="text-red-600 text-sm"
            >
              <RxCross2 className="inline me-4"/>
              Pasword Must Contain Characters A-Z a-z 0-9              
            </div>
          }
          {
            !hasNoSpecialSymbolBool &&
            <div 
              className="text-red-600 text-sm"
            >
              <RxCross2 className="inline me-4"/>
              Pasword Must Not Contain a Special Symbol or Whitespace
            </div>
          }
          <div>
            <input type="submit" value='Submit'
              className="px-2 py-1 bg-green-300 rounded-lg drop-shadow-md hover:scale-110 mt-4"
            />
          </div>
        </form>
        
    </div>
  )
}

export default SignUp