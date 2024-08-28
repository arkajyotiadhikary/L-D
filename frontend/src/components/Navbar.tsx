
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <Link to="/" className="text-white">Lizmotors</Link>
        </h1>
        <div>
          {isAuthenticated ? (
            <button
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-500"
              onClick={logout}
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/auth"
              className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-500"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

