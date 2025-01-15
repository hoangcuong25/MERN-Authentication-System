import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'

const Login = () => {

    const { backenUrl, setIsLogin, getUserData } = useContext(AppContext)

    const navigate = useNavigate()

    const [state, setState] = useState('Sign Up')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmitHaandler = async (e) => {
        try {
            e.preventDefault()

            axios.defaults.withCredentials = true

            if (state === "Sign Up") {
                const { data } = await axios.post(backenUrl + '/api/auth/register', { name, email, password })

                if (data.success) {
                    setIsLogin(true)
                    getUserData()
                    navigate('/')
                } else {
                    alert(data.message)
                }

            } else {
                const { data } = await axios.post(backenUrl + '/api/auth/login', { email, password })

                if (data.success) {
                    setIsLogin(true)
                    getUserData()
                    navigate('/')
                }
                else {
                    alert(data.message)
                }
            }
        } catch {
            alert("error")
        }
    }

    return (
        <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
            <img onClick={() => navigate('/')} src={assets.logo} className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer' alt="" />
            <div className='bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm'>
                <h2 className='text-3xl font-semibold text-white text-center mb-3'>{state === "Sign Up" ? "Create Account" : "Login"}</h2>
                <p className='text-center text-sm mb-6'>{state === "Sign Up" ? "Create Your Account" : "Login To Your Account"}</p>

                <form onSubmit={onSubmitHaandler}>
                    {state === "Sign Up" &&
                        (
                            <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
                                <img src={assets.person_icon} alt="" />
                                <input onChange={(e) => setName(e.target.value)} type="text" placeholder='Full Name' required className='bg-transparent outline-none' />
                            </div>
                        )
                    }
                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
                        <img src={assets.mail_icon} alt="" />
                        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder='Email address' required className='bg-transparent outline-none' />
                    </div>
                    <div className='mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333a5c]'>
                        <img src={assets.lock_icon} alt="" />
                        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder='Password' required className='bg-transparent outline-none' />
                    </div>

                    <p onClick={() => navigate('/reset-password')} className='mb-4 text-indigo-500 cursor-pointer'>Forgot password?</p>

                    <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium'>{state}</button>

                </form>

                {
                    state === "Sign Up" ? (<p className='text-gray-400 text-center text-xs mt-4'>
                        Already have an account?{' '}
                        <span onClick={() => setState("Login")} className='text-blue-400 cursor-pointer underline'>Login Here</span>
                    </p>) : (<p className='text-gray-400 text-center text-xs mt-4'>
                        Do not have an account?{' '}
                        <span onClick={() => setState("Sign Up")} className='text-blue-400 cursor-pointer underline'>Sign Up</span>
                    </p>)
                }

            </div>
        </div>
    )
}

export default Login