import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import GoogleLoginComp from '../../components/googleauth/googleLogin';

const SignUp = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-4xl text-center font-semibold mb-5 mt-5 text-blue-800 px-1">
        <h1 className="mx-auto">Make the most of your professional life.</h1>
      </div>
      <div className="w-[85%] md:w-[28%] shadow-xl rounded-b-md box p-10">
        <div className="flex flex-col gap-4">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="w-full text-xl border-2 rounded-lg px-5 py-1 text-gray-500"
              placeholder="Enter Your Email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              className="w-full text-xl border-2 rounded-lg px-5 py-1 text-gray-500"
              placeholder="Enter Password"
            />
          </div>
          <div>
            <label htmlFor="fullname">FullName</label>
            <input
              type="text"
              className="w-full text-xl border-2 rounded-lg px-5 py-1 text-gray-500"
              placeholder="Enter FullName"
            />
          </div>

          <div className="w-full hover:bg-blue-900 bg-blue-800 text-white py-3 px-4 text-xl rounded-xl text-center cursor-pointer">
            Register
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="border-b-1 border-gray-400 w-[45%]" />
          <div>or</div>
          <div className="border-b-1 border-gray-400 w-[45%] my-6" />
        </div>

        <GoogleLoginComp />
      </div>
      <div className="mt-5 mb-10">
        Already on LinkedIn?{' '}
        <Link
          to={'/login'}
          className="text-blue-800 hover:underline cursor-pointer">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
