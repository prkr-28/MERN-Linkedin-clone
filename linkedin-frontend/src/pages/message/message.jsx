import React from 'react';
import Card from '../../components/card/Card';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Advertisement from '../../components/advertisement/Advertisement';
import Conversation from '../../components/coversation/conversation';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ImageIcon from '@mui/icons-material/Image';

const Message = () => {
  return (
    <div className="px-18 xl:px-50 py-9 flex gap-5 w-full mt-5 bg-gray-100">
      <div className="w-full flex justify-between gap-8 pt-5">
        {/* left side */}
        <div className="w-full md:w-[70%]">
          <Card padding={0}>
            <div className="border-b-1 border-gray-300 px-5 py-2 font-semibold text-lg">
              Start Messaging
            </div>
            <div className="border-b-1 border-gray-300 px-5 py-2">
              <div className="py-1 px-3 cursor-pointer hover:bg-green-900 bg-green-800 font-semibold flex gap-2 w-fit rounded-2xl text-white">
                Focused <ArrowDropDownIcon />
              </div>
            </div>
            {/* div fro chat */}
            <div className="w-full md:flex">
              <div className="h-[590px] overflow-auto w-full md:w-[40%] border-r-1 border-gray-400">
                {/* for each chat */}
                {[...Array(9)].map((_, idx) => (
                  <Conversation key={idx} />
                ))}
              </div>

              <div className="w-full md:w-[60%] border-gray-400">
                <div className="border-gray-300 border-b-2 flex justify-between items-center">
                  <div className="flex items-center gap-3 p-4">
                    <img
                      className="w-10 h-10 rounded-[100%] cursor-pointer"
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                      alt=""
                    />
                    <div>
                      <p className="text-[14px]">Shubham</p>
                      <p className="text-xs text-gray-500">
                        Software Engineer @Amazon
                      </p>
                    </div>
                  </div>
                  <div className="pr-3 cursor-pointer">
                    <MoreHorizIcon />
                  </div>
                </div>

                <div className="h-[360px] w-full overflow-auto border-b-1 border-gray-300">
                  <div className="w-full border-b-1 border-gary-300 gap-3 p-4">
                    {/* use mapping to show user chats */}
                    {[...Array(10)].map((_, idx) => (
                      <div key={idx}>
                        <div className="flex items-center gap-3">
                          <img
                            className="w-10 h-10 rounded-[100%] cursor-pointer"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                            alt=""
                          />
                          <div className="bg-gray-200 p-2 rounded-lg">
                            <p className="text-sm">Hello, how are you?</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 justify-end">
                          <div className="bg-blue-600 text-white p-2 rounded-lg">
                            <p className="text-sm">I'm good, thanks!</p>
                          </div>
                          <img
                            className="w-10 h-10 rounded-[100%] cursor-pointer"
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                            alt=""
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* message typing section... */}
                <div className="p-2 w-full border-b-2 border-gray-200">
                  <textarea
                    rows={4}
                    className="bg-gray-200 outline-0 rounded-xl text-sm w-full p-3"
                    placeholder="Write a message..."
                  />
                </div>
                <div className="p-4 flex justify-between items-center">
                  <div>
                    <label htmlFor="messageImage" className="cursor-pointer">
                      <ImageIcon />
                    </label>
                    <input type="file" id="messageImage" className="hidden" />
                  </div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition duration-200">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* right side */}
        <div className="w-fit md:w-[30%]">
          <Advertisement />
        </div>
      </div>
    </div>
  );
};

export default Message;
