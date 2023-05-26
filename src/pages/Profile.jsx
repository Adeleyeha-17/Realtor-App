import { getAuth } from "firebase/auth"
import { useState } from "react"


export default function Profile(){
  const auth = getAuth()
  const [formData, setFormData] = useState({
    fullname: auth.currentUser.displayName,
    email: auth.currentUser.email
  })
 
  const {fullname, email} = formData


  function onClickFunction(e){
    const {name, value} = e.target
    setFormData( prevState => ({
      ...prevState,
      [name] : value
    }))
  }

  return(
    <div className="max-w-6xl mx-auto flex flex-col justify-center items-center">
      <section>
        <h1 className="text-3xl text-center font-bold mt-6 mb-3">Profile</h1>
      <div className="sm:w-full md:w-[85%] mt-6 px-3 mx-auto">
      <form>
          {/* Name input */}
          <input type="text" name="fullname" value={fullname} onClick={onClickFunction} disabled className="w-full rounded text-xl text-gray-700 bg-white px-4 py-2 my-2 border border-gray-300 transition ease-in-out"/>
          
          {/* Email input */}
          <input type="email" name="email" value={email} onClick={onClickFunction} disabled className="w-full rounded text-xl text-gray-700 bg-white px-4 py-2 my-2 border border-gray-300 transition ease-in-out"/>

          <div className="flex justify-between whitespace-nowrap text-sm mb-4 items-center">
            <p className="flex">Do you want to change your name? <span className="ml-1 text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer">Edit</span></p>
            <p className="text-blue-600 hover:text-blue-800 transition ease-in-out duration-200 cursor-pointer">Sign out</p>

          </div>
        </form>
      </div>
        
      </section>
    </div>
  )
}