import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useGlobalContext } from "../context/UserContext"


import {AiOutlineMinusCircle } from 'react-icons/ai'
import { MdDelete} from 'react-icons/md'
import { TiDelete } from 'react-icons/ti'
import { BsCheckCircleFill} from 'react-icons/bs'



export default function UpdateQuiz() {
  const { quizToUpdate, setQuizToUpdate, user, fetchUserData } = useGlobalContext()

  const [ title, setTitle ] = useState(quizToUpdate.title)
  const [ questions, setQuestions] = useState(quizToUpdate.questions)
  const [ showConfirmDeleteButtons, setShowConfirmDeleteButtons ] = useState(false)
  const [ hideDeleteButton, setHideDeleteButton ] = useState(false)

  const navigate = useNavigate()

  function submitUpdate(e) {    
    e.preventDefault()
    const toSubmit = {...quizToUpdate, title: title, questions: questions}

    async function fetchUpdatedData() {
      await axios.post(`${import.meta.env.PROD ? import.meta.env.VITE_PROD : import.meta.env.VITE_DEV}/api/v1/update/${user.id}`, toSubmit, {withCredentials: true})
        .then((res) => {
          navigate('/profile/:profileId')
          setQuizToUpdate(res.data)
          fetchUserData()
        })
        .catch((err) => console.log(err))
    }

    fetchUpdatedData()
  }



  function removeOption(questionIndex, optionIndex) {
    const transformedOptions = questions[questionIndex].options.filter((option, index) => {
      return index !== optionIndex
    })
    const transformedQuestions = questions.map((question, index) => {
      if (questionIndex === index) {
        return {...question, options: transformedOptions}
      }
      return question
    })
    setQuestions(transformedQuestions)
  }

  function addNewOption(questionIndex) {
    const newOption = [...questions[questionIndex].options, '']
    
    const newQuestions = questions.map((q, index) => {
      if (index === questionIndex) {
        return {...q, options: newOption}
      }
      return q
    })

    setQuestions(newQuestions)
  }

  function addNewQuestion() {
    const newQuestions = [
      ...questions,
      {
        questionText: '',
        options: ['', '', ''],
        correctAnswer: ''
      }
    ]

    setQuestions(newQuestions)
  }


  function removeQuestion(questionIndex) {
    const newQuestions = questions.filter((q, index) => {
      return index !== questionIndex
    })

    setQuestions(newQuestions)
    setShowConfirmDeleteButtons(false)
    setHideDeleteButton(false)
    return 
  }

  function showConfirmation() {
    setHideDeleteButton(true)
    setShowConfirmDeleteButtons(true)
  }

  function cancelDelete() {
    setHideDeleteButton(false)
    setShowConfirmDeleteButtons(false)
  }
  


  return (
    <div className="mt-16 w-[90%] max-w-[600px] mx-auto bg-neutral-200 px-8 py-8 rounded-xl shadow-2xl drop-shadow-lg">
      <form onSubmit={submitUpdate}>
        <div className=" mb-6">
          <label htmlFor="title" className="font-semibold text-lg">
            Title  
          </label>      
          <input className="block w-[80%] px-2 text-xl font-bold mt-2 rounded-md shadow-md bg-blue-100"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
          />
        </div>
        <p className="font-semibold mb-6">
          Questions:
        </p>
        <div>
          {questions.map((q, index) => {
            const {questionText, options, correctAnswer } = q
            return (
              <div key={index} className="mb-12 bg-orange-100 px-6 py-6 rounded-xl shadow-xl relative group">                
                <div className="absolute top-[-0.75rem] left-[-0.75rem] bg-green-300 w-8 h-8 flex items-center justify-center rounded-[50%] shadow-md drop-shadow-md">
                  <p className="font-semibold">
                    {index + 1}
                  </p>
                </div>
                <div>                
                <textarea className="w-[80%] px-2 rounded-md mb-4 shadow-md bg-blue-100"
                  type="text"
                  value={questionText}
                  rows='2'
                  onChange={(e) => {
                    const newQuestions = questions.map((q, i) => {
                      if (i === index) {
                        return {...q, questionText: e.currentTarget.value}
                      }
                      return q
                    })
                    setQuestions(newQuestions)
                  }}
                />                
                </div>
                <div>
                  <p className="text-sm mb-2 ms-1 font-light">
                    Options
                  </p>
                  {options.map((op, ind) => {
                    return (
                      <div  key={ind} className="relative">
                        
                        <textarea className="w-[80%] px-2 py-1 rounded-md mb-2 me-2 text-sm shadow-md bg-blue-100"
                        type='text'
                        value={op}
                        rows='1'
                        onChange={(e) => {
                          const newOp = options.map((o, i) => {
                            if (i === ind) {
                              return e.currentTarget.value
                            }
                            return o
                          })
                          const newQ = questions.map((q, i ) => {
                            if (i === index) {
                              return {...q, options: newOp}
                            }
                            return q
                          })
                          setQuestions(newQ)
                        }}
                      />
                       {  options.length > 2 &&
                        <AiOutlineMinusCircle className='inline text-xl cursor-pointer absolute translate-y-2'
                        onClick={() => removeOption(index, ind)}
                       />
                       }
                      </div>
                      
                    )
                  })}
                </div>
                <div>
                  <div className="text-sm rounded-md bg-green-200 px-2 py-1 shadow-md opacity-80 hover:scale-105 active:scale-95 transition-all duration-100 cursor-pointer w-fit"
                    onClick={() => addNewOption(index)}
                  >
                    add new option
                  </div>
                </div>
                <div>
                  <p className="mt-8 ms-1  text-sm font-light ">
                    Answer
                  </p>
                  <textarea className="w-[80%] px-2 rounded-md mt-2 shadow-md bg-blue-100"
                    type='text'
                    value={correctAnswer}
                    rows='1'
                    onChange={(e) => {
                      const newQ = questions.map((q, i ) => {
                        if (i === index) {
                          return {...q, correctAnswer: e.currentTarget.value}
                        }
                        return q
                      })
                      setQuestions(newQ)
                    }}
                  />
                </div>
                {/* fix this in the future */}
                { !hideDeleteButton &&
                  <MdDelete className="absolute text-3xl top-4 right-4 text-red-700 z-10 hover:scale-110 active:scale-90 transition-all duration-100 invisible group-hover:visible"
                  onClick={showConfirmation}
                />
                }
                { showConfirmDeleteButtons &&
                  <div className="absolute z-10 top-4 right-4 invisible group-hover:visible">
                  <TiDelete className="text-blue-500 text-3xl drop-shadow-sm cursor-pointer hover:scale-110 active:scale-90 transition-all duration-100"
                    onClick={cancelDelete}
                  />
                  <BsCheckCircleFill className="text-red-700 text-xl ms-1 mt-2 drop-shadow-sm cursor-pointer hover:scale-110 active:scale-90 transition-all duration-100"
                    onClick={() => removeQuestion(index)}
                  />
                </div>
                }
                {/* fix this in the future */}
                
              </div>
              
            )
          })}
        </div>
        <div onClick={addNewQuestion}
          className="-mt-6 ms-6 text-lg w-fit px-4 py-1 bg-indigo-300 rounded-lg mb-8 shadow-lg drop-shadow-lg hover:bg-indigo-700 hover:text-white hover:scale-110 active:scale-90 transition-all duration-150 cursor-pointer"
        >
          Add New Question
        </div>
        <div className="flex items-center justify-center">
          <input className="cursor-pointer bg-green-700 text-white px-3 py-2 mb-8 rounded-lg me-auto hover:scale-110 active:scale-95 transition-all duration-100 shadow-lg drop-shadow-lg" 
            type="submit" 
            value='Save Changes'
          />
          <span className="cursor-pointer bg-green-700 text-white px-3 py-2 mb-8 rounded-lg ms-auto hover:scale-110 active:scale-95 transition-all duration-100 shadow-lg drop-shadow-lg"
            onClick={() => navigate('/profile/:profileId')}
          >
            Cancel
          </span>
        </div>
      </form>
        

    </div>
    
  )
}