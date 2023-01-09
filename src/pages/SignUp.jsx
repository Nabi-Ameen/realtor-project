import React, { useState } from "react"
import { Link } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import OAuthetication from "../components/OAuthetication";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '../Firebase'
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const navigate = useNavigate()
  const { name, email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  async function onSubmit(e) {
    e.preventDefault()

    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser, {
        displayName: name,
      })
      const user = userCredential.user
      const formDataCopy = {...formData}
      delete formDataCopy.password
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), formDataCopy)
      toast.success("Sign up was successfuly")
      navigate("/")
    } catch (error){
      toast.error("Something went wrong with the registration")
    }
    
  }

  return (
    <div className='mx-3 md:mx-6 lg:mx-12'>
      <h1 className='text-2xl text-center mt-6 font-semibold'>Sign Up</h1>

      <div className="lg:flex mt-8 lg:space-x-20 space-y-6 lg:space-y-0">
        <div className="lg:w-[50%]">
          <img src="./images/loginimg.jpg" alt="key" className="rounded-lg" />
        </div>

        <div className="lg:w-[50%] ">

          <form
            onSubmit={onSubmit}
            className="space-y-6">
            <input
              type="text"
              className="w-full py-2 text-sm md:text-md text-gray-700 bg-white border-gray-300 rounded-sm transition ease-in-out duration-300"
              id="name"
              value={name}
              placeholder="Name"
              onChange={onChange}
            />
            <input
              type="email"
              className="w-full py-2 text-sm md:text-md text-gray-700 bg-white border-gray-300 rounded-sm transition ease-in-out duration-300"
              id="email"
              value={email}
              placeholder="Email address"
              onChange={onChange}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full py-2 text-sm md:text-md text-gray-700 bg-white border-gray-300 rounded-sm transition ease-in-out duration-300"
                id="password"
                value={password}
                placeholder="Password"
                onChange={onChange}
              />
              {showPassword
                ?
                <AiFillEyeInvisible className=" absolute top-3 right-3 text-lg cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
                :
                <AiFillEye className=" absolute top-3 right-3 text-lg cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              }
            </div>
            <div className="flex justify-between whitespace-nowrap text-xs md:text-sm lg:text-sm">
              <p>Have a account?
                <Link
                  className="text-red-600 hover:text-red-800 font-semibold transition duration-300 ease-in-out ml-2"
                  to="/SignIn">Sign in</Link>
              </p>
              <p>
                <Link
                  className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300 ease-in-out"
                  to="/forgot-password">Forgot password?</Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 hover:bg-blue-700 transition ease-in-out duration-200 text-white text-sm md:text-md uppercase rounded-sm py-2 font-medium active:bg-blue-800"
              type="submit">
              Sign up
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

export default SignUp