import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteJob, getJob } from '../../redux/reducer/jobReducer'

const JobList = () => {
  const dispatch = useDispatch()
  const jobs = useSelector((state) => state.jobList)

  useEffect(() => {
    dispatch(getJob())
  }, [dispatch])

  const handleDelete = (id) =>{
    dispatch(deleteJob(id))
  }

  return (
    <div className="my-4">
      <div className="container flex justify-between">
        <h2 className="text-2xl font-bold">Job Listings</h2>
        <Link
          className="btn bg-black text-white rounded p-2 "
          to={'/admin/jobform'}
        >
          Create Job
        </Link>
      </div>
      <table className="w-full border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Company Name</th>
            <th className="border border-gray-300 p-2">Position</th>
            <th className="border border-gray-300 p-2">Contract</th>
            <th className="border border-gray-300 p-2">Location</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs?.jobList?.map((job) => {
            return (
              <tr key={job._id}>
                <td className="border border-gray-300 p-2">{job.company}</td>
                <td className="border border-gray-300 p-2">{job.position}</td>
                <td className="border border-gray-300 p-2">{job.contract}</td>
                <td className="border border-gray-300 p-2">{job.location}</td>
                <td className="border border-gray-300 p-2">
                  <button className="bg-red-500 text-white px-3 py-2 rounded" onClick={()=>handleDelete(job._id)}>
                    Delete
                  </button>
                  <Link to={`/admin/jobform/${job._id}`} className="bg-green-500 text-white px-3 ms-3 py-2 rounded" >
                    Edit
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default JobList
