import Link from "next/link";

export default function Login() {
    return (
        <div className="flex h-screen bg-white dark:bg-[#0f0f10] text-neutral-900 dark:text-neutral-100 justify-between items-center gap-10 overflow-hidden transition-colors duration-200">
            <div className="w-auto flex flex-col pl-5 md:pl-20 lg:pl-40 animate-slide-in-left">
                <nav className="w-full max-w-md flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-lg font-semibold text-gray-800 dark:text-white" style={{ fontFamily: "Poppins, sans-serif" }}>
                            Kumimi
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                        <Link href="/" className="text-gray-500 dark:text-neutral-400 hover:text-[#ff6740] font-semibold transition-colors" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                            Home
                        </Link>
                        <Link href="/client/register" className="text-[#36656B] dark:text-[#ff6740] font-semibold hover:text-green-700 transition-colors" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                            Join
                        </Link>
                    </div>
                </nav>

                <div className="w-full max-w-md gap-6 justify-center md:justify-center lg:justify-start flex flex-col mt-10">
                    <span className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-[#825d21]/10 text-[#825d21] text-xs font-semibold" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                        👋 Welcome back
                    </span>

                    <h1 className="text-5xl text-neutral-950 dark:text-white mb-2 font-medium">Sign in</h1>
                    <p className="text-gray-600 dark:text-neutral-400 mb-4" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                        Enter your details to log in to your account and get more complete features.
                    </p>

                    <div className="space-y-4">
                        <form className="space-y-4">
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email Address"
                                    className="w-full pl-12 pr-4 py-3 text-black dark:text-white bg-white dark:bg-[#151618] border border-gray-300 dark:border-neutral-800 rounded-lg focus:outline-none focus:border-[#825d21] focus:ring-2 focus:ring-[#825d21]/20 transition-all"
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
                                    className="w-full pl-12 pr-12 py-3 border text-black dark:text-white bg-white dark:bg-[#151618] border-gray-300 dark:border-neutral-800 rounded-lg focus:outline-none focus:border-[#825d21] focus:ring-2 focus:ring-[#825d21]/20 transition-all"
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
                                <label className="flex items-center gap-2 text-gray-600 dark:text-neutral-400 cursor-pointer" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-neutral-700 bg-white dark:bg-[#151618] accent-[#825d21]" />
                                    Remember me
                                </label>
                                <a href="/forgot-password" className="text-[#825d21] dark:text-[#ff6740] hover:underline font-medium" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                                    Forgot Password?
                                </a>
                            </div>

                            <button type="submit" className="w-full cursor-pointer bg-[#825d21] dark:bg-[#ff6740] text-white py-3 rounded-lg font-medium shadow-md shadow-[#825d21]/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#825d21]/30">
                                Sign In
                            </button>
                        </form>

                        <div className="flex items-center gap-3 my-6">
                            <div className="flex-1 h-px bg-gray-200 dark:bg-neutral-800"></div>
                            <span className="text-gray-400 dark:text-neutral-505 text-xs uppercase tracking-wide" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Or sign in with</span>
                            <div className="flex-1 h-px bg-gray-200 dark:bg-neutral-800"></div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 flex items-center cursor-pointer justify-center gap-2 bg-white dark:bg-[#151618] border border-gray-300 dark:border-neutral-800 text-gray-700 dark:text-neutral-300 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-850 hover:border-gray-400 dark:hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                <span className="font-medium">Google</span>
                            </button>

                            <button className="flex-1 flex items-center cursor-pointer justify-center gap-2 bg-white dark:bg-[#151618] border border-gray-300 dark:border-neutral-800 text-gray-700 dark:text-neutral-300 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-850 hover:border-gray-400 dark:hover:border-neutral-700 transition-all duration-300 hover:-translate-y-1 shadow-sm">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#1877F2">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                                <span className="font-medium">Facebook</span>
                            </button>
                        </div>

                        <div className="flex justify-center items-center text-sm gap-2 pt-2">
                            <span className="text-gray-500 dark:text-neutral-400" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>Don't have an account?</span>
                            <Link href="/client/register" className="text-[#825d21] dark:text-[#ff6740] cursor-pointer font-semibold hover:underline transition-all duration-300">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="hidden md:block lg:block w-full md:w-1/2 h-full animate-slide-in-right">
                <div className="relative h-full flex justify-end">
                    <img
                        className="w-full h-screen object-cover"
                        src="/login-page-image.png"
                        alt="Welcome illustration"
                    />
                    <div className="absolute inset-0  via-transparent to-transparent"></div>
                    <div className="absolute inset-15 flex flex-col justify-end items-end rounded-xl">
                        <h1 className="text-5xl text-white mt-10 mb-2 drop-shadow-lg" style={{ fontFamily: "Poppins, sans-serif" }}>
                            Welcome Back!
                        </h1>
                        <p className="text-gray-200 mb-8 text-xl drop-shadow-md" style={{ fontFamily: "'Hanken Grotesk', sans-serif" }}>
                            To keep connected with us please login with your personal info.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}