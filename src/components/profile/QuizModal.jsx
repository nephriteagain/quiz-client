import { AiFillCloseCircle } from 'react-icons/ai'
import lowerRoman from '../../lib/data/lowerRoman'


function QuizModal({quizModalData, setQuizModalData, setShowQuizModal}) {

    const { title, questions } = quizModalData

    function closeModal() {
      setQuizModalData({}),
      setShowQuizModal(false)
      return
    }

    return (
    <div className="dark:bg-blue-950 dark:text-white absolute lg:w-[60%] md:w-[70%] sm:w-[80%] w-[90%] h-[80vh] z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-stone-200 rounded-xl overflow-auto px-8 py-4 drop-shadow-xl shadow-xl">
      <div>
        <p className="text-xl font-bold">
          {title}
        </p>
      </div>
      <div>
        {questions.map((q, index) => {
          const { questionText, options, correctAnswer } = q
          return (
            <div key={index}
              className="px-4 mb-2"
            >
              <p className="mt-6 mb-2 font-semibold">
                {`${index + 1}. ${questionText} `}
              </p>
              <div>
                {options.map((item, index) => {
                  return (
                    <p key={index} className="px-2 text-sm">
                      {`${lowerRoman[index]}. ${item}`}
                    </p>
                  )
                })}
              </div>
              <p className="mt-2 text-sm opacity-90">
                {`answer: ${correctAnswer}`}
              </p>
            </div>
          )
        })}
      </div>
      <AiFillCloseCircle 
        className='dark:bg-white dark:rounded-full absolute top-2 right-2 text-3xl text-red-700 drop-shadow-md hover:scale-110 hover:text-red-800 transition-all duration-300 cursor-pointer'
        onClick={closeModal}
      />
    </div>
  )
}

export default QuizModal