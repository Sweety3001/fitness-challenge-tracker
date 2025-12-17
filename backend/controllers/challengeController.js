const Challenge = require("../models/Challenge");

exports.createChallenge = async (req, res) => {
  try {
    const challenge = await Challenge.create({
      ...req.body,
      creator: req.user._id,
      participants: [{ user: req.user._id }],
    });

    res.status(201).json(challenge);
  } catch (err) {
    res.status(500).json({ message: "Failed to create challenge" });
  }
};

exports.getPublicChallenges = async (req, res) => {
  const challenges = await Challenge.find({ isPublic: true })
    .populate("creator", "name");

  res.json(challenges);
};

exports.joinChallenge = async (req, res) => {
  const challenge = await Challenge.findById(req.params.id);

  const alreadyJoined = challenge.participants.some(
    (p) => p.user.toString() === req.user._id.toString()
  );

  if (alreadyJoined) {
    return res.status(400).json({ message: "Already joined" });
  }

  challenge.participants.push({ user: req.user._id });
  await challenge.save();

  res.json({ message: "Joined challenge" });
};
