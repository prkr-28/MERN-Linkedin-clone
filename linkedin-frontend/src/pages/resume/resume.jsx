import React, {useEffect, useState} from 'react';
import Advertisement from '../../components/advertisement/Advertisement';

const Resume = () => {
   const [profileData, setProfileData] = useState(null);

   useEffect(() => {
      const storedProfile = localStorage.getItem('userinfo');
      if (storedProfile) {
         setProfileData(JSON.parse(storedProfile));
      }
   }, []);

   return (
      <div className="px-18 xl:px-50 py-9 flex gap-5 w-full mt-9 bg-gray-100">
         {/* resume section */}
         <div className="w-[100%]  sm:w-[74%] flex justify-center mx-auto">
            {profileData?.resume ? (
               <img
                  className="max-w-full h-auto rounded-2xl"
                  src={profileData?.resume}
                  alt="Resume"
               />
            ) : (
               <div className="text-center text-gray-500">
                  No resume uploaded yet.
               </div>
            )}
         </div>

         {/* advertisementcard */}
         <div className="w-[26%] hidden sm:block">
            <Advertisement profileData={profileData} />
         </div>
      </div>
   );
};

export default Resume;
