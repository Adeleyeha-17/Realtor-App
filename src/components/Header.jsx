import { useLocation, useNavigate } from 'react-router-dom';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

function pathMatchRoute(route) {
  return location.pathname === route
    ? 'text-black border-b-4 border-red-500 rounded'
    : 'text-gray-400 border-b-4 border-transparent rounded';
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
            <li className={`cursor-pointer py-3 text-sm font-semibold ${pathMatchRoute("/")}`} 
            onClick={() => navigate("/")}>Home</li>
            <li className={`cursor-pointer py-3 text-sm font-semibold ${pathMatchRoute("/offers")}`} 
            onClick={() => navigate("/offers")}>Offers</li>
            <li className={`cursor-pointer py-3 text-sm font-semibold ${pathMatchRoute("/sign-in")}`} 
            onClick={() => navigate("/sign-in")}>Sign in</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
