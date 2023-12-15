import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from '../components/shadcn/ui/toaster'

const GlobalContext = createContext()


export const GlobalProvider = ({children}) => {
  const [ user, setUser ] = useState(null)
  const [ quizToUpdate, setQuizToUpdate] = useState({})
  const [ userQuiz, setUserQuiz ] = useState([])
  const [ quizList, setQuizList] = useState([])
  
  // fetch state
  const [ quizPage, setQuizPage ] = useState(1)
  const [ searchText, setSearchText ] = useState('')
  const [cancelTokenSource, setCancelTokenSource] = useState(null)
  const [ showLoadingComponent, setShowLoadingComponent ] = useState(false)
  const [ ascending, setAscending ] = useState('1')

  // password reset timer
  const [ timer, setTimer ] = useState(60)
  const [ showPassResetForm, setShowPassResetForm ] = useState(false)

  /**
   * @description fetches all user data including all the users quiz made
   */
  async function fetchUserData () {
    await axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_PROD : import.meta.env.VITE_DEV}/api/v1/profile/${user.id}`, {withCredentials: true})
      .then((res) => {
        setUserQuiz(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  /**
   * 
   * @param {number} page page requested by user
   * @param {number|string} sortByDate ascending or descending
   * @param {string} sortByTitle ascending or descending
   * @param {string} sortByAuthor ascending or descending
   * @description fetches new quizzes based on user filters
   */
  async function fetchQuizList(page, sortByDate = -1, sortByTitle = '', sortByAuthor = '') {
    const date = sortByDate
    const title = sortByTitle
    const author = sortByAuthor

    // Cancel previous request
    if (cancelTokenSource) {
      cancelTokenSource.cancel()
    }

    // Create new CancelToken source
    const source = axios.CancelToken.source()
    setCancelTokenSource(source)

    setShowLoadingComponent(true)
    await axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_PROD : import.meta.env.VITE_DEV}/api/v1/?page=${page}&date=${date}&title=${title}&author=${author}`, {
      withCredentials: true,
      cancelToken: source.token
    })
      .then((response) => {
        setQuizList(response.data)
        setShowLoadingComponent(false)
      })
      .catch((err) => {
        setShowLoadingComponent(false)
      })
  }


  useEffect(() => {
    fetchQuizList(1)
  }, [])

  useEffect(() => {
    return () => {
      // Cancel request on unmount
      if (cancelTokenSource) {
        cancelTokenSource.cancel()
      }
    }
  }, [cancelTokenSource])


  useEffect(() => {
    axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_PROD : import.meta.env.VITE_DEV}/api/v1/user/session`, {withCredentials: true})
      .then((res) => {
        if (res.data.session) {
          setUser(res.data.user)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  

  useEffect(() => {
    if (user !== null) {
      fetchUserData()
    }

  }, [user])


  return (
    <GlobalContext.Provider 
      value={{
        user,
        setUser,
        quizToUpdate,
        setQuizToUpdate,
        userQuiz,
        setUserQuiz,
        fetchUserData,
        quizList,
        setQuizList,
        fetchQuizList,
        quizPage,
        setQuizPage,
        searchText,
        setSearchText,
        showLoadingComponent,
        ascending,
        setAscending,
        timer,
        setTimer,
        showPassResetForm,
        setShowPassResetForm
      }}
    >
      <Toaster />
      {children}
    </GlobalContext.Provider>
  )
}


export const useGlobalContext = () => {
  return useContext(GlobalContext)
}