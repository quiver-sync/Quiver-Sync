import React, { useEffect, useState } from "react";
import axios from "../../../utils/axiosInstance";
import { useUser } from "../../../context/UserContext";
import ProfileHeader from "./ProfileHeader";
import ProfileField from "./ProfileField";
import {
  FaUser,
  FaRulerVertical,
  FaWeightHanging,
  FaWater,
  FaEdit,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

export default function Profile() {
  const { setUser } = useUser();
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    axios.get("/auth/profile").then(res => {
      setProfile(res.data);
      setForm(res.data);
    }).catch(err => console.error("Error fetching profile:", err.message));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
    if (!file || file.size > 2 * 1024 * 1024) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
      setForm({ ...form, picture: reader.result });
    };
    reader.readAsDataURL(file);
  };

  if (!profile) {
    return (
      <div className="text-center py-20 text-sky-600 font-semibold animate-pulse">
        🌊 Loading your surf profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white pb-16">
      <ProfileHeader username={profile.username} email={profile.email} />

      <div className="max-w-3xl mx-auto my-20 bg-white border border-sky-200 shadow-xl rounded-3xl px-6 sm:px-10 py-20 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <img
                src={previewImage || profile.picture || "/default-avatar.png"}
                alt="avatar"
                className="w-40 h-40 rounded-full border-4 border-white shadow-lg object-cover"
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
                <button onClick={() => setEditMode(false)} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200" title="Cancel">
                  <FaTimes className="text-gray-500" />
                </button>
                <button onClick={handleSave} className="p-2 rounded-full bg-sky-600 hover:bg-sky-700 text-white" title="Save">
                  <FaCheck />
                </button>
              </div>
            ) : (
              <button onClick={() => setEditMode(true)} className="flex items-center gap-2 px-4 py-2 text-sm bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow">
                <FaEdit /> Edit
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
          <ProfileField label="Username" icon={<FaUser />} name="username" value={form.username} editMode={editMode} onChange={handleChange} />
          <ProfileField label="Surf Level" icon={<FaWater />} name="level" value={form.level} editMode={editMode} onChange={handleChange} isLevelField />
          <ProfileField label="Height (cm)" icon={<FaRulerVertical />} name="height" value={form.height} editMode={editMode} onChange={handleChange} />
          <ProfileField label="Weight (kg)" icon={<FaWeightHanging />} name="weight" value={form.weight} editMode={editMode} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}
