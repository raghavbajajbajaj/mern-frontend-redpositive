import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Update = () => {
    const [name, setname] = useState("");
    const [email, setemail] = useState("");
    const [age, setage] = useState("");
    const [hobbies, sethobbies] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://mern-server-redpositive.onrender.com/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const userData = await response.json();
                setname(userData.name);
                setemail(userData.email);
                setage(userData.age);
                sethobbies(userData.hobbies);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
    }, [id]);

    const handleEdit = async (e) => {
        e.preventDefault();
   
        const newuser = {name , email , age,  hobbies}
        const response = await fetch(`https://mern-server-redpositive.onrender.com/${id}` , {
            method : "PATCH" ,
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
        <div className='container flex flex-col items-center font-semibold h-screen w-screen bg-slate-300'>
            <div className='text-center text-3xl mt-5'>Edit the User Data</div>
            <form onSubmit={handleEdit} className='w-1/2'>
                <div className="mb-3 mt-4">
                    <label className="block">Full Name</label>
                    <input type="text" className="border border-gray-300 rounded-md w-full py-2 px-3" value={name} onChange={(e) => setname(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="block">Email address</label>
                    <input type="email" className="border border-gray-300 rounded-md w-full py-2 px-3" aria-describedby="emailHelp" value={email} onChange={(e) => setemail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="block">Phone Number</label>
                    <input type="text" className="border border-gray-300 rounded-md w-full py-2 px-3" value={age} onChange={(e) => setage(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="block">Hobbies</label>
                    <input type="text" className="border border-gray-300 rounded-md w-full py-2 px-3" value={hobbies} onChange={(e) => sethobbies(e.target.value)} />
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded">Submit</button>
            </form>
        </div>
    );
}

export default Update;
