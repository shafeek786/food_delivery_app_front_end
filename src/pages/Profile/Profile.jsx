import React from "react";
import { assets } from "../../assets/assets";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="min-h-3.5 bg-gray-white border border-grey-600 rounded-[20px] shadow-lg flex flex-col py-10 px-12">
      <h1 className="text-4xl py-4 px-4">Profile</h1>
      <div className="gradient-box h-16  rounded-t-[12px] w-full my-4"></div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-10 mb-4 py-5 px-4 my-10">
          <div className="flex gap-4">
            <img
              src={assets.logo}
              alt="avatar"
              className="w-24 h-24 rounded-full"
            />
            <div className="flex flex-col gap-1 py-3">
              <h3 className="text-lg font-bold">name</h3>
              <h5>email</h5>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="">Name</label>
              <input
                className="border border-grey-300 rounded-lg p-2"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Email</label>
              <input
                className="border border-grey-300 rounded-lg p-2"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Mobile Number</label>
              <input
                className="border border-grey-300 rounded-lg p-2"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="">Address</label>
              <input
                className="border border-grey-300 rounded-lg p-2"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
