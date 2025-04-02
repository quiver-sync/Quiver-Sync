import { Avatar } from "@mui/material";

export function AvatarUploader({ image, onChange }) {
  return (
    <div className="text-center">
      <p className="font-semibold text-sky-800 mb-2">Profile Pic</p>
      <Avatar src={image} sx={{ width: 100, height: 100 }} className="mx-auto" />
      <div className="mt-3">
        <input
          type="file"
          accept="image/*"
          id="avatar-upload"
          onChange={onChange}
          className="hidden"
        />
        <label
          htmlFor="avatar-upload"
          className="cursor-pointer inline-block bg-gradient-to-r from-sky-600 to-blue-600 text-white px-4 py-1 rounded-full hover:shadow-lg hover:from-sky-700 transition"
        >
          Upload Image
        </label>
      </div>
    </div>
  );
}