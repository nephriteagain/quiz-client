import { MatchedPassword } from "./NewPasswordChecker";
import '../../index.css'

export default {
    title: 'MatchedPassword',
    component: MatchedPassword,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
}

export const Matched = {
    args: {
        matchBool: true
    }
}

export const NotMatched = {
    args: {
        matchBool: false
    }
}