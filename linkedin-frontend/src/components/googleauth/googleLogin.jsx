import React from 'react';
import {GoogleLogin} from '@react-oauth/google';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const GoogleLoginComp = (props) => {
   const navigate = useNavigate();
   const handleOnSuccess = async (credresponse) => {
      const tokenId = credresponse.credential;
      const res = await axios.post(
         'http://localhost:4000/api/auth/google-login',
         {tokenId},
         {withCredentials: true}
      );
      console.log('Google Login Response:', res);
      localStorage.setItem('isLogin', true);
      localStorage.setItem('token', tokenId);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      props.checkLoginStatus(true);
      navigate('/feed');
   };

   return (
      <div className="w-full">
         <GoogleLogin
            onSuccess={(credentialResponse) =>
               handleOnSuccess(credentialResponse)
            }
            onError={() => {
               console.log('Login Failed');
            }}
         />
      </div>
   );
};

export default GoogleLoginComp;
