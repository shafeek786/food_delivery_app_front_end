import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
import toastr from "toastr";
import { assets } from "../../assets/assets";
import "./Profile.css";

const Profile = () => {
  const { userId, userDetails, updateUser } = useAuth();
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    profileImage: null,
  });

  useEffect(() => {
    if (userDetails) {
      setFormData({
        name: userDetails.name,
        email: userDetails.email,
        mobile: userDetails.mobile || "",
        address: userDetails.address || "",
        profileImage: userDetails.profileImage || "",
      });
      setLoading(false);
    }
  }, [userDetails]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formDataToSend = new FormData();
      formDataToSend.append("profileImage", file);
      try {
        const result = await updateUser(userId, formDataToSend);
        console.log(result.success);
        if (result.success) {
          console.log("check");
          setFormData({ ...formData, profileImage: result.data.profileImage });
          toastr.success("Profile image updated successfully!");
        } else {
          toastr.error(result.message);
        }
      } catch (error) {
        toastr.error("Unable to update profile image.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("mobile", formData.mobile);
    formDataToSend.append("address", formData.address);
    if (formData.profileImage) {
      formDataToSend.append("profileImage", formData.profileImage);
    }
    try {
      const result = await updateUser(userId, formDataToSend);
      if (result.success) {
        toastr.success("Profile updated successfully!");
      } else {
        toastr.error(result.message);
      }
    } catch (error) {
      toastr.error("Unable to update profile.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  const baseURL = "http://localhost:3000/";
  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-3.5 bg-gray-white border border-grey-600 rounded-[20px] shadow-lg flex flex-col py-10 px-10"
    >
      <h1 className="text-4xl py-4 px-4">Profile</h1>
      <div className="gradient-box h-16 rounded-t-[12px] w-full my-4"></div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-10 mb-4 py-5 px-4 my-10">
          <div className="flex gap-4 items-center">
            <div className="relative">
              <img
                src={
                  formData.profileImage
                    ? `${baseURL}${formData.profileImage}`
                    : assets.logo
                }
                alt="avatar"
                className="w-32 h-32 rounded-full cursor-pointer"
                onClick={() => document.getElementById("profileImage").click()}
              />
              <input
                type="file"
                id="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
            <div className="flex flex-col gap-1 py-3">
              <h3 className="text-lg font-bold">{formData.name}</h3>
              <h5>{formData.email}</h5>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Name</label>
              <input
                className="border border-grey-300 rounded-lg p-2"
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                className="border border-grey-300 rounded-lg p-2"
                type="text"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                className="border border-grey-300 rounded-lg p-2"
                type="text"
                id="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="address">Address</label>
              <input
                className="border border-grey-300 rounded-lg p-2"
                type="text"
                id="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-orange-500 text-white rounded-lg"
          >
            Update Profile
          </button>
        </div>
      </div>
    </form>
  );
};

export default Profile;
