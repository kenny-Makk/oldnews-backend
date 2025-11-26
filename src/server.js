import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
const app = express();
import cors from "cors";
app.use(cors());

app.use(express.json());

// ====== MongoDB CONNECT ======
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// ====== ROUTES ======
import authRoutes from "./routes/authRoutes.js";
import documentRoutes from "./routes/documentRoutes.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import editorRoutes from "./routes/editorRoutes.js";

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