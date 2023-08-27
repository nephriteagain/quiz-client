import axios from 'axios'
import { useGlobalContext } from '../../context/UserContext'




function SignOut() {



  const { user, setUser } = useGlobalContext()

  async function logOut() {  
    await axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_PROD : import.meta.env.VITE_DEV}/api/v1/user/signout`, {withCredentials: true})
      .then(res => {
        setUser(null)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div>
      <button onClick={logOut}
        className='text-md px-3 py-1 bg-blue-100  rounded-xl text-stone-500 shadow-md drop-shadow-md hover:scale-110 active:scale-90 transition-all duration-75'
      >
        Log Out
      </button>
    </div>
  )
}

export default SignOut