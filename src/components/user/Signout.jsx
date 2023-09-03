import { RotatingLines } from 'react-loader-spinner'
import PropTypes from 'prop-types'

/**
 * Primary UI component for user interaction
 */

function SignOut({handleClick, loading}) {
  
  return (
    <div>
      <button onClick={handleClick}
        className='text-md px-3 py-1 bg-blue-100  rounded-xl text-stone-500 shadow-md drop-shadow-md hover:scale-110 active:scale-100 transition-all duration-150 disabled:opacity-70'
        disabled={loading}
      >
        {
          loading ?
          <RotatingLines 
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="25"
            visible={true}
          /> : 
          'Log out'
          }
      </button>
    </div>
  )
}



SignOut.propTypes = {
  /**
   * function that handles user logout
   */
  handleClick: PropTypes.func
}

SignOut.defaultProps = {
  handleClick: undefined
}


export default SignOut
