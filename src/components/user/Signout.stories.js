import SignOut from "./Signout";
import '../../index.css'

export default {
    title: 'Signout',
    component: SignOut,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
}



export const Default = {
    args: {
        loading: false,
        handleClick: () => {}
    }
}

export const Clicked = {
    args: {
        loading: true,
        handleClick: () => {}
    }
}