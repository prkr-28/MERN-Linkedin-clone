import React from 'react';
import Card from '../card/card';

const Advertisement = () => {
  return (
    <div className="sticky top-18">
      <Card padding={0}>
        <div className="relative h-25 ">
          <div className="relative w-full h-22 rounded-b-full">
            <img
              src="https://t4.ftcdn.net/jpg/05/54/46/89/360_F_554468927_iwU3VYIjsaeopAb0WPYxVf21TloEhTEj.jpg"
              className="rounded-t-md h-full w-full"
              alt=""
            />
          </div>
          <div className="absolute top-14 left-[40%] z-10">
            <img
              className="rounded-4xl border-2 h-12 w-12 border-white cursor-pointer"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              alt=""
            />
          </div>
        </div>

        <div className="px-5 my-5 mx-auto">
          <div className="text-sm font-semibold text-center">
            Priyanshu Kumar
          </div>
          <div className="text-sm my-3 text-center">
            Get the latest jobs and industry needs
          </div>
          <div className="text-sm my-1 border-1 text-center p-2 rounded 2xl font-bold border-blue-950 text-white bg-blue-800 cursor-pointer">
            Explore
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Advertisement;
