export default function Login() {
    return (
        <div className="flex h-screen bg-white justify-between items-center gap-10 overflow-hidden">
            <div className="w-auto flex flex-col pl-5 md:pl-20 lg:pl-40 animate-slide-in-left">
                <nav className="w-full max-w-md pb-30 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                        
                            <span className="text-lg font-semibold text-gray-800" style={{ fontFamily: "Poppins, cursive" }}>
                                Kumimi
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <a href="/" className="text-gray-500 hover:text-[#825d21] font-semibold" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                                Home
                            </a>
                            <a href="/register" className="text-[#36656B] font-semibold hover:text-green-700" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                                Join
                            </a>
                        </div>
                </nav>

                <div className="w-full max-w-md gap-6">
                    <h1 className="text-5xl text-[#000000] mb-2 font-medium">Sign in</h1>
                    <p className="text-gray-600 mb-8" style={{ fontFamily: "'Hanken Grotesk', Cursive" }}>
                        Enter your details to log in to your account and get more complete features.
                    </p>
                    <div className="space-y-4">
                        <form className="space-y-4">
                            <input  
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email Address"
                                className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                            />
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <input
                                        placeholder="Password"
                                        id="password"
                                        name="password"
                                        className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                                    />
                                    <button
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    >
                                    </button>
                                </div>

                                <div className="relative flex-1">
                                    <input
                                        placeholder="Confirm Password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-gray-400"
                                    />
                                    <button
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    >
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="w-full cursor-pointer bg-[#825d21] text-white py-3 rounded-lg font-medium transition-all duration-300 hover:-translate-y-2">
                                Sign In
                            </button>
                        </form>

                        <div className="flex items-center gap-3 my-6">
                            <div className="flex-1 h-px bg-gray-300"></div>
                            <span className="text-gray-500 text-sm" style={{ fontFamily: "'Hanken Grotesk', Cursive" }}>Or Sign in with</span>
                            <div className="flex-1 h-px bg-gray-300"></div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 flex items-center cursor-pointer justify-center gap-2 bg-[#825d21] text-white py-3 rounded-lg hover:bg-amber-800 transition-all duration-300 hover:-translate-y-2">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </button>

                            <button className="flex-1 flex items-center cursor-pointer justify-center gap-2 bg-[#825d21] text-white py-3 rounded-lg hover:bg-amber-800 transition-all duration-300 hover:-translate-y-2">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                Facebook
                            </button>
                        </div>
                        <div className="flex justify-center items-center text-sm gap-2">
                            <span className="text-gray-700" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Don't have an Account?</span>
                            <a href="/register">
                                <button className="text-[#825d21] cursor-pointer font-semibold transition-all duration-300 hover:-translate-y-1">
                                    Sign Up
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden md:block lg:block w-full md:w-1/2 animate-slide-in-right">
                <div className="relative h-full flex justify-end">
                    <img
                        className='w-full h-screen object-cover'
                        src="../login-page-image.png"
                        alt=""
                    />
                    <div className="absolute inset-15 flex flex-col justify-end items-end rounded-xl">
                        <h1 className="text-5xl text-white mt-10 mb-2" style={{ fontFamily: "Poppins, cursive" }}>
                            Welcome Back!
                        </h1>
                        <p className="text-gray-200 mb-8 text-xl" style={{ fontFamily: "'Hanken Grotesk', Cursive" }}>
                            To keep connected with us please login with your personal info.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}