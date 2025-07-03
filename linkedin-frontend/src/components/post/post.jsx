import React, { useState } from 'react';
import Card from '../card/card';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import SendIcon from '@mui/icons-material/Send';

const Post = () => {
  const [seemore, setSeeMore] = useState(false);
  const [comment, setComment] = useState(false);
  const descrip =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  const handlesendcomment = (e) => {
    e.preventDefault();
  };
  return (
    <div className="mt-4">
      <Card padding={0}>
        <div className="flex gap-3 p-4">
          <div className="w-12 h-12 rounded-4xl">
            <img
              className="rounded-4xl w-12 h-12 border-2 border-white cursor-pointer"
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
              alt=""
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div>
              <div className="text-md font-semibold">Priyanshu Kumar</div>
              <div className="text-xs text-gray-500">SDE-I at Microsoft</div>
            </div>
          </div>
        </div>

        <div className="text-sm p-4 mt-2 whitespace-pre-line flex-grow">
          {seemore ? descrip : descrip.slice(0, 100) + '...'}{' '}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => setSeeMore(!seemore)}>
            {seemore ? 'See less' : 'See more'}
          </span>
        </div>

        <div className="w-[100%] h-[300px] ">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
          />
        </div>
        <div className="my-2 p-4 flex justify-between items-center">
          <div className="flex gap-1 items-center">
            <ThumbUpIcon sx={{ color: 'blue', fontSize: 12 }} />{' '}
            <div className="text-sm text-gray-600">1 Likes</div>
          </div>
          <div className="flex gap-1 items-center">
            <div className="text-sm text-gray-600">1 Comment</div>
          </div>
        </div>

        <div className="flex p-1 mb-1">
          <div className="w-1/3 flex justify-center items-center gap-2 p-1 rounded-4xl hover:bg-gray-100 cursor-pointer">
            <ThumbUpIcon sx={{ fontSize: 18, color: 'blue' }} />
            <span className="text-sm">Like</span>
          </div>
          <div
            onClick={() => setComment(!comment)}
            className="w-1/3 flex justify-center items-center gap-2 p-1 rounded-4xl hover:bg-gray-100 cursor-pointer">
            <InsertCommentIcon sx={{ fontSize: 18 }} />
            <span className="text-sm">Comment</span>
          </div>
          <div className="w-1/3 flex justify-center items-center gap-2 p-1 rounded-4xl hover:bg-gray-100 cursor-pointer">
            <SendIcon sx={{ fontSize: 18 }} />
            <span className="text-sm">Share</span>
          </div>
        </div>

        {/* comment section */}
        {comment && (
          <div className="p-4 w-full">
            <div className="flex items-center gap-2 mb-2">
              <img
                className="w-9 h-9 rounded-full cursor-pointer"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                alt=""
              />
              <form
                action=""
                onSubmit={handlesendcomment}
                className="w-full flex gap-2">
                <input
                  type="text"
                  className="w-full border-1 py-2 text-sm px-5 rounded-3xl hover:bg-gray-100"
                  placeholder="Add a comment..."
                />
                <button className="cursor-pointer" type="submit">
                  <SendIcon sx={{ color: 'blue', fontSize: 20 }} />
                </button>
              </form>
            </div>
            {/* <div className="text-sm text-gray-600">No comments yet</div> */}

            <div className="w-full p-4">
              <div className="flex items-center gap-2 mb-2">
                <img
                  className="w-8 h-8 rounded-full cursor-pointer"
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                  alt=""
                />
                <div className="text-xs">
                  <span className="text-sm font-semibold">Priyanshu Kumar</span>{' '}
                  Nice post!
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Post;
