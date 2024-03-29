import { useState } from "react";
import axios from "axios";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { GrRadialSelected, GrRadial } from "react-icons/gr";
// import {BiUpvote, BiDownvote} from 'react-icons/bi' tbc

import lowerRoman from "../../lib/data/lowerRoman";
import { RotatingLines } from "react-loader-spinner";
import { useToast } from "../shadcn/ui/use-toast";

// split this code
function Answer({ data, setData, loading, setLoading }) {
    const { title, createdBy: author, questions, _id, votes } = data;
    const [showResult, setShowResult] = useState(false);
    const [result, setResult] = useState({});
    const [score, setScore] = useState({ score: 0, total: 0 });

    const { toast } = useToast();

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const answers = Object.fromEntries(formData);
        const questions = Object.entries(answers);
        const newAnswers = {
            _id: _id,
            questions: [],
        };
        questions.forEach((item) => {
            newAnswers.questions.push({
                questionText: item[0],
                correctAnswer: item[1],
            });
        });

        axios
            .post(
                `${
                    import.meta.env.PROD
                        ? import.meta.env.VITE_PROD
                        : import.meta.env.VITE_DEV
                }/api/v1/quiz/${_id}`,
                newAnswers,
            )
            .then((response) => {
                console.log(response.data);
                let score = 0;
                let total = 0;
                response.data.forEach((item) => {
                    total++;
                    item.userCorrect && score++;
                });

                setScore({
                    score,
                    total,
                });
                setResult(response.data);
                setShowResult(true);
            })
            .catch((err) => {
                console.log(err, "error");
                toast({
                    title: "error",
                    description: "something went wrong",
                    duration: 3000,
                    className:
                        "bg-slate-200 dark:bg-slate-800 text-red-700 dark:text-red-400",
                });
            })
            .finally(() => setLoading(false));
    }

    function handleRetry() {
        setShowResult(false);
        setResult({});
        setScore({ score: 0, total: 0 });
    }

    if (!showResult)
        return (
            <form
                onSubmit={handleSubmit}
                className="dark:bg-blue-950 dark:text-white container mt-16 mb-8 bg-stone-200 rounded-xl drop-shadow-xl shadow-xl px-6 py-6 max-w-[600px] mx-auto"
            >
                <h2 className="text-xl font-semibold mb-1 overflow-hidden">
                    {title}
                </h2>
                <h3 className="text-md ms-1 mb-3 opacity-80">{author}</h3>
                <ol className="list-decimal px-4 mt-10">
                    {questions?.length &&
                        questions.map((question, index) => {
                            const { questionText, options, _id } = question;
                            return (
                                <div key={index}>
                                    <li>
                                        <div className="text-lg font-semibold">
                                            {questionText}
                                        </div>
                                        <ol>
                                            <br />
                                            {options?.length &&
                                                options.map((option, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <input
                                                                type="radio"
                                                                name={
                                                                    questionText
                                                                }
                                                                value={option}
                                                                required
                                                                className="me-3"
                                                            />
                                                            <label
                                                                htmlFor={
                                                                    questionText
                                                                }
                                                                className="text-md"
                                                            >
                                                                <span className="opacity-75">
                                                                    {
                                                                        lowerRoman[
                                                                            index
                                                                        ]
                                                                    }
                                                                    .{" "}
                                                                </span>
                                                                {option}
                                                            </label>
                                                            <br />
                                                        </li>
                                                    );
                                                })}
                                        </ol>
                                    </li>
                                    <br />
                                    <br />
                                </div>
                            );
                        })}
                </ol>
                <br />
                <button
                    type="submit"
                    className="dark:bg-green-700 hover:dark:bg-green-600 flex items-center justify-center min-w-[6rem] bg-green-300 px-2 py-1 rounded-md mb-5 drop-shadow-md hover:bg-green-600 hover:text-white transtion-all duration-100 disabled:opacity-70"
                    disabled={loading}
                >
                    {loading ? (
                        <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="25"
                            visible={true}
                        />
                    ) : (
                        "submit"
                    )}
                </button>
                {/* <div className="absolute top-12 right-6 flex flex-col items-center justify-center">
        <span className="text-xl mb-1 text-green-700 hover:scale-110 active:scale-95 transition-all duration-100">
          <BiUpvote />
        </span>
        <span className="text-md"
        >
          {votes}
        </span>
        <span className="text-xl mt-1 text-red-700 hover:scale-110 active:scale-95 transition-all duration-100">
          <BiDownvote />
        </span>
      </div> */}
            </form>
        );

    if (showResult)
        return (
            <div className="dark:bg-blue-950 dark:text-white container mt-16 mb-5 bg-stone-200 rounded-xl drop-shadow-xl shadow-xl px-4 py-2 max-w-[600px] mx-auto">
                <h2 className="text-2xl font-semibold mb-1">{title}</h2>
                <h3 className="text-md ms-1 mb-3 opacity-80">{author}</h3>
                <ol className="mt-10">
                    {result.map((item, index) => {
                        return (
                            <li key={index}>
                                <div className="text-lg font-semibold">
                                    {item.userCorrect ? (
                                        <span>
                                            <AiOutlineCheck className="inline text-green-600 text-xl me-2" />{" "}
                                            {item.questionText}
                                        </span>
                                    ) : (
                                        <span>
                                            <RxCross2 className="inline text-red-600 text-xl me-2" />{" "}
                                            {item.questionText}
                                        </span>
                                    )}
                                </div>

                                <ol>
                                    {item.options.map((option, index) => {
                                        return (
                                            <li key={index}>
                                                <div className="relative">
                                                    {item.userAnswer ===
                                                    option ? (
                                                        <span>
                                                            <GrRadialSelected className=" inline absolute left-10 bottom-1/2 translate-y-1/2" />
                                                            <span className="ms-16">
                                                                <span className="opacity-75">
                                                                    {
                                                                        lowerRoman[
                                                                            index
                                                                        ]
                                                                    }
                                                                    .{" "}
                                                                </span>
                                                                {option}
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            <GrRadial className="inline absolute left-10 bottom-1/2 translate-y-1/2" />
                                                            <span className="ms-16">
                                                                <span className="opacity-75">
                                                                    {
                                                                        lowerRoman[
                                                                            index
                                                                        ]
                                                                    }
                                                                    .{" "}
                                                                </span>
                                                                {option}
                                                            </span>
                                                        </span>
                                                    )}
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ol>
                                {!item.userCorrect && (
                                    <p
                                        className={`text-sm mt-2 ${
                                            !item.userCorrect
                                                ? "text-yellow-600 dark:text-yellow-300"
                                                : ""
                                        }`}
                                    >
                                        your answer: {item.userAnswer}
                                    </p>
                                )}
                                <p
                                    className={`italic text-sm mt-2 mb-6 ${
                                        item.userCorrect
                                            ? "text-green-600 dark:text-green-300"
                                            : "text-red-600 dark:text-red-300"
                                    }`}
                                >
                                    correct answer: {item.correctAnswer}
                                </p>
                            </li>
                        );
                    })}
                </ol>
                <br />
                <h4 className="font-bold text-xl mb-3">
                    Score: {`${score.score} / ${score.total}`}
                </h4>
                <button
                    onClick={handleRetry}
                    className="dark:bg-red-500 bg-red-300 px-2 py-1 rounded-lg shadow-md mb-4 hover:bg-red-600 hover:text-white hover:border-black hover:drop-shadow-md hover:scale-105 transition-all duration-100"
                >
                    Retry Quiz
                </button>
                <br />

                {/* <div className="absolute top-12 right-6 flex flex-col items-center justify-center">
        <span className="text-xl mb-1 text-green-700 hover:scale-110 active:scale-95 transition-all duration-100">
          <BiUpvote />
        </span>
        <span className="text-md"
        >
          {votes}
        </span>
        <span className="text-xl mt-1 text-red-700 hover:scale-110 active:scale-95 transition-all duration-100">
          <BiDownvote />
        </span>
      </div> */}
            </div>
        );
}

export default Answer;
