import React, { useState } from 'react'

const Login = () => {
  const [create, setCreate] = useState(false)

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-3 sm:p-6 lg:p-8">

      <div className="flex flex-col lg:flex-row w-full max-w-6xl bg-white border border-slate-200 shadow-md rounded-2xl lg:rounded-3xl overflow-hidden">

        {/* Left Side */}
        <div className="relative w-full lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white p-8 sm:p-10 lg:p-16 flex-col justify-center overflow-hidden hidden md:flex ">

          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              Task Manager
            </h1>

            <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-blue-100 max-w-xl leading-7">
              Maamul dhamaan howlahaaga shaqo iyo waxbarasho
              ee aad qabato.
            </p>

            <div className="mt-8 sm:mt-10 space-y-4 text-blue-100">

              <div className="flex items-center gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  ✓
                </div>
                <span className="text-sm sm:text-base">
                  Organize your daily tasks
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  ✓
                </div>
                <span className="text-sm sm:text-base">
                  Track your progress
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  ✓
                </div>
                <span className="text-sm sm:text-base">
                  Stay productive every day
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 p-5 sm:p-8 md:p-10 lg:p-16">

          <div className="w-full max-w-md mx-auto">

            {/* Mobile-only brand mark, since the left panel is hidden below md */}
            <div className="mb-6 flex items-center gap-2 md:hidden">
              <span className="text-lg font-bold text-blue-700">
                Task Manager
              </span>
            </div>

            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-slate-800">
              Welcome back 👋
            </h1>

            <p className="mt-2 text-sm sm:text-base text-slate-500">
              Gel gudaha system oo maamul howlahaaga.
            </p>

            <form className="mt-6 sm:mt-8 md:mt-10 flex flex-col gap-4 sm:gap-5 md:gap-6">

              {/* Full Name */}
              {create && (
                <div className="flex flex-col gap-2">
                  <label
                    className="text-sm font-semibold text-slate-600"
                    htmlFor="name"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    type="text"
                    placeholder="Enter Your Name"
                    className="input w-full"
                  />
                </div>
              )}

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  className="text-sm font-semibold text-slate-600"
                  htmlFor="email"
                >
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="Enter Your Email"
                  className="input w-full"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-600"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  placeholder="Enter Your Password"
                  className="input w-full"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 cursor-pointer py-3 px-5 rounded-xl text-white font-semibold transition duration-200"
              >
                {create ? 'Create Account' : 'Sign In'}
              </button>

              {/* Switch Login/Register */}
              {!create && (
                <p className="text-center text-sm text-slate-500 mt-2 sm:mt-3">
                  Don't have an account?{' '}
                  <button
                    onClick={() => setCreate(true)}
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                  >
                    Create account
                  </button>
                </p>
              )}

              {create && (
                <p className="text-center text-sm text-slate-500 mt-2 sm:mt-3">
                  Already have an account?{' '}
                  <button
                    onClick={() => setCreate(false)}
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
                  >
                    Login
                  </button>
                </p>
              )}

            </form>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Login
