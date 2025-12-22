import { useState } from "react";
import { useAuth } from "../../context/AuthContext";  // Import useAuth instead of api
import { toast } from "react-toastify";

// Badge label map - using canonical badge keys
const BADGE_LABELS = {
  first_challenge: "First Challenge",
  steps_10k_day: "10K Steps Day",
  streak_7: "7-Day Streak",
  streak_30: "30-Day Streak",
  calorie_crusher: "Calorie Crusher",
  marathon_runner: "Marathon Runner",
  early_bird: "Early Bird",
  night_owl: "Night Owl"
};

const LogActivityModal = ({ challengeId, challengeType, onClose, onLogged }) => {
  const { logActivity, logSteps } = useAuth();  // Use enhanced functions from context
  const [value, setValue] = useState("");

const submit = async () => {
  setLoading(true);
  try {
    const numericValue = Number(value);

    if (!numericValue || numericValue <= 0) {
      alert("Please enter a valid number");
      return;
    }

    // ✅ ONLY STEPS is daily metric
    if (challengeType === "steps") {
      const res = await logSteps({  // Use enhanced logSteps from context
        challengeId,   // still needed to update challenge progress
        steps: numericValue,
      });
      
      // Show success toasts for newly unlocked permanent badges
      if (res?.newlyUnlocked?.length > 0) {
        res.newlyUnlocked.forEach(badgeKey => {
          const label = BADGE_LABELS[badgeKey] || badgeKey;
          toast.success(`🏆 Achievement unlocked: ${label}`);
        });
      }
      
      // Show info toasts for daily unlocked badges (prevent duplicates)
      if (res?.dailyUnlocked?.length > 0) {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        res.dailyUnlocked.forEach(badgeKey => {
          const storageKey = `daily-toast-${today}-${badgeKey}`;
          // Check if toast was already shown today
          if (!sessionStorage.getItem(storageKey)) {
            const label = BADGE_LABELS[badgeKey] || badgeKey;
            toast.info(`🔥 Daily badge unlocked: ${label}`);
            // Mark as shown for today
            sessionStorage.setItem(storageKey, 'shown');
          }
        });
      }
    }
    // ✅ ALL OTHER TYPES ARE CHALLENGE-BASED
    else {
      if (!challengeId) {
        alert("Challenge ID missing");
        return;
      }

      const res = await logActivity({  // Use enhanced logActivity from context
        challengeId,
        value: numericValue,
      });
      
      // Show success toasts for newly unlocked permanent badges
      if (res?.newlyUnlocked?.length > 0) {
        res.newlyUnlocked.forEach(badgeKey => {
          const label = BADGE_LABELS[badgeKey] || badgeKey;
          toast.success(`🏆 Achievement unlocked: ${label}`);
        });
      }
      
      // Show info toasts for daily unlocked badges (prevent duplicates)
      if (res?.dailyUnlocked?.length > 0) {
        const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        res.dailyUnlocked.forEach(badgeKey => {
          const storageKey = `daily-toast-${today}-${badgeKey}`;
          // Check if toast was already shown today
          if (!sessionStorage.getItem(storageKey)) {
            const label = BADGE_LABELS[badgeKey] || badgeKey;
            toast.info(`🔥 Daily badge unlocked: ${label}`);
            // Mark as shown for today
            sessionStorage.setItem(storageKey, 'shown');
          }
        });
      }
    }

    onLogged();
    onClose();
  } catch (err) {
    console.error("LOG FAILED:", err.response?.data || err);
    alert(err.response?.data?.message || "Failed to log activity");
  } finally {
    setLoading(false);
  }
};

  const isSteps = challengeType === "steps";
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70">
      <div className="bg-[#0b0b12] p-6 rounded-xl w-80 space-y-4">
        {/* Title */}
        <h3 className="text-lg font-semibold">
          {isSteps ? "Add Steps" : `Log ${challengeType}`}
        </h3>

        {/* Input */}
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full px-3 py-2 bg-black border rounded border-white/10"
          placeholder={isSteps ? "Enter steps to add" : "Enter value"}
        />

        {/* ✅ Steps helper text */}
        {isSteps && (
          <p className="text-xs text-gray-400">
            You can add steps multiple times a day.
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <button
  type="button"        // ⭐ THIS IS THE FIX
  onClick={submit}
  disabled={loading}
  className="flex-1 py-2 rounded bg-violet-600"
>
  Save
</button>

          <button
  type="button"
  onClick={onClose}
  className="flex-1 py-2 border rounded"
>
  Cancel
</button>

        </div>
      </div>
    </div>
  );
};

export default LogActivityModal;