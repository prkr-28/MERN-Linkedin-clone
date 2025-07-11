import React, {useState} from 'react';

const EditProfileModel = ({profileData, handleEditFunction}) => {
   const [data, setData] = useState({
      f_name: profileData?.f_name,
      headline: profileData?.headline,
      curr_company: profileData?.curr_company,
      curr_location: profileData?.curr_location,
   });

   const onChangeHandle = (e, key) => {
      setData({
         ...data,
         [key]: e.target.value,
      });
   };

   const handleSavebtn = async () => {
      const updatedUser = {
         ...profileData,
         ...data,
      };
      try {
         await handleEditFunction(updatedUser);
      } catch (error) {
         console.error('Error updating profile image:', error);
      }
   };

   return (
      <div className="mt-5 w-full h-[300px] overflow-auto">
         <div className="w-full mb-4">
            <label>FullName*</label>
            <br />
            <input
               value={data.f_name}
               onChange={(e) => onChangeHandle(e, 'f_name')}
               type="text"
               placeholder="Enter full Name"
               className="p-2 mt-1 w-full border-1 rounded-md"
            />
         </div>
         <div className="w-full mb-4">
            <label>Headline*</label>
            <br />
            <textarea
               value={data.headline}
               onChange={(e) => onChangeHandle(e, 'headline')}
               className="p-2 mt-1 w-full border-1 rounded-md"
               cols={10}
               rows={2}></textarea>
         </div>
         <div className="w-full mb-4">
            <label>Current Company*</label>
            <br />
            <input
               value={data.curr_company}
               onChange={(e) => onChangeHandle(e, 'curr_company')}
               type="text"
               placeholder="Enter Current Company Name"
               className="p-2 mt-1 w-full border-1 rounded-md"
            />
         </div>
         <div className="w-full mb-4">
            <label>Current Location*</label>
            <br />
            <input
               value={data.curr_location}
               onChange={(e) => onChangeHandle(e, 'curr_location')}
               type="text"
               placeholder="Enter Current Location"
               className="p-2 mt-1 w-full border-1 rounded-md"
            />
         </div>

         {/* save btn */}
         <button
            onClick={handleSavebtn}
            className="w-full mt-5 bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-600">
            Save
         </button>
      </div>
   );
};

export default EditProfileModel;
