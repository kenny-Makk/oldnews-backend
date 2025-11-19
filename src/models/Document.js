const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  state: { 
    type: String, 
    enum: ['draft', 'submitted', 'approved', 'rejected', 'published'], 
    default: 'draft' 
  },
  version: { type: Number, default: 1 }
}, { timestamps: true });

module.exports = mongoose.model('Document', documentSchema);