/**
 *
 * @param {string} password initial password given
 * @param {string} confirmPass password confirmation
 * @returns {boolean}  confirms if the password matches
 * @description checks if the password that is submitted by a user is matched
 */
export function matchPasswordChecker(password, confirmPass) {
    if (password === "" || confirmPass === "") {
        return;
    }
    return password === confirmPass;
}

/**
 *
 * @param {string} password
 * @returns {boolean} that confirms if the length of the password is enough
 * @description checks if the password provided by user is in appropriate length
 */
export function passwordLengthChecker(password) {
    return password.length >= 6;
}

/**
 *
 * @param {string} password
 * @returns {boolean}
 * @description check if a password has the right designated character
 */
export function passwordCharacterChecker(password) {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;

    password.split("").forEach((char) => {
        if (char >= "A" && char <= "Z") {
            hasUpper = true;
        } else if (char >= "a" && char <= "z") {
            hasLower = true;
        }
        if (char >= "0" && char <= "9") {
            hasNum = true;
        }
    });
    return hasUpper && hasLower && hasNum;
}

/**
 *
 * @param {string} password
 * @returns {boolean}
 * @description check if the password contains a special symbol
 */
export function specialSymbolChecker(password) {
    const regex = /[^a-zA-Z0-9]/g;
    return !regex.test(password);
}
