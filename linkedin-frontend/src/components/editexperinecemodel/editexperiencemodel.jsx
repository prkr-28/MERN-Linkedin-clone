import React from 'react';

const ExperienceModel = () => {
  return (
    <div className="mt-5 w-full h-[300px] overflow-auto">
      <div className="w-full mb-4">
        <label>Role*</label>
        <br />
        <input
          type="text"
          placeholder="Enter Role"
          className="p-2 mt-1 w-full border-1 rounded-md"
        />
      </div>

      <div className="w-full mb-4">
        <label>Company*</label>
        <br />
        <input
          type="text"
          placeholder="Enter company Name"
          className="p-2 mt-1 w-full border-1 rounded-md"
        />
      </div>

      <div className="w-full mb-4">
        <label>Duration*</label>
        <br />
        <input
          type="text"
          placeholder="Enter duration"
          className="p-2 mt-1 w-full border-1 rounded-md"
        />
      </div>

      <div className="w-full mb-4">
        <label>Place*</label>
        <br />
        <input
          type="text"
          placeholder="Enter Company Location"
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

export default ExperienceModel;
