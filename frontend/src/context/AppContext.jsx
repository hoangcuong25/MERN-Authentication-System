/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const backenUrl = import.meta.env.VITE_BACKEND_URL
    const [isLogin, setIsLogin] = useState(false)
    const [userData, setUserData] = useState(false)

    const getAuthState = async () => {
        try {
            const { data } = await axios.get(backenUrl + '/api/auth/is-auth')

            if (data.success) {
                setIsLogin(true)
                getUserData()
            }

        } catch (error) {
            console.log(error.message)
        }
    }


    const getUserData = async () => {
        try {
            const { data } = await axios.get(backenUrl + "/api/user/data")
            data.success ? setUserData(data.userData) : alert('error')
        } catch (error) {
            console.log(error.message)
        }
    }

    const value = {
        backenUrl,
        isLogin, setIsLogin,
        userData, setUserData,
        getUserData
    }

    useEffect(() => {
        getAuthState()
    }, [])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}