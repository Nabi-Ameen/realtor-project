import React, { useState } from "react"
import { Link } from 'react-router-dom';
import OAuthetication from "../components/OAuthetication";
import {toast} from 'react-toastify';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("")

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  async function onSubmit(e){
    e.preventDefault()
    try{
      const auth= getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email was sent")
    }catch(error){
      toast.error("Could not send reset password");
    }
  }


  return (
    <div className='mx-3 md:mx-6 lg:mx-12'>
      <h1 className='text-2xl text-center mt-6 font-semibold'>Forgot Password</h1>

      <div className="lg:flex mt-8 lg:space-x-20 space-y-6 items-center">
        <div className="lg:w-[50%]">
          <img src="./images/loginimg.jpg" alt="key" className="rounded-lg" />
        </div>

        <div className="lg:w-[50%] ">
          <form className="space-y-6" onSubmit={onSubmit}>
            <input
              type="email"
              className="w-full py-2 text-sm md:text-md text-gray-700 bg-white border-gray-300 rounded-sm transition ease-in-out duration-300"
              id="email"
              value={email}
              placeholder="Email address"
              onChange={onChange}
            />

            <div className="flex justify-between whitespace-nowrap text-xs md:text-sm lg:text-sm">
              <p>Don't have a account?
                <Link
                  className="text-red-600 hover:text-red-800 font-semibold transition duration-300 ease-in-out ml-2"
                  to="/Sign">Register</Link>
              </p>
              <p>
                <Link
                  className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300 ease-in-out"
                  to="/signIn">Sign in instead?</Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 transition ease-in-out duration-200 text-white text-sm md:text-md uppercase rounded-sm py-2 font-medium active:bg-blue-800"
              type="submit">
              Send reset password
            </button>
            <div className="flex items-center before:border-t before:flex-1 before:border-gray-400
            after:border-t after:flex-1 after:border-gray-400 ">
              <p className="text-center font-semibold text-xs md:text-sm mx-3 text-gray-600">or</p>
            </div>
            <OAuthetication />
          </form>
        </div>
      </div>

    </div>
  )
}

export default ForgotPassword