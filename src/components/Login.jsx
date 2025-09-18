import React, { useState } from 'react'
import busImage from '../assets/bus.jpg';


const Login = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true)
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)


        const regex = /[^0-9]/g;
        if (phoneNumber.length < 10 || regex.test(phoneNumber)) {
            alert("Please enter a valid 10-digit phone number");
            setIsLoading(false)
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            setIsLoading(false)
            return;
        }

        if (!isLogin && password !== confirmPassword) {
            alert("Passwords do not match");
            setIsLoading(false)
            return;
        }


        setTimeout(() => {
            const userData = {
                name: isLogin ? "User" : name,
                phone: phoneNumber,
                email: `${phoneNumber}@smartyatra.com`,
                id: Date.now()
            }




            onLogin(userData)
            setIsLoading(false)
        }, 1000)
    }
    return (
        <>

            <div >

                <img src={busImage} alt="Bus" className="absolute inset-0 w-full h-full object-cover opacity-20 md:opacity-20" />




                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
                    <div className="grid md:grid-cols-2 gap-10 items-center">

                        <div className="text-center md:text-left">
                            <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-700 via-lightblue-600 to--400 bg-clip-text text-transparent">
                                SmartYatra
                            </h1>
                            <p className="mt-4  text-lg md:text-xl leading-relaxed">
                                Plan, book, and track your journeys with ease. A smarter way to travel across the city and beyond.
                            </p>
                        </div>


                        <div className='w-full max-w-md md:ml-auto mx-auto bg-white/80 opacity-70 backdrop-blur-sm p-5 sm:p-8 rounded-2xl shadow-xl ring-1 ring-white/60'>
                            <div className='flex justify-center mb-6'>
                                <h2 className='text-3xl font-semibold text-center'>{isLogin ? "Login" : "Sign Up"}</h2>
                            </div>


                            <div className='relative flex h-12 mb-8 border border-gray-300 rounded-full overflow-hidden bg-white'>
                                <button onClick={() => setIsLogin(true)} className={`w-1/2 text-lg font-medium transition-all z-10 ${isLogin ? "text-white" : "text-black"}`}>
                                    Login
                                </button>
                                <button onClick={() => setIsLogin(false)} className={`w-1/2 text-lg font-medium transition-all z-10 ${!isLogin ? "text-white" : "text-black"}`}>
                                    Sign Up
                                </button>
                                <div className={`absolute top-0 h-full w-1/2 rounded-full bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-400 ${isLogin ? "left-0" : "left-1/2"} `}></div>
                            </div>

                            <form onSubmit={handleSubmit} className='space-y-5'>
                                {!isLogin && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder='Name'
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className='w-full p-3 bg-white/70 rounded-lg border border-gray-200 outline-none focus:border-blue-500 placeholder-gray-400'
                                        />
                                        <input
                                            type="number"
                                            placeholder='Age'
                                            value={age}
                                            onChange={(e) => setAge(e.target.value)}
                                            required
                                            className='w-full p-3 bg-white/70 rounded-lg border border-gray-200 outline-none focus:border-blue-500 placeholder-gray-400'
                                        />
                                        <select
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                            required
                                            className='w-full p-3 bg-white/70 rounded-lg border border-gray-200 outline-none focus:border-blue-500 text-gray-700'
                                        >
                                            <option value="" disabled>Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </>
                                )}

                                <input
                                    type="tel"
                                    placeholder='Phone No'
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    className='w-full p-3 bg-white/70 rounded-lg border border-gray-200 outline-none focus:border-blue-500 placeholder-gray-400'
                                />
                                <input
                                    type="password"
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className='w-full p-3 bg-white/70 rounded-lg border border-gray-200 outline-none focus:border-blue-500 placeholder-gray-400'
                                />

                                {!isLogin && (
                                    <input
                                        type="password"
                                        placeholder='Confirm password'
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        className='w-full p-3 bg-white/70 rounded-lg border border-gray-200 outline-none focus:border-blue-500 placeholder-gray-400'
                                    />
                                )}

                                {isLogin && (
                                    <div className='text-right'>
                                        <button type='button' className='text-cyan-600 hover:underline bg-transparent p-0' onClick={() => alert('Password reset link sent to your registered phone/email.')}>Forget password</button>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className='w-full p-3 bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-400 text-white rounded-full text-lg font-medium shadow-sm hover:opacity-90 transition disabled:opacity-50'
                                >
                                    {isLoading ? "Please wait..." : (isLogin ? "Login" : "SignUp")}
                                </button>

                                <p className='text-center text-gray-700'>
                                    {isLogin ? "Don't have an account" : "Already have an account"}
                                    <a href='#' onClick={() => setIsLogin(!isLogin)} className='ml-2 text-cyan-700 hover:underline'>
                                        {isLogin ? "Signup now" : "Login"}
                                    </a>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Login
