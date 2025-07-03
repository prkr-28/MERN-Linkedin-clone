import React from 'react';

const MessageModel = () => {
  return (
    <div className="mt-5 w-full h-[300px] overflow-auto">
      <div className="w-full mb-4">
        <textarea
          placeholder="Write your message...."
          className="p-2 mt-1 w-full border-1 rounded-md"
          cols={10}
          rows={8}></textarea>
      </div>
      {/* save btn */}
      <button className="w-full mt-5 bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-600">
        message
      </button>
    </div>
  );
};

export default MessageModel;
