import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC<{ isSignedIn: boolean }> = ({ isSignedIn }) => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className='container mx-auto flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>
          <Link to="/" className="text-white">Lizmotors</Link>
        </h1>
        <div>
          {isSignedIn ? (
            <img src="" alt="Profile" className='w-8 h-8 rounded-full' />
          ) : (<Link to="/auth" className='bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-500'>Sign In</Link>)}
        </div>

      </div>
    </nav>
  )
}

export default Navbar;
