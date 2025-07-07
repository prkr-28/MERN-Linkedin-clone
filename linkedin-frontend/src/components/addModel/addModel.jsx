import {Image, Video} from 'lucide-react';
import React, {useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import axios from 'axios';

const AddModel = (props) => {
   const [imageUrl, setImage] = useState('');
   const [desc, setDesc] = useState('');
   const handlePost = async (e) => {
      e.preventDefault();
      if (desc.trim().length === 0 && !imageUrl) {
         return toast.error('Please add a description or an image');
      }
      await axios
         .post(
            'http://localhost:4000/api/post/',
            {
               desc: desc,
               imageLink: imageUrl,
            },
            {
               withCredentials: true,
            }
         )
         .then((res) => {
            window.location.reload();
            toast.success('Post created successfully');
         })
         .catch((err) => {
            console.error(err);
            toast.error(err.response?.data?.message || 'Failed to create post');
         });
   };
   // cloudName="dtpwinoe7"
   //presetName=linkedin-clone

   const handleuploadimage = async (e) => {
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
         setImage(ImageUrl);
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <div className="h-full w-full p-2">
         <div className=" flex gap-4 items-center">
            <div className="relative">
               <img
                  src={props.profileData?.profile_pic}
                  className="w-12 h-12 rounded-full"
                  alt=""
               />
            </div>
            <div className="text-xl">{props.profileData?.f_name}</div>
         </div>
         <div className="w-full mt-4">
            <textarea
               value={desc}
               onChange={(e) => setDesc(e.target.value)}
               cols={65}
               rows={4}
               className="border-2 border-gray-300 rounded-lg p-2 focus:outline-none focus:border-blue-500"
               placeholder="What do you want to talk about?"></textarea>
         </div>
         {imageUrl && (
            <div className="w-15 h-15 rounded-[2px] flex justify-center items-center">
               <img
                  src={imageUrl}
                  alt="Video"
                  className="w-15 h-15 rounded-sm"
               />
            </div>
         )}

         <div className="mb-10">
            <div className="flex justify-between items-center">
               <label className="cursor-pointer" htmlFor="inputFile">
                  <Image />
                  <input
                     onChange={handleuploadimage}
                     type="file"
                     id="inputFile"
                     className="hidden"
                     accept="image/*"
                  />
               </label>

               <button
                  onClick={handlePost}
                  className="bg-blue-800 text-white px-3 py-1 rounded-4xl hover:bg-blue-900 cursor-pointer">
                  Post
               </button>
            </div>
         </div>
      </div>
   );
};

export default AddModel;
