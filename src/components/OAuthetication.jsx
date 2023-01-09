import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getDoc, serverTimestamp, setDoc, doc } from 'firebase/firestore'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { db } from '../Firebase'

const OAuthetication = () => {
    const navigate = useNavigate();
    async function onGoogleClick() {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            // check for the user
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef)

            if (!docSnap.exists()) {
                await setDoc(docRef, {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                });
            }
            navigate("/");

        } catch (error) {
            toast.error("Could not authorize with google")
        }
    }
    return (
        <button
            onClick={onGoogleClick}
            className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 transition ease-in-out duration-200 text-white text-sm md:text-md uppercase rounded-sm py-2 font-medium active:bg-red-800"
            type="button">
            <FcGoogle className='text-xl bg-white rounded-full mr-2' />
            Continue with Google
        </button>
    )
}

export default OAuthetication
