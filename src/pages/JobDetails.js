import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Loading from '../components/reusable/Loading';

import { BsArrowReturnRight, BsArrowRightShort } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import uuid from "react-uuid";
import meeting from "../assets/meeting.jpg";
import {
  useApplyJobMutation,
  useAskedQuestionMutation,
  useGetJobByIdQuery,
  useReplyQuesMutation
} from "../features/job/jobApi";

const JobDetails = () => {
  const [reply , setReply] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { register, handleSubmit, reset } = useForm();
  const { data, isLoading, isError } = useGetJobByIdQuery(id ,{pollingInterval : 5000});
  const [applyJob, { isSuccess }] = useApplyJobMutation();
  const [askedQues, {}] = useAskedQuestionMutation();
  const [replyQues] = useReplyQuesMutation();
  const {
    position,
    companyName,
    employmentType,
    experience,
    location,
    requirements,
    responsibilities,
    salaryRange,
    skills,
    overview,
    queries,
    workLevel,
    _id,
  } = data?.data || {};

  const handleApply = () => {
    if (user.role === "employer") {
      toast.error("You need a candidate account to apply");
      return;
    }
    if (user.role === "") {
      navigate("/register");
      return;
    }

    const data = {
      userId: user._id,
      email: user.email,
      jobId: _id,
    };
    applyJob(data);
  };

  const handleAskedQuestion = (data) => {
    const quesData = {
      userId: user._id,
      email: user.email,
      jobId: _id,
      question: data.askedQues,
    };
    askedQues(quesData);
    reset()
    };

  const handleReplyQues = (id) =>{
    const data = {
      reply,
      userId : id,
      jobId: _id,
    }
    replyQues(data);
    reset();
  }

  useEffect(()=>{
    if(isSuccess){
      toast.success("Apply Successfully")
    }
  },[isSuccess])


  if(isLoading) { 
    return <Loading/>
  }

  return (
    <div className="pt-14 grid grid-cols-12 gap-5 lg:px-0 md:px-4">
      <div className="lg:col-span-9 md:col-span-12 sm:col-span-12 mb-10">
        <div className="h-80 rounded-xl overflow-hidden">
          <img className="h-full w-full object-cover" src={meeting} alt="" />
        </div>
        <div className="space-y-5">
          <div className="flex justify-between items-center mt-5">
            <h1 className="text-xl font-semibold text-primary">{position}</h1>
            <button onClick={handleApply} className="btn">
              Apply
            </button>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Overview</h1>
            <p>{overview}</p>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">Skills</h1>
            <ul>
              {
                skills?.map(skill => 
                  
                  <li key={uuid()} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
                  )
              }
            </ul>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Requirements
            </h1>
            <ul>
              {requirements?.map((skill) => (
                <li key={uuid()} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1 className="text-primary text-lg font-medium mb-3">
              Responsibilities
            </h1>
            <ul>
              {responsibilities?.map((skill) => (
                <li key={uuid()} className="flex items-center">
                  <BsArrowRightShort /> <span>{skill}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <hr className="my-5" />
        <div>
          <div>
            <h1 className="text-xl font-semibold text-primary mb-5">
              General Q&A
            </h1>
            <div className="text-primary my-2">
              {queries?.map(({ question, email, reply, id }) => (
                <div key={uuid()}>
                  <small>{email}</small>
                  <p className="text-lg font-medium">{question}</p>
                  {reply?.map((item) => (
                    <p
                      key={uuid()}
                      className="flex items-center gap-2 relative left-5"
                    >
                      <BsArrowReturnRight /> {item}
                    </p>
                  ))}

                  {user.role === "employer" && (
                    <div className="flex gap-3 my-5">
                      <input
                        placeholder="Reply"
                        type="text"
                        className="w-full"
                        onBlur={(e)=>setReply(e.target.value)}
                      />
                      <button
                        className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                        type="button"
                        onClick={()=> handleReplyQues(id)}
                      >
                        <BsArrowRightShort size={30} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {user.role === "candidate" && (
              <form onSubmit={handleSubmit(handleAskedQuestion)}>
                <div className="flex gap-3 my-5">
                  <input
                    placeholder="Ask a question..."
                    type="text"
                    className="w-full"
                    {...register("askedQues")}
                  />
                  <button
                    className="shrink-0 h-14 w-14 bg-primary/10 border border-primary hover:bg-primary rounded-full transition-all  grid place-items-center text-primary hover:text-white"
                    type="submit"
                  >
                    <BsArrowRightShort size={30} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      <div className="lg:col-span-3 md:col-span-12 sm:col-span-12 ">
        <div className="rounded-xl bg-primary/10 p-5  space-y-5">
          <div>
            <p>Experience</p>
            <h1 className="font-semibold text-lg">{experience}</h1>
          </div>
          <div>
            <p>Work Level</p>
            <h1 className="font-semibold text-lg">{workLevel}</h1>
          </div>
          <div>
            <p>Employment Type</p>
            <h1 className="font-semibold text-lg">{employmentType}</h1>
          </div>
          <div>
            <p>Salary Range</p>
            <h1 className="font-semibold text-lg">{salaryRange}</h1>
          </div>
          <div>
            <p>Location</p>
            <h1 className="font-semibold text-lg">{location}</h1>
          </div>
        </div>
        <div className="mt-5 rounded-xl bg-primary/10 p-5  space-y-5">
          <div>
            <h1 className="font-semibold text-lg">{companyName}</h1>
          </div>
          <div>
            <p>Company Size</p>
            <h1 className="font-semibold text-lg">Above 100</h1>
          </div>
          <div>
            <p>Founded</p>
            <h1 className="font-semibold text-lg">2001</h1>
          </div>
          <div>
            <p>Email</p>
            <h1 className="font-semibold text-lg">company.email@name.com</h1>
          </div>
          <div>
            <p>Company Location</p>
            <h1 className="font-semibold text-lg">Los Angeles</h1>
          </div>
          <div>
            <p>Website</p>
            <a className="font-semibold text-lg" href="#">
              https://website.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
