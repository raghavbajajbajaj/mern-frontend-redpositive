import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="bg-white shadow ">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <div>
              <a className="text-2xl font-bold text-gray-800" href="#">MERN</a>
            </div>
            <div className="flex">
              <ul className="flex space-x-4">
                <li>
                  <Link to={"/"} className="text-gray-800 hover:text-gray-600 border border-black m-1 p-1 rounded font-bold">Create New Employee</Link>
                </li>
                <li>
                  <Link to={"/all"} className="text-gray-800 hover:text-gray-600 border border-black m-1 p-1 rounded font-bold">All Employees</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
