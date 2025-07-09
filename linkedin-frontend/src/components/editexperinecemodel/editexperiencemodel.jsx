import React, {useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';

const ExperienceModel = ({
   profileData,
   handleEditFunction,
   updateExperience,
   setUpdateExperience,
}) => {
   const [experience, setExperience] = useState({
      designation: updateExperience?.clicked
         ? updateExperience?.data?.designation
         : '',
      company_name: updateExperience?.clicked
         ? updateExperience?.data?.company_name
         : '',
      duration: updateExperience?.clicked
         ? updateExperience?.data?.duration
         : '',
      location: updateExperience?.clicked
         ? updateExperience?.data?.location
         : '',
   });

   const onChangeHandle = (e, key) => {
      setExperience({
         ...experience,
         [key]: e.target.value,
      });
   };

   const HandleUpdateExpSave = () => {
      // If updateExperience is clicked, update the existing experience
      let filteredExperience = profileData?.experience.filter(
         (item) => item._id !== updateExperience?.id
      );
      let newArr = [...filteredExperience, experience];
      let updatedExperience = {
         ...profileData,
         experience: newArr,
      };
      handleEditFunction(updatedExperience);
   };

   const handleSaveBnt = () => {
      // If updateExperience is clicked, update the existing experience
      if (updateExperience?.clicked) return HandleUpdateExpSave();
      if (
         !experience.designation ||
         !experience.company_name ||
         !experience.duration ||
         !experience.location
      ) {
         return toast.error('Please fill all the fields');
      }
      try {
         const updatedExperience = {
            ...profileData,
            experience: [...profileData.experience, experience],
         };
         handleEditFunction(updatedExperience);
      } catch (error) {
         console.error('Error updating experience:', error);
      }
   };

   const handleDeleteBtn = () => {
      const filteredExperience = profileData?.experience.filter(
         (item) => item._id !== updateExperience?.id
      );
      const updatedExperience = {
         ...profileData,
         experience: filteredExperience,
      };
      handleEditFunction(updatedExperience);
   };

   return (
      <div className="mt-5 w-full h-[300px] overflow-auto">
         <div className="w-full mb-4">
            <label>Role*</label>
            <br />
            <input
               value={experience.designation}
               onChange={(e) => onChangeHandle(e, 'designation')}
               type="text"
               placeholder="Enter Role"
               className="p-2 mt-1 w-full border-1 rounded-md"
            />
         </div>

         <div className="w-full mb-4">
            <label>Company*</label>
            <br />
            <input
               value={experience.company_name}
               onChange={(e) => onChangeHandle(e, 'company_name')}
               type="text"
               placeholder="Enter company Name"
               className="p-2 mt-1 w-full border-1 rounded-md"
            />
         </div>

         <div className="w-full mb-4">
            <label>Duration*</label>
            <br />
            <input
               value={experience.duration}
               onChange={(e) => onChangeHandle(e, 'duration')}
               type="text"
               placeholder="Enter duration"
               className="p-2 mt-1 w-full border-1 rounded-md"
            />
         </div>

         <div className="w-full mb-4">
            <label>Place*</label>
            <br />
            <input
               value={experience.location}
               onChange={(e) => onChangeHandle(e, 'location')}
               type="text"
               placeholder="Enter Company Location"
               className="p-2 mt-1 w-full border-1 rounded-md"
            />
         </div>

         {/* save and delete btn */}
         <div className="flex items-center justify-between">
            <button
               onClick={handleSaveBnt}
               className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-600">
               Save
            </button>

            {updateExperience?.clicked && (
               <button
                  onClick={handleDeleteBtn}
                  className="mt-5 bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-600">
                  Delete
               </button>
            )}
         </div>

         <ToastContainer position="bottom-right" autoClose={2000} />
      </div>
   );
};

export default ExperienceModel;
