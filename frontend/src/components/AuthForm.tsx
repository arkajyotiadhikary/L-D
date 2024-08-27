import React from 'react';

interface AuthFormProps {
  credentials: {
    username: string,
    password: string,
  }
  isSignIn: boolean;
  handleSubmit: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({ credentials, isSignIn, handleSubmit, handleChange, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className='mb-4'>
        <label className='block mb-2'>Username</label>
        <input type='text' id='username' name='username' value={credentials.username} className='w-full p-2 rounded-lg bg-gray-700 text-white' onChange={handleChange} />
      </div>
      <div className='mb-4'>
        <label className='block mb-2'>Password</label>
        <input type='password' id='password' name='password' value={credentials.password} className='w-full p-2 rounded-lg bg-gray-700 text-white' onChange={handleChange} />
      </div>
      <button type='submit'
        className='w-full bg-blue-500 py-2 mt-3 rounded-lg hover:bg-blue-600 transition duration-300'>
        {isSignIn ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default AuthForm;
