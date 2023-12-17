import { useEffect, useState } from "react";
import axios from "axios";
import { useGlobalContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";

function SignIn({ loading, setLoading }) {
    const { user, setUser } = useGlobalContext();
    const navigate = useNavigate();

    /**
     *
     * @param {Event} e
     * @description sign in form handler
     */
    function handleSubmit(e) {
        console.log("log in");
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const userData = Object.fromEntries(formData);
        console.log(userData);

        axios
            .post(
                `${
                    import.meta.env.PROD
                        ? import.meta.env.VITE_PROD
                        : import.meta.env.VITE_DEV
                }/api/v1/user/signin`,
                userData,
                { withCredentials: true },
            )
            .then((res) => {
                const data = res.data;
                if (
                    data.message === "logged in" ||
                    data.message === "already logged in"
                ) {
                    setUser(data.userData);
                    navigate("/");
                }
            })
            .catch((err) => console.log(err.message))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        if (user !== null) {
            navigate("/");
        }
    }, [user]);

    return (
        <div className="mx-auto max-w-[500px] dark:text-white">
            <h1 className="text-3xl font-bold mt-20 mb-16">Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className="font-semibold text-md">
                        Email
                    </label>
                    <input
                        className="dark:text-black block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[80%] max-w-[400px] min-w-[250px] focus:bg-blue-200"
                        type="email"
                        name="email"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="font-semibold text-md">
                        Password
                    </label>
                    <input
                        className="dark:text-black block mt-2 mb-4 shadow-md text-md px-2 py-1 rounded-md w-[80%] max-w-[400px] min-w-[250px] focus:bg-blue-200"
                        type="password"
                        name="password"
                        required
                    />
                </div>
                <p className="text-sm mb-6">
                    <span className="opacity-80">forgot password?</span>
                    <span
                        className="text-blue-800 dark:text-blue-300 cursor-pointer"
                        onClick={() => navigate("/user/reset")}
                    >
                        {" "}
                        click here
                    </span>
                </p>
                <div>
                    <button
                        className="flex items-center justify-center min-w-[5.6rem] px-3 py-1 bg-green-300 dark:bg-green-800 shadow-md drop-shadow-md rounded-md text-lg font-semibold hover:scale-105 active:scale-95 transition-all duration-75 disabled:opacity-70"
                        type="submit"
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
                            "LOG IN"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
