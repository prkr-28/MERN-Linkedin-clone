import React from 'react';
import './App.css';
import Footer from './components/Footer/footer';
import NavbarV1 from './components/Navbar/navbarV1';
import Landingpage from './pages/landingpage';
import { Routes, Route } from 'react-router-dom';
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

function App() {
  const isLogin = true; // This should be replaced with actual login state management logic
  return (
    <div className="bg-gray-100 w-[100%] h-[100%] box-border">
      {isLogin ? <NavbarV2 /> : <NavbarV1 />}
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/mynetwork" element={<MyNetwork />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/notifications" element={<Notification />} />
        <Route path="/messages" element={<Message />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/profile/:id/activities" element={<Activity />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
