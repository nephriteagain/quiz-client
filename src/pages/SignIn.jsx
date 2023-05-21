import { useEffect } from "react"
import axios from "axios"
import { useGlobalContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom"




function SignIn() {
  const { user, setUser,  } = useGlobalContext()

  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const userData = Object.fromEntries(formData)
    console.log(userData)

    axios.post(`https://quizzle-createandsolvequizzes.onrender.com/api/v1/user/signin`,  userData, {withCredentials: true} )
      .then(res => {
        const data = res.data
        if (data.message === 'logged in' || data.message === 'already logged in') {
          setUser(data.userData)
          navigate('/')
        }
      })
      .catch(err => console.log(err.message))
  }

  useEffect(() => {
    if (user !== null) {
      navigate('/')
    }
  }, [user])
  

  return (
    <div className="mx-auto max-w-[500px]">
      <h1 className="text-3xl font-bold mt-20 mb-16">
        Login
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="font-semibold text-md">
            Email
          </label>
          <input className="block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[80%] max-w-[400px] min-w-[250px] focus:bg-blue-200"
            type="email" 
            name='email' 
            required
          />
        </div>
        <div>
        <label htmlFor="password" className="font-semibold text-md">
          Password
        </label>
        <input className="block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[80%] max-w-[400px] min-w-[250px] focus:bg-blue-200"
          type="password" 
          name="password" 
          required 
        />
        </div>
        <p className="text-sm mb-6">
          <span className="opacity-80">forgot password?</span>
          <span className="text-blue-800 cursor-pointer"
            onClick={() => navigate('/user/reset')}
          > click here</span>
        </p>
        <div>
          <input className="px-3 py-1 bg-green-300 shadow-md drop-shadow-md rounded-md text-lg font-semibold hover:scale-105 active:scale-95 transition-all duration-75 "
            type="submit"
            value='LOG IN'
          />

        </div>
      </form>
    </div>
  )
}

export default SignIn