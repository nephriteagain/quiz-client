import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";

import { useGlobalContext } from "../../context/UserContext";

import QuizModal from "./QuizModal";
import DeleteModal from "./DeleteModal";

function UserQuizList({ userQuiz, setUserQuiz, fetchUserData }) {
    const [showQuizModal, setShowQuizModal] = useState(false);
    const [quizModalData, setQuizModalData] = useState({});
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteQuizId, setQuizDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const { user, setQuizToUpdate } = useGlobalContext();

    const deleteRef = useRef(null);
    const editRef = useRef(null);

    const navigate = useNavigate();

    /**
     *
     * @param {string} id show information and actions about selected quiz
     */
    function displayModal(id) {
        const dataToDisplay = userQuiz.find((quiz) => {
            return quiz._id === id;
        });

        setQuizModalData(dataToDisplay);
        setShowQuizModal(true);
    }

    /**
     *
     * @param {string} id
     * @param {Event} e
     * @description show the delete confirmation modal
     */
    function confirmDelete(id, e) {
        setShowDeleteModal(true);
        setQuizDeleteId(id);

        deleteRef.current = e.currentTarget.parentNode;
    }

    /**
     *
     * @param {quizObject} quiz
     * @param {Event} e
     * @description redirect to the route where quizzes can be updated an resubmitted to the server
     */
    function confirmUpdate(quiz, e) {
        setQuizToUpdate(quiz);
        navigate(`/profile/${user.id}/update/${quiz._id}`);
    }

    if (userQuiz.length)
        return (
            <>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-5 mt-10">
                    {userQuiz.map((quiz, index) => {
                        const { title, createdAt, _id } = quiz;
                        const dateObj = new Date(createdAt);
                        const options = {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            timeZone: "UTC",
                        };

                        const readableDate = dateObj.toLocaleDateString(
                            "en-US",
                            options,
                        );

                        const numOfQuestions = quiz.questions.length;

                        return (
                            <div
                                key={index}
                                className="dark:text-white dark:bg-blue-950 container drop-shadow-xl shadow-xl bg-blue-100 px-2 py-2 rounded-xl hover:-translate-y-2 transition-all duration-500 overflow-visible max-w-[300px] mx-auto relative group"
                            >
                                <div className="text-lg font-semibold mb-4">
                                    <p className="text-center">{title}</p>
                                </div>
                                <div>
                                    <p className="opacity-75 text-sm">
                                        date created:
                                    </p>
                                    <p className="text-sm">{readableDate}</p>
                                    <p className="text-sm">
                                        {`${numOfQuestions} question${
                                            numOfQuestions > 1 ? "s" : ""
                                        }`}
                                    </p>
                                    <div className="text-center">
                                        <button
                                            className="dark:bg-orange-600 bg-orange-300 px-3 py-1 rounded-md drop-shadow-md shadow-md my-2 hover:scale-110 hover:bg-yellow-300 transition-all duration-100"
                                            onClick={() => displayModal(_id)}
                                        >
                                            Show Quiz
                                        </button>
                                    </div>
                                </div>
                                <RiDeleteBin5Line
                                    className="absolute top-2 right-2 text-lg text-red-500 invisible group-hover:visible hover:scale-110 transition-all duration-100 cursor-pointer"
                                    onClick={(e) => confirmDelete(_id, e)}
                                />
                                <FiEdit
                                    className="absolute top-8 right-2 text-lg text-blue-500 invisible group-hover:visible hover:scale-110 transition-all duration-100 cursor-pointer"
                                    onClick={(e) => confirmUpdate(quiz, e)}
                                />
                            </div>
                        );
                    })}
                </div>
                {showQuizModal && (
                    <QuizModal
                        quizModalData={quizModalData}
                        setQuizModalData={setQuizModalData}
                        setShowQuizModal={setShowQuizModal}
                    />
                )}
                {showDeleteModal && (
                    <DeleteModal
                        showDeleteModal={showDeleteModal}
                        setShowDeleteModal={setShowDeleteModal}
                        deleteQuizId={deleteQuizId}
                        setQuizDeleteId={setQuizDeleteId}
                        deleteRef={deleteRef}
                        fetchUserData={fetchUserData}
                        loading={deleteLoading}
                        setLoading={setDeleteLoading}
                    />
                )}
            </>
        );
    else return <br />;
}

export default UserQuizList;
