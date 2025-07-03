import React from 'react';

const Conversation = () => {
  return (
    <div className="flex items-center gap-3 w-full cursor-pointer border-b-1 border-gray-300 p-4 hover:bg-gray-200">
      <div className="shrink-0">
        <img
          className="w-12 h-12 rounded-[100%] cursor-pointer"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
          alt=""
        />
      </div>
      <div className="">
        <div className="text-[16px]">Shubham</div>
        <div className="text-xs text-gray-500">Software Engineer @Amazon</div>
      </div>
    </div>
  );
};

export default Conversation;
