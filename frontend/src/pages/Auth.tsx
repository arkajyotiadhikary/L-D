import React, { useState } from "react";

import { signin, signup } from '../services/authService.ts';

import AuthForm from '../components/AuthForm.tsx';

const Auth: React.FC = () => {

  const [isSignIn, setIsSignIn] = useState(true);

  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setCredentials((prevState) => ({
      ...prevState, [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignIn) {
        const data = await signin(credentials);
        console.log('Sign in successfull', data);
      }
      else {
        const data = await signup(credentials);
        console.log('Sign up successfull', data);
      }
    } catch (error) {
      setError('An error occured. Please try again.');
      console.error(error);
    }
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white'>
      <div className='bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md'>
        <h1 className='text-3xl font-bold mb-8 text-center'>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
        <div className='flex justify-center mb-6'>
          <button className={`px-4 py-2 rounded-s-lg transition duration-300 ${isSignIn ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`} onClick={() => setIsSignIn(true)}>Sign In</button>
          <button className={`px-4 py-2 rounded-e-lg transition duration-300 ${!isSignIn ? 'bg-blue-500' : 'bg-gray-700 hover:bg-gray-600'}`} onClick={() => setIsSignIn(false)}> Sign Up</button>
        </div>
        <AuthForm credentials={credentials} isSignIn={isSignIn} handleSubmit={handleSubmit} handleChange={handleChange} error={error} />
      </div>
    </div >
  )
}

export default Auth;
