import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Read = () => {
    const [data, setData] = useState([]);
    const [selectedusers, setSelectedusers] = useState([]);
    //"info@redpositive.in"
    // const[sendersemail , setsendersemail] = useState("");
    // const email = sendersemail  ;
    const getData = async () => {
        try {
            const response = await fetch("https://mern-server-redpositive.onrender.com");
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    //////////////////////////////////////////
    
    const handlesubmit = (e)=>{
        e.preventDefault();
        let finalusers='';
        selectedusers.map(user=>{
            finalusers+='Name:- '
            finalusers+=user.name
            finalusers+=', '
            finalusers+='Email:- '
            finalusers+=user.email
            finalusers+=', '
            finalusers+='Phone Number:- '
            finalusers+=user.age
            finalusers+=', '
            finalusers+='Hobbies:- '
            finalusers+=user.hobbies
            finalusers+='\n'
        })
        // info@redpositive.in
        const mailtolink = `mailto:info@redpositive.in?subject=Selected Users Data&body=${finalusers}`
        window.location.href = encodeURI(mailtolink);
    }

    const handleCheckboxChange = (user) => {
        setSelectedusers((prevSelectedUsers) => (
            prevSelectedUsers.includes(user)
              ? prevSelectedUsers.filter((curruser) => curruser !== user)
              : [...prevSelectedUsers, user]
          ));
        console.log(user,selectedusers)
      };
//////////////////////////////////////////////
    
     
    useEffect(() => {
        getData();
    }, []);

    const deleteHandler = async (id) => {
        try {
            await fetch(`https://mern-server-redpositive.onrender.com/${id}`, {
                method: "DELETE"
            });
            getData();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    return (
        <div className='container  h-screen w-screen bg-slate-300 '>
             
             {/* <div className='flex justify-center items-center p-4 font-bold '> Enter your email id :
              <input  placeholder='Enter email here' type="text" className="bg-transparent m-1 p-1 border font-semibold rounded border-black" value={sendersemail} onChange={(e) => setsendersemail(e.target.value)} />
                </div>
             <hr /> */}
            <table className="table-auto w-full ">
                <thead>
                    <tr className=' bg-black text-white'>
                    <th className="text-center py-2">Serial No.</th>
                        <th className="text-center py-2">Name</th>
                        <th className="text-center py-2">Email</th>
                        <th className="text-center py-2">Phone Number</th>
                        <th className="text-center py-2">Hobbies</th>
                        <th className="text-center py-2">Actions</th>
                        <th className="text-center py-2">Select</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((user, index) => (
                        <>
                        <tr key={user._id}>
                             <td className="text-center py-3">{index + 1}</td>
                            <td className="text-center py-3">{user.name}</td>
                            <td className="text-center py-3">{user.email}</td>
                            <td className="text-center py-3">{user.age}</td>
                            <td className="text-center py-3">{user.hobbies}</td>
                            <td className="text-center py-3">
                                <button onClick={() => deleteHandler(user._id)} className="text-center bg-red-500 text-white rounded p-1 m-1 hover:bg-red-600">Delete 👎 </button>
                                <Link to={`/${user._id}`} className="ml-2 text-center bg-blue-500 text-white rounded hover:bg-blue-600 p-1 m-1">Update ✍️</Link>
                            </td>
                            <td className="text-center"><input type="checkbox" onChange={() => handleCheckboxChange(user)} /></td>
                        </tr>
                        </>
                        
                    ))}
                </tbody>
            </table>
            <form onSubmit={handlesubmit} className='bg-slate-300 '>
            <div className='flex my-2 justify-center items-center w-full '>
                 <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 rounded " > Submit to redpositive  </button> 
            </div>
            <hr/>
            <div className='flex justify-center items-center font-bold text-2xl mt-2 mb-2 p-2 '> Selected Users List </div>
            <table className="table-auto w-full ">
            <thead>
                        <tr >
                            <th className="text-center py-2">Name</th>
                            <th className="text-center py-2">Email</th>
                            <th className="text-center py-2">Phone Number</th>
                            <th className="text-center py-2">Hobbies</th>
                        </tr>
                    </thead>
                    <tbody>
                {selectedusers.map((user)=>{
                    return <tr key={user._id}>
                    <td className="text-center py-3">{user.name}</td>
                    <td className="text-center py-3">{user.email}</td>
                    <td className="text-center py-3">{user.age}</td>
                    <td className="text-center py-3">{user.hobbies}</td>
                </tr>
                            
                })}
            {/* </div> */}
            </tbody>
            </table>
            
           </form>
        </div>
    );
};

export default Read;
