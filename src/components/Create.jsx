import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Create = () => { 
    const[name , setname ] = useState("") ;
    const[email , setemail] = useState("") ;
    const[age , setage] = useState("") ;
    const navigate = useNavigate() ;
    const[hobbies, sethobbies] = useState("") ;

    const handlesubmit = async (e)=>{
        e.preventDefault() ;

        const newuser = {name , email , age,  hobbies}
        const response = await fetch("https://mern-server-redpositive.onrender.com" , {
            method : "POST" ,
            body :JSON.stringify(newuser),
            headers:{
                "Content-Type" : "application/json"
            }
        }) ;
        const result = await response.json() ;   
        if(result.ok){
          setname("") ;
          setemail("") ; 
          setage("") ;
          sethobbies("")
      }
      else console.log(result.error)
        navigate("/all")
        
    }

  return (
<div className='container  flex flex-col  items-center font-semibold h-screen w-screen bg-slate-300'>

 <div className='text-center text-3xl mt-5'>Enter the Data</div>
    <form onSubmit={handlesubmit} className='w-1/2 '>
   
      <div className="mb-3 mt-4 ">
        <label className="block">Full Name</label>
        <input placeholder='Enter Full name here' type="text" className="border border-gray-300 rounded-md w-full py-2 px-3"  value={name} onChange={(e) => setname(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="block">Email address</label>
        <input  placeholder='Enter Email address here'  type="email" className="border border-gray-300 rounded-md w-full py-2 px-3" aria-describedby="emailHelp" value={email} onChange={(e) => setemail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label className="block">Phone Number</label>
        <input  placeholder='Enter Phone Number here'  type="text" className="border border-gray-300 rounded-md w-full py-2 px-3" value={age} onChange={(e) => setage(e.target.value)} />
      </div>

      <div className="mb-3">
        <label className="block">Hobbies</label>
        <input  placeholder='Enter Hobbies here' type="text" className="border border-gray-300 rounded-md w-full py-2 px-3" value={hobbies} onChange={(e) => sethobbies(e.target.value)}  />
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded">Submit</button>
    </form>
  </div>

  )
}

export default Create
