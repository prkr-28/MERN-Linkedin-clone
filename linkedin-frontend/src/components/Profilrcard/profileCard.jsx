import React from 'react';
import Card from '../card/card';

const ProfileCard = () => {
  return (
    <Card padding={0}>
      <div className="relative h-25 ">
        <div className="relative w-full h-22 rounded-b-full">
          <img
            src="https://t4.ftcdn.net/jpg/05/54/46/89/360_F_554468927_iwU3VYIjsaeopAb0WPYxVf21TloEhTEj.jpg"
            className="rounded-t-md h-full w-full"
            alt=""
          />
        </div>
        <div className="absolute top-14 left-6 z-10">
          <img
            className="rounded-4xl border-2 h-14 w-14 border-white cursor-pointer"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
            alt=""
          />
        </div>
      </div>
      <div className="p-5">
        <div className="text-xl">Priyanshu Kumar</div>
        <div className="text-sm my-1">@Amazon software eng</div>
        <div className="text-sm my-1">Delhi ,India</div>
        <div className="text-sm my-1">Amazon</div>
      </div>
    </Card>
  );
};

export default ProfileCard;
