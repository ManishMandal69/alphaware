import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/reducer/userReducer';

const Register = () => {
  const [formData, setFormData] = useState({name:'', email: '', password: '' });
  const dispatch = useDispatch();  
  const onSubmit = e => {
    e.preventDefault();
    dispatch(registerUser({name: formData.name, email:formData.email, password:formData.password}));
  };

  return (
    <div className='flex items-center justify-center'>
      <div className="container w-[476px] h-[520px] mt-5 p-10 rounded-lg shadow-md border">
        <div className="container text-center">
          <h1 className='text-2xl font-bold'>Create your account</h1>
        </div>
        <div className="container">
          <form onSubmit={onSubmit}>
            <div className="container mt-3 h-[74px]">
              <p className='text-[12px]'>Name</p>
              <input
                type="text"
                className='w-full text-[14px] p-3 border border-gray-300 rounded h-[40px]'
                placeholder='Enter'
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name:e.target.value}))}
              />
            </div>
            <div className="container mt-3 h-[74px]">
              <p className='text-[12px]'>Email</p>
              <input
                type="text"
                className='w-full border text-[14px] p-3 border-gray-300 rounded h-[40px]'
                placeholder='Enter'
                value={formData.email}
                onChange={(e) => setFormData(prev => ({...prev, email:e.target.value}))}
              />
            </div>
            <div className="container mt-3 h-[74px]">
              <p className='text-[12px]'>Password</p>
              <input
                type="password"
                className='w-full border text-[14px] p-3 border-gray-300 rounded h-[40px]'
                placeholder='Enter'
                value={formData.password}
                onChange={(e) => setFormData(prev => ({...prev, password:e.target.value}))}
              />
            </div>
            <button
              type="submit"
              className='border mt-4 py-3 px-3 bg-black text-white rounded-md w-[100%] text-[14px] uppercase'
            >
              Submit
            </button>
          </form>
          <div className='mt-4 text-center'>
            <span className='text-[14px]'>
              Have an Account? {' '}
              <span className='uppercase font-bold'>Login</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
