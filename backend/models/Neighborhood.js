const mongoose = require('mongoose');

const NeighborhoodSchema = new mongoose.Schema({
  name: String,
  safety: Number,
  nightlife: Number,
  schools: Number,
  affordability: Number,
  greenery: Number,
  transport: Number
});

module.exports = mongoose.model('Neighborhood', NeighborhoodSchema);
