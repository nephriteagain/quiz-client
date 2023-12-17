import { useState, useRef, useLayoutEffect } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useGlobalContext } from "../../context/UserContext";
import { useToast } from "../shadcn/ui/use-toast";

function NewQuiz({
    formData,
    setFormData,
    setShowSubmitModal,
    titleRef,
    formRef,
}) {
    const [optionList, setOptionList] = useState(["", "", ""]);
    const { user } = useGlobalContext();

    const questionRef = useRef(null);
    const { toast } = useToast();

    /**
     *
     * @description adds the newly created question to the quiz area
     */
    function createQuestion(e) {
        e.preventDefault();

        const { firstName, lastName, id } = user;

        const title = document.querySelector(".title");
        // const createdBy = document.querySelector('.author')
        const question = document.querySelector(".question");
        const answer = document.querySelector(".answer");
        const options = document.querySelectorAll(".options");
        const createdBy = `${firstName} ${lastName}`;
        const authorId = id;
        const optionValue = [];
        options.forEach((option) => {
            optionValue.push(option.value);
        });

        const isAnswerAvailable = optionValue.some(
            (option) => answer.value === option,
        );

        if (!isAnswerAvailable) {
            return toast({
                title: "error",
                description: "answer has no match on options",
                duration: 3000,
                variant: "desctructive",
                className:
                    "bg-slate-200 dark:bg-slate-800 text-red-700 dark:text-red-400",
            });
        }

        let sameAnswertoOptionCount = 0;
        optionValue.forEach((option) => {
            if (option === answer.value) {
                sameAnswertoOptionCount++;
            }
        });
        if (sameAnswertoOptionCount > 1) {
            return toast({
                title: "error",
                description: "answer should only match one option",
                duration: 3000,
                className:
                    "bg-slate-200 dark:bg-slate-800 text-red-700 dark:text-red-400",
            });
        }

        setFormData({
            title: title.value,
            createdBy: createdBy,
            authorId: authorId,
            questions: formData.questions
                ? [
                      ...formData?.questions,
                      {
                          questionText: question.value,
                          options: optionValue,
                          correctAnswer: answer.value,
                      },
                  ]
                : [
                      {
                          questionText: question.value,
                          options: optionValue,
                          correctAnswer: answer.value,
                      },
                  ],
        });

        question.value = "";
        answer.value = "";
        questionRef.current.focus();
        setOptionList(["", "", ""]);
    }

    /**
     * @description opens confirmation modal of saving the quiz to the db
     */
    function submitData() {
        setShowSubmitModal(true);
    }

    /**
     * @description adds new option to the question
     */
    function addOptions(e) {
        e.preventDefault();

        setOptionList([...optionList, ""]);
    }

    /**
     * @param {number} index the position of the selected option
     * @description removes selected option to the question
     */
    function removeOption(e, index) {
        e.preventDefault();

        let optionListCopy = [...optionList];
        optionListCopy.splice(index, 1);
        setOptionList(optionListCopy);
    }

    /**
     *
     * @param {number} indexRef  the position of the selected option
     * @description attached to an <input/> element controls its inputs
     */
    function trackOptionChange(e, indexRef) {
        let value = e.target.value;
        let optionListCopy = optionList.map((option, index) => {
            if (indexRef === index) {
                return value;
            }
            return option;
        });
        setOptionList(optionListCopy);
    }

    useLayoutEffect(() => {
        titleRef.current.focus();
    }, []);

    return (
        <div className="md:basis-1/2 mt-16">
            <div>
                <form onSubmit={createQuestion} ref={formRef}>
                    <h3 className="5 text-3xl font-bold mb-5">
                        Create a New Quiz
                    </h3>
                    <div className="mb-12">
                        <label
                            htmlFor="title"
                            className="font-semibold text-xl"
                        >
                            Title
                        </label>
                        <br />
                        <input
                            type="text"
                            name="title"
                            className="dark:bg-blue-950 dark:focus:bg-blue-800 title  shadow-md rounded-md ps-2 bg-blue-200 focus:bg-blue-300 p-2 w-[90%] text-xl font-semibold transition-all duration-150"
                            required
                            ref={titleRef}
                        />
                    </div>

                    <div>
                        <h2 className="mb-2 text-lg">Add a Question</h2>
                        <label htmlFor="question" className="text-md">
                            Question
                        </label>
                        <br />
                        <textarea
                            ref={questionRef}
                            type="text"
                            name="question"
                            className="dark:bg-blue-950 dark:focus:bg-blue-800  question shadow-md rounded-md ps-2 bg-blue-200 focus:bg-blue-300 p-1 w-[90%] transition-all duration-150"
                            required
                            rows="3"
                        />
                        <br />
                        <label htmlFor="options" className="text-sm">
                            Options
                        </label>
                        <br />

                        {optionList.map((option, index) => {
                            return (
                                <div
                                    key={index}
                                    className="mb-3 flex flex-row items-center justify-center gap-1"
                                >
                                    <textarea
                                        type="text"
                                        name="options"
                                        className="dark:bg-blue-950 dark:focus:bg-blue-800  options shadow-md rounded-md ps-2 bg-blue-200 focus:bg-blue-300 p-1 w-[85%] me-2 transition-all duration-150"
                                        value={option}
                                        onChange={(e) =>
                                            trackOptionChange(e, index)
                                        }
                                        required
                                        rows="1"
                                    />
                                    {optionList.length >= 3 && (
                                        <AiOutlineMinusCircle
                                            onClick={(e) =>
                                                removeOption(e, index)
                                            }
                                            className="inline text-3xl cursor-pointer hover:fill-red-600 dark:hover:fill-red-300 hover:scale-110 transition-all duration-150 drop-shadow-md"
                                        />
                                    )}
                                </div>
                            );
                        })}
                        <button
                            onClick={addOptions}
                            className="dark:bg-blue-950 dark:focus:bg-blue-800  mb-4 text-sm bg-blue-200 px-2 py-1 rounded-md drop-shadow-md hover:bg-blue-500 hover:shadow-md transition-all duration-150"
                        >
                            Add More Option
                        </button>
                        <br />

                        <label htmlFor="answer" className="font-semibold">
                            Answer
                        </label>
                        <br />
                        <textarea
                            type="text"
                            name="answer"
                            className="dark:bg-blue-950 dark:focus:bg-blue-800  answer shadow-md rounded-md ps-2 py-1 bg-blue-200 mb-4 blue:300-green-400 w-[90%] transition-all duration-150"
                            required
                            rows="1"
                        />
                    </div>
                    <input
                        type="submit"
                        value="Add Question"
                        className="dark:bg-blue-950 dark:focus:bg-blue-800  bg-blue-300 px-2 py-1 rounded-md drop-shadow-md hover:bg-blue-800 hover:text-white cursor-pointer transition-all duration-150"
                    />
                </form>
            </div>
            <br />
            <br />
            <button
                onClick={submitData}
                className="dark:bg-blue-950 dark:focus:bg-blue-800   bg-blue-500 px-2 py-1 text-xl mb-10 rounded-md text-white drop-shadow-lg hover:bg-blue-800 hover:scale-110 transition-all duration-150"
            >
                Save Quiz
            </button>
        </div>
    );
}

export default NewQuiz;
