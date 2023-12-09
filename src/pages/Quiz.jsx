import { useEffect, useState } from 'react'
import { Link  } from "react-router-dom"
import axios from 'axios'

import Answer from "../components/quiz/Answer"
import AnswerLoading from '../components/quiz/AnswerLoading'



function Quiz() {
  const [data, setData] = useState({})
  const [ showAnswerLoadingComponent, setShowAnswerLoadingComponent ] = useState(true)
  const [ answerLoading, setAnswerLoading ] = useState(false)

  useEffect(() => {
    const url = document.URL;
    const regex = /quiz\/(.+)/;
    const match = url.match(regex);
    const captureString = match[1];

    axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_PROD : import.meta.env.VITE_DEV}/api/v1/quiz/${captureString}`, {withCredentials: true})
      .then(response => {
        let data = response.data        
        // let questions = data.questions
        // questions = questions.map((item) => {
        //   const {questionText, options, _id} = item
        //   return {questionText, options}
        // })
        // data.questions = questions
        setData(data)
        setShowAnswerLoadingComponent(false)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <>
    {
    showAnswerLoadingComponent ?
    <AnswerLoading /> :
    <Answer data={data} setData={setData} loading={answerLoading} setLoading={setAnswerLoading}/>
    }
    
    <div className='dark:bg-yellow-600 dark:text-white text-xl bg-yellow-100 px-2 py-1 shadow-md drop-shadow-md rounded-lg w-fit mx-auto mb-4 hover:scale-110 active:scale-95 transition-all duration-100'>
        <Link to="/"
        >
          Back To Home
        </Link>
      </div>
    
    </>
  )
}

export default Quiz