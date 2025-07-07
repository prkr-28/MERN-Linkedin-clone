import React from 'react';
import Advertisement from '../../components/advertisement/advertisement';
import Card from '../../components/card/card';
import ProfileCard from '../../components/Profilrcard/profileCard';
import Post from '../../components/post/post';

const SingleActivity = () => {
   return (
      <div className="px-18 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
         {/* left div... */}
         <div className="w-[21%] sm:block  sm:w-[23%] hidden py-5 ">
            <div className="h-fit sticky top-18">
               <ProfileCard />
            </div>
         </div>
         {/* middle div */}
         <div className="w-[100%] py-5 sm:w-[50%]">
            <div>
               <Card padding={1}>
                  <Post />
               </Card>
            </div>
         </div>
         {/* right div */}
         <div className="w-[26%] md:block hidden py-5">
            <div className=" sticky top-18">
               <Advertisement />
            </div>
         </div>
      </div>
   );
};

export default SingleActivity;
