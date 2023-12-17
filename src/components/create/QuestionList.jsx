import { useRef } from "react";

import lowerRoman from "../../lib/data/lowerRoman";
import { RiDeleteBin6Fill } from "react-icons/ri";
// import {FaRegCopy} from 'react-icons/fa'

function QuestionList({ formData, setFormData }) {
    const { title, questions, createdBy } = formData;

    const copyRef = useRef();
    const documentRef = useRef();

    /**
     *
     * @param {number} refIndex  the index of the to be deleted quetion
     * @description deletes the selected question
     */
    function handleDelete(refIndex) {
        const questionsCopy = [...formData.questions].filter((item, index) => {
            return index !== refIndex;
        });

        setFormData({
            ...formData,
            questions: questionsCopy,
        });
    }

    // async function copyText() {
    //   const range = document.createRange()
    //   // Create a new range object and select the text to be copied
    //   range.selectNode(documentRef.current)
    //   const text = 'dota \n is trash'
    //   // Add the selected text to the clipboard
    //   await navigator.clipboard.writeText(documentRef.current.textContent)

    //     .then(() => {
    //       console.log('copied');
    //     })
    //     .catch((err) => {
    //       console.error('Could not copy text: ', err);
    //     });

    // }

    return (
        <div
            className="dark:bg-blue-950 md:basis-1/2 mt-16 bg-stone-200 rounded-xl drop-shadow-xl shadow-lg px-4 py-2 overflow-x-hidden"
            ref={documentRef}
        >
            <h1 className=" font-bold mb-8 mt-2 text-3xl text-center">
                {`Preview`}
            </h1>
            <h2 className="text-2xl font-semibold mb-1 mt-4">{title}</h2>
            <h3 className="text-sm ms-1 mb-3 opacity-80">{createdBy}</h3>
            <ol className="list-decimal list-inside [&>*:nth-child(odd)]:bg-slate-200 [&>*:nth-child(even)]:bg-indigo-100 dark:[&>*:nth-child(odd)]:dark:bg-[#22092C] dark:[&>*:nth-child(even)]:dark:bg-[#22092C] mt-10 h-[600px] overflow-y-auto">
                {questions?.length &&
                    questions.map((question, index) => {
                        const { questionText, options, correctAnswer } =
                            question;
                        return (
                            <li
                                key={index}
                                className="  mb-4 ms-1 px-4 py-2 rounded-xl relative drop-shadow-lg shadow-lg group"
                            >
                                <h2 className="mb-2 font-semibold inline">
                                    {questionText}
                                </h2>
                                <ol>
                                    {options.map((item, index) => {
                                        return (
                                            <li key={index} className="ms-5">
                                                <span className="opacity-75">
                                                    {lowerRoman[index]}.{" "}
                                                </span>
                                                {item}
                                            </li>
                                        );
                                    })}
                                </ol>
                                <p className="my-2">
                                    <span className="font-semibold">
                                        answer :{" "}
                                    </span>
                                    {correctAnswer}
                                </p>
                                <span className="text-2xl">
                                    <RiDeleteBin6Fill
                                        onClick={() => handleDelete(index)}
                                        className="absolute top-3 right-3 text-xl: invisible group-hover:visible cursor-pointer transition-all duration-75"
                                    />
                                </span>
                            </li>
                        );
                    })}
            </ol>
            {/* <span className="absolute top-5 right-5 text-xl scale-110 cursor-copy hover:scale-125 active:scale-105 transition-all duration-75"
        onClick={copyText}
        ref={copyRef}
      >
        <FaRegCopy />
      </span> */}
        </div>
    );
}

export default QuestionList;
