import React, {useState, useEffect} from 'react';
import Advertisement from '../../components/advertisement/advertisement';
import Card from '../../components/card/card';
import Post from '../../components/post/post';
import ProfileCard from '../../components/Profilrcard/profileCard';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import {useNavigate} from 'react-router-dom';

const Notification = () => {
   const navigate = useNavigate();
   const [userData, setUserData] = useState({});
   const [notifications, setNotifications] = useState([]);

   const fetchNotifications = async () => {
      await axios
         .get('http://localhost:4000/api/notification/', {
            withCredentials: true,
         })
         .then((res) => {
            setNotifications(res.data.notifications);
         })
         .catch((err) => {
            console.error('Error fetching notifications:', err);
            toast.error('Failed to fetch notifications');
         });
   };

   useEffect(() => {
      const storedData = localStorage.getItem('user');
      if (storedData) {
         setUserData(JSON.parse(storedData));
      }

      fetchNotifications();
   }, []);

   const handleOnClick = async (notification) => {
      await axios
         .put(
            'http://localhost:4000/api/notification/markAsRead',
            {notificationId: notification._id},
            {withCredentials: true}
         )
         .then((res) => {
            if (notification.type === 'comment') {
               navigate(
                  `/profile/${notification.receiver}/activities/${notification.postId}`
               );
            } else {
               navigate('/mynetwork');
            }
         })
         .catch((err) => {
            console.error('Error marking notification as read:', err);
            toast.error('Failed to mark notification as read');
         });
   };

   return (
      <div className="px-18 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
         {/* left div... */}
         <div className="w-[21%] sm:block  sm:w-[23%] hidden py-5 ">
            <div className="h-fit sticky top-18">
               <ProfileCard profileData={userData} />
            </div>
         </div>
         {/* middle div */}
         <div className="w-[100%] py-5 sm:w-[50%]">
            <div className="text-2xl text-center mb-2 text-blue-800 font-semibold">
               Top 20 Recent Notifications
            </div>
            <Card padding={0}>
               {notifications.length > 0 ? (
                  notifications.map((notification) => (
                     <div
                        onClick={() => {
                           handleOnClick(notification);
                        }}
                        key={notification._id}
                        className={`flex flex-col border-b-1 border-gray-500 cursor-pointer ${
                           notification.isRead ? 'bg-gray-100' : 'bg-sky-200'
                        }`}>
                        <div className="p-3 flex gap-3">
                           <div>
                              <img
                                 src={notification?.sender?.profile_pic}
                                 alt="notification icon"
                                 className="rounded-4xl border-2 h-11 w-11 border-white cursor-pointer"
                              />
                           </div>
                           <div className="text-md flex items-center justify-center">
                              {notification.content}
                           </div>
                        </div>
                     </div>
                  ))
               ) : (
                  <div className="text-center text-gray-500">
                     No notifications available
                  </div>
               )}
            </Card>
         </div>
         {/* right div */}
         <div className="w-[26%] md:block hidden py-5">
            <div className=" sticky top-18">
               <Advertisement profileData={userData} />
            </div>
         </div>
         <ToastContainer position="bottom-right" autoClose={2000} />
      </div>
   );
};

export default Notification;
