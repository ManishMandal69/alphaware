// src/components/jobs/Jobs.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { applyJobList, getJob } from '../../redux/reducer/jobReducer';

const AppliedJobs = () => {
  const jobs = useSelector((state) => state.jobList)

  return (
    <>
      <hr/>
      <div className="container mx-auto flex flex-wrap gap-4 mt-4">
      {
      jobs?.appliedJobList?.map((job)=>{
        return(
          <div key={job._id} className="p-4 border border-gray-300 rounded mb-4 w-[23%]">
      <h2 className="text-2xl">{job.company}</h2>
      <p>{job.position}</p>
      <p>{job.contract}</p>
      <p>{job.location}</p>
    </div>
        )
      })
    }
    </div>
    </>
    
  );
};

export default AppliedJobs;
