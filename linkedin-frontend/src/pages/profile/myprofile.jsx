import React, { useState } from 'react';
import Advertisement from '../../components/Advertisement/Advertisement';
import Card from '../../components/card/card';
import EditIcon from '@mui/icons-material/Edit';
import Post from '../../components/post/Post';
import AddIcon from '@mui/icons-material/Add';
import Model from '../../components/model/model';
import ImageModel from '../../components/imagemodel/imagemodel';
import EditProfileModel from '../../components/editprofilemodel/editprofilemodel';
import AboutModel from '../../components/editaboutmodel/editaboutmodel';
import ExperienceModel from '../../components/editexperinecemodel/editexperiencemodel';
import MessageModel from '../../components/messageModel/messagemodel';

const Profile = () => {
  const [imagemodel, setImagemodel] = useState(false);
  const [circularImage, setCircularImage] = useState(true);
  const [infoModel, SetInfoModel] = useState(false);
  const [aboutModel, SetAboutModel] = useState(false);
  const [experienceModel, SetExperienceModel] = useState(false);
  const [messageModel, SetMessageModel] = useState(false);

  const handleInfoModel = () => {
    SetInfoModel(!infoModel);
  };
  const handleAboutModel = () => {
    SetAboutModel(!aboutModel);
  };

  const handleExperienceModel = () => {
    SetExperienceModel(!experienceModel);
  };

  const handleMessageModel = () => {
    SetMessageModel(!messageModel);
  };

  const handleImageModel = () => {
    setImagemodel(!imagemodel);
  };
  const openImageModel = () => {
    setImagemodel(true);
    setCircularImage(false);
  };
  const handleCircularImageModelOpen = () => {
    setImagemodel(true);
    setCircularImage(true);
  };

  return (
    <div className="px-18 xl:px-50 py-9 flex flex-col pt-12 gap-5 w-full mt-5 bg-gray-100">
      <div className="flex gap-5">
        {/* left side main section */}
        <div className="w-full md:w-[70%] flex flex-col gap-5">
          {/* profile card... */}
          <div>
            <Card padding={0}>
              <div className="w-full h-fit">
                <div className="relative w-full h-[200px]">
                  <div
                    onClick={openImageModel}
                    className="absolute cursor-pointer top-3 right-3 z-20 w-[33px] flex justify-center items-center h-[35px] rounded-full p-3 bg-gray-200">
                    <EditIcon />
                  </div>
                  <img
                    src="https://t4.ftcdn.net/jpg/05/54/46/89/360_F_554468927_iwU3VYIjsaeopAb0WPYxVf21TloEhTEj.jpg"
                    className="w-full h-[200px] rounded-tr-lg rounded-tl-lg"
                    alt=""
                  />

                  <div onClick={handleCircularImageModelOpen}>
                    <img
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                      className="absolute top-[135px] left-6 w-[100px] h-[100px] rounded-full border-2 border-white"
                      alt=""
                    />
                  </div>
                </div>

                <div className="mt-10 relative px-8 py-2">
                  <div
                    onClick={handleInfoModel}
                    className="absolute cursor-pointer top-0 right-3 z-50 w-[35px] flex justify-center items-center h-[35px] rounded-full p-3">
                    <EditIcon />
                  </div>
                  <div className="w-full">
                    <div className="text-xl font-semibold">Priyanshu Kumar</div>
                    <div className="text-sm my-1">
                      SDE-2 software eng @Amazon
                    </div>
                    <div className="text-sm my-1 text-gray-600">
                      Delhi, India
                    </div>
                    <div className="text-md text-blue-800 w-fit cursor-pointer hover:underline">
                      2 Connections
                    </div>

                    <div className="flex flex-wrap w-full justify-between gap-4 sm:gap-5">
                      <div className="my-3 flex flex-wrap gap-3 sm:my-5 sm:gap-3">
                        <div className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900">
                          Open to
                        </div>

                        <div className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900">
                          Share Profile
                        </div>

                        <div className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900">
                          Logout
                        </div>
                      </div>

                      <div className="my-3 flex flex-wrap gap-3 sm:my-5 sm:gap-5">
                        <div
                          onClick={handleMessageModel}
                          className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900">
                          Message
                        </div>

                        <div className="cursor-pointer p-2 border rounded-lg bg-blue-800 text-white font-semibold hover:bg-blue-900">
                          Disconnect
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          {/* about section */}
          <div>
            <Card padding={1}>
              <div className="w-full">
                <div className="flex justify-between items-center">
                  <div className="text-lg font-semibold mb-3">About</div>
                  <div onClick={handleAboutModel} className="cursor-pointer">
                    <EditIcon />
                  </div>
                </div>
                <div className="text-sm text-gray-700">
                  Experienced Software Development Engineer with a demonstrated
                  history of working in the information technology and services
                  industry. Skilled in Java, Python, C++, and various web
                  technologies. Strong engineering professional with a
                  Bachelor's degree in Computer Science.
                </div>
              </div>
            </Card>
          </div>
          {/* skills section */}
          <div>
            <Card padding={1}>
              <div className="w-full">
                <div className="text-lg font-semibold mb-3">Skills</div>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Java
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Python
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    C++
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    React
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Node.js
                  </span>
                </div>
              </div>
            </Card>
          </div>
          {/* activity section */}
          <div>
            <Card padding={1}>
              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold mb-3">Activities</div>
              </div>
              <div className="cursor-pointer px-3 py-1 w-fit border-1 rounded-4xl bg-green-800 text-white font-semibold">
                Posts
              </div>
              <div className="overflow-x-auto my-2 flex gap-2 overflow-y-hidden w-full">
                <div className="cursor-pointer shrink-0 w-[350px]">
                  <Post profile={1} />
                </div>
                <div className="cursor-pointer shrink-0 w-[350px]">
                  <Post profile={1} />
                </div>
                <div className="cursor-pointer shrink-0 w-[350px]">
                  <Post profile={1} />
                </div>
              </div>
            </Card>
          </div>
          {/* experience section... */}
          <div>
            <Card padding={1}>
              <div className="w-full">
                <div className="w-full flex justify-between items-center mb-2">
                  <div className="text-lg font-semibold">Experience</div>
                  <div
                    onClick={handleExperienceModel}
                    className="cursor-pointer">
                    <AddIcon />
                  </div>
                </div>
                <div>
                  <div className="p-2 border-t-1 border-gray-300 flex justify-between">
                    <div>
                      <div className="text-lg">SDE-I | Full Stack Engineer</div>
                      <div className="text-sm text-gray-600">@Amazon</div>
                      <div className="text-sm text-gray-600">
                        March 2025 ,Present
                      </div>
                      <div className="text-sm text-gray-600">Delhi,India</div>
                    </div>
                    <div className="cursor-pointer">
                      <EditIcon />
                    </div>
                  </div>
                  <div className="p-2 border-t-1 border-gray-300 flex justify-between">
                    <div>
                      <div className="text-lg">SDE-I | Full Stack Engineer</div>
                      <div className="text-sm text-gray-600">@Amazon</div>
                      <div className="text-sm text-gray-600">
                        March 2025 ,Present
                      </div>
                      <div className="text-sm text-gray-600">Delhi,India</div>
                    </div>
                    <div className="cursor-pointer">
                      <EditIcon />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        {/* right side section... */}
        <div className="w-full md:w-[30%] hidden md:block">
          <Advertisement />
        </div>
      </div>

      {/* image model */}
      {imagemodel && (
        <Model title={'Upload Image'} closemodel={handleImageModel}>
          <ImageModel isCircular={circularImage} />
        </Model>
      )}

      {/* info model */}
      {infoModel && (
        <Model title={'Edit Profile'} closemodel={handleInfoModel}>
          <EditProfileModel />
        </Model>
      )}

      {/* About model */}
      {aboutModel && (
        <Model title={'Edit About'} closemodel={handleAboutModel}>
          <AboutModel />
        </Model>
      )}

      {/* Experience model */}
      {experienceModel && (
        <Model title={'Add Experience'} closemodel={handleExperienceModel}>
          <ExperienceModel />
        </Model>
      )}

      {/* Message model */}
      {messageModel && (
        <Model title={'Send Message'} closemodel={handleMessageModel}>
          <MessageModel />
        </Model>
      )}
    </div>
  );
};

export default Profile;
