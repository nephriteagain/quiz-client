import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate} from 'react-router-dom'

import { AiOutlineCheck } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'
import { useGlobalContext } from "../context/UserContext"
import { RotatingLines } from "react-loader-spinner"
import {
  matchPasswordChecker,
  passwordLengthChecker,
  passwordCharacterChecker,
  specialSymbolChecker
} from '../lib/helper/signUpFormChecker'

import { useToast } from "../components/shadcn/ui/use-toast"




function SignUp({loading, setLoading}) {
  const [ password, setPassword ] = useState('')
  const [ confirmPass, setConfirmPass ] = useState('')
  const [ samePassword, setSamePassword ] = useState(false)
  const [ digitBool, setDigitBool ] = useState(false)
  const [ symbolBool, setSymbolBool ] = useState(false)
  const [ hasNoSpecialSymbolBool, sethasNoSpecialSymbolBool ] = useState(false)
  const [ validForm, setValidForm ] = useState(false)

  const { user } = useGlobalContext()
  const { toast } = useToast()

  const navigate = useNavigate()


  /**
   * 
   * @param {Event} e 
   * @description sign up form handler 
   */
  function handleSubmit(e) {
    e.preventDefault()

    if ( !samePassword || !digitBool || !symbolBool || !hasNoSpecialSymbolBool) {
      return
    }
    setLoading(true)

    let formData = new FormData(e.currentTarget)
    formData = Object.fromEntries(formData)    


    axios.post(`${import.meta.env.PROD ? import.meta.env.VITE_PROD : import.meta.env.VITE_DEV}/api/v1/user/signup`, formData)
      .then((res) => {
        console.log(res.data)
        if (res.data?.email) {
          navigate('/user/signin')
        }
        else if (res.data?.code === 11000) {
          toast({
            title: 'error',
            description: 'user email already exist',
            duration: 3000,
            variant: 'destructive',            
          })
        }
      })
      .catch((err) => console.log(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    setSamePassword(matchPasswordChecker(password, confirmPass))
    setDigitBool(passwordLengthChecker(password))
    setSymbolBool(passwordCharacterChecker(password ))
    sethasNoSpecialSymbolBool(specialSymbolChecker(password))

    if (samePassword && digitBool && symbolBool && hasNoSpecialSymbolBool) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }

  }, [password, confirmPass])

  useEffect(() => {
    if (user !== null) {
      navigate('/')
    }
  }, [user])

  return (
    <div className="dark:text-white mx-auto max-w-[500px]">
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
              className="dark:text-black block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[80%] max-w-[400px] min-w-[250px] focus:bg-blue-200"
            />
          </div>
          <div>
            <label htmlFor="firstName" className="font-semibold text-md">
              First Name
            </label>
            <input type="text" name="firstName" required 
              className="dark:text-black block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[80%] max-w-[400px] min-w-[250px] focus:bg-blue-200"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="font-semibold text-md">
              Last Name
            </label>
            <input type="text" name="lastName" required 
              className="dark:text-black block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[80%] max-w-[400px] focus:bg-blue-200"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="font-semibold text-md">
              Password
            </label>
            <input 
              className="dark:text-black block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[80%] max-w-[400px] focus:bg-blue-200 relative"
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
              className="dark:text-black block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[80%] max-w-[400px] focus:bg-blue-200"
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
            <button type="submit"
              className="dark:bg-green-700 px-2 py-1 bg-green-300 rounded-lg drop-shadow-md hover:scale-110 mt-4 disabled:opacity-70 transition-all duration-150" 
              disabled={loading && validForm}
            >
              {
              loading ? 
              <RotatingLines 
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="25"
                  visible={true}
              /> :
              'Submit'
              }
            </button>
          </div>
        </form>
        
    </div>
  )
}

export default SignUp