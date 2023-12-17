import { useGlobalContext } from "../../context/UserContext";
import { Link } from "react-router-dom";

function Welcome() {
    const { user } = useGlobalContext();

    const firstNamePascal = user?.firstName
        .split("")
        .map((char, index) => {
            if (index === 0) {
                return char.toUpperCase();
            }
            return char;
        })
        .join("");

    const lastNamePascal = user?.lastName
        .split("")
        .map((char, index) => {
            if (index === 0) {
                return char.toUpperCase();
            }
            return char;
        })
        .join("");

    if (user)
        return (
            <>
                <Link
                    to={`/profile/${user.id}`}
                    className="text-lg  px-3 py-1 bg-green-300 dark:bg-green-700 dark:text-white rounded-md drop-shadow-md shadow-md hover:bg-indigo-200 dark:hover:bg-indigo-600 transition-all duration-150"
                >
                    Profile
                </Link>
                <Link
                    to="/"
                    className="text-lg px-3 py-1 bg-green-300 dark:bg-green-700 dark:text-white rounded-md drop-shadow-md shadow-md hover:bg-indigo-200 dark:hover:bg-indigo-600 transition-all duration-150"
                >
                    Home
                </Link>
                <Link
                    to="/create"
                    className="text-lg px-3 py-1 bg-green-300 dark:bg-green-700 dark:text-white rounded-md drop-shadow-md shadow-md hover:bg-indigo-200 dark:hover:bg-indigo-600 transition-all duration-150"
                >
                    Create
                </Link>
                <p className=" dark:text-white hidden sm:inline font-semibold ">
                    {`Welcome, ${firstNamePascal} ${lastNamePascal}!`}
                </p>
            </>
        );

    return (
        <Link
            to="/"
            className="text-lg px-3 py-1 bg-green-300 dark:bg-green-700 dark:text-white rounded-md drop-shadow-md shadow-md hover:bg-indigo-200 dark:hover:bg-indigo-600 transition-all duration-150"
        >
            Home
        </Link>
    );
}

export default Welcome;
