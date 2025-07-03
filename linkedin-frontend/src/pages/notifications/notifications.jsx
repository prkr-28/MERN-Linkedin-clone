import React from 'react';
import Advertisement from '../../components/advertisement/advertisement';
import Card from '../../components/card/card';
import Post from '../../components/post/post';
import ProfileCard from '../../components/Profilrcard/profileCard';

const Notification = () => {
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
        <Card padding={0}>
          {Array.from({ length: 12 }, (_, idx) => (
            <div
              key={idx}
              className={`flex flex-col border-b-1 border-gray-300 bg-gray-200 cursor-pointer`}>
              <div className="p-3 flex gap-3">
                <div>
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                    alt="notification icon"
                    className="rounded-4xl border-2 h-11 w-11 border-white cursor-pointer"
                  />
                </div>
                <div className="text-md flex items-center justify-center">
                  Shubham has sent you connection request
                </div>
              </div>
            </div>
          ))}
        </Card>
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

export default Notification;
