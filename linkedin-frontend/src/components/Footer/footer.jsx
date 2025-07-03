import React from 'react';

const Footer = () => {
  return (
    <div className="w-[100%] bg-gray-200 flex justify-center">
      <div className="md:p-3 w-[100%] flex flex-col items-center py-4 gap-1">
        <div className="flex text-blue-800">
          <h3 className="text-blue-800 font-bold text-xl">Linked</h3>
          <img
            className="w-6 h-6"
            src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
            alt=""
          />
        </div>
        <div className="text-xs text-gray-500">@Copyright 2025</div>
      </div>
    </div>
  );
};

export default Footer;
