import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider, useDispatch, useSelector } from 'react-redux';
// import store from './redux/store';
import Login from './components/auth/login'
import Register from './components/auth/register'
import Jobs from './components/jobs/jobs'
// import PrivateRoute from './components/routing/PrivateRoute'
import './App.css'
import JobForm from './components/admin/JobForm';
import JobList from './components/admin/JobList';
import { verifyUser } from './redux/reducer/userReducer';
import Navbar from './components/header/Navbar';
import AppliedJobs from './components/jobs/appliedJobs';

const App = () => {
const { user } = useSelector((state) => state.user);
const dispatch = useDispatch()

useEffect(()=>{
  console.log("hi");
  dispatch(verifyUser())
},[])

  return (
    <Router>
      {user && <Navbar/>}
      <div className="App mt-5">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/user/appliedjobs" element={<AppliedJobs />} />
          <Route exact path="/user/jobs" element={user?.role === "user" ? <Jobs /> : <Login/>} />
          <Route exact path="/admin/jobform" element={user?.role === "admin" ? <JobForm /> : <Login/>} />
          <Route exact path="/admin/jobform/:id" element={user?.role === "admin" ? <JobForm /> : <Login/>} />
          <Route exact path="/admin/joblist" element={user?.role === "admin" ? <JobList /> : <Login/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
