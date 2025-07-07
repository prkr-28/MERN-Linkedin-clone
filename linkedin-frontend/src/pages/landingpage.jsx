import React from 'react';
import {FcGoogle} from 'react-icons/fc';
import {Link} from 'react-router-dom';
import GoogleLoginComp from '../components/googleauth/googleLogin';

const Landingpage = (props) => {
   return (
      <div className="my-2 pt-[40px] md:pl-[60px] pl-5 md:flex justify-between">
         <div className="md:w-[50%]">
            <div className="text-5xl text-blue-800 font">
               Welcome To Your{' '}
               <span className="font-semibold text-blue-900">
                  Proffesional Community
               </span>
            </div>
            <div className="w-[70%] my-3 mt-[20px] rounded-full">
               <GoogleLoginComp checkLoginStatus={props.checkLoginStatus} />
            </div>
            <Link
               to={'/login'}
               className="flex mt-[20px] py-2 bg-white gap-2 rounded-3xl items-center w-[70%] justify-center text-black hover:bg-gray-200 border border-blue-800 cursor-pointer ">
               Sign in with email
            </Link>
            <div className="mb-4 text-center text-xs text-gray-600 w-[70%] mt-6 px-5">
               By clicking Continue to join or sign in, you agree to{' '}
               <span className="text-blue-700 cursor-pointer hover:underline">
                  Linkedin's user Agreement
               </span>
               ,{' '}
               <span className="text-blue-700 cursor-pointer hover:underline">
                  Privacy Policy
               </span>
               , and{' '}
               <span className="text-blue-700 cursor-pointer hover:underline">
                  {' '}
                  Cookie Policy.
               </span>
            </div>
            <div className="text-center mb-4 text-[16px] w-[70%] mt-4">
               New To LinkedIn?{' '}
               <span className="text-blue-700 cursor-pointer hover:underline">
                  <Link to={'/signUp'}>Join now</Link>
               </span>
            </div>
         </div>
         <div className="md:w-[50%] h-120">
            <img
               className="w-full h-full"
               src="https://media.licdn.com/media//AAYAAgSrAAgAAQAAAAAAAGM6w-NyPk-_SVikYiCJ6V3Z-Q.png"
               alt=""
            />
         </div>
      </div>
   );
};

export default Landingpage;
