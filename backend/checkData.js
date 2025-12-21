require('dotenv').config();
const mongoose = require('mongoose');
const DailyActivity = require('./models/DailyActivity');
const ActivityLog = require('./models/ActivityLog');
const UserChallenge = require('./models/UserChallenge');
const Challenge = require('./models/Challenge');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log('Connected to database');
  
  // Check daily activities
  const activities = await DailyActivity.find({}).limit(10);
  console.log('Daily Activities:', JSON.stringify(activities, null, 2));
  
  // Check activity logs
  const logs = await ActivityLog.find({}).limit(10).populate('challenge');
  console.log('Activity Logs:', JSON.stringify(logs, null, 2));
  
  // Check user challenges
  const userChallenges = await UserChallenge.find({}).limit(10).populate('challenge');
  console.log('User Challenges:', JSON.stringify(userChallenges, null, 2));
  
  // Check challenges
  const challenges = await Challenge.find({}).limit(10);
  console.log('Challenges:', JSON.stringify(challenges, null, 2));
  
  process.exit(0);
});