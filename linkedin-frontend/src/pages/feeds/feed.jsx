import React, {useState, useEffect} from 'react';
import ProfileCard from '../../components/Profilrcard/profileCard';
import Card from '../../components/card/card';
import {Image, SquarePlay, FileText} from 'lucide-react';
import Advertisement from '../../components/advertisement/advertisement';
import Post from '../../components/post/post';
import Model from '../../components/model/model';
import AddModel from '../../components/addModel/addModel';
import Loader from '../../components/loader/loader';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';

const Feed = () => {
   const [postModel, setPostModel] = useState(false);
   const [profileData, setProfileData] = useState(null);
   const [postData, setPostData] = useState([]);
   const handlePostModel = () => {
      setPostModel(!postModel);
   };

   const fetchData = async () => {
      try {
         const [profileRes, postsRes] = await Promise.all([
            axios.get('http://localhost:4000/api/auth/self', {
               withCredentials: true,
            }),
            axios.get('http://localhost:4000/api/post/getAllPost'),
         ]);
         setProfileData(profileRes.data.user);
         localStorage.setItem('userinfo', JSON.stringify(profileRes.data.user));
         setPostData(postsRes.data.posts);
      } catch (error) {
         console.error('Error fetching data:', error);
         toast.error(error.response?.data?.message || 'Failed to fetch data');
      }
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className="px-18 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
         {/* left div... */}
         <div className="w-[21%] sm:block  sm:w-[23%] hidden py-5 ">
            <div className="h-fit">
               <ProfileCard data={profileData} />
            </div>
            <div className="w-full my-5">
               <Card padding={1}>
                  <div className="w-full flex justify-between text-sm">
                     <div>profile viewers</div>
                     <div className="text-blue-900">23</div>
                  </div>
                  <div className="w-full flex justify-between text-sm">
                     <div>post Impressions</div>
                     <div className="text-blue-900">23</div>
                  </div>
               </Card>
            </div>
         </div>
         {/* middle div */}
         <div className="w-[100%] py-5 sm:w-[50%]">
            <div>
               <Card padding={1}>
                  <div className="flex gap-2 items-center">
                     <img
                        className="rounded-4xl border-2 h-13 w-13 border-black cursor-pointer"
                        src={profileData?.profile_pic}
                        alt=""
                     />
                     <div
                        onClick={handlePostModel}
                        className="w-full border-1 py-4 px-3 rounded-3xl cursor-pointer hover:bg-gray-100">
                        Start a post
                     </div>
                  </div>
                  <div className="w-full flex mt-3">
                     <div
                        onClick={handlePostModel}
                        className="w-1/3 flex justify-center items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                        <SquarePlay className="h-6 w-6 text-[#541212]" />
                        <span className="text-sm">Video</span>
                     </div>
                     <div
                        onClick={handlePostModel}
                        className="w-1/3 flex justify-center items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                        <Image className="h-6 w-6 text-[#242c9e]" />
                        <span className="text-sm">Photo</span>
                     </div>
                     <div
                        onClick={handlePostModel}
                        className="w-1/3 flex justify-center items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                        <FileText className="h-6 w-6 text-[#ff2e2e]" />
                        <span className="text-sm">Article</span>
                     </div>
                  </div>
               </Card>
            </div>

            <div className="border-b-1 border-gray-500 w-[100%] my-5" />

            {postData.map((item, idx) => {
               return <Post item={item} key={idx} profileData={profileData} />;
            })}
         </div>
         {/* right div */}
         <div className="w-[26%] md:block hidden py-5">
            <div>
               <Card padding={1}>
                  <div className="text-xl font-semibold mb-3">
                     Trending Topics
                  </div>
                  <div className="text-sm text-gray-600 font-semibold mb-3">
                     Top Stories
                  </div>
                  <div className="flex flex-col gap-3">
                     <div className="text-sm text-blue-700 cursor-pointer">
                        Buffet to remain Bolt ai chairman
                        <div className="text-xs text-gray-400">2h ago</div>
                     </div>
                     <div className="text-sm text-blue-700 cursor-pointer">
                        Buffet to remain Bolt ai chairman
                        <div className="text-xs text-gray-400">2h ago</div>
                     </div>
                     <div className="text-sm text-blue-700 cursor-pointer">
                        Buffet to remain Bolt ai chairman
                        <div className="text-xs text-gray-400">2h ago</div>
                     </div>
                  </div>
               </Card>
            </div>
            <div className="mt-5">
               <div>
                  <Card padding={1}>
                     <div className="text-xl font-semibold mb-3">
                        Recent Activities
                     </div>
                     <div className="text-sm text-gray-600 font-semibold mb-3">
                        Latest Updates
                     </div>
                     <div className="flex flex-col gap-3">
                        <div className="text-sm text-blue-700 cursor-pointer">
                           User A liked your post
                           <div className="text-xs text-gray-400">1h ago</div>
                        </div>
                        <div className="text-sm text-blue-700 cursor-pointer">
                           User B commented on your post
                           <div className="text-xs text-gray-400">3h ago</div>
                        </div>
                        <div className="text-sm text-blue-700 cursor-pointer">
                           User C shared your post
                           <div className="text-xs text-gray-400">5h ago</div>
                        </div>
                     </div>
                  </Card>
               </div>
            </div>
            <div className="mt-5 sticky top-18">
               <Advertisement profileData={profileData} />
            </div>
         </div>
         {/* Modal for post creation */}
         {postModel && (
            <Model title="" closemodel={handlePostModel}>
               <AddModel profileData={profileData} />
            </Model>
         )}

         <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={true}
         />
      </div>
   );
};

export default Feed;
