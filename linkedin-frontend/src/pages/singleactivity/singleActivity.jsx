import React, {useState, useEffect} from 'react';
import Advertisement from '../../components/advertisement/advertisement';
import Card from '../../components/card/card';
import ProfileCard from '../../components/Profilrcard/profileCard';
import Post from '../../components/post/post';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';

const SingleActivity = () => {
   const [user, setUser] = useState({});
   const [post, setPost] = useState(null);
   const [selfData, setSelfData] = useState({});
   const {postId} = useParams();

   const fetchUserData = async () => {
      try {
         const res = await axios.get(
            `http://localhost:4000/api/post/getPost/${postId}`
         );
         console.log(res);
         setPost(res.data.post);
         setUser(res.data.post.user);
      } catch (error) {
         console.error('Error fetching user posts:', error);
         toast.error('Failed to fetch user posts');
      }
   };

   useEffect(() => {
      fetchUserData();
      const storedData = localStorage.getItem('user');
      if (storedData) {
         setSelfData(JSON.parse(storedData));
      }
   }, []);

   return (
      <div className="px-18 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
         {/* left div... */}
         <div className="w-[21%] sm:block  sm:w-[23%] hidden py-5 ">
            <div className="h-fit sticky top-18">
               <ProfileCard profileData={user} />
            </div>
         </div>
         {/* middle div */}
         <div className="w-[100%] py-5 sm:w-[50%]">
            <div>
               <Card padding={1}>
                  <Post item={post} profileData={user} profile={0} />
               </Card>
            </div>
         </div>
         {/* right div */}
         <div className="w-[26%] md:block hidden py-5">
            <div className=" sticky top-18">
               <Advertisement profileData={selfData} />
            </div>
         </div>
      </div>
   );
};

export default SingleActivity;
