import { Link } from "react-router-dom";

function CreateQuiz() {
    return (
        <div className="text-center text-2xl w-fit mx-auto mb-8 px-4 py-2 text-blue-900 font-semibold bg-green-400 border-3 border-green-100 rounded-xl drop-shadow-md  shadow-md hover:scale-105 transition-all duration-100">
            <Link to="/create">Create New Quiz</Link>
        </div>
    );
}

export default CreateQuiz;
