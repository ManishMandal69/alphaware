import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { logoutUser } from '../../redux/reducer/userReducer';

const Navbar = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user);

    const handleLogout = () =>{
        localStorage.removeItem('token')
        dispatch(logoutUser())
    }
  return (
    <div className='flex justify-between border-b p-3 shadow-md' >
      <h1 className='font-bold'>Alphaware</h1>
      <div className="flex gap-5">
      {
        user?.role === "user" && (
            <>
            <span><Link to={"/user/jobs"}>Jobs</Link></span>
            <span><Link to={"/user/appliedjobs"}>Applied</Link></span>
            </>
        )
      }
      <span className="cursor-pointer " onClick={handleLogout}>Logout</span>
      </div>
    </div>
  )
}

export default Navbar
