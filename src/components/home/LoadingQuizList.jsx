import { dummyQuizArr } from "../../lib/data/dummyData"

function LoadingQuizList() {
  return (
    <section className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5 mt-6'>
      {dummyQuizArr.map((item, index) => {
        return (
          <div key={index} className='container drop-shadow-xl shadow-xl dark:bg-blue-950  bg-blue-100 px-2 py-2 rounded-xl hover:-translate-y-2 transition-all duration-500 overflow-hidden max-w-[300px] mx-auto aspect-[1.6/1]'>
            <h3 className='w-5/6 h-8 dark:bg-gray-400 bg-stone-300 rounded-md ms-1 mb-3'>
              {item}
            </h3>
            <p className='w-3/6 h-4 dark:bg-slate-400 bg-slate-300 rounded-md ms-1 mb-4'>
                {item}
            </p>
            <div>
            <p className='w-4/6 h-8 dark:bg-zinc-400 bg-gray-300 rounded-md ms-1'>
              {item}
            </p>
            </div>
            <br/>
          </div>
        )
        
      })}
    </section>
  )
}

export default LoadingQuizList