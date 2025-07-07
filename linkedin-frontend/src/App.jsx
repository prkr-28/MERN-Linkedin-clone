import React, {useState, useEffect} from 'react';
import './App.css';
import Footer from './components/Footer/footer';
import NavbarV1 from './components/Navbar/navbarV1';
import Landingpage from './pages/landingpage';
import {Routes, Route, Navigate} from 'react-router-dom';
import SignUp from './pages/signUp/signup';
import Login from './pages/login/login';
import NavbarV2 from './components/Navbar/navbarV2';
import Feed from './pages/feeds/feed';
import MyNetwork from './pages/network/mynetwork';
import Resume from './pages/resume/resume';
import Message from './pages/message/message';
import Profile from './pages/profile/myprofile';
import Activity from './pages/activities/activity';
import Notification from './pages/notifications/notifications';
import axios from 'axios';
import SingleActivity from './pages/singleactivity/singleActivity';

const App = () => {
   const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
   const checkLoginStatus = (val) => {
      setIsLogin(val);
   };
   //  useEffect(() => {
   //     fetchData();
   //  }, []);

   return (
      <div className="bg-gray-100 w-[100%] h-[100%] box-border">
         {isLogin ? <NavbarV2 /> : <NavbarV1 />}
         <Routes>
            <Route
               path="/"
               element={
                  isLogin ? (
                     <Navigate to={'/feed'} />
                  ) : (
                     <Landingpage checkLoginStatus={checkLoginStatus} />
                  )
               }
            />

            <Route
               path="/signUp"
               element={
                  isLogin ? (
                     <Navigate to={'/feed'} />
                  ) : (
                     <SignUp checkLoginStatus={checkLoginStatus} />
                  )
               }
            />

            <Route
               path="/login"
               element={
                  isLogin ? (
                     <Navigate to={'/feed'} />
                  ) : (
                     <Login checkLoginStatus={checkLoginStatus} />
                  )
               }
            />

            <Route
               path="/feed"
               element={isLogin ? <Feed /> : <Navigate to={'/login'} />}
            />

            <Route
               path="/mynetwork"
               element={isLogin ? <MyNetwork /> : <Navigate to={'/login'} />}
            />

            <Route
               path="/resume"
               element={isLogin ? <Resume /> : <Navigate to={'/login'} />}
            />

            <Route
               path="/notifications"
               element={isLogin ? <Notification /> : <Navigate to={'/login'} />}
            />

            <Route
               path="/messages"
               element={isLogin ? <Message /> : <Navigate to={'/login'} />}
            />

            <Route
               path="/profile/:id"
               element={isLogin ? <Profile /> : <Navigate to={'/login'} />}
            />

            <Route
               path="/profile/:id/activities"
               element={isLogin ? <Activity /> : <Navigate to={'/login'} />}
            />

            <Route
               path="/profile/:id/activities/:postId"
               element={
                  isLogin ? <SingleActivity /> : <Navigate to={'/login'} />
               }
            />
         </Routes>
         <Footer />
      </div>
   );
};

export default App;
