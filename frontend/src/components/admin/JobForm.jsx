// src/components/admin/JobForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJob, editJob, getJob } from '../../redux/reducer/jobReducer';
import { useNavigate, useParams } from 'react-router-dom';

const JobForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const jobList = useSelector(state => state.jobList.jobList);
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    contract: '',
    location: '',
  });

  useEffect(() => {
    dispatch(getJob())
  }, [dispatch])
  useEffect(() => {
    if (id) {
      const job = jobList.find(job => job._id === id);
      if (job) {
        
        setFormData({
          company: job.company,
          position: job.position,
          contract: job.contract,
          location: job.location,
        });
      }
    }
  }, [id, jobList]);

  const onSubmit = e => {
    e.preventDefault();
    if (id) {
      dispatch(editJob({ id, ...formData }));
    } else {
      dispatch(createJob(formData));
    }
    navigate('/admin/joblist');
  };

  return (
    <div className='flex items-center justify-center'>
      <div className="container w-[476px] h-[520px] mt-5 p-10 rounded-lg shadow-md border">
        <div className="container text-center">
          <h1 className='text-2xl font-bold'>{id ? 'Edit Job' : 'Post a Job'}</h1>
        </div>
        <div className="container">
          <form onSubmit={onSubmit}>
            <div className="container mt-3 h-[74px]">
              <p className='text-[12px]'>Company Name</p>
              <input
                type="text"
                className='w-full text-[14px] p-3 border border-gray-300 rounded h-[40px]'
                placeholder='Enter'
                value={formData.company}
                onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
              />
            </div>
            <div className="container mt-3 h-[74px]">
              <p className='text-[12px]'>Position</p>
              <input
                type="text"
                className='w-full border text-[14px] p-3 border-gray-300 rounded h-[40px]'
                placeholder='Enter'
                value={formData.position}
                onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
              />
            </div>
            <div className="container mt-3 h-[74px]">
              <p className='text-[12px]'>Contract</p>
              <input
                type="text"
                className='w-full border text-[14px] p-3 border-gray-300 rounded h-[40px]'
                placeholder='Enter'
                value={formData.contract}
                onChange={(e) => setFormData(prev => ({ ...prev, contract: e.target.value }))}
              />
            </div>
            <div className="container mt-3 h-[74px]">
              <p className='text-[12px]'>Location</p>
              <input
                type="text"
                className='w-full border text-[14px] p-3 border-gray-300 rounded h-[40px]'
                placeholder='Enter'
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <button
              type="submit"
              className='border mt-4 py-3 px-3 bg-black text-white rounded-md w-[100%] text-[14px] uppercase'
            >
              {id ? 'Edit Job' : 'Post Job'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
