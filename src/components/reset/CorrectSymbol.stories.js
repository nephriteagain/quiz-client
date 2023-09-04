import { CorrectSymbol } from './NewPasswordChecker'
import '../../index.css'

export default {
    title: 'Correct Symbol',
    component: CorrectSymbol,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
}



export const Ok = {
    args: {
        symbolBool: true
    }
} 
export const BadSymbol = {
    args: {
        symbolBool: false
    }
}