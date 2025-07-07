import React, {useState} from 'react';
import {FcGoogle} from 'react-icons/fc';
import {Link, useNavigate} from 'react-router-dom';
import GoogleLoginComp from '../../components/googleauth/googleLogin';
import {ToastContainer, toast} from 'react-toastify';
import axios from 'axios';

const SignUp = (props) => {
   const navigate = useNavigate();
   const [signupField, setSignupField] = useState({
      email: '',
      password: '',
      f_name: '',
   });
   const onchangeInput = (event, key) => {
      setSignupField({
         ...signupField,
         [key]: event.target.value,
      });
   };
   const handleregister = async () => {
      if (
         signupField.email.trim().length === 0 ||
         signupField.password.trim().length === 0 ||
         signupField.f_name.trim().length === 0
      ) {
         return toast.error('Please fill all fields');
      }
      await axios
         .post('http://localhost:4000/api/auth/register', signupField)
         .then((response) => {
            toast.success('Registration successful');
            setSignupField({
               email: '',
               password: '',
               f_name: '',
            });
            navigate('/login');
         })
         .catch((error) => {
            console.error('There was an error registering!', error);
            toast.error(error.response.data.message || 'Registration failed');
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
               <div>
                  <label htmlFor="email">Email</label>
                  <input
                     type="text"
                     value={signupField.email}
                     onChange={(e) => onchangeInput(e, 'email')}
                     className="w-full text-xl border-2 rounded-lg px-5 py-1"
                     placeholder="Enter Your Email"
                  />
               </div>
               <div>
                  <label htmlFor="password">Password</label>
                  <input
                     type="text"
                     value={signupField.password}
                     onChange={(e) => onchangeInput(e, 'password')}
                     className="w-full text-xl border-2 rounded-lg px-5 py-1"
                     placeholder="Enter Password"
                  />
               </div>
               <div>
                  <label htmlFor="fullname">FullName</label>
                  <input
                     type="text"
                     value={signupField.f_name}
                     onChange={(e) => onchangeInput(e, 'f_name')}
                     className="w-full text-xl border-2 rounded-lg px-5 py-1"
                     placeholder="Enter FullName"
                  />
               </div>

               <div
                  onClick={handleregister}
                  className="w-full hover:bg-blue-900 bg-blue-800 text-white py-3 px-4 text-xl rounded-xl text-center cursor-pointer">
                  Register
               </div>
            </div>
            <div className="flex items-center gap-2">
               <div className="border-b-1 border-gray-400 w-[45%]" />
               <div>or</div>
               <div className="border-b-1 border-gray-400 w-[45%] my-6" />
            </div>

            <GoogleLoginComp checkLoginStatus={props.checkLoginStatus} />
         </div>
         <div className="mt-5 mb-10">
            Already on LinkedIn?{' '}
            <Link
               to={'/login'}
               className="text-blue-800 hover:underline cursor-pointer">
               Sign in
            </Link>
         </div>

         <ToastContainer position="bottom-right" autoClose={3000} />
      </div>
   );
};

export default SignUp;
