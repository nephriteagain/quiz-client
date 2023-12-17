import { useGlobalContext } from "../context/UserContext";

import QuizList from "../components/home/QuizList";
import CreateQuiz from "../components/home/CreateQuiz";
import Pagination from "../components/home/Pagination";
import SearchQuiz from "../components/home/SearchQuiz";

function Home({ quizList, setQuizList }) {
    const { user } = useGlobalContext();

    return (
        <>
            <header className="text-5xl mb-14 mt-16 mx-auto text-center font-bold w-fit bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text text-transparent">
                Quiz Generator
            </header>
            {user && <CreateQuiz />}
            <Pagination />
            <SearchQuiz setQuizList={setQuizList} />
            <QuizList quizList={quizList} setQuizList={setQuizList} />
        </>
    );
}

export default Home;
