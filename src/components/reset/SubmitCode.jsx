import { useState } from "react";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

/**
 * Component that handles code submission for password resets
 */
export default function SubmitCode({
    setShowCodeInput,
    set_Id,
    setEmail,
    setShowPassResetForm,
    loading,
    setLoading,
}) {
    const [code, setCode] = useState("");

    /**
     *
     * @param {Event} e
     * @description password reset form function, this is the stage where
     * a code has been sent to the email and the user submits it to the
     * db for confimation
     */
    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);
        console.log(code);

        await axios
            .post(
                `${
                    import.meta.env.PROD
                        ? import.meta.env.VITE_PROD
                        : import.meta.env.VITE_DEV
                }/api/v1/reset/verify`,
                { code: code },
                { withCredentials: true },
            )
            .then((res) => {
                if (res.status === 200) {
                    set_Id(res.data._id);
                    setEmail(res.data.email);
                    setShowCodeInput(false);
                    setShowPassResetForm(true);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => setLoading(false));
    }

    return (
        <div>
            <form className="mb-8" onSubmit={handleSubmit}>
                <label htmlFor="code" className="text-sm font-semibold">
                    code
                </label>
                <input
                    type="text"
                    name="code"
                    required
                    value={code}
                    onChange={(e) => setCode(e.currentTarget.value)}
                    className="dark:text-black block mt-2 mb-4 min-w-[50%] shadow-inner shadow-stone-300 drop-shadow-md rounded-md bg-orange-50 focus:bg-orange-100 px-4 py-1 text-sm"
                />
                <button
                    type="submit"
                    className="dark:bg-green-700 flex items-center justify-center min-w-[5.6rem] bg-green-300 rounded-md px-3 py-1 text-sm shadow-md drop-shadow-md cursor-pointer hover:scale-105 active:scale-95 transition-all duration-100 disabled:opacity-70"
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
                        "submit code"
                    )}
                </button>
            </form>
        </div>
    );
}
