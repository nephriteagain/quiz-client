import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";
/**
 *  handles the email submission for password reset
 */
export default function SubmitEmail({
    showCodeInput,
    setShowCodeInput,
    timer,
    setTimer,
    loading,
    setLoading,
}) {
    const [showResendTimer, setShowResendTimer] = useState(false);
    const [showForm, setShowForm] = useState(true);

    const resendRef = useRef();

    /**
     *
     * @param {Event} e
     * @description user makes a password rest reqeust to the server
     */
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData);

        await axios
            .post(
                `${
                    import.meta.env.PROD
                        ? import.meta.env.VITE_PROD
                        : import.meta.env.VITE_DEV
                }/api/v1/reset`,
                userData,
                { withCredentials: true },
            )
            .then((res) => {
                if (res.status === 201) {
                    setShowResendTimer(true);
                    setShowForm(false);
                    setShowCodeInput(true);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setLoading(false));
    }

    /**
     * @description shows the password reset form where
     * the reset code will be written
     */
    function showResetForm() {
        if (timer === 0) {
            setShowForm(true);
            setTimer(60);
            setShowResendTimer(false);
            setShowCodeInput(false);
        }
    }

    useEffect(() => {
        if (!showResendTimer) return;

        const countDown = setInterval(() => {
            setTimer((prev) => prev - 1);
        }, 1000);

        if (timer === 0) {
            resendRef.current.style.color = "blue";
            clearInterval(countDown);
            return;
        }

        return () => clearInterval(countDown);
    }, [showResendTimer, timer]);

    return (
        <>
            {showForm && (
                <form className="mb-8" onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="email" className="font-semibold">
                        your email
                    </label>
                    <input
                        type="email"
                        name="email"
                        required
                        className="dark:text-black block mt-2 mb-4 min-w-[80%] shadow-inner shadow-stone-300 drop-shadow-md rounded-md bg-orange-50 focus:bg-orange-100 px-2 py-1 text-sm"
                    />
                    <button
                        type="submit"
                        className="flex items-center justify-center min-w-[9rem] bg-green-300 dark:bg-green-700 rounded-md px-3 py-1 text-sm shadow-md drop-shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all duration-100 disabled:opacity-70"
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
                            "send code to email"
                        )}
                    </button>
                </form>
            )}
            {showResendTimer && (
                <div>
                    <p className="text-sm">
                        <span className="opacity-80">
                            did not receive code?
                        </span>
                        <span
                            ref={resendRef}
                            className="text-red-400 cursor-pointer"
                            onClick={showResetForm}
                        >
                            {" "}
                            resend in {timer}
                        </span>
                    </p>
                </div>
            )}
        </>
    );
}
