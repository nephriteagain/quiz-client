import { Outlet, useNavigation } from "react-router-dom"
import Login from "../components/home/Login"
import Welcome from '../components/home/Welcome'



export default function Root() {


    return (
        <>
            <div className="dark:bg-[#22092C] bg-slate-100 shadow-md dark:shadow-slate-700 fixed w-screen top-0 left-0 z-[9999] flex flex-row gap-4   items-center px-3 py-2">
                <Welcome />
                <Login />
            </div>
            <Outlet />
        </>
    )
}