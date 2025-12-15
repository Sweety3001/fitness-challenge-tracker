const API_BASE_URL = "http://localhost:5000/api";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`
});

export const api = {
  // ✅ FIXED
  getProfile: async () => {
    const res = await fetch(`${API_BASE_URL}/user/me`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch profile");
    return res.json();
  },
   updateProfile: async (data) => {
    const res = await fetch(`${API_BASE_URL}/user/me`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update profile");
    return res.json();
  },
  signup: async (payload) => {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  },

  login: async (payload) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.json();
  },
  
};
