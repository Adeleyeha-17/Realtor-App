import { getAuth, updateProfile } from "firebase/auth"
import { doc, updateDoc } from "firebase/firestore"
import { useState } from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"
import { db } from "../firebase.config"


export default function Profile(){
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    fullname: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
 
  const {fullname, email} = formData
  const navigate = useNavigate()

  function onChange(e){
    const {name, value} = e.target
    setFormData( prevState => ({
      ...prevState,
      [name] : value,
    }))
  }
  
  function onSignOut() {
    auth.signOut()
    navigate("/")
  }

  function editDetails() {
    {
      changeDetails && onSubmit();
      setChangeDetails( prevState => !prevState)
    }
    
  }
  

 async function onSubmit() {
try {
  // Update user display name
  if(auth.currentUser.displayName !== fullname){
    await updateProfile(auth.currentUser, {
      displayName: fullname
    })
  }

  // update user display name in firestore

  const docRef = doc(db, "users", auth.currentUser.uid)
  await updateDoc(docRef, {
    name: fullname,
  })
  toast.success("Changes made")
} catch (error) {
  toast.error("Could not update the profile data")
}
  }
  
  return(
    <div className="max-w-6xl mx-auto flex flex-col justify-center items-center">
      <section>
        <h1 className="text-3xl text-center font-bold mt-6 mb-3">Profile</h1>
      <div className="sm:w-full md:w-[85%] mt-6 px-3 mx-auto">
      <form>
          {/* Name input */}
          <input type="text" name="fullname" value={fullname} onChange={onChange} disabled={!changeDetails} className={`w-full rounded text-xl text-gray-700 bg-white px-4 py-2 my-2 border border-gray-300 transition ease-in-out ${changeDetails && "bg-red-200 focus:bg-red-200"}`}/>
          
          {/* Email input */}
          <input type="email" name="email" value={email} onChange={onChange} disabled={!changeDetails} className={`w-full rounded text-xl text-gray-700 bg-white px-4 py-2 my-2 border border-gray-300 transition ease-in-out`}/>

          <div className="flex justify-between whitespace-nowrap text-sm mb-4 items-center">
            <p className="flex">Do you want to change your name? <span className="ml-1 text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer" onClick={editDetails}>
              {changeDetails ? "Apply change" : "Edit"}</span></p>
            <p className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer" onClick={onSignOut}>Sign out</p>

          </div>
        </form>
      </div>
        
      </section>
    </div>
  )
}