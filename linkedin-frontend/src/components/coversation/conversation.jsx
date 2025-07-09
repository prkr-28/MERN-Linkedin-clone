import React, {useEffect} from 'react';
import {useState} from 'react';

const Conversation = ({
   conversationData,
   userData,
   handleSelectedConv,
   activeConversationId,
}) => {
   const [memberData, setMemberData] = useState({});

   useEffect(() => {
      let userId = userData?._id;
      let arr = conversationData?.members?.filter(
         (member) => member._id !== userId
      );
      setMemberData(arr[0]);
   }, []);

   const handleclickfn = () => {
      handleSelectedConv(conversationData._id, memberData);
   };

   return (
      <div
         onClick={handleclickfn}
         className={`flex items-center gap-3 w-full cursor-pointer border-b-1 border-gray-300 p-4 hover:bg-gray-200 ${
            activeConversationId === conversationData._id ? 'bg-gray-300' : ''
         }`}>
         <div className="shrink-0">
            <img
               className="w-12 h-12 border-2 border-gray-300 rounded-[100%] cursor-pointer"
               src={memberData?.profile_pic}
               alt=""
            />
         </div>
         <div className="">
            <div className="text-[16px]">{memberData?.f_name}</div>
            <div className="text-xs text-gray-500">{memberData?.headline}</div>
         </div>
      </div>
   );
};

export default Conversation;
