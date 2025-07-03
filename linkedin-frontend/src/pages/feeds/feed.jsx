import React, { useState } from 'react';
import ProfileCard from '../../components/Profilrcard/profileCard';
import Card from '../../components/card/card';
import { Image, SquarePlay, FileText } from 'lucide-react';
import Advertisement from '../../components/advertisement/advertisement';
import Post from '../../components/post/post';
import Model from '../../components/model/model';
import AddModel from '../../components/addModel/addModel';

const Feed = () => {
  const [postModel, setPostModel] = useState(false);
  const handlePostModel = () => {
    setPostModel(!postModel);
  };

  return (
    <div className="px-18 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      {/* left div... */}
      <div className="w-[21%] sm:block  sm:w-[23%] hidden py-5 ">
        <div className="h-fit">
          <ProfileCard />
        </div>
        <div className="w-full my-5">
          <Card padding={1}>
            <div className="w-full flex justify-between text-sm">
              <div>profile viewers</div>
              <div className="text-blue-900">23</div>
            </div>
            <div className="w-full flex justify-between text-sm">
              <div>post Impressions</div>
              <div className="text-blue-900">23</div>
            </div>
          </Card>
        </div>
      </div>
      {/* middle div */}
      <div className="w-[100%] py-5 sm:w-[50%]">
        <div>
          <Card padding={1}>
            <div className="flex gap-2 items-center">
              <img
                className="rounded-4xl border-2 h-13 w-13 border-white cursor-pointer"
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                alt=""
              />
              <div
                onClick={handlePostModel}
                className="w-full border-1 py-4 px-3 rounded-3xl cursor-pointer hover:bg-gray-100">
                Start a post
              </div>
            </div>
            <div className="w-full flex mt-3">
              <div
                onClick={handlePostModel}
                className="w-1/3 flex justify-center items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                <SquarePlay className="h-6 w-6 text-[#541212]" />
                <span className="text-sm">Video</span>
              </div>
              <div
                onClick={handlePostModel}
                className="w-1/3 flex justify-center items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                <Image className="h-6 w-6 text-[#242c9e]" />
                <span className="text-sm">Photo</span>
              </div>
              <div
                onClick={handlePostModel}
                className="w-1/3 flex justify-center items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer">
                <FileText className="h-6 w-6 text-[#ff2e2e]" />
                <span className="text-sm">Article</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="border-b-1 border-gray-500 w-[100%] my-5" />

        <Post />
        <Post />
      </div>
      {/* right div */}
      <div className="w-[26%] md:block hidden py-5">
        <div>
          <Card padding={1}>
            <div className="text-xl font-semibold mb-3">Trending Topics</div>
            <div className="text-sm text-gray-600 font-semibold mb-3">
              Top Stories
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-sm text-blue-700 cursor-pointer">
                Buffet to remain Bolt ai chairman
                <div className="text-xs text-gray-400">2h ago</div>
              </div>
              <div className="text-sm text-blue-700 cursor-pointer">
                Buffet to remain Bolt ai chairman
                <div className="text-xs text-gray-400">2h ago</div>
              </div>
              <div className="text-sm text-blue-700 cursor-pointer">
                Buffet to remain Bolt ai chairman
                <div className="text-xs text-gray-400">2h ago</div>
              </div>
            </div>
          </Card>
        </div>
        <div className="mt-5">
          <div>
            <Card padding={1}>
              <div className="text-xl font-semibold mb-3">
                Recent Activities
              </div>
              <div className="text-sm text-gray-600 font-semibold mb-3">
                Latest Updates
              </div>
              <div className="flex flex-col gap-3">
                <div className="text-sm text-blue-700 cursor-pointer">
                  User A liked your post
                  <div className="text-xs text-gray-400">1h ago</div>
                </div>
                <div className="text-sm text-blue-700 cursor-pointer">
                  User B commented on your post
                  <div className="text-xs text-gray-400">3h ago</div>
                </div>
                <div className="text-sm text-blue-700 cursor-pointer">
                  User C shared your post
                  <div className="text-xs text-gray-400">5h ago</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        <div className="mt-5 sticky top-18">
          <Advertisement />
        </div>
      </div>
      {/* Modal for post creation */}
      {postModel && (
        <Model title="" closemodel={handlePostModel}>
          <AddModel />
        </Model>
      )}
    </div>
  );
};

export default Feed;
