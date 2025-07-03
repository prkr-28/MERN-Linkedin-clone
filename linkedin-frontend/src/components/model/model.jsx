import { X } from 'lucide-react';
import React from 'react';

const Model = (props) => {
  return (
    <div className="bg-black/50 backdrop-blur-xs fixed top-0 left-0 inset-0 z-50 flex justify-center items-center">
      <div className="w-[55%] md:w-[50%] h-[400px] bg-white rounded-xl px-8 py-5 ">
        <div className="flex justify-between">
          <div className="flex gap-4 items-center">
            <div className="text-xl font-semibold">{props.title}</div>
          </div>
          <div
            onClick={props.closemodel}
            className="text-2xl cursor-pointer rounded-full hover:bg-gray-200 p-1">
            <X />
          </div>
        </div>
        {props.children}
      </div>
    </div>
  );
};

export default Model;
