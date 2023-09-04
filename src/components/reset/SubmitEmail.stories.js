import SubmitEmail from './SubmitEmail'
import '../../index.css'

export default {
    title: 'SubmitEmail',
    component: SubmitEmail,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
}


export const Default = {
    args: {
        loading: false,
        setLoading: () => {}

    }
}

export const Clicked = {
    args: {
        ...Default.args,
        loading: true
    }
}


