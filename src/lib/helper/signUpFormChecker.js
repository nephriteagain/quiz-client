export function matchPasswordChecker(password, confirmPass, callback) {
    if (password === '' || confirmPass === '') {
      return
    }

    if (password === confirmPass) {
    return callback(true)
  } else {
    return callback(false)
  }
}

export function passwordLengthChecker(password, callback) {
  if (password.length >= 6) {
    callback(true)
  } else {
    callback(false)
  }
}

export function passwordCharacterChecker(password, callback) {
  let hasUpper = false
  let hasLower = false
  let hasNum = false

  password.split('').forEach(char => {
    if (char >= 'A' && char <= 'Z') {
      hasUpper = true
    }
    else if (char >= 'a' && char <= 'z') {
      hasLower = true
    }
    if (char >= '0' && char <= '9') {
      hasNum = true
    }

  })
  if (hasUpper && hasLower && hasNum) {
    return callback(true)
  } else {
    return callback(false)
  }

}

export function specialSymbolChecker(password, callback) {
  const regex = /[^a-zA-Z0-9]/g

  if (regex.test(password)) {
    return callback(false)
  } else {
    return callback(true)
  }


}

