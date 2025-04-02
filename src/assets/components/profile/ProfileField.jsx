import React from "react";


const SURF_LEVELS = [
    { id: 1, text: "kook" },
    { id: 2, text: "intermediate" },
    { id: 3, text: "pro" },];
    
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
        {icon} {label}
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
            {SURF_LEVELS.map((lvl) => (
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

export default ProfileField;
