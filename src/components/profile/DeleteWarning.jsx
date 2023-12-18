import { BsCheck2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

import { useState } from "react";
import axios from "axios";
import { useToast } from "../shadcn/ui/use-toast";


/**
 * 
 * @param {string} id 
 * @param {() => void} fetchUserData 
 * @param {(id:string) => void} cancel
 */
export default function DeleteWarning({id,fetchUserData,cancel, userQuiz, setQuizList}) {

    const { toast } = useToast()
    const [  loading, setLoading ] = useState(false)

    async function deleteQuiz(id) {
        setLoading(true);
        await axios
            .post(
                `${
                    import.meta.env.PROD
                        ? import.meta.env.VITE_PROD
                        : import.meta.env.VITE_DEV
                }/api/v1/delete`,
                { id },
                { withCredentials: true },
            )
            .then(async (res) => {
                await fetchUserData();
                setQuizList(userQuiz.map(quiz => ({quiz,show:false})))
                toast({
                    title: "deleted",
                    description: "quiz deleted successfully",
                    duration: 3000,
                    className: "bg-slate-200 dark:bg-slate-800 dark:text-white",
                });
            })
            .catch((err) => {
                console.log(err);
                toast({
                    title: "error",
                    description: "something went wrong",
                    duration: 3000,
                    className:
                        "bg-slate-200 dark:bg-slate-800 text-red-700 dark:text-red-400",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }
    
    
    return (
        <div
            className="absolute bottom-0 left-0 w-full h-fit bg-red-200 rounded-md"
        >
            <div className="text-center font-semibold text-lg mt-2 mb-4">
                Confirm Delete?
            </div>
            <div>
                <div className="text-center pb-3">
                    <button
                        className="bg-red-500 text-white px-2 py-1 rounded-md me-2 shadow-md drop-shadow-md hover:bg-red-600 transition-all duration-100 active:scale-95 disabled:opacity-70"
                        onClick={() => deleteQuiz(id)}
                        disabled={loading}
                    >
                        <BsCheck2 className="inline me-1" />
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                    <button
                        className="bg-green-500 text-white px-2 py-1 rounded-md ms-2 shadow-md drop-shadow-md hover:bg-green-600 transition-all duration-100 active:scale-95 disabled:opacity-70"
                        onClick={() => cancel(id)}
                        disabled={loading}
                    >
                        <RxCross2 className="inline me-1" />
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}