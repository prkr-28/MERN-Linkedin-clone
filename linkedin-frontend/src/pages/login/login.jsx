import React, {useState} from 'react';
import {FcGoogle} from 'react-icons/fc';
import {Link, useNavigate} from 'react-router-dom';
import GoogleLoginComp from '../../components/googleauth/googleLogin';
import {ToastContainer, toast} from 'react-toastify';
import axios from 'axios';

const Login = (props) => {
   const navigate = useNavigate();
   const [loginField, setLoginField] = useState({
      email: '',
      password: '',
   });
   const onchangeInput = (event, key) => {
      setLoginField({
         ...loginField,
         [key]: event.target.value,
      });
   };

   const handleLogin = async () => {
      await axios
         .post('http://localhost:4000/api/auth/login', loginField, {
            withCredentials: true,
         })
         .then((response) => {
            console.log('Login successful:', response);
            localStorage.setItem('isLogin', true);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            props.checkLoginStatus(true);
            navigate('/feed');
         })
         .catch((error) => {
            console.error('There was an error logging in!', error);
            toast.error(error.response.data.message || 'Login failed');
         });
   };
   return (
      <div className="w-full flex flex-col items-center">
         <div className="text-4xl text-center font-semibold mb-5 mt-5 text-blue-800 px-1">
            <h1 className="mx-auto">
               Make the most of your professional life.
            </h1>
         </div>
         <div className="w-[85%] md:w-[28%] shadow-xl rounded-b-md box p-10">
            <div className="flex flex-col gap-4">
               <GoogleLoginComp checkLoginStatus={props.checkLoginStatus} />
               <div className="flex items-center gap-2">
                  <div className="border-b-1 border-gray-400 w-[45%]" />
                  <div>or</div>
                  <div className="border-b-1 border-gray-400 w-[45%] my-6" />
               </div>
               <div>
                  <label htmlFor="email">Email</label>
                  <input
                     type="text"
                     value={loginField.email}
                     onChange={(e) => onchangeInput(e, 'email')}
                     className="w-full text-xl border-2 rounded-lg px-5 py-1 text-gray-500"
                     placeholder="Enter Your Email"
                  />
               </div>
               <div>
                  <label htmlFor="password">Password</label>
                  <input
                     type="text"
                     value={loginField.password}
                     onChange={(e) => onchangeInput(e, 'password')}
                     className="w-full text-xl border-2 rounded-lg px-5 py-1 text-gray-500"
                     placeholder="Enter Password"
                  />
               </div>
               <div
                  onClick={handleLogin}
                  className="w-full hover:bg-blue-900 bg-blue-800 text-white py-3 px-4 text-xl rounded-xl text-center cursor-pointer">
                  Sign in
               </div>
            </div>
         </div>
         <div className="mt-5 mb-10">
            New to LoinkedIn?{' '}
            <Link
               to={'/signUp'}
               className="text-blue-800 hover:underline cursor-pointer">
               Join Now
            </Link>
         </div>

         <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
   );
};

export default Login;
