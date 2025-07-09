import React, {useState, useEffect} from 'react';
import Advertisement from '../../components/advertisement/advertisement';
import Post from '../../components/post/post';
import ProfileCard from '../../components/Profilrcard/profileCard';
import Card from '../../components/card/card';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';

const Activity = () => {
   const [user, setUser] = useState({});
   const [posts, setPosts] = useState([]);
   const [selfData, setSelfData] = useState({});
   const {id} = useParams();

   const fetchUserData = async () => {
      try {
         const res = await axios.get(
            `http://localhost:4000/api/post/getAllUserPost/${id}`
         );
         setPosts(res.data.posts);
         setUser(res.data.posts[0].user);
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
         <div className="w-[21%] sm:block  sm:w-[23%] hidden py-5 "></div>
         {/* middle div */}
         <div className="w-[100%] py-5 sm:w-[50%]">
            <div className="text-3xl flex items-center justify-center font-semibold text-blue-800 mb-2">
               All Activities
            </div>
            <div>
               <Card padding={1}>
                  <div className="cursor-pointer w-fit p-2 border-1 rounded-3xl bg-green-800 text-white font-semibold">
                     Posts
                  </div>
                  {/* <Post />
                  <Post /> */}

                  {posts.length > 0 ? (
                     posts.map((post) => (
                        <Post
                           key={post._id}
                           item={post}
                           profileData={user}
                           profile={0}
                        />
                     ))
                  ) : (
                     <div className="text-center text-gray-500">
                        No posts available
                     </div>
                  )}
               </Card>
            </div>
         </div>
         {/* right div */}
         <div className="w-[26%] md:block hidden py-5">
            <div className=" sticky top-18">
               <Advertisement profileData={selfData} />
            </div>
         </div>

         <ToastContainer position="bottom-right" autoClose={2000} />
      </div>
   );
};

export default Activity;
