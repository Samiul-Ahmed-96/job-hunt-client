import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { FiTrash } from "react-icons/fi";
import { useSelector } from "react-redux";
import Loading from "../../components/reusable/Loading";
import {
  useDeleteJobMutation,
  useGetJobQuery
} from "../../features/job/jobApi";

const ManageJob = () => {
  const { user } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetJobQuery();
  const [deleteJob, { isSuccess }] = useDeleteJobMutation();

  const jobs = data?.data || [];

  const filterEmployerJob = jobs.filter((job) => job?.email === user.email);
  console.log(filterEmployerJob);
  const handleDeleteJob = (id) => {
    deleteJob(id);
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Delete Successfully");
    }
  }, [isSuccess]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="pt-14">
      <div className="bg-primary/10 p-5 rounded-2xl">
        <h1 className="font-semibold text-xl">Manage Job</h1>
      </div>
      <div className="mt-10">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-white uppercase bg-primary">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Position
                </th>
                <th scope="col" class="px-6 py-3">
                  Company
                </th>
                <th scope="col" class="px-6 py-3">
                  Experience
                </th>
                <th scope="col" class="px-6 py-3">
                  Salary
                </th>
                <th scope="col" class="px-6 py-3">
                  Total Apply
                </th>
                <th scope="col" class="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {filterEmployerJob.map((job) => (
                <tr key={job._id} class="bg-white border-b  hover:bg-gray-50">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-primary whitespace-nowrap"
                  >
                    {job?.position}
                  </th>
                  <td class="px-6 py-4">{job?.companyName}</td>
                  <td class="px-6 py-4">{job?.experience}</td>
                  <td class="px-6 py-4">{job?.salaryRange}</td>
                  <td class="px-6 py-4">{job?.applicants.length}</td>
                  <td class="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteJob(job?._id)}
                      type="button"
                      className="grid place-items-center rounded-full flex-shrink-0 bg-red-500/20 border border-red-500 h-11 w-11 group transition-all hover:bg-red-500"
                    >
                      <FiTrash
                        className="text-red-500 group-hover:text-white transition-all"
                        size="20"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageJob;
