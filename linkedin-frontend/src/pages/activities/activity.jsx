import React from 'react';
import Advertisement from '../../components/advertisement/advertisement';
import Post from '../../components/post/post';
import ProfileCard from '../../components/Profilrcard/profileCard';
import Card from '../../components/card/card';

const Activity = () => {
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
        <div className="text-3xl flex items-center justify-center font-semibold text-blue-800 mb-2">
          All Activities
        </div>
        <div>
          <Card padding={1}>
            <div className="cursor-pointer w-fit p-2 border-1 rounded-3xl bg-green-800 text-white font-semibold">
              Posts
            </div>
            <Post />
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

export default Activity;
