import { useState } from "react";
import { api } from "../../api/api";

const LogActivityModal = ({ challengeType, onClose, onLogged }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
  setLoading(true);
  try {
    if (challengeType === "steps") {
      await api.logSteps({
        challengeId,        // must be passed as prop
        steps: Number(value),
      });
    } else {
      await api.logActivity({
        challengeId,
        value: Number(value),
      });
    }

    onLogged();
    onClose();
  } catch (err) {
    alert("Failed to log activity");
  }
  setLoading(false);
};


  const isSteps = challengeType === "steps";

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
            onClick={submit}
            disabled={loading}
            className="flex-1 py-2 rounded bg-violet-600"
          >
            Save
          </button>
          <button onClick={onClose} className="flex-1 py-2 border rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogActivityModal;
