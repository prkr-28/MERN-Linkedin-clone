import React from 'react';

const EditProfileModel = () => {
  return (
    <div className="mt-5 w-full h-[300px] overflow-auto">
      <div className="w-full mb-4">
        <label>FullName*</label>
        <br />
        <input
          type="text"
          placeholder="Enter full Name"
          className="p-2 mt-1 w-full border-1 rounded-md"
        />
      </div>
      <div className="w-full mb-4">
        <label>Headline*</label>
        <br />
        <textarea
          className="p-2 mt-1 w-full border-1 rounded-md"
          cols={10}
          rows={2}></textarea>
      </div>
      <div className="w-full mb-4">
        <label>Current Company*</label>
        <br />
        <input
          type="text"
          placeholder="Enter Current Company Name"
          className="p-2 mt-1 w-full border-1 rounded-md"
        />
      </div>
      <div className="w-full mb-4">
        <label>Current Location*</label>
        <br />
        <input
          type="text"
          placeholder="Enter Current Location"
          className="p-2 mt-1 w-full border-1 rounded-md"
        />
      </div>

      {/* save btn */}
      <button className="w-full mt-5 bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-600">
        Save
      </button>
    </div>
  );
};

export default EditProfileModel;
