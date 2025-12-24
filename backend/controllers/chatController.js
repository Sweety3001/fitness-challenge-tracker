import Groq from "groq-sdk";

/* ================= RULE BASED RESPONSES ================= */
// console.log("GROQ KEY:", process.env.GROQ_API_KEY);

const RULE_RESPONSES = {
  hi: "Hello! How can I assist you?",
  hello: "Hi! How may I help you today?",
  timing: "Our gym is open from 6 AM to 10 PM.",
  hours: "We’re open from 6 AM to 10 PM.",
  price: "Membership details are available on the Pricing page.",
  pricing: "Membership details are available on the Pricing page."
};

const OUT_OF_TOPIC_KEYWORDS = [
  "president",
  "politics",
  "movie",
  "actor",
  "actress",
  "cricket",
  "football",
  "news",
  "current affairs",
  "election",
  "country",
  "capital"
];

/* ================= AI SETUP ================= */
export const chatReply = async (req, res) => {
  console.log("CHAT HIT:", req.body);

  const userMessage = (req.body.message || "").toLowerCase().trim();
  if (!userMessage) {
    return res.json({ reply: "Please enter a message." });
  }

  // Greetings only
  if (userMessage === "hi" || userMessage === "hello") {
    return res.json({ reply: "Hello! How can I assist you?" });
  }

  // Create Groq HERE (not at top of file)
  const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  console.log("🤖 AI USED FOR:", userMessage);

  try {
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
  role: "system",
  content: `
You are an AI assistant embedded in a fitness tracking application.

RESPONSE STYLE RULES:
- Keep responses short (3–5 lines max).
- Avoid long lists unless absolutely necessary.
- Be clear, precise, and friendly.

DOMAIN BEHAVIOR:
- You may answer fitness-related questions at a high level.
- You may briefly answer general questions to stay conversational.


SAFETY RULES:
- Do NOT give medical, diet, or personalized workout plans.
- Do NOT prescribe exercises or routines.
- You may talk about fitness concepts in a general, non-prescriptive way.

REMINDER FORMAT (MANDATORY):
- ALWAYS put the reminder on a NEW LINE.
- Separate it visually from the main answer.
- Use a soft pointer like 👉 or ℹ️.
- Give this line if user ask any question out of the topic. Do not use for things like greetings, complement or topic related questions.
`
},

        { role: "user", content: userMessage }
      ],
      temperature: 0.7,
      max_tokens: 180
    });
    const aiReply = completion.choices[0].message.content.trim();

// 🔹 STEP 2: add reminder ONLY for out-of-topic questions
const isOutOfTopic = OUT_OF_TOPIC_KEYWORDS.some(word =>
  userMessage.includes(word)
);

if (isOutOfTopic) {
  return res.json({
    reply: `${aiReply}

👉 I'm mainly here to help you use fitness tracking, challenges, and streaks in this app.`
  });
}

// 🔹 Normal AI reply (no reminder)
return res.json({ reply: aiReply });


    //     return res.json({
    //   reply: completion.choices[0].message.content.trim()
    // });

  } catch (error) {
    console.error("AI FAILED, using fallback:", error.message);
  }

  // FALLBACK RULES (ONLY if AI fails)
  for (const key in FALLBACK_RULES) {
    if (userMessage.includes(key)) {
      return res.json({ reply: FALLBACK_RULES[key] });
    }
  }

  // FINAL SAFE RESPONSE
  return res.json({
    reply:
      "I’m here to help with fitness tracking, challenges, and streaks in this app 🙂"
  });
};

//     return res.json({
//       reply: completion.choices[0].message.content.trim()
//     });
//   } catch (err) {
//     console.error("AI ERROR:", err);
//     return res.json({ reply: "AI is temporarily unavailable." });
//   }
// };
