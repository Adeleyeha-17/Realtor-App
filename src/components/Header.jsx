import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

export default function Header() {
  const [pageState, setPageState] = useState("Sign in")
  const location = useLocation();
  const navigate = useNavigate();

  const auth = getAuth()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if(user) {
        setPageState("Profile")
      } else {
        setPageState("Sign in")
      }
    })
  }, [auth])
function pathMatchRoute(route) {
  if(location.pathname === route) {
    return true
  }
}



  return (
    <div className="bg-white border-b shadow-sm sticky left-0 top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img src="/rdc-logo-default.svg" alt="logo" className="h-5 cursor-pointer" 
          onClick={() => navigate("/")}/>
        </div>
        <div>
          <ul className="flex space-x-10">
            <li className={`cursor-pointer py-3 text-sm font-semibold ${pathMatchRoute("/") ? "text-black border-b-4 border-red-500" : "text-gray-400 border-b-4 border-transparent"}`} 
            onClick={() => navigate("/")}>Home</li>
            <li className={`cursor-pointer py-3 text-sm font-semibold ${pathMatchRoute("/offers") ? "text-black border-b-4 border-red-500" : "text-gray-400 border-b-4 border-transparent"}`} 
            onClick={() => navigate("/offers")}>Offers</li>
            <li className={`cursor-pointer py-3 text-sm font-semibold ${(pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) ? "text-black border-b-4 border-red-500" : "text-gray-400 border-b-4 border-transparent"}`} 
            onClick={() => navigate("/profile")}>{pageState}</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
