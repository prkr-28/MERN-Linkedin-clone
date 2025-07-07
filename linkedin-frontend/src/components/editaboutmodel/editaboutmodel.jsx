import React, {useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import axios from 'axios';

const AboutModel = ({profileData, handleEditFunction}) => {
   const [about, setAbout] = useState({
      about: profileData?.about,
      skillsinput: profileData?.skills.join(', '),
      resume: profileData?.resume,
   });
   const [loading, setLoading] = useState(false);

   const onChangeHandle = (e, key) => {
      setAbout({
         ...about,
         [key]: e.target.value,
      });
   };

   const handleUploadResumeImage = async (e) => {
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
         setAbout({
            ...about,
            resume: ImageUrl,
         });
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const handleOnSave = () => {
      const skillsArray = about.skillsinput
         .split(',')
         .map((skill) => skill.trim())
         .filter((skill) => skill !== '');

      const updatedAbout = {
         ...about,
         skills: skillsArray,
      };

      try {
         handleEditFunction(updatedAbout);
      } catch (error) {
         console.error('Error updating about section:', error);
      }
   };

   return (
      <div className="mt-5 w-full h-[300px] overflow-auto">
         <div className="w-full mb-4">
            <label>About*</label>
            <br />
            <textarea
               value={about.about}
               onChange={(e) => onChangeHandle(e, 'about')}
               className="p-2 mt-1 w-full border-1 rounded-md"
               cols={10}
               rows={3}></textarea>
         </div>
         <div className="w-full mb-4">
            <label>Skills*(Add by seperated comma)</label>
            <br />
            <textarea
               value={about.skillsinput}
               onChange={(e) => onChangeHandle(e, 'skillsinput')}
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
               onChange={handleUploadResumeImage}
               type="file"
               className="block w-full text-sm text-gray-700 border border-gray-300 rounded-md cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 p-2"
            />
         </div>

         {loading && (
            <Box sx={{display: 'flex'}}>
               <CircularProgress />
            </Box>
         )}

         {about.resume && (
            <div className="mt-1">
               <a
                  href={about.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline">
                  View Your Resume
               </a>
            </div>
         )}

         {/* save btn */}
         <button
            onClick={handleOnSave}
            className="w-full mt-5 bg-blue-500 text-white px-4 py-2 rounded-xl cursor-pointer hover:bg-blue-600">
            Save
         </button>
      </div>
   );
};

export default AboutModel;
