import React from 'react';
import Card from '../card/card';
import {Link} from 'react-router-dom';

const ProfileCard = (props) => {
   return (
      <Card padding={0}>
         <Link
            to={`/profile/${props.profileData?._id}`}
            className="relative h-25 ">
            <div className="relative w-full h-22 rounded-b-full">
               <img
                  src={props.profileData?.cover_pic}
                  className="rounded-t-md h-full w-full"
                  alt=""
               />
            </div>
            <div className="absolute top-14 left-6 z-10">
               <img
                  className="rounded-4xl border-2 h-14 w-14 border-white cursor-pointer"
                  src={props.profileData?.profile_pic}
                  alt=""
               />
            </div>
         </Link>
         <div className="p-5">
            <div className="text-xl">{props.profileData?.f_name}</div>
            <div className="text-sm my-1">{props.profileData?.headline}</div>
            <div className="text-sm my-1">
               {props.profileData?.curr_location}
            </div>
            <div className="text-sm my-1">
               {props.profileData?.curr_company}
            </div>
         </div>
      </Card>
   );
};

export default ProfileCard;
