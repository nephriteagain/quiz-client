
import PropTypes from 'prop-types'

/**
 * Primary UI component for user interaction
 */
function SignOut({handleClick}) {
  
  return (
    <div>
      <button onClick={handleClick}
        className='text-md px-3 py-1 bg-blue-100  rounded-xl text-stone-500 shadow-md drop-shadow-md hover:scale-110 active:scale-100 transition-all duration-150'
      >
        Log Out
      </button>
    </div>
  )
}



SignOut.PropTypes = {
  /**
   * function that handles user logout
   */
  handleClick: PropTypes.func
}

SignOut.defaultProps = {
  handleClick: undefined
}


export default SignOut
