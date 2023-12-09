import { useState } from 'react'

import SubmitCode from '../components/reset/SubmitCode'
import SubmitEmail from '../components/reset/SubmitEmail'
import SubmitNewPass from '../components/reset/SubmitNewPass'

import { useGlobalContext } from '../context/UserContext'

function Reset({loading, setLoading, submitLoading, setSubmitLoading, newPassLoading, setNewPassLoading}) {

  const [ showCodeInput, setShowCodeInput ] = useState(false)
  const [ _id, set_Id ] = useState(null)
  const [ email, setEmail ] = useState(null)

  const { timer, setTimer, showPassResetForm, setShowPassResetForm } = useGlobalContext()

  return (
    <div className="max-w-[400px] min-w-[250px] h-[300px] bg-stone-50 dark:bg-blue-950 dark:text-white mx-auto mt-20 rounded-xl px-4 py-4 shadow-md drop-shadow-lg">
      <h1 className='mb-8 mt-4 font-bold text-xl'>
        Reset Password
      </h1>
    { !showPassResetForm ?
      <>
      <SubmitEmail 
        showCodeInput={showCodeInput} 
        setShowCodeInput={setShowCodeInput} 
        timer={timer} 
        setTimer={setTimer}
        loading={loading}
        setLoading={setLoading}
      />
      { showCodeInput && 
        <SubmitCode 
          setShowCodeInput={setShowCodeInput} 
          set_Id={set_Id} 
          setEmail={setEmail} 
          setShowPassResetForm={setShowPassResetForm}
          loading={submitLoading}
          setLoading={setSubmitLoading}
        />
        }
      </> :
      <SubmitNewPass 
        _id={_id} 
        email={email} 
        setShowCodeInput={setShowCodeInput} 
        set_Id={set_Id} 
        setEmail={setEmail}  
        loading={newPassLoading}
        setLoading={setNewPassLoading}
      />
    }
    </div>
  )
}

export default Reset