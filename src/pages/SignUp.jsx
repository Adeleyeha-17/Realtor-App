import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth.jsx';
import { getAuth, createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import { db } from "../firebase.config.js"
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';



export default function SignUp() {
  
  
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    showPassword: false,
  })

  const { fullname, email, password, showPassword } = formData
  const navigate = useNavigate();
  function onChange(e) {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value,

    }))
  }

  function toggleShowPassword() {
    setFormData(prevState => ({
      ...prevState,
      showPassword: !prevState.showPassword
    }))
  }

 async function onSubmit(e) {
  e.preventDefault();
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    updateProfile(auth.currentUser, {
      displayName: fullname
    });
    const user = userCredential.user;
    const formDataCopy = { ...formData };
    delete formDataCopy.password;
    formDataCopy.timeStamp = serverTimestamp();

    await setDoc(doc(db, "users", user.uid), formDataCopy);
    navigate("/");
    // toast.success("You have been registered successfully!");
    
  } catch (error) {
     toast.error("Something went wrong with your registration");
  }
  }

  return (
    <section>
      <h1 className="text-3xl text-center font-bold mt-6">Sign Up</h1>
      <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
        <div className="md:w-[60%] lg:w-[50%] mb-12 md:mb-6 md:items-center justify-center">
          <img src="https://images.unsplash.com/photo-1682347546932-f397ccf63940?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="beach" className="ml-6 rounded-2xl h-84 w-84" />
        </div>
        <div className="w-full md:w-[60%] lg:w-[40%] lg:ml-20 sm:w-[50%] items-center justify-center">
          <form onSubmit={onSubmit}>
            <input className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-4" type="text" name="fullname" value={fullname} placeholder="Fullname" onChange={onChange} />

            <input className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-4" type="email" name="email" value={email} placeholder="Email Address" onChange={onChange} />

            <div className="relative">
              <input className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out mb-4" type={showPassword ? "text" : "password"} name="password" value={password} placeholder="Password" onChange={onChange} />
              {showPassword ? (
                <AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer" onClick={toggleShowPassword} />
              ) : (
                <AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer" onClick={toggleShowPassword} />
              )}
            </div>
            <div className="flex justify-between whitespace-nowrap  sm:text-sm"> 
            <p className="mb-6"> Have a account? <Link to="/sign-in" className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1 sm:ml-0">Sign in</Link></p>
            <p>
            <Link to="/forgot-password" className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">Forgot password?
            </Link></p>
            </div>

            <button className="w-full bg-blue-600 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800" type="submit">Sign Up</button>

          <div className="flex my-2 items-center before:border-t before:flex-1  before:border-gray-300 after:border-t after:flex-1  after:border-gray-300">
                <p className="text-center font-semibold mx-4 ">OR</p>
          </div>

          <OAuth />
          </form>
        </div>
      </div>
    </section>
  )
}