import React, {useState, useEffect} from 'react';
import './navbarv2.css';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WorkIcon from '@mui/icons-material/Work';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {Link, useLocation} from 'react-router-dom';
import {Search} from 'lucide-react';
import axios from 'axios';

const NavbarV2 = () => {
   const [dropdown, setdropdown] = useState(false);
   const location = useLocation();

   const [userData, setUserData] = useState(null);

   const [searchTerm, setSearchTerm] = useState('');
   const [debouncingTerm, setDebouncingTerm] = useState('');
   const [searchUser, setSearchUser] = useState([]);
   const [unreadNotifications, setUnreadNotifications] = useState(0);

   useEffect(() => {
      const handler = setTimeout(() => {
         setDebouncingTerm(searchTerm);
      }, 500);
      return () => {
         clearTimeout(handler);
      };
   }, [searchTerm]);

   const fetchSearchUser = async () => {
      try {
         const res = await axios.get(
            `http://localhost:4000/api/auth/finduser?query=${debouncingTerm}`,
            {withCredentials: true}
         );
         console.log(res);
         setSearchUser(res.data.users);
         setdropdown(!dropdown);
      } catch (error) {
         console.error('Error fetching search users:', error);
      }
   };

   const fetchNotifications = async () => {
      await axios
         .get('http://localhost:4000/api/notification/getUnreadCount', {
            withCredentials: true,
         })
         .then((res) => {
            setUnreadNotifications(res.data.unreadCount);
         })
         .catch((err) => {
            console.error('Error fetching notifications:', err);
         });
   };

   useEffect(() => {
      if (debouncingTerm) {
         fetchSearchUser();
      }
   }, [debouncingTerm]);

   useEffect(() => {
      const userData = localStorage.getItem('user');
      if (userData) {
         setUserData(JSON.parse(userData));
      }

      fetchNotifications();
   }, []);
   return (
      <div className="bg-white h-13 flex justify-between py-1 px-18 xl:px-52 fixed top-0 w-[100%] z-1000 ">
         <div className="flex gap-2 item-centre">
            <Link
               to={'/feed'}
               className="flex items-center justify-center h-full">
               <img
                  className="w-9 h-9 cursor-pointer"
                  src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
                  alt=""
               />
            </Link>
            <div className="relative">
               <div className="flex items-center justify-center h-full">
                  <div className="relative w-70">
                     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
                     <input
                        value={searchTerm}
                        onChange={(e) => {
                           setSearchTerm(e.target.value);
                        }}
                        className="searchinput w-full bg-white text-sm border border-gray-400 h-8 pl-10 pr-4 rounded-3xl"
                        placeholder="Search"
                     />
                  </div>
               </div>

               {dropdown && debouncingTerm.length != 0 && (
                  <div className="absolute w-88 left-0 bg-white rounded-[8px]">
                     {searchUser.length > 0
                        ? searchUser.map((user) => (
                             <Link
                                onClick={() => debouncingTerm('')}
                                to={`/profile/${user?._id}`}
                                key={user?._id}
                                className="flex gap-2 mb-1 items-center hover:bg-gray-100 rounded-[8px] cursor-pointer">
                                <div>
                                   <img
                                      className="w-10 h-10 rounded-full"
                                      src={user?.profile_pic}
                                      alt=""
                                   />
                                </div>
                                <div>{user?.f_name}</div>
                             </Link>
                          ))
                        : setdropdown(false)}
                  </div>
               )}
            </div>
         </div>

         <div className="hidden h-13 md:flex gap-8 px-4">
            <Link
               to={'/feed'}
               className="flex flex-col items-center justify-center cursor-pointer">
               <HomeIcon
                  sx={{color: location.pathname === '/feed' ? 'black' : 'gray'}}
               />
               <div
                  className={`text-sm text-gray-500 ${
                     location.pathname === '/feed'
                        ? 'border-b-3 border-b-blue-800'
                        : ''
                  }`}>
                  Home
               </div>
            </Link>
            <Link
               to={'/mynetwork'}
               className="flex flex-col items-center cursor-pointer">
               <PeopleAltIcon
                  sx={{
                     color:
                        location.pathname === '/mynetwork' ? 'black' : 'gray',
                  }}
               />
               <div
                  className={`text-sm text-gray-500 whitespace-nowrap ${
                     location.pathname === '/mynetwork'
                        ? 'border-b-3 border-b-blue-800'
                        : ''
                  }`}>
                  My network
               </div>
            </Link>
            <Link
               to={'/resume'}
               className="flex flex-col items-center cursor-pointer">
               <WorkIcon
                  sx={{
                     color: location.pathname === '/resume' ? 'black' : 'gray',
                  }}
               />
               <div
                  className={`text-sm text-gray-500 ${
                     location.pathname === '/resume'
                        ? 'border-b-3 border-b-blue-800'
                        : ''
                  }`}>
                  Resume
               </div>
            </Link>
            <Link
               to={'/messages'}
               className="flex flex-col items-center cursor-pointer">
               <MessageIcon
                  sx={{
                     color:
                        location.pathname === '/messages' ? 'black' : 'gray',
                  }}
               />
               <div
                  className={`text-sm text-gray-500 ${
                     location.pathname === '/messages'
                        ? 'border-b-3 border-b-blue-800'
                        : ''
                  }`}>
                  Message
               </div>
            </Link>
            <Link
               to={'/notifications'}
               className="flex flex-col items-center cursor-pointer">
               <div className="flex gap-1 items-center justify-center">
                  <NotificationsIcon
                     sx={{
                        color:
                           location.pathname === '/notification'
                              ? 'black'
                              : 'gray',
                     }}
                  />
                  {unreadNotifications > 0 && (
                     <span className="p-1 rounded-full text-xs bg-red-600 text-white">
                        {unreadNotifications}
                     </span>
                  )}
               </div>
               <div
                  className={`text-sm text-gray-500 ${
                     location.pathname === '/notification'
                        ? 'border-b-3 border-b-blue-800'
                        : ''
                  }`}>
                  Notification
               </div>
            </Link>
            <Link
               to={`/profile/${userData?._id}`}
               className="flex flex-col items-center cursor-pointer">
               <img
                  className="w-6 h-6 rounded-full"
                  src={userData?.profile_pic}
                  alt=""
               />
               <div className="text-sm text-gray-500">{userData?.f_name}</div>
            </Link>
         </div>
      </div>
   );
};

export default NavbarV2;
