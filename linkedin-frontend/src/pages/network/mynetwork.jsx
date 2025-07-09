import React, {useState, useEffect} from 'react';
import ProfileCard from '../../components/Profilrcard/profileCard';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';

const MyNetwork = () => {
   const [text, setText] = useState('Catch up with friends');
   const [data, setData] = useState([]);

   const fetchFriendsData = async () => {
      try {
         await axios
            .get('http://localhost:4000/api/auth/connections', {
               withCredentials: true,
            })
            .then((res) => {
               console.log('Friends data:', res);
               setData(res.data.connections);
            });
      } catch (error) {
         console.error('Error fetching friends data:', error);
         toast.error('Failed to fetch friends data');
      }
   };

   const fetchPendingRequestsData = async () => {
      try {
         await axios
            .get('http://localhost:4000/api/auth/pendingConnections', {
               withCredentials: true,
            })
            .then((res) => {
               console.log('Friends data:', res);
               setData(res.data.pendingConnections);
            });
      } catch (error) {
         console.error('Error fetching friends data:', error);
         toast.error('Failed to fetch friends data');
      }
   };

   useEffect(() => {
      if (text === 'Catch up with friends') {
         fetchFriendsData();
      } else {
         fetchPendingRequestsData();
      }
   }, [text]);

   return (
      <div className="min-h-screen w-full bg-gray-100 py-6 px-18 mt-15  xl:px-50 flex flex-col gap-5">
         {/* Top bar */}
         <div className="bg-white rounded-xl border border-gray-300 p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center">
            <div className="text-sm sm:text-lg text-gray-600">{text}</div>
            <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm">
               <button
                  className={`px-3 py-1 border border-gray-300 rounded-lg cursor-pointer ${
                     text === 'Catch up with friends'
                        ? 'bg-blue-500 text-white'
                        : ''
                  }`}
                  onClick={() => setText('Catch up with friends')}>
                  Friends
               </button>
               <button
                  className={`px-3 py-1 border border-gray-300 rounded-lg cursor-pointer ${
                     text === 'Pending requests' ? 'bg-blue-500 text-white' : ''
                  }`}
                  onClick={() => setText('Pending requests')}>
                  Pending requests
               </button>
            </div>
         </div>

         {/* Profile cards grid */}
         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {data.length > 0 ? (
               data.map((item) => (
                  <ProfileCard key={item._id} profileData={item} />
               ))
            ) : (
               <div className="col-span-4 text-center text-gray-500">
                  {text === 'Catch up with friends'
                     ? 'No friends found'
                     : 'No pending requests found'}
               </div>
            )}
         </div>

         <ToastContainer position="bottom-right" autoClose={2000} />
      </div>
   );
};

export default MyNetwork;
