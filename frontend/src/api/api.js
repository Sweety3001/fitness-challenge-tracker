const API_BASE_URL = "http://localhost:5000/api";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
});

export const api = {
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

  /* =======================
     CHALLENGES
  ======================= */
  joinChallenges: async (challengeIds) => {
    const res = await fetch(`${API_BASE_URL}/challenges/join`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ challengeIds }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to join challenges");
    }

    return res.json();
  },

  getMyChallenges: async () => {
    const res = await fetch(`${API_BASE_URL}/challenges/my`, {
      headers: getHeaders(),
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
     ACTIVITY
  ======================= */
  logActivity: async ({ challengeType, value }) => {
    const res = await fetch(`${API_BASE_URL}/activity/log`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ challengeType, value }),
    });

    if (!res.ok) throw new Error("Failed to log activity");
    return res.json();
  },

  getWeeklyActivity: async () => {
  const res = await fetch(`${API_BASE_URL}/activity/weekly`, {
    headers: getHeaders(),
  });

  if (!res.ok) throw new Error("Failed to fetch weekly activity");
  return res.json();
},


  getTodaySnapshot: async () => {
    const res = await fetch(`${API_BASE_URL}/activity/today`, {
      headers: getHeaders(),
    });

    if (!res.ok) throw new Error("Failed to fetch today snapshot");
    return res.json();
  },

  getStreak: async () => {
    const res = await fetch(`${API_BASE_URL}/activity/streak`, {
      headers: getHeaders(),
    });

    if (!res.ok) throw new Error("Failed to fetch streak");
    return res.json();
  },

  /* =======================
     CHALLENGE DETAILS + GRAPH
     (SINGLE SOURCE OF TRUTH)
  ======================= */
  getChallengeDetails: async (userChallengeId) => {
    const res = await fetch(
      `${API_BASE_URL}/activity/challenge/${userChallengeId}`,
      {
        headers: getHeaders(),
      }
    );

    if (!res.ok) throw new Error("Failed to fetch challenge details");
    return res.json(); 
    // returns: { challenge, data: [{day, value}] }
  },
};
