import { useLayoutEffect, useState } from "react"
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";


export default function Switch() {
    const [ mode, setMode ] = useState(localStorage.getItem('mode') ?? 'light')

    useLayoutEffect(() => {
        if (mode === 'dark') {
            document.documentElement.classList.add('dark')
            localStorage.setItem('mode', 'dark')
        } else {
            document.documentElement.classList.remove('dark')
            localStorage.setItem('mode', 'light')
        }
    }, [mode])



    return (
        <div className="flex flex-col justify-center text-3xl">
            <button onClick={() => setMode(m => m === 'light' ? 'dark' : 'light')}>
                {
                mode === 'light' ?
                <MdOutlineLightMode className="dark:text-white" />  :
                <MdOutlineDarkMode className="dark:text-white" />
                }
            </button>
        </div>
    )
}