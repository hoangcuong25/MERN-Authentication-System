/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useState } from "react";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const backenUrl = import.meta.env.VITE_BACKEND_URL
    const [isLogin, setIsLogin] = useState(false)
    const [userData, setUserData] = useState(false)

    const getUserData = async () => {
        try {
            const { data } = await axios.get(backenUrl + "/api/user/data")
            data.success ? setUserData(data.userData) : alert('error')
        } catch {
            console.log('error')
        }
    }

    const value = {
        backenUrl,
        isLogin, setIsLogin,
        userData, setUserData,
        getUserData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}