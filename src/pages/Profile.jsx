import React from 'react'
import { useState } from 'react'
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase';
import { FcHome } from 'react-icons/fc';
import { Link } from 'react-router-dom';

const Profile = () => {

  const auth = getAuth()
  const navigate = useNavigate()
  const [changeDetail, setChangeDetail] = useState(false)

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  const { name, email } = formData;

  function onLogout() {
    auth.signOut();
    navigate("/")
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        //update display name in firebase auth
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        //update name in the firestore
        const docRef = doc(db, "users", auth.currentUser.uid)
        await updateDoc(docRef, {
          name,
        });
      }
      toast.success("Profile details is updated")

    } catch (error) {
      toast.error("Could not update the profile details")
    }
  }

  return (
    <>
      <section>
        <h1 className='text-md lg:text-2xl font-semibold text-center my-4'>My Profile</h1>
        <div className='w-full md:w-[60%] lg:w-[50%] mt-4 md:mt-8 md:mx-auto'>
          <form className='space-y-4 mx-2'>
            <input
              type="text"
              id='name'
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`w-full px-4 py-2 text-md text-gray-700 bg-white border  border-gray-300 rounded-sm transition ease-in-out ${changeDetail && "bg-red-200 focus:bg-red-200 "}`}
            />
            <input
              type="email"
              id='email'
              value={email}
              className="w-full px-4 py-2 text-md text-gray-700 bg-white border  border-gray-300 rounded-sm transition ease-in-out"
            />

            <div className='flex justify-between whitespace-nowrap text-sm md:text-md px-2'>
              <p>Do you want to change your name?
                <span
                  onClick={() => {
                    changeDetail && onSubmit()
                    setChangeDetail(!changeDetail)
                  }
                  }

                  className='text-red-500 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer pl-2 font-semibold'>
                  {changeDetail ? "Apply change" : "Edit"}</span>
              </p>
              <p
                onClick={onLogout}
                className='text-blue-500 hover:text-blue-700 transition ease-in-out duration-300 cursor-pointer font-semibold '>
                Sign out
              </p>
            </div>
          </form>
          <button type='submit' className='mt-6 w-full bg-blue-600 hover:bg-blue-700 transition ease-in-out duration-200 text-white uppercase px-7 py-2 text-sm font-semibold'>
            <Link to="/createlisting" className='flex items-center justify-center'>
              <FcHome className='text-2xl bg-red-100 rounded-full p-1 border-2 mr-2' />
              Sell or rent your home
            </Link>
          </button>
        </div>
      </section >
    </>
  )
}

export default Profile