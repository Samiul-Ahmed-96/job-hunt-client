import React from 'react'
import { useSelector } from 'react-redux'
import JobCard from '../../components/reusable/JobCard'
import { useGetAppliedJobsQuery } from '../../features/job/jobApi'

const AppliedJobs = () => {
    const {user:{email}} = useSelector(state => state.auth)
    const {data, isLoading} = useGetAppliedJobsQuery(email);

    
  return (
   <div className='pt-14'>
    {
        data?.data.map((job)=> <JobCard key={job._id} jobData={job}></JobCard> )
    }
   </div>
  )
}

export default AppliedJobs