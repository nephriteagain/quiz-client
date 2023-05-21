import { AiOutlineCheck } from 'react-icons/ai'
import { RxCross2 } from 'react-icons/rx'

export function MatchedPassword({matchBool}) {
  if (matchBool) {
    return (
      <div className="text-green-600 text-sm">
        <AiOutlineCheck className="inline me-4"/>
        Pasword Matched
      </div>
    )
  } else {
    return (
      <div 
        className="text-red-600 text-sm"
      >
        <RxCross2 className="inline me-4"/>
        Password Don't Matched
      </div>
    )
  }
}

export function CorrectLength({lengthBool}) {
  if (lengthBool) {
    return (
      <div className="text-green-600 text-sm">
        <AiOutlineCheck className="inline me-4"/>
        Pasword Must Be At Least 6 Characters
      </div>
    )
  } else {
    return (
      <div 
        className="text-red-600 text-sm"
      >
        <RxCross2 className="inline me-4"/>
        Pasword Must Be At Least 6 Characters        
      </div>
    )
  }
  
}

export function CorrrectChar({charBool}) {
  if (charBool) {
    return (
      <div className="text-green-600 text-sm">
        <AiOutlineCheck className="inline me-4"/>
        Pasword Must Contain Characters A-Z a-z 0-9
      </div>
    )
  } else {
    return (
      <div 
        className="text-red-600 text-sm"
      >
        <RxCross2 className="inline me-4"/>
        Pasword Must Contain Characters A-Z a-z 0-9              
      </div>
      )
    
  }
}

export function CorrectSymbol({symbolBool}) {
  if (!symbolBool) {
    return (
      <div 
        className="text-red-600 text-sm"
      >
        <RxCross2 className="inline me-4"/>
        Pasword Must Not Contain a Special Symbol or Whitespace
      </div>
    )
  }
}

