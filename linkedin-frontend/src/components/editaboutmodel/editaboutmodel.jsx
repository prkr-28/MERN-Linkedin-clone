import React from 'react';

const AboutModel = () => {
  return (
    <div className="mt-5 w-full h-[300px] overflow-auto">
      <div className="w-full mb-4">
        <label>About*</label>
        <br />
        <textarea
          className="p-2 mt-1 w-full border-1 rounded-md"
          cols={10}
          rows={3}></textarea>
      </div>
      <div className="w-full mb-4">
        <label>Skills*(Add by seperated comma)</label>
        <br />
        <textarea
          className="p-2 mt-1 w-full border-1 rounded-md"
          cols={10}
          rows={2}></textarea>
      </div>

      {/* resumeupload btn */}
      <div className="flex flex-col mb-1">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Resume Upload
        </label>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
        />
      </div>

      {/* save btn */}
      <button className="w-full mt-5 bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-600">
        Save
      </button>
    </div>
  );
};

export default AboutModel;
