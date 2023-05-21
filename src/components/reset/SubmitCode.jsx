import { useState } from "react"
import axios from "axios"


export default function SubmitCode({showCodeInput, setShowCodeInput, set_Id, setEmail, setShowPassResetForm}) {
    const [ code, setCode ] = useState('')


  async function handleSubmit(e) {
    e.preventDefault()

    console.log(code)
    
    await axios.post('http://localhost:3000/api/v1/reset/verify', {"code" : code}, {withCredentials: true})
      .then((res) => {
        if (res.status === 200) {                    
          set_Id(res.data._id)
          setEmail(res.data.email)
          setShowCodeInput(false)
          setShowPassResetForm(true)    
        }
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <form className="mb-8"
        onSubmit={handleSubmit}
      >
        <label htmlFor="code"
          className="text-sm font-semibold"
        >
          code
        </label>
        <input 
          type="text" 
          name="code" 
          required value={code} 
          onChange={(e) => setCode(e.currentTarget.value)}
          className='block mt-2 mb-4 min-w-[50%] shadow-inner shadow-stone-300 drop-shadow-md rounded-md bg-orange-50 focus:bg-orange-100 px-4 py-1 text-sm'
        />
        <input type="submit" value='submit code' 
          className="bg-green-300 rounded-md px-3 py-1 text-sm shadow-md drop-shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all duration-100"
        />
      </form>
    </div>
  )
}