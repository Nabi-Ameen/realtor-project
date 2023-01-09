import { getAuth, onAuthStateChanged } from "firebase/auth";
import React,{ useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
    const [pageState, setPageState] = useState("Sign in")
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            if(user){
                setPageState("Profile")
            }else{
                setPageState("Sign in")
            }
        });
    }, [auth])
    function pathRoute(route) {
        if (route === location.pathname) {
            return true;
        }
    }

    return ( 
        <div className='bg-white border-b shadow-sm sticky top-0 z-40'>
            <header className='mx-3 md:mx-6 lg:mx-12 flex justify-between items-center'>
                <img src="./images/logo.svg"
                    alt="logo"
                    className='h-4 md:h-6 cursor-pointer'
                    onClick={() => navigate("/")}
                />
                <div>
                    <ul className='flex space-x-2 md:space-x-6'>
                        <li className={`nav-menu ${pathRoute("/") && "text-black border-b-red-600"}`}
                        onClick={()=> navigate("/")}
                        >Home</li>
                        <li className={`nav-menu ${pathRoute("/offers") && "text-black border-b-red-600"}`}
                        onClick={()=> navigate("/offers")}
                        >Offers</li>
                        <li className={`nav-menu ${(pathRoute("/signIn")|| pathRoute("/profile")) && "text-black border-b-red-600"}`}
                        onClick={()=> navigate("/profile")}
                        >{pageState}</li>
                    </ul>
                </div>
            </header>
        </div>
    )
}

export default Navbar
