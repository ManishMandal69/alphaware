import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/reducer/userReducer';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();  
const { user } = useSelector((state) => state.user);


  const onSubmit = e => {
    e.preventDefault();
    dispatch(loginUser({email:formData.email, password:formData.password}));
  };

  useEffect(() => {
    if (user) {
      if (user?.role === "user") {
        navigate("/user/jobs");
      } else if (user?.role === "admin") {
        navigate("/admin/joblist");
      }
    }
  }, [user]);

  return (
    <div className='flex items-center justify-center'>
      <div className="container w-[476px] h-[320px] mt-5 p-10 rounded-lg shadow-md border">
        <div className="container text-center">
          <h1 className='text-2xl font-bold'>Login</h1>
        </div>
        <div className="container">
          <form onSubmit={onSubmit}>
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
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
