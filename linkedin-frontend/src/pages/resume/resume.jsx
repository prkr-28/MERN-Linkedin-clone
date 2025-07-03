import React from 'react';
import Advertisement from '../../components/advertisement/Advertisement';

const Resume = () => {
  return (
    <div className="px-18 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* resume section */}
      <div className="w-[100%] py-5 sm:w-[74%] flex justify-center mx-auto">
        <img
          className="max-w-full h-auto rounded-2xl"
          src="https://resumecompanion.com/wp-content/uploads/2017/03/High-School-Student-Resume-Sample.png"
          alt="Resume"
        />
      </div>

      {/* advertisementcard */}
      <div className="w-[26%] hidden sm:block">
        <Advertisement />
      </div>
    </div>
  );
};

export default Resume;
