const mongoose = require('mongoose');

const altarSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Discord user ID
  protectionPoints: { type: Number, default: 0 },
  affirmations: { type: Number, default: 0 },
  tickets: { type: Number, default: 0 },
  tarot: { type: Number, default: 0 },
  grimoire: { type: Number, default: 0 },
  wand: { type: Number, default: 0 },
  potion: { type: Number, default: 0 },
  besom: { type: Number, default: 0 },
  crystals: { type: Number, default: 0 },
  cauldron: { type: Number, default: 0 },
  bio: { type: String, default: "" },
  bioImage: { type: String, default: "" }
});

module.exports = mongoose.model('Altar', altarSchema);