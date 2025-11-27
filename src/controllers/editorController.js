/**
 * Editor Controller
 * Editor-only workflow: reviewing, approving, rejecting, publishing documents.
 */
import Submission from "../models/Submission.js";
import Document from "../models/Document.js";

// GET /editor/inbox
// Returns all pending submissions assigned to this editor.
// Only submissions with status = "pending".
export const getInbox = async (req, res) => {
  try {
    const editorId = req.user.id;

    const inbox = await Submission.find({
      receiverId: editorId,
      status: "pending",
    }).populate("documentId");

    return res.json(inbox);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /editor/approve/:id
// Approves a submission.
// Changes submission.status → "approved"
// Changes document.state → "approved"
export const approveSubmission = async (req, res) => {
  try {
    const id = req.params.id;

    const sub = await Submission.findById(id).populate("documentId");
    if (!sub) return res.status(404).json({ message: "Submission not found" });

    sub.status = "approved";
    await sub.save();

    sub.documentId.state = "approved";
    await sub.documentId.save();

    return res.json({ message: "Approved", submission: sub });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /editor/reject/:id
// Rejects a submission.
// Changes submission.status → "rejected"
// Changes document.state → "rejected"
export const rejectSubmission = async (req, res) => {
  try {
    const id = req.params.id;

    const sub = await Submission.findById(id).populate("documentId");
    if (!sub) return res.status(404).json({ message: "Submission not found" });

    sub.status = "rejected";
    await sub.save();

    sub.documentId.state = "rejected";
    await sub.documentId.save();

    return res.json({ message: "Rejected", submission: sub });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// POST /editor/publish/:id
// Publishes the document.
// Changes submission.status → "published"
// Changes document.state → "published"
export const publishDocument = async (req, res) => {
  try {
    const id = req.params.id;

    const sub = await Submission.findById(id).populate("documentId");
    if (!sub) return res.status(404).json({ message: "Submission not found" });

    // Submission を published に変更
    sub.status = "published";
    await sub.save();

    // Document も published 状態へ
    sub.documentId.state = "published";
    await sub.documentId.save();

    return res.json({ message: "Published", submission: sub });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// まだ不要
export const pullDocument = (req, res) => {
  res.send("PULL: Not implemented yet");
};

// GET /editor/approved
// Returns submissions that have already been approved.
// Editor uses this to track documents ready for publishing.
export const getApprovedList = async (req, res) => {
  try {
    const editorId = req.user.id;

    const approved = await Submission.find({
      receiverId: editorId,
      status: "approved",
    }).populate("documentId");

    return res.json(approved);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};