import React from 'react';
import Card from '../../components/card/Card';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Advertisement from '../../components/advertisement/Advertisement';
import Conversation from '../../components/coversation/conversation';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ImageIcon from '@mui/icons-material/Image';
import {useEffect, useState, useRef} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

import socket from '../../../socket';

const Message = () => {
   const [conversations, setConversations] = useState([]);
   const [userData, setUserData] = useState({});

   const [activeConversationId, setActiveConversationId] = useState(null);
   const [selectedConversationData, setSelectedConversationData] = useState({});

   const [messages, setMessages] = useState([]);

   const [imageLink, setImageLink] = useState('');
   const [loading, setLoading] = useState(false);

   const [messageText, setMessageText] = useState('');

   const ref = useRef();

   useEffect(() => {
      ref.current?.scrollIntoView({
         behavior: 'smooth',
      });
   }, [messages]);

   const handleSelectedConv = (id, receiverData) => {
      setActiveConversationId(id);
      // Emit an event to join the conversation room
      socket.emit('joinConversation', id);
      setSelectedConversationData(receiverData);
   };

   const fetchConversationMessage = async () => {
      await axios
         .get(
            `http://localhost:4000/api/message/getAllMessages/${activeConversationId}`,
            {
               withCredentials: true,
            }
         )
         .then((res) => {
            setMessages(res.data.messages);
         })
         .catch((err) => {
            console.error('Error fetching conversation messages:', err);
         });
   };

   const fetchConversations = async () => {
      await axios
         .get('http://localhost:4000/api/conversation/getAllConversations', {
            withCredentials: true,
         })
         .then((res) => {
            setConversations(res.data.conversations);
            setActiveConversationId(res.data.conversations[0]?._id);
            socket.emit('joinConversation', res.data.conversations[0]?._id);
            let userId = userData?._id;
            let arr = res.data?.conversations[0]?.members?.filter(
               (member) => member._id !== userId
            );
            setSelectedConversationData(arr[0]);
         })
         .catch((err) => {
            console.error('Error fetching conversations:', err);
         });
   };

   useEffect(() => {
      const storedData = localStorage.getItem('user');
      if (storedData) {
         setUserData(JSON.parse(storedData));
      }
      fetchConversations();
   }, []);

   useEffect(() => {
      if (activeConversationId) {
         fetchConversationMessage();
      }
   }, [activeConversationId]);

   useEffect(() => {
      const handleReceiveMessage = (res) => {
         setMessages((prevMessages) => [...prevMessages, res]);
      };

      socket.on('receiveMessage', handleReceiveMessage);

      return () => {
         socket.off('receiveMessage', handleReceiveMessage); // cleanup
      };
   }, []);

   const handleUploadImage = async (e) => {
      setLoading(true);
      const file = e.target.files;
      const data = new FormData();
      data.append('file', file[0]);
      data.append('upload_preset', 'linkedin-clone');
      try {
         const res = await axios.post(
            'https://api.cloudinary.com/v1_1/dtpwinoe7/image/upload',
            data
         );
         const ImageUrl = res.data.url;
         setImageLink(ImageUrl);
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const handleSendMessag = async () => {
      await axios
         .post(
            'http://localhost:4000/api/message/',
            {
               conversationId: activeConversationId,
               text: messageText,
               picture: imageLink,
            },
            {withCredentials: true}
         )
         .then((res) => {
            //console.log(res);
            // Emit the message to the socket
            socket.emit('sendMessage', activeConversationId, res.data);
            setMessageText('');
            setImageLink('');
         })
         .catch((err) => {
            console.error('Error sending message:', err);
         });
   };

   return (
      <div className="px-18 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
         <div className="w-full flex justify-between gap-8 pt-5">
            {/* left side */}
            <div className="w-full md:w-[70%]">
               <Card padding={0}>
                  <div className="border-b-1 border-gray-300 px-5 py-2 font-semibold text-lg">
                     Start Messaging
                  </div>
                  <div className="border-b-1 border-gray-300 px-5 py-2">
                     <div className="py-1 px-3 cursor-pointer hover:bg-green-900 bg-green-800 font-semibold flex gap-2 w-fit rounded-2xl text-white">
                        Focused <ArrowDropDownIcon />
                     </div>
                  </div>
                  {/* div fro chat */}
                  <div className="w-full md:flex">
                     <div className="h-[590px] overflow-auto w-full md:w-[40%] border-r-1 border-gray-400">
                        {/* for each chat */}
                        {conversations.length !== 0 ? (
                           conversations.map((conversation, idx) => (
                              <Conversation
                                 key={idx}
                                 userData={userData}
                                 conversationData={conversation}
                                 handleSelectedConv={handleSelectedConv}
                                 activeConversationId={activeConversationId}
                              />
                           ))
                        ) : (
                           <div className="p-4 text-gray-500">
                              Start a new conversation!
                           </div>
                        )}
                     </div>

                     <div className="w-full md:w-[60%] border-gray-400">
                        <div className="border-gray-300 border-b-2 flex justify-between items-center">
                           <div className="flex items-center gap-3 p-4">
                              <Link
                                 to={`/profile/${selectedConversationData?._id}`}>
                                 <img
                                    className="w-10 h-10 rounded-[100%] cursor-pointer"
                                    src={selectedConversationData?.profile_pic}
                                    alt=""
                                 />
                              </Link>
                              <div>
                                 <p className="text-[14px]">
                                    {selectedConversationData?.f_name}
                                 </p>
                                 <p className="text-xs text-gray-500">
                                    {selectedConversationData?.headline}
                                 </p>
                              </div>
                           </div>
                           <div className="pr-3 cursor-pointer">
                              <MoreHorizIcon />
                           </div>
                        </div>

                        <div className="h-[360px] w-full overflow-y-auto border-b-1 border-gray-300">
                           <div className="w-full overflow-y-auto border-b-1 border-gray-300 gap-3 p-4">
                              {/* used mapping to show user chats */}
                              {messages.length !== 0 ? (
                                 messages.map((message, idx) => {
                                    const isSentByMe =
                                       message?.sender?._id === userData?._id;

                                    return (
                                       <div
                                          ref={ref}
                                          key={idx}
                                          className={`w-full flex mb-4 ${
                                             isSentByMe
                                                ? 'justify-end'
                                                : 'justify-start'
                                          }`}>
                                          {/* Left-aligned (received) */}
                                          {!isSentByMe && (
                                             <div className="flex  items-start gap-3 max-w-[70%] bg-gray-100 p-2 rounded-2xl">
                                                <img
                                                   className="w-8 h-8 rounded-full"
                                                   src={
                                                      message?.sender
                                                         ?.profile_pic
                                                   }
                                                   alt=""
                                                />
                                                <div className="flex flex-col gap-2">
                                                   {message.text && (
                                                      <div className="bg-gray-300 text-black p-3 rounded-2xl text-sm">
                                                         {message?.text}
                                                      </div>
                                                   )}
                                                   {message.picture && (
                                                      <img
                                                         className="rounded-2xl max-w-[200px] object-cover"
                                                         src={message?.picture}
                                                         alt=""
                                                      />
                                                   )}
                                                </div>
                                             </div>
                                          )}

                                          {/* Right-aligned (sent) */}
                                          {isSentByMe && (
                                             <div className="flex items-start gap-3 max-w-[70%] flex-row-reverse bg-gray-100 p-2 rounded-2xl">
                                                <img
                                                   className="w-8 h-8 rounded-full"
                                                   src={
                                                      message?.sender
                                                         ?.profile_pic
                                                   }
                                                   alt=""
                                                />
                                                <div className="flex flex-col gap-2 items-end">
                                                   {message.text && (
                                                      <div className="bg-blue-600 text-white p-3 rounded-2xl text-sm">
                                                         {message?.text}
                                                      </div>
                                                   )}
                                                   {message.picture && (
                                                      <img
                                                         className="rounded-2xl max-w-[200px] object-cover"
                                                         src={message?.picture}
                                                         alt=""
                                                      />
                                                   )}
                                                </div>
                                             </div>
                                          )}
                                       </div>
                                    );
                                 })
                              ) : (
                                 <div className="text-center text-gray-500">
                                    No messages yet!
                                 </div>
                              )}
                           </div>
                        </div>
                        {/* message typing section... */}
                        <div className="p-2 w-full border-b-2 border-gray-200">
                           <textarea
                              value={messageText}
                              onChange={(e) => setMessageText(e.target.value)}
                              rows={4}
                              className="bg-gray-200 outline-0 rounded-xl text-sm w-full p-3"
                              placeholder="Write a message..."
                           />
                        </div>
                        <div className="p-4 flex justify-between items-center">
                           <div>
                              <label
                                 htmlFor="messageImage"
                                 className="cursor-pointer">
                                 <ImageIcon />
                              </label>
                              <input
                                 onChange={handleUploadImage}
                                 type="file"
                                 id="messageImage"
                                 className="hidden"
                              />
                           </div>
                           {!loading && (
                              <button
                                 onClick={handleSendMessag}
                                 className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition duration-200">
                                 Send
                              </button>
                           )}
                        </div>
                     </div>
                  </div>
               </Card>
            </div>

            {/* right side */}
            <div className="w-fit hidden md:block md:w-[30%]">
               <Advertisement profileData={userData} />
            </div>
         </div>
      </div>
   );
};

export default Message;
