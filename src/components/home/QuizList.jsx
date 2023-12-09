import { useEffect, useRef  } from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context/UserContext'


import { paginationButtonStyle } from '../../lib/helper/paginationStyle'

import LoadingQuizList from './LoadingQuizList'

export default function QuizList({quizList}) {

  
  const { fetchQuizList, setQuizPage, showLoadingComponent, ascending } = useGlobalContext()
  
  /**
   * @desription queries the server to go back to page 1
   */
  async function backToPageOne() {
    await fetchQuizList(1, ascending)
      .then(res => {
        paginationButtonStyle(1)
        setQuizPage(1)

      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    const titleQuiz = document.querySelectorAll('.quiz-title')
    titleQuiz.forEach((quiz) => {
      const quizText = quiz.textContent
      if (quizText.length > 30) {
        quiz.style.fontSize = '0.7rem'
      }
      else if (quizText.length > 25) {
        quiz.style.fontSize = '0.8rem'
      }
      else if (quizText.length > 22) {
        quiz.style.fontSize = '0.9rem'
      }
      else if (quizText.length > 19) {
        quiz.style.fontSize = '1rem'
      }

    })

  }, [quizList]) 

  useEffect(() => {
    paginationButtonStyle(1)
  }, [])

  if (showLoadingComponent) return (
    <LoadingQuizList />
  )

  return (
    <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-6'>
    
    { quizList.length > 0 ?

      quizList.map((quiz, index) => {
        const { title, createdBy, _id, votes } = quiz
        return (
          <div key={index} className='container drop-shadow-xl shadow-xl dark:bg-blue-950 dark:text-white bg-blue-100 px-2 py-2 rounded-xl hover:-translate-y-2 transition-all duration-100 overflow-hidden max-w-[300px] mx-auto aspect-[1.6/1]'>
            <h3 className='text-xl font-semibold mb-1 whitespace-nowrap quiz-title'>
              {title}
            </h3>
            <p className='text-sm ms-1 mb-3 opacity-80 whitespace-nowrap'>
                {createdBy}
            </p>
            <Link to={`/quiz/${_id}`}>
            <p className='w-fit px-2 py-1 rounded-md dark:bg-green-800 dark:text-white bg-green-400 hover:bg-green-700 hover:text-white shadow-md drop-shadow-md transition-all duration-75'>
              Answer Quiz!
            </p>
            </Link>
            <br/>
            <p className='absolute right-2 bottom-2'>
              {`${votes > 0 ? votes : ''}`}
            </p>
          </div>
        )
      }) :

      <div className='mt-4'>
        <p className='text-xl font-bold mb-2 dark:text-white'>
          No More Results...  
        </p>
        <button className='bg-orange-200 dark:bg-orange-800 dark:text-white rounded-md px-2 py-1 drop-shadow-md shadow-md hover:scale-105 active:scale-95 transition-all duration-100'
          onClick={backToPageOne}
        >
          Back to Page 1
        </button>
      </div>
    }
  </section>

  )
}