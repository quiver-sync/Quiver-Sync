import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import { useUser } from "../../../context/UserContext";
import {
  FaUser,
  FaRulerVertical,
  FaWeightHanging,
  FaWater,
  FaEdit,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const levels = [
  { id: 1, text: "kook" },
  { id: 2, text: "intermediate" },
  { id: 3, text: "advanced" },
];

const Profile = () => {
  const { setUser } = useUser();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("/auth/profile");
        setProfile(res.data);
        setForm(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await axios.put("/auth/profile", {
        username: form.username,
        level: form.level,
        height: form.height,
        weight: form.weight,
        picture: form.picture,
      });

      setProfile(res.data);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile:", err.message);
      alert("Something went wrong while saving.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1024 * 1024 * 2) {
      console.log("Please upload an image smaller than 2MB.");
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setForm({ ...form, picture: reader.result });
    };
    reader.readAsDataURL(file);
  };

  if (!profile)
    return (
      <div className="text-center py-20 text-sky-600 font-semibold animate-pulse">
        🌊 Loading your surf profile...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white pb-16">
      {/* Hero Header */}
      <div
        className="h-52 sm:h-64 bg-cover bg-center relative flex items-end"
        style={{
          backgroundImage:
            "url('https://www.surfer.com/.image/w_3840,q_auto:good,c_limit/MTk3NTc1NzEzMDQwMTgxMDQy/10.%2520perfect-pipe-2nd-reef-from-the-bunker-trail_HAW_6701RyanChachCraig220225.jpg')",
        }}
      >
        <div className="w-full h-full absolute bg-opacity-40" />
        <div className="relative z-10 px-6 sm:px-12 pb-3">
          <div className="backdrop-blur-[5px] border border-sky-200 p-4 sm:p-6 rounded-xl shadow-lg inline-block">
            <h1 className="text-2xl sm:text-4xl font-bold text-sky-700 drop-shadow-md">
              Welcome back, {profile.username} 🏄
            </h1>
            <p className="text-sky-700 text-xl mt-1">Email: {profile.email}</p>
          </div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="max-w-3xl mx-auto my-20 bg-white border border-sky-200 shadow-xl rounded-3xl px-6 sm:px-10 py-20 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <img
                src={previewImage || profile.picture || "/default-avatar.png"}
                alt="avatar"
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
              />

              {editMode && (
                <>
                  <label
                    htmlFor="pictureUpload"
                    className="absolute inset-0 bg-white bg-opacity-30 rounded-full flex items-center justify-center text-white text-xs font-semibold cursor-pointer opacity-0 group-hover:opacity-100 transition"
                  >
                    Change
                  </label>
                  <input
                    id="pictureUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </>
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold text-sky-800">Surf Profile</h2>
              <p className="text-sm text-gray-500">Status: {profile.status}</p>
            </div>
          </div>

          <div>
            {editMode ? (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditMode(false)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
                  title="Cancel"
                >
                  <FaTimes className="text-gray-500" />
                </button>
                <button
                  onClick={handleSave}
                  className="p-2 rounded-full bg-sky-600 hover:bg-sky-700 text-white"
                  title="Save"
                >
                  <FaCheck />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="flex items-center gap-2 px-4 py-2 text-sm bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow"
              >
                <FaEdit /> Edit
              </button>
            )}
          </div>
        </div>

        {/* Profile Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <ProfileField
            label="Username"
            icon={<FaUser />}
            name="username"
            value={form.username}
            editMode={editMode}
            onChange={handleChange}
          />
          <ProfileField
            label="Surf Level"
            icon={<FaWater />}
            name="level"
            value={form.level}
            editMode={editMode}
            onChange={handleChange}
            isLevelField
          />
          <ProfileField
            label="Height (cm)"
            icon={<FaRulerVertical />}
            name="height"
            value={form.height}
            editMode={editMode}
            onChange={handleChange}
          />
          <ProfileField
            label="Weight (kg)"
            icon={<FaWeightHanging />}
            name="weight"
            value={form.weight}
            editMode={editMode}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

const ProfileField = ({
  label,
  icon,
  name,
  value,
  editMode,
  onChange,
  isLevelField = false,
}) => {
  return (
    <div>
      <label className="text-sky-700 font-medium flex items-center gap-2 mb-8">
        {icon}
        {label}
      </label>

      {editMode ? (
        isLevelField ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none shadow-sm"
          >
            <option value="">Select level</option>
            {levels.map((lvl) => (
              <option key={lvl.id} value={lvl.text}>
                {lvl.text}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-2 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 focus:outline-none shadow-sm"
          />
        )
      ) : (
        <p className="text-sky-900 font-semibold">{value || "-"}</p>
      )}
    </div>
  );
};

export default Profile;
