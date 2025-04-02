import React from "react";

const ProfileHeader = ({ username, email }) => {
  return (
    <div
      className="h-60 sm:h-64 bg-cover bg-center relative flex items-end"
      style={{
        backgroundImage:
        "url('https://www.surfer.com/.image/w_3840,q_auto:good,c_limit/MTk3NTc1NzEzMDQwMTgxMDQy/10.%2520perfect-pipe-2nd-reef-from-the-bunker-trail_HAW_6701RyanChachCraig220225.jpg')",
      }}
    >
      <div className="w-full h-full absolute bg-opacity-40" />
      <div className="relative z-10 px-6 sm:px-12 pb-3">
        <div className="backdrop-blur-[5px] border border-sky-200 p-4 sm:p-6 rounded-xl shadow-lg inline-block">
          <h1 className="text-2xl sm:text-4xl font-bold text-sky-700 drop-shadow-md">
            Welcome back, {username} 🏄
          </h1>
          <p className="text-sky-700 text-xl mt-1">Email: {email}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
