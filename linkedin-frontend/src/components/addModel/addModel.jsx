import { Image, Video } from 'lucide-react';
import React from 'react';

const AddModel = () => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            className="w-12 h-12 rounded-full"
            alt=""
          />
        </div>
        <div className="text-xl">Priyanshu Kumar</div>
      </div>
      <div className="w-full mt-4">
        <textarea
          cols={65}
          rows={5}
          className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
          placeholder="What do you want to talk about?"></textarea>
      </div>
      <div className="flex justify-between">
        <div className="w-10 h-10 rounded-[2px] bg-gray-200 flex justify-center items-center cursor-pointer hover:bg-gray-300">
          <img
            src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
            alt="Video"
            className="w-12 h-12"
          />
        </div>
      </div>

      <div className="mt-10">
        <div className="flex justify-between items-center">
          <label className="cursor-pointer" htmlFor="inputFile">
            <Image />
            <input
              type="file"
              id="inputFile"
              className="hidden"
              accept="image/*"
            />
          </label>

          <button className="bg-blue-800 text-white px-3 py-1 rounded-4xl hover:bg-blue-900">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddModel;
