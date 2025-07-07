import React, {useState} from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const ImageModel = ({isCircular, profileData, handleEditFunction}) => {
   const [imageLink, setImageLink] = useState(
      isCircular ? profileData?.profile_pic : profileData?.cover_pic
   );
   const [loading, setLoading] = useState(false);

   const handleUploadImage = async (e) => {
      setLoading(true);
      const file = e.target.files;
      const data = new FormData();
      data.append('file', file[0]);
      data.append('upload_preset', 'linkedin-clone');
      try {
         const res = await axios.post(
            'https://api.cloudinary.com/v1_1/dtpwinoe7/image/upload',
            data
         );
         const ImageUrl = res.data.url;
         setImageLink(ImageUrl);
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const handleSubmit = async () => {
      const updatedUser = {
         ...profileData,
         profile_pic: isCircular ? imageLink : profileData.profile_pic,
         cover_pic: !isCircular ? imageLink : profileData.cover_pic,
      };
      try {
         await handleEditFunction(updatedUser);
      } catch (error) {
         console.error('Error updating profile image:', error);
      }
   };
   return (
      <div className="p-5 relative flex items-center flex-col h-full justify-between">
         {
            /* Image upload functionality can be added here */
            isCircular ? (
               <img
                  className="w-[200px] h-[200px] rounded-full border-2 border-white"
                  src={imageLink}
                  alt=""
               />
            ) : (
               <div>
                  <img
                     className="w-full h-[200px] object-cover rounded-lg border-2 border-white"
                     src={imageLink}
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
            <input
               onChange={handleUploadImage}
               type="file"
               id="btn-submit"
               className="hidden"
            />

            {loading && (
               <Box sx={{display: 'flex'}}>
                  <CircularProgress />
               </Box>
            )}

            <div
               onClick={handleSubmit}
               className="p-3 bg-blue-800 text-white rounded-2xl cursor-pointer hover:bg-blue-900">
               Submit
            </div>
         </div>
      </div>
   );
};

export default ImageModel;
