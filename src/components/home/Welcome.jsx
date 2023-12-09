import { useGlobalContext } from "../../context/UserContext"
import { Link } from "react-router-dom"

function Welcome() {
  const { user } = useGlobalContext()


  const firstNamePascal = user?.firstName.split('').map((char, index) => {
    if (index === 0 ) {
      return char.toUpperCase()
    }
    return char
  }).join('')

  const lastNamePascal = user?.lastName.split('').map((char, index) => {
    if (index === 0 ) {
      return char.toUpperCase()
    }
    return char
  }).join('')

  if (user) return (
    
    <div className="absolute top-4 left-4">
      <span>
      <Link to={`/profile/${user.id}`}
        className="me-4 px-3 py-1 bg-green-300 dark:bg-green-700 dark:text-white rounded-md drop-shadow-md shadow-md hover:bg-indigo-200 dark:hover:bg-indigo-600 transition-all duration-150"
        >
        Profile
      </Link>
      </span>
      <p className="dark:text-white inline font-semibold">
        {`Welcome, ${firstNamePascal} ${lastNamePascal}!`}
      </p>

    </div>
  )
}

export default Welcome