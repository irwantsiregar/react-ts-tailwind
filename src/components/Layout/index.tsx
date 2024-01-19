import React from 'react';

const Layout = (): JSX.Element => {
  return (
    <div className="w-screen h-screen pt-4 bg-white overflow-auto">
        <div className="container h-screen rounded-lg relative">
          <div className="h-1/4 rounded-xl bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500"></div>
          {/* Form List */}
          {/* {children} */}
        </div>
      </div>
  );
};

export default Layout;
