import React from 'react';
import './loader.css'; // Ensure you have a loader.css file with the necessary styles

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-50">
      <div className="loader">
        <div className="justify-content-center jimu-primary-loading"></div>
      </div>
    </div>
  );
};

export default Loader;
