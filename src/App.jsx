import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from 'react'

import { useGlobalContext } from './context/UserContext'

import Version from './components/Version'
import Home from './pages/Home'
import Create from './pages/Create'
import Quiz from './pages/Quiz'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import UpdateQuiz from './pages/UpdateQuiz'
import Reset from './pages/Reset'
import Error from './pages/Error'


import './App.css'





function App() {

  const { user, quizList, setQuizList } = useGlobalContext()
  const [ signInLoading, setSignInLoading ] = useState(false)  
  const [ sendEmailLoading, setSendEmailLoading ] = useState(false)
  const [ submitCodeLoading , setSubmitCodeLoading ] = useState(false)
  const [ newPassLoading, setNewPassLoading ] = useState(false)
  const [ signupLoading, setSignupLoading ] = useState(false)
  const [ updateLoading, setUpdateLoading ] = useState(false)
  return (
    <>

    <Router>
      <Routes>
        <Route exact path='/' element={<Home quizList={quizList} setQuizList={setQuizList}/>} />
        { user && <Route path='/create' element={<Create />} /> }
        <Route path='/quiz/:quizId' element={<Quiz quizList={quizList}/>}/>
        <Route path='/user/signin' element={<SignIn loading={signInLoading} setLoading={setSignInLoading} />} />
        <Route path='/user/signup' element={<SignUp loading={signupLoading} setLoading={setSignupLoading} />} />
        <Route 
          path='/user/reset' 
          element={
            <Reset 
              loading={sendEmailLoading} 
              setLoading={setSendEmailLoading} 
              submitLoading={submitCodeLoading} 
              setSubmitLoading={setSubmitCodeLoading}
              newPassLoading={newPassLoading}
              setNewPassLoading={setNewPassLoading}
            />} 
        />
        { user && <Route path='/profile/:profileId' element={<Profile />} /> }
        { user && <Route path='/profile/:profileId/update/:editQuizId' element={<UpdateQuiz loading={updateLoading} setLoading={setUpdateLoading} />} />}
        <Route path='*' element={<Error />} />
      </Routes>
    </Router>
    <Version />
    </>
  )
}

export default App
