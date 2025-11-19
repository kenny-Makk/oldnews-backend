const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// ====== MongoDB CONNECT ======
mongoose.connect('mongodb://127.0.0.1:27017/oldnews')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// ====== ROUTES ======
const authRoutes = require('./routes/authRoutes');
const documentRoutes = require('./routes/documentRoutes');
const submissionRoutes = require('./routes/submissionRoutes');
const editorRoutes = require('./routes/editorRoutes');

app.use('/auth', authRoutes);
app.use('/documents', documentRoutes);
app.use('/submissions', submissionRoutes);
app.use('/editor', editorRoutes);

// ====== TEST ROUTE ======
app.get('/', (req, res) => {
  res.send('OldNews API running');
});

// ====== SERVER START ======
app.listen(3000, () => {
  console.log('Server running on port 3000');
});