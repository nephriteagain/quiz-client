import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";

export function MatchedPassword({ matchBool }) {
    if (matchBool) {
        return (
            <div className="text-green-600 text-sm">
                <AiOutlineCheck className="inline me-4" />
                Pasword Matched
            </div>
        );
    } else {
        return (
            <div className="text-red-600 text-sm">
                <RxCross2 className="inline me-4" />
                Password Don't Matched
            </div>
        );
    }
}

MatchedPassword.propTypes = {
    /**
     * indicates if password is matched or not
     */
    matchBool: PropTypes.bool,
};

export function CorrectLength({ lengthBool }) {
    if (lengthBool) {
        return (
            <div className="text-green-600 text-sm">
                <AiOutlineCheck className="inline me-4" />
                Pasword Must Be At Least 6 Characters
            </div>
        );
    } else {
        return (
            <div className="text-red-600 text-sm">
                <RxCross2 className="inline me-4" />
                Pasword Must Be At Least 6 Characters
            </div>
        );
    }
}

CorrectLength.propTypes = {
    /**
     * indicate if the password length is correct
     */
    lengthBool: PropTypes.bool,
};

export function CorrrectChar({ charBool }) {
    if (charBool) {
        return (
            <div className="text-green-600 text-sm">
                <AiOutlineCheck className="inline me-4" />
                Pasword Must Contain Characters A-Z a-z 0-9
            </div>
        );
    } else {
        return (
            <div className="text-red-600 text-sm">
                <RxCross2 className="inline me-4" />
                Pasword Must Contain Characters A-Z a-z 0-9
            </div>
        );
    }
}

CorrrectChar.propTypes = {
    /**
     *  indicates whether the password has the correct characters
     */
    charBool: PropTypes.bool,
};

export function CorrectSymbol({ symbolBool }) {
    if (!symbolBool) {
        return (
            <div className="text-red-600 text-sm">
                <RxCross2 className="inline me-4" />
                Pasword Must Not Contain a Special Symbol or Whitespace
            </div>
        );
    }
}

CorrectSymbol.propTypes = {
    /**
     * indicates if a password contains illegal symbols
     */
    symbolBool: PropTypes.bool,
};
