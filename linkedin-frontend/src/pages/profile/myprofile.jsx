import React, {useState, useEffect} from 'react';
import Advertisement from '../../components/advertisement/advertisement';
import Card from '../../components/card/card';
import EditIcon from '@mui/icons-material/Edit';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Post from '../../components/post/post';
import AddIcon from '@mui/icons-material/Add';
import Model from '../../components/model/model';
import ImageModel from '../../components/imagemodel/imagemodel';
import EditProfileModel from '../../components/editprofilemodel/editprofilemodel';
import AboutModel from '../../components/editaboutmodel/editaboutmodel';
import ExperienceModel from '../../components/editexperinecemodel/editexperiencemodel';
import MessageModel from '../../components/messageModel/messagemodel';
import {data, Link} from 'react-router-dom';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';

const Profile = () => {
   const [imagemodel, setImagemodel] = useState(false);
   const [circularImage, setCircularImage] = useState(true);
   const [infoModel, SetInfoModel] = useState(false);
   const [aboutModel, SetAboutModel] = useState(false);
   const [experienceModel, SetExperienceModel] = useState(false);
   const [messageModel, SetMessageModel] = useState(false);

   const {id} = useParams();

   const [profileData, setProfileData] = useState(null);
   const [postData, setPostData] = useState([]);
   const [userData, setUserData] = useState(null);
   const [updateExperience, setUpdateExperience] = useState({
      clicked: '',
      id: '',
      data: {},
   });

   const updateEditExperience = (id, data) => {
      setUpdateExperience({
         clicked: true,
         id: id,
         data: data,
      });
      SetExperienceModel(!experienceModel);
   };

   const fetchData = async () => {
      try {
         const [profileRes, postsRes, userRes] = await Promise.all([
            axios.get(`http://localhost:4000/api/auth/user/${id}`),
            axios.get(`http://localhost:4000/api/post/getTop5Posts/${id}`),
            axios.get('http://localhost:4000/api/auth/self', {
               withCredentials: true,
            }),
         ]);

         setProfileData(profileRes.data.user);
         setPostData(postsRes.data.posts);
         setUserData(userRes.data.user);
      } catch (error) {
         console.error('Error fetching data:', error);
         toast.error(error.response?.data?.message || 'Failed to fetch data');
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   const handleInfoModel = () => {
      SetInfoModel(!infoModel);
   };
   const handleAboutModel = () => {
      SetAboutModel(!aboutModel);
   };

   const handleExperienceModel = () => {
      if (experienceModel) {
         setUpdateExperience({
            clicked: '',
            id: '',
            data: {},
         });
      }
      SetExperienceModel(!experienceModel);
   };

   const handleMessageModel = () => {
      SetMessageModel(!messageModel);
   };

   const handleImageModel = () => {
      setImagemodel(!imagemodel);
   };
   const openImageModel = () => {
      setImagemodel(true);
      setCircularImage(false);
   };
   const handleCircularImageModelOpen = () => {
      setImagemodel(true);
      setCircularImage(true);
   };

   const handleEditFunction = async (data) => {
      try {
         await axios.put(
            `http://localhost:4000/api/auth/update`,
            {user: data},
            {
               withCredentials: true,
            }
         );
         window.location.reload();
      } catch (error) {
         console.error('Error updating profile:', error);
         toast.error(
            error.response?.data?.message || 'Failed to update profile'
         );
      }
   };

   return (
      <div className="px-18 xl:px-50 py-9 flex flex-col pt-12 gap-5 w-full mt-5 bg-gray-100">
         <div className="flex gap-5">
            {/* left side main section */}
            <div className="w-full md:w-[70%] flex flex-col gap-5">
               {/* profile card... */}
               <div>
                  <Card padding={0}>
                     <div className="w-full h-fit">
                        <div className="relative w-full h-[200px]">
                           <div
                              onClick={openImageModel}
                              className="absolute cursor-pointer top-3 right-3 z-20 w-[33px] flex justify-center items-center h-[35px] rounded-full p-3 bg-gray-200">
                              <EditIcon />
                           </div>
                           <img
                              src={profileData?.cover_pic}
                              className="w-full h-[200px] rounded-tr-lg rounded-tl-lg"
                              alt=""
                           />

                           <div onClick={handleCircularImageModelOpen}>
                              <img
                                 src={profileData?.profile_pic}
                                 className="absolute top-[135px] left-6 w-[100px] h-[100px] rounded-full border-2 border-white"
                                 alt=""
                              />
                           </div>
                        </div>

                        <div className="mt-10 relative px-8 py-2">
                           <div
                              onClick={handleInfoModel}
                              className="absolute cursor-pointer top-0 right-3 z-50 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3">
                              <EditIcon />
                           </div>
                           <div className="w-full">
                              <div className="text-xl font-semibold">
                                 {profileData?.f_name}
                              </div>
                              <div className="text-sm my-1">
                                 {profileData?.headline}
                              </div>
                              <div className="text-sm my-1 text-gray-600">
                                 {profileData?.curr_location}
                              </div>
                              <div className="text-md text-blue-800 w-fit cursor-pointer hover:underline">
                                 {profileData?.friends.length}{' '}
                                 {profileData?.friends.length > 1
                                    ? 'Connections'
                                    : 'Connection'}
                              </div>

                              <div className="flex flex-wrap w-full justify-between gap-4 sm:gap-5">
                                 <div className="my-3 flex flex-wrap gap-3 sm:my-5 sm:gap-3">
                                    <div className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900">
                                       Open to
                                    </div>

                                    <div className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900">
                                       Share Profile
                                    </div>

                                    <div className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900">
                                       Logout
                                    </div>
                                 </div>

                                 <div className="my-3 flex flex-wrap gap-3 sm:my-5 sm:gap-5">
                                    <div
                                       onClick={handleMessageModel}
                                       className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900">
                                       Message
                                    </div>

                                    <div className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900">
                                       Disconnect
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </Card>
               </div>
               {/* about section */}
               <div>
                  <Card padding={1}>
                     <div className="w-full">
                        <div className="flex justify-between items-center">
                           <div className="text-lg font-semibold mb-3">
                              About
                           </div>
                           <div
                              onClick={handleAboutModel}
                              className="cursor-pointer">
                              <EditIcon />
                           </div>
                        </div>
                        <div className="text-sm text-gray-700">
                           {profileData?.about}
                        </div>
                     </div>
                  </Card>
               </div>
               {/* skills section */}
               <div>
                  <Card padding={1}>
                     <div className="w-full">
                        <div className="text-lg font-semibold mb-3">Skills</div>
                        <div className="flex flex-wrap gap-2">
                           {profileData?.skills?.length > 0 ? (
                              profileData?.skills.map((skill, idx) => (
                                 <span
                                    key={idx}
                                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                                    {skill}
                                 </span>
                              ))
                           ) : (
                              <span className="text-sm text-gray-600">
                                 No skills added yet
                              </span>
                           )}
                        </div>
                     </div>
                  </Card>
               </div>
               {/* activity section */}
               <div>
                  <Card padding={1}>
                     <div className="flex justify-between items-center">
                        <div className="text-lg font-semibold mb-3">
                           Activities
                        </div>
                     </div>
                     <div className="cursor-pointer px-3 py-1 w-fit border-1 rounded-4xl bg-green-800 text-white font-semibold">
                        Posts
                     </div>
                     <div className="overflow-x-auto my-2 flex gap-2 overflow-y-hidden w-full">
                        {postData.length > 0 ? (
                           postData.map((item, idx) => (
                              <Link
                                 key={idx}
                                 to={`/profile/${id}/activities/${item?._id}`}
                                 className="cursor-pointer shrink-0 w-[350px] h-[560px]">
                                 <Post
                                    profile={1}
                                    item={item}
                                    profileData={profileData}
                                 />
                              </Link>
                           ))
                        ) : (
                           <div className="w-full flex items-center justify-center text-sm text-gray-600">
                              No activities yet
                           </div>
                        )}
                     </div>
                     <div className="w-full flex justify-center items-center">
                        <Link
                           to={`/profile/${id}/activities`}
                           className="p-2 rounded-xl cursor-pointer bg-gray-100 hover:bg-gray-200">
                           Show all posts
                           <ArrowRightAltIcon />
                        </Link>
                     </div>
                  </Card>
               </div>
               {/* experience section... */}
               <div>
                  <Card padding={1}>
                     <div className="w-full">
                        <div className="w-full flex justify-between items-center mb-2">
                           <div className="text-lg font-semibold">
                              Experience
                           </div>
                           <div
                              onClick={handleExperienceModel}
                              className="cursor-pointer">
                              <AddIcon />
                           </div>
                        </div>
                        <div>
                           {profileData?.experience?.length > 0 ? (
                              profileData?.experience.map((item, idx) => (
                                 <div
                                    key={idx}
                                    className="p-2 border-t-1 border-gray-300 flex justify-between">
                                    <div>
                                       <div className="text-lg">
                                          {item?.designation}
                                       </div>
                                       <div className="text-sm text-gray-600">
                                          {item?.company_name}
                                       </div>
                                       <div className="text-sm text-gray-600">
                                          {item?.duration}
                                       </div>
                                       <div className="text-sm text-gray-600">
                                          {item?.location}
                                       </div>
                                    </div>
                                    <div
                                       onClick={() =>
                                          updateEditExperience(item?._id, item)
                                       }
                                       className="cursor-pointer">
                                       <EditIcon />
                                    </div>
                                 </div>
                              ))
                           ) : (
                              <div className="w-full flex items-center justify-center text-sm text-gray-600">
                                 No experience added yet
                              </div>
                           )}
                        </div>
                     </div>
                  </Card>
               </div>
            </div>
            {/* right side section... */}
            <div className="w-full md:w-[30%] hidden md:block">
               <Advertisement profileData={profileData} />
            </div>
         </div>

         {/* image model */}
         {imagemodel && (
            <Model title={'Upload Image'} closemodel={handleImageModel}>
               <ImageModel
                  isCircular={circularImage}
                  profileData={profileData}
                  handleEditFunction={handleEditFunction}
               />
            </Model>
         )}

         {/* info model */}
         {infoModel && (
            <Model title={'Edit Profile'} closemodel={handleInfoModel}>
               <EditProfileModel
                  profileData={profileData}
                  handleEditFunction={handleEditFunction}
               />
            </Model>
         )}

         {/* About model */}
         {aboutModel && (
            <Model title={'Edit About'} closemodel={handleAboutModel}>
               <AboutModel
                  profileData={profileData}
                  handleEditFunction={handleEditFunction}
               />
            </Model>
         )}

         {/* Experience model */}
         {experienceModel && (
            <Model title={'Add Experience'} closemodel={handleExperienceModel}>
               <ExperienceModel
                  profileData={profileData}
                  handleEditFunction={handleEditFunction}
                  updateExperience={updateExperience}
                  setUpdateExperience={setUpdateExperience}
               />
            </Model>
         )}

         {/* Message model */}
         {messageModel && (
            <Model title={'Send Message'} closemodel={handleMessageModel}>
               <MessageModel />
            </Model>
         )}

         <ToastContainer position="bottom-right" autoClose={2000} />
      </div>
   );
};

export default Profile;
