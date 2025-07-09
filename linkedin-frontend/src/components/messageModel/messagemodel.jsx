import React, {useState} from 'react';
import axios from 'axios';
import {toast, ToastContainer} from 'react-toastify';

const MessageModel = ({userData, profileData}) => {
   const [message, setMessage] = useState('');

   const handleSendMessage = async () => {
      if (!message.trim()) {
         toast.error('Message cannot be empty');
         return;
      }

      try {
         const res = await axios.post(
            'http://localhost:4000/api/conversation/add-conversation',
            {
               recieverId: profileData?._id,
               message: message,
            },
            {withCredentials: true}
         );
         //close the model after sending the message
         toast.success(res.data.message);
         setInterval(() => {
            window.location.reload();
         }, 2000);
         setMessage('');
      } catch (error) {
         console.error('Error sending message:', error);
         toast.error('Failed to send message');
      }
   };

   return (
      <div className="mt-5 w-full h-[300px] overflow-auto">
         <div className="w-full mb-4">
            <textarea
               value={message}
               onChange={(e) => setMessage(e.target.value)}
               placeholder="Write your message...."
               className="p-2 mt-1 w-full border-1 rounded-md"
               cols={10}
               rows={8}></textarea>
         </div>
         {/* save btn */}
         <button
            onClick={handleSendMessage}
            className="w-full mt-5 bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-600">
            message
         </button>
         <ToastContainer position="bottom-right" autoClose={1000} />
      </div>
   );
};

export default MessageModel;
