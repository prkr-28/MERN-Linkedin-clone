import React from 'react';
import { Link } from 'react-router-dom';

const NavbarV1 = () => {
  return (
    <nav className="w-[100%] bg-gray-100 md:px-[100px] px-[20px] flex justify-between py-4 box-border">
      <div className="flex justify-between">
        <Link to={'/'} className="flex gap-[0.5] items-center cursor-pointer">
          <h3 className="text-blue-800 font-bold text-3xl">Linked</h3>
          <img
            className="w-7 h-7"
            src="https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
            alt=""
          />
        </Link>
      </div>

      <div className="flex box-border md:gap-4 gap-2 justify-center items-center">
        <Link
          to={'/signUp'}
          className="md:px-4 md:py-2 px-2 py-2 box-border text-black rounded-3xl text-[16px] hover:bg-gray-200 hover:text-blue-800 cursor-pointer">
          Join Now
        </Link>
        <Link
          to={'/login'}
          className="md:px-4 md:py-2 px-2 py-1 box-border text-blue-800 border-1 border-blue-800 rounded-3xl text-[16px] hover:bg-blue-100 cursor-pointer">
          Sign in
        </Link>
      </div>
    </nav>
  );
};

export default NavbarV1;
