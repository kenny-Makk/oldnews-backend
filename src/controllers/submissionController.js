/**
 * Submission Controller
 * Handles writer → editor submission workflow.
 */
import Submission from "../models/Submission.js";
import Document from "../models/Document.js";
import User from "../models/User.js";

/**
 * POST /submit
 * Writer submits a document to the editor.
 * Automatically finds an editor user.
 * Creates a Submission record (status = "pending").
 * Sets document.state = "submitted".
 */
export const submitDocument = async (req, res) => {
  try {
    const userId = req.user.id;
    const { documentId } = req.body;

    // ① Document が writer のものか？
    const doc = await Document.findOne({ _id: documentId, ownerId: userId });
    if (!doc) {
      return res.status(404).json({ message: "Document not found or not owned" });
    }

    // ② Editor を DB から検索（固定 editor）
    const editor = await User.findOne({ role: "editor" });
    if (!editor) {
      return res.status(500).json({ message: "No editor found" });
    }

    // ③ Submission を作成
    const submission = await Submission.create({
      documentId,
      senderId: userId,
      receiverId: editor._id,
      status: "pending",
    });

    // ④ Document state 更新
    doc.state = "submitted";
    await doc.save();

    return res.status(201).json({ message: "Submitted", submission });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
/**
 * GET /submissions/mine
 * Returns all submissions created by the logged‑in writer.
 * Includes document details via populate().
 */
// Writer 用：自分が提出した submission 一覧
export const getMySubmissions = async (req, res) => {
  try {
    const writerId = req.user.id;

    const mySubs = await Submission.find({
      senderId: writerId,
    }).populate("documentId");

    return res.json(mySubs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};