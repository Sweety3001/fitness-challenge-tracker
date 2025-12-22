export const BADGES = [
  {
    key: "first_challenge",
    label: "First Challenge",
    description: "Join your first challenge",
    condition: { type: "first_activity" }
  },
  {
    key: "steps_10k_day",
    label: "10K Steps Day",
    description: "Walk 10,000 steps in a single day",
    condition: { minSteps: 10000 }
  },
  {
    key: "streak_7",
    label: "7-Day Streak",
    description: "Stay active for 7 consecutive days",
    condition: { minStreak: 7 }
  },
  {
    key: "streak_30",
    label: "30-Day Streak",
    description: "Stay active for 30 consecutive days",
    condition: { minStreak: 30 }
  },
  {
    key: "calorie_crusher",
    label: "Calorie Crusher",
    description: "Burn 500 calories in a day",
    condition: { minCalories: 500 }
  },
  {
    key: "marathon_runner",
    label: "Marathon Runner",
    description: "Complete any challenge",
    condition: { type: "completed_challenge" }
  },
  {
    key: "early_bird",
    label: "Early Bird",
    description: "Log activity before 8 AM",
    condition: { timeWindow: "morning" }
  },
  {
    key: "night_owl",
    label: "Night Owl",
    description: "Log activity after 10 PM",
    condition: { timeWindow: "night" }
  }
];