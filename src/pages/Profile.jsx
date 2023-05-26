import { useState } from "react"


export default function Profile(){

  const [formData, setFormData] = useState({
    fullname: "Adeleye Habeeb",
    email: "hayden10beb@gmail.com"
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
      <div className="sm:w-[60%] md:w-[70%] lg:w-[80%] mt-6 px-3 mx-auto">
      <form>
          {/* Name input */} 

          <input type="text" name="fullname" value={fullname} onClick={onClickFunction} disabled className="w-full rounded text-xl text-gray-700 bg-white mx-4 my-2 border border-gray-300 transition ease-in-out"/>
          <input type="email" name="email" value={email} onClick={onClickFunction} className="w-full rounded text-xl text-gray-700 bg-white mx-4 my-2 border border-gray-300 transition ease-in-out"/>
        </form>
      </div>
        
      </section>
    </div>
  )
}