import { useState } from "react";
import axios from "axios";

const AIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi 👋 I'm your AI Fitness Assistant. How can I help?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await axios.post("/api/chat", { message: input });

      setMessages((prev) => [
        ...prev,
        { from: "bot", text: res.data.reply }
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Something went wrong. Try again." }
      ]);
    }

    setInput("");
  };

  return (
    <>
      {/* Floating Icon */}
    <button
  onClick={() => setOpen(true)}
  className="fixed bottom-6 right-6 z-[9999] bg-blue-600 text-white p-4 rounded-full shadow-lg hover:scale-105 transition"
>
  💬
</button>


      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 z-[9999] w-80 bg-white rounded-xl shadow-xl flex flex-col">

          <div className="flex items-center justify-between p-3 text-white bg-blue-600 rounded-t-xl">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="flex-1 p-3 space-y-2 overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`text-sm ${
                  msg.from === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block px-3 py-2 rounded-lg ${
                    msg.from === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 p-2 border-t">
            <input
              className="flex-1 px-2 py-1 border rounded"
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="px-3 text-white bg-blue-600 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
