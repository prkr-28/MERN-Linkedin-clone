import React, { useState } from 'react';
import ProfileCard from '../../components/Profilrcard/profileCard';

const MyNetwork = () => {
  const [text, setText] = useState('Catch up with friends');

  return (
    <div className="min-h-screen w-full bg-gray-100 py-6 px-18 mt-15  xl:px-50 flex flex-col gap-5">
      {/* Top bar */}
      <div className="bg-white rounded-xl border border-gray-300 p-4 sm:p-6 flex flex-col sm:flex-row gap-3 sm:gap-0 justify-between items-start sm:items-center">
        <div className="text-sm sm:text-lg text-gray-600">{text}</div>
        <div className="flex gap-2 sm:gap-3 text-xs sm:text-sm">
          <button
            className={`px-3 py-1 border border-gray-300 rounded-lg cursor-pointer ${
              text === 'Catch up with friends' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => setText('Catch up with friends')}>
            Friends
          </button>
          <button
            className={`px-3 py-1 border border-gray-300 rounded-lg cursor-pointer ${
              text === 'Pending requests' ? 'bg-blue-500 text-white' : ''
            }`}
            onClick={() => setText('Pending requests')}>
            Pending requests
          </button>
        </div>
      </div>

      {/* Profile cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {[...Array(6)].map((_, idx) => (
          <div key={idx} className="w-full">
            <ProfileCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyNetwork;
