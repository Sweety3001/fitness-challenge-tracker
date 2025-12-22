// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import { api } from "../api/api";
// import { toast } from "react-toastify";
// const AVATARS=[
//   "/avatars/runner.png",
//   "/avatars/yoga.png",
//   "/avatars/gym.png",
//   "/avatars/cyclist.png",
//   "/avatars/minimal.png",
// ]
// const EditProfile = () => {
//   const { user, refreshUser } = useAuth();
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: user?.name || "",
//     age: user?.age || "",
//     gender: user?.gender || "",
//     fitnessLevel: user?.fitnessLevel || "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await api.updateProfile(form);
//       await refreshUser();
//       toast.success("Profile updated successfully ✅");
//       navigate("/dashboard");
//     } catch (err) {
//       toast.error("Failed to update profile ❌");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a] px-4">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-md p-6 space-y-5 border bg-white/5 border-white/10 rounded-xl"
//       >
//         <h2 className="text-xl font-semibold text-white">Edit Profile</h2>

//         {/* NAME */}
//         <div>
//           <label className="text-sm text-gray-400">Name</label>
//           <input
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//             className="w-full px-3 py-2 mt-1 text-white border rounded outline-none bg-black/40 border-white/10 focus:border-violet-500"
//             required
//           />
//         </div>

//         {/* AGE */}
//         <div>
//           <label className="text-sm text-gray-400">Age</label>
//           <input
//             name="age"
//             type="number"
//             value={form.age}
//             onChange={handleChange}
//             className="w-full px-3 py-2 mt-1 text-white border rounded outline-none bg-black/40 border-white/10"
//           />
//         </div>

//         {/* GENDER */}
//         <div>
//           <label className="text-sm text-gray-400">Gender</label>
//           <select
//             name="gender"
//             value={form.gender}
//             onChange={handleChange}
//             className="w-full px-3 py-2 mt-1 text-white border rounded bg-black/40 border-white/10"
//           >
//             <option value="">Select</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//         </div>

//         {/* FITNESS LEVEL */}
//         <div>
//           <label className="text-sm text-gray-400">Fitness Level</label>
//           <select
//             name="fitnessLevel"
//             value={form.fitnessLevel}
//             onChange={handleChange}
//             className="w-full px-3 py-2 mt-1 text-white border rounded bg-black/40 border-white/10"
//           >
//             <option value="">Select</option>
//             <option value="beginner">Beginner</option>
//             <option value="intermediate">Intermediate</option>
//             <option value="advanced">Advanced</option>
//           </select>
//         </div>

//         {/* ACTIONS */}
//         <div className="flex gap-3 pt-3">
//           <button
//             type="button"
//             onClick={() => navigate(-1)}
//             className="flex-1 py-2 text-white rounded bg-white/10 hover:bg-white/20"
//           >
//             Cancel
//           </button>

//           <button
//             type="submit"
//             disabled={loading}
//             className="flex-1 py-2 text-white rounded bg-violet-600 hover:bg-violet-700"
//           >
//             {loading ? "Saving..." : "Save"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default EditProfile;
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";
import { toast } from "react-toastify";

const AVATARS = [
  "/avatars/runner.png",
  "/avatars/yoga.png",
  "/avatars/gym.png",
  "/avatars/cyclist.png",
  "/avatars/minimal.png",
];

const EditProfile = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    age: user?.age || "",
    gender: user?.gender || "",
    fitnessLevel: user?.fitnessLevel || "",
    avatar: user?.avatar || "/avatars/default.png", // ✅ NEW
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.updateProfile(form); // avatar goes here
      await refreshUser();
      toast.success("Profile updated successfully ✅");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Failed to update profile ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f1a] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl p-6 space-y-6 border bg-white/5 border-white/10 rounded-xl"
      >
        <h2 className="text-xl font-semibold text-white">Edit Profile</h2>

        {/* ================= AVATAR SECTION ================= */}
        <div>
          <label className="text-sm text-gray-400">Choose Avatar</label>

          {/* Preview */}
          <div className="flex justify-center my-4">
            <img
              src={form.avatar}
              className="w-24 h-24 rounded-full ring-4 ring-violet-500"
            />
          </div>

          {/* Avatar Grid */}
          <div className="grid grid-cols-5 gap-4 justify-items-center">
            {AVATARS.map((avatar) => (
              <button
                key={avatar}
                type="button"
                onClick={() => setForm({ ...form, avatar })}
                className={`rounded-full p-1 transition
                ${
                  form.avatar === avatar
                    ? "ring-2 ring-violet-500 scale-105"
                    : "hover:ring-2 hover:ring-violet-400"
                }`}
              >
                <img
                  src={avatar}
                  className="object-cover rounded-full w-14 h-14"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ================= FORM FIELDS ================= */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* NAME */}
          <div>
            <label className="text-sm text-gray-400">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-white border rounded bg-black/40 border-white/10 focus:border-violet-500"
              required
            />
          </div>

          {/* AGE */}
          <div>
            <label className="text-sm text-gray-400">Age</label>
            <input
              name="age"
              type="number"
              value={form.age}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-white border rounded bg-black/40 border-white/10"
            />
          </div>

          {/* GENDER */}
          <div>
            <label className="text-sm text-gray-400">Gender</label>
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-white border rounded bg-black/40 border-white/10"
            >
              <option value="">Select</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* FITNESS LEVEL */}
          <div>
            <label className="text-sm text-gray-400">Fitness Level</label>
            <select
              name="fitnessLevel"
              value={form.fitnessLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 text-white border rounded bg-black/40 border-white/10"
            >
              <option value="">Select</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* ================= ACTIONS ================= */}
        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 py-2 text-white rounded bg-white/10 hover:bg-white/20"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-2 text-white rounded bg-violet-600 hover:bg-violet-700"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
