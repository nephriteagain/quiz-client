import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from 'react-router-dom'

import { useGlobalContext } from "../../context/UserContext"
import { RotatingLines } from "react-loader-spinner"

import {
  matchPasswordChecker,
  passwordLengthChecker,
  passwordCharacterChecker,
  specialSymbolChecker
} from '../../lib/helper/signUpFormChecker'

import { 
  CorrectLength, 
  CorrectSymbol, 
  CorrrectChar, 
  MatchedPassword 
} from './NewPasswordChecker'


export default function SubmitNewPass({_id, email, setShowCodeInput, set_Id, setEmail, loading, setLoading}) {
  const [ password, setPassword ] = useState('')
  const [ confirmPass, setConfirmPass ] = useState('')
  const [ passwordValid, setPasswordValid ] = useState(false)

  const [ lengthBool, setLengthBool ] = useState(false)
  const [  charBool, setCharBool ] = useState(false)
  const [ symbolBool, setSymbolBool ] = useState(false)
  const [ matchBool, setMatchBool ] = useState(false)


  const { setShowPassResetForm } = useGlobalContext()
  
  let navigate = useNavigate()



  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    if (!passwordValid) return

    console.log({_id, email, password})
    axios.post(
      `${import.meta.env.PROD ? import.meta.env.VITE_PROD : import.meta.env.VITE_DEV}/api/v1/reset/confirm`,
      { _id, email, password },
      {withCredentials: true}
    )
      .then(res => {
        if (res.status === 201) {
          setShowPassResetForm(false)
          setShowCodeInput(false)          
          set_Id(null)
          setEmail(null)
          navigate('/user/signin')
        }
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => setLoading(false))
          
    
  }

  useEffect(() => {
    setMatchBool(matchPasswordChecker(password, confirmPass))
    setLengthBool(passwordLengthChecker(password))
    setCharBool(passwordCharacterChecker(password))
    setSymbolBool(specialSymbolChecker(password))
    
    if (lengthBool && charBool && symbolBool && matchBool) {
      setPasswordValid(true)
    }

  }, [password, confirmPass])




  return (
    <div onSubmit={handleSubmit}>
      <form className="mb-8">
        <label htmlFor="password"
          className="text-sm font-semibold"
        >
          new password
        </label>
        <input type="password" name="password" value={password} required
          className="dark:text-black block mt-2 mb-4 min-w-[80%] shadow-inner shadow-stone-300 drop-shadow-md rounded-md bg-orange-50 focus:bg-orange-100 px-2 py-1 text-sm"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
        <label htmlFor="newPassword"
          className="text-sm font-semibold"
        >
          confirm new password
        </label>
        <input type="password" name="newPassword" value={confirmPass} required
          className="dark:text-black block mt-2 mb-4 min-w-[80%] shadow-inner shadow-stone-300 drop-shadow-md rounded-md bg-orange-50 focus:bg-orange-100 px-2 py-1 text-sm"          
          onChange={(e) => setConfirmPass(e.currentTarget.value)}
        />
        <button type="submit" 
          className="dark:bg-green-700 flex items-center justify-center min-w-[5.6rem] bg-green-300 rounded-md px-3 py-1 text-sm shadow-md drop-shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all duration-100 disabled:opacity:70"
          disabled={loading}
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
             'change password'
          }
        </button>
      </form>
      <div>
        <MatchedPassword matchBool={matchBool}/>
        <CorrectLength lengthBool={lengthBool}/>
        <CorrrectChar charBool={charBool}/>
        <CorrectSymbol symbolBool={symbolBool}/>
      </div>
    </div>
  )
}