import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { applyJobList, getJob } from '../../redux/reducer/jobReducer';

const Jobs = () => {
  const dispatch = useDispatch()
  const [company, setCompany] = useState("")
  const [contract, setContract] = useState("")
  const [location, setLocation] = useState("")
  const jobs = useSelector((state) => state.jobList)

  useEffect(() => {
    dispatch(getJob())
  }, [dispatch])

  const handleApply = (job) => {
    dispatch(applyJobList(job))
  }


  return (
    <>
      <div className="container flex justify-between items-center mb-5">
      <h1 className="text-3xl">Jobs</h1>
      <div className='flex'>
        <span className='m-2'>Company:</span>
        <input type="text" className='w-full border text-[14px] p-3 border-gray-300 rounded h-[40px]' placeholder='search...' value={company} onChange={(e) => setCompany(e.target.value)}/>
      </div>
      <div className='flex'>
        <span className='m-2'>location:</span>
        <input type="text" className='w-full border text-[14px] p-3 border-gray-300 rounded h-[40px]' placeholder='search...' value={location} onChange={(e) => setLocation(e.target.value)}/>
      </div>
      <div className='flex'>
        <span className='m-2'>Contract:</span>
        <input type="text" className='w-full border text-[14px] p-3 border-gray-300 rounded h-[40px]' placeholder='search...' value={contract} onChange={(e) => setContract(e.target.value)} />
      </div>
      </div>
      <hr/>
      <div className="container mx-auto flex flex-wrap gap-4 mt-4">
      {
      jobs?.jobList?.filter((job)=> job.company.toLowerCase().includes(company.toLowerCase()) && job.location.toLowerCase().includes(location.toLowerCase()) && job.contract.toLowerCase().includes(contract.toLowerCase())).map((job)=>{
        const isApplied = jobs.appliedJobList.find((row)=> row._id === job._id)
        return(
          <div key={job._id} className="p-4 border border-gray-300 rounded mb-4 w-[23%]">
      <h2 className="text-2xl">{job.company}</h2>
      <p>{job.position}</p>
      <p>{job.contract}</p>
      <p>{job.location}</p>
      <button className="bg-black text-white rounded-md px-4 py-2 mt-2 " onClick={()=>handleApply(job)}>{!isApplied ? "Apply" : "Applied"}</button>
    </div>
        )
      })
    }
    </div>
    </>
    
  );
};

export default Jobs;
