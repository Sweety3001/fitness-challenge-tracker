import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

/* =======================
   AXIOS INSTANCE
======================= */
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/* =======================
   FETCH HEADERS (legacy)
======================= */
const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
});

export const api = {
  /* =======================
     AUTH
  ======================= */
  login: async (data) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Login failed");
    }
    
    return res.json();
  },
  
  signup: async (data) => {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "Signup failed");
    }
    
    return res.json();
  },

  /* =======================
     PROFILE
  ======================= */
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
    if (!res.ok) throw new Error("Profile update failed");
    return res.json();
  },

  /* =======================
     CHALLENGES
  ======================= */
  joinChallenges: async (challengeIds) => {
    const res = await fetch(`${API_BASE_URL}/challenges/join`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ challengeIds }),
    });
    if (!res.ok) throw new Error("Failed to join challenges");
    return res.json();
  },

 getMyChallenges: async () => {
  const res = await fetch(`${API_BASE_URL}/challenges/my`, {
    headers: getHeaders(),
    cache: "no-store",     // 🔥 IMPORTANT
  });
  if (!res.ok) throw new Error("Failed to fetch challenges");
  return res.json();
},

  removeChallenge: async (userChallengeId) => {
    const res = await fetch(
      `${API_BASE_URL}/challenges/${userChallengeId}`,
      {
        method: "DELETE",
        headers: getHeaders(),
      }
    );
    if (!res.ok) throw new Error("Failed to remove challenge");
    return res.json();
  },

  /* =======================
     ACTIVITY (AXIOS)
  ======================= */
  logActivity: async ({ challengeId, value }) => {
    const response = await axiosInstance.post("/activity/log", { challengeId, value });
    return response.data;
  },

  logSteps: async ({ challengeId, steps }) => {
    const response = await axiosInstance.post("/activity/steps", { challengeId, steps });
    return response.data;
  },

  getTodaySnapshot: async () => {
  const res = await fetch(`${API_BASE_URL}/activity/today`, {
    headers: getHeaders(),
    cache: "no-store",     // 🔥 IMPORTANT
  });
  if (!res.ok) throw new Error("Failed to fetch today snapshot");
  return res.json();
},


getWeeklyActivity: async () => {
  const response = await axiosInstance.get("/activity/weekly");
  return response.data;
},


  getStreak: async () => {
    const res = await fetch(`${API_BASE_URL}/activity/streak`, {
      headers: getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to fetch streak");
    return res.json();
  },

  /* =======================
     CHALLENGE DETAILS
  ======================= */
  getChallengeDetails: async (userChallengeId) => {
    const res = await fetch(
      `${API_BASE_URL}/activity/challenge/${userChallengeId}`,
      { headers: getHeaders() }
    );
    if (!res.ok) throw new Error("Failed to fetch challenge details");
    return res.json();
  },
};

console.log("api ready", api);