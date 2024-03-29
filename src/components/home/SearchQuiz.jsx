import { useState, useEffect } from "react";
import axios from "axios";

import { useGlobalContext } from "../../context/UserContext";

import { FiSearch } from "react-icons/fi";

function SearchQuiz() {
    const [searchCriteria, setSearchCriteria] = useState("title");

    const {
        quizPage,
        fetchQuizList,
        searchText,
        setSearchText,
        ascending,
        setAscending,
    } = useGlobalContext();

    /**
     *
     * @param {Event}
     * @description changes search criteria between title and author
     */
    function switchSearchCriteria(e) {
        const criteria = e.currentTarget.value;
        setSearchCriteria(criteria);
    }

    /**
     *
     * @param {Event} e
     * @description change search criteria from asceding to descending
     */
    function switchOrder(e) {
        const order = e.currentTarget.value;
        setAscending(order);
    }

    useEffect(() => {
        const fetch = setTimeout(() => {
            if (searchCriteria === "title") {
                fetchQuizList(quizPage, ascending, searchText);
            }
            if (searchCriteria === "author") {
                fetchQuizList(quizPage, ascending, null, searchText);
            }
        }, 200);
        return () => clearTimeout(fetch);
    }, [searchText, searchCriteria, ascending]);

    return (
        <section className="mt-6 mb-12 text-sm sm:flex sm:flex-row sm:items-center ">
            <div className="sm:mb-0 mb-4 me-4">
                <label htmlFor="search">
                    <FiSearch className="dark:text-white inline me-3 text-xl hover:scale-110 transition-all duration-100" />
                </label>
                <input
                    className="rounded-md px-2 py-1 text-sm shadow-inner  shadow-stone-400 drop-shadow-md dark:text-white dark:bg-gray-600 dark:shadow-none dark:focus:bg-blue-950 focus:bg-blue-100 search-input"
                    name="search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.currentTarget.value)}
                />
            </div>

            <select
                onChange={(e) => switchSearchCriteria(e)}
                className="px-2 py-[0.33rem] text-sm me-4 rounded-md shadow-md drop-shadow-sm shadow-stone-300 dark:shadow-none bg-orange-100 dark:bg-orange-700 dark:text-white  hover:bg-orange-200 dark:hover:bg-orange-600 transition-all duration-100"
            >
                <option
                    value="title"
                    className="px-2 py-1 text-sm transition-all duration-100"
                    defaultValue
                >
                    title
                </option>
                <option
                    value="author"
                    className="px-2 py-1 text-sm transition-all duration-100"
                >
                    author
                </option>
            </select>

            <select
                onChange={(e) => switchOrder(e)}
                className="px-2 py-[0.33rem] text-sm sm:ms-auto sm:mt-0 mt-4 rounded-md shadow-md drop-shadow-sm shadow-stone-300 dark:shadow-none bg-orange-100 dark:text-white dark:bg-orange-700  hover:bg-orange-200 dark:hover:bg-orange-600 transition-all duration-100 sm:imline block"
            >
                <option value="1" defaultValue>
                    ascending
                </option>
                <option value="-1">descending</option>
            </select>
        </section>
    );
}

export default SearchQuiz;
