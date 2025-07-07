import React from 'react';
import Card from '../card/card';

const ProfileCard = (props) => {
   return (
      <Card padding={0}>
         <div className="relative h-25 ">
            <div className="relative w-full h-22 rounded-b-full">
               <img
                  src={props.data?.cover_pic}
                  className="rounded-t-md h-full w-full"
                  alt=""
               />
            </div>
            <div className="absolute top-14 left-6 z-10">
               <img
                  className="rounded-4xl border-2 h-14 w-14 border-white cursor-pointer"
                  src={props.data?.profile_pic}
                  alt=""
               />
            </div>
         </div>
         <div className="p-5">
            <div className="text-xl">{props.data?.f_name}</div>
            <div className="text-sm my-1">{props.data?.headline}</div>
            <div className="text-sm my-1">{props.data?.curr_location}</div>
            <div className="text-sm my-1">{props.data?.curr_company}</div>
         </div>
      </Card>
   );
};

export default ProfileCard;
