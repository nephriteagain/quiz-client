import { test, expect, describe } from "vitest"


import { 
    matchPasswordChecker, 
    passwordCharacterChecker, 
    passwordLengthChecker, 
    specialSymbolChecker
 } from "../lib/helper/signUpFormChecker";

describe('match password checker', () => {
    test('password matched', () => {
      const isMatched = matchPasswordChecker('password123', 'password123')
      expect(isMatched).toBe(true)
    })
    test('password not matched', () => {
      const isNotMatched = matchPasswordChecker('password123', 'dog')
      expect(isNotMatched).toBe(false)
    })
  })

describe('password length checker', () => {
    test('pw length is less than 6', () => {
        expect(passwordLengthChecker('abc')).toBe(false)        
    })
    test('pw length is sufficient', () => {
        expect(passwordLengthChecker('dogshit322')).toBe(true)
    })
})

describe('password char checker', () => {
    test('has upper, has lower, hasNum', () => {
        expect(passwordCharacterChecker('Password123')).toBe(true)
    })
    test('no upper case', () => {
        expect(passwordCharacterChecker('password123')).toBe(false)
    })
    test('no lower', () => {
        expect(passwordCharacterChecker('DOGERLAND')).toBe(false)
    })
    test('no num', () => {
        expect(passwordCharacterChecker('passwordle')).toBe(false)
    })
})

/**
 * in this case, false is the correct output
 */
describe('special symbol checker', () => {
    test('it has no special character', () => {
        expect(specialSymbolChecker('Password123')).toBe(true)
    })
    test('it has special chars', () => {
        expect(specialSymbolChecker('Password123?')).toBe(false)
        expect(specialSymbolChecker('P   as (*()*(^&*%^*&sword123?')).toBe(false)
    })
})