import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import loginImage from "../assets/login.svg";
import { loginUser, loginUserWithGoogle } from "../features/auth/authSlice";
const Login = () => {
  const {user} = useSelector(state => state.auth)
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, email, isError, error ,IsError} = useSelector(
    (state) => state.auth
  );
  

  //Handle Login
  const onSubmit = ({ email, password }) => {
    dispatch(loginUser({ email, password }));
    reset();
  };

  useEffect(() => {
    if (!isLoading && email) {
      navigate("/");
    }
  }, [isLoading, email]);

  useEffect(() => {
    if (isError) {
      toast.error(error, { id: "login" });
    }
  }, [isError, error]);

  
  useEffect(()=>{
    if(user.role == 'employer'){
      navigate('/')
    }
    if(user.role == 'candidate'){
      navigate('/')
    }
  },[user.role])

  return (
    <div className="flex h-screen items-center bg-primary/10">
      <div className="w-1/2">
        <img src={loginImage} className="h-full w-full" alt="" />
      </div>
      <div className="w-1/2 grid place-items-center">
        <div className="bg-white shadow-lg rounded-lg grid place-items-center p-10">
          <h1 className="mb-10 font-medium text-2xl">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <div className="flex flex-col items-start">
                <label htmlFor="email" className="ml-5">
                  Email
                </label>
                <input type="email" {...register("email")} id="email" />
              </div>
              <div className="flex flex-col items-start">
                <label htmlFor="password" className="ml-5">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                />
              </div>
              <div className="relative !mt-8">
                <button
                  type="submit"
                  className="font-bold text-white py-3 rounded-full bg-primary w-full"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(loginUserWithGoogle())}
                  className="font-bold text-white py-3 my-3 rounded-full bg-primary w-full"
                >
                  Login with google
                </button>
              </div>
              <div>
                <p>
                  Don't have an account?{" "}
                  <span
                    className="text-primary hover:underline cursor-pointer"
                    onClick={() => navigate("/signup")}
                  >
                    Sign up
                  </span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
