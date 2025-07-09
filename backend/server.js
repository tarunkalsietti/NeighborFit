const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Neighborhood = require('./models/Neighborhood'); // <-- use Mongoose model

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

//  Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://tarunkalisetti2017:mypass123@test.czgxucp.mongodb.net/neighborfit?retryWrites=true&w=majority&appName=test')
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error(" MongoDB connection error:", err));

//  Matching Endpoint
app.post('/match', async (req, res) => {
  try {
    const prefs = req.body;
    const weights = ['safety', 'nightlife', 'schools', 'affordability', 'greenery', 'transport'];

    // Get neighborhoods from DB
    const neighborhoods = await Neighborhood.find({});

    // Calculate score for each neighborhood
    const matches = neighborhoods.map(n => {
      let score = 0, maxScore = 0;

      for (let w of weights) {
        score += (prefs[w] || 0) * (n[w] || 0);
        maxScore += (prefs[w] || 0) * 10;
      }

      const normalizedScore = Math.round((score / maxScore) * 100);
      return { ...n._doc, score: normalizedScore }; // return plain object with score
    }).sort((a, b) => b.score - a.score); // sort by best match

    res.json(matches.slice(0, 3)); // return top 3 matches
  } catch (err) {
    console.error("❌ Match error:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//  Start Server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
