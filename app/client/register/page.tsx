import Link from "next/link";

export default function Register() {
    return (
        <div className="flex h-screen bg-white justify-between items-center gap-10 overflow-hidden">
            <div className="hidden md:block lg:block w-full md:w-1/2 h-full animate-slide-in-left">
                <div className="relative h-full flex justify-end">
                    <img
                        className="w-full h-screen object-cover"
                        src="/register-page-image.png"
                        alt="Welcome illustration"
                    />
                    <div className="absolute inset-15 flex flex-col justify-end items-start rounded-xl">
                        <h1 className="text-5xl text-white mt-10 mb-2 drop-shadow-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
                            Welcome Back!
                        </h1>
                        <p className="text-gray-200 mb-8 text-xl drop-shadow-md" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                            To keep connected with us please login with your personal info.
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-auto flex flex-col pl-5 md:pr-20 lg:pr-40 animate-slide-in-right">
                <nav className="w-full max-w-md pb-30 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                        
                            <span className="text-lg font-semibold text-gray-800" style={{ fontFamily: "Poppins, cursive" }}>
                                Kumimi
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                            <Link href="/" className="text-gray-500 hover:text-[#825d21] font-semibold" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                                Home
                            </Link>
                            <a href="/register" className="text-[#36656B] font-semibold hover:text-green-700" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                                Join
                            </a>
                        </div>
                </nav>

                <div className="w-full max-w-md gap-6 flex flex-col">
                    <span className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-[#825d21]/10 text-[#825d21] text-xs font-semibold" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                        👋 Welcome back
                    </span>

                    <h1 className="text-5xl text-[#000000] mb-2 font-medium">Sign in</h1>
                    <p className="text-gray-600 mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                        Enter your details to log in to your account and get more complete features.
                    </p>

                    <div className="space-y-4">
                        <form className="space-y-4">
                            <div className="relative">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="w-full pl-12 pr-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:border-[#825d21] focus:ring-2 focus:ring-[#825d21]/20 transition-all"
                                />
                            </div>

                            <div className="relative">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    className="w-full pl-12 pr-12 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:border-[#825d21] focus:ring-2 focus:ring-[#825d21]/20 transition-all"
                                />
                                <button
                                    type="button"
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#825d21] transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                </button>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <label className="flex items-center gap-2 text-gray-600 cursor-pointer" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-[#825d21]" />
                                    Remember me
                                </label>
                                <Link href="/forgot-password" className="text-[#825d21] hover:underline font-medium" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                                    Forgot Password?
                                </Link>
                            </div>

                            <button type="submit" className="w-full cursor-pointer bg-[#825d21] text-white py-3 rounded-lg font-medium shadow-md shadow-[#825d21]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#825d21]/30">
                                Sign In
                            </button>
                        </form>

                        <div className="flex items-center gap-3 my-6">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <span className="text-gray-400 text-xs uppercase tracking-wide" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Or sign in with</span>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 flex items-center cursor-pointer justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="font-medium">Google</span>
                            </button>

                            <button className="flex-1 flex items-center cursor-pointer justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                <span className="font-medium">Facebook</span>
                            </button>
                        </div>
                        <div className="flex justify-center items-center text-sm gap-2">
                            <span className="text-gray-700" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Don `&apos;`t have an Account?</span>
                            <a href="/register">
                                <button className="text-[#825d21] cursor-pointer font-semibold transition-all duration-300 hover:-translate-y-1">
                                    Sign Up
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}