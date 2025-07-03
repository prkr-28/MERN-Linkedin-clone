import React from 'react';

const ImageModel = ({ isCircular }) => {
  return (
    <div className="p-5 relative flex items-center flex-col h-full justify-between">
      {
        /* Image upload functionality can be added here */
        isCircular ? (
          <img
            className="w-[200px] h-[200px] rounded-full border-2 border-white"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
        ) : (
          <div>
            <img
              className="w-full h-[200px] object-cover rounded-lg border-2 border-white"
              src="https://t4.ftcdn.net/jpg/05/54/46/89/360_F_554468927_iwU3VYIjsaeopAb0WPYxVf21TloEhTEj.jpg"
              alt=""
            />
          </div>
        )
      }

      <div className="flex items-center justify-between w-full pb-3">
        <label
          htmlFor="btn-submit"
          className="p-3 bg-blue-800 text-white rounded-2xl cursor-pointer hover:bg-blue-900">
          Upload
        </label>
        <input type="file" id="btn-submit" className="hidden" />

        <div className="p-3 bg-blue-800 text-white rounded-2xl cursor-pointer hover:bg-blue-900">
          Submit
        </div>
      </div>
    </div>
  );
};

export default ImageModel;
