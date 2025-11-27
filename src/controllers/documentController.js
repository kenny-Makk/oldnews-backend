/**
 * Document Controller
 * Handles creating, updating, deleting, and retrieving documents.
 * These endpoints are used by both Writer and Editor roles.
 */
import Document from "../models/Document.js";

/**
 * POST /documents/create
 * Creates a new draft document for the logged‑in writer.
 * Requires: title, content
 * Response: Newly created document (state = "draft")
 */
export const createDocument = async (req, res) => {
  try {
    const { title, content } = req.body;

    // タイトルまたは内容がない場合
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // JWT ミドルウェアがセットしたログインユーザーID
    const userId = req.user.id;

    const newDoc = await Document.create({
      ownerId: userId,
      title,
      content,
      state: "draft",
      version: 1,
    });

    return res.status(201).json(newDoc);
  } catch (error) {
    console.error("Create Document Error:", error);
    return res.status(500).json({
      message: "Server error while creating document",
      error: error.message,
    });
  }
};

/**
 * GET /documents/mine
 * Returns all documents that belong to the logged‑in user.
 * Sorted by last updated date (newest first).
 */
export const getMyDocuments = async (req, res) => {
  try {
    const userId = req.user.id;

    const docs = await Document.find({ ownerId: userId }).sort({ updatedAt: -1 });

    return res.status(200).json(docs);
  } catch (error) {
    console.error("Get My Documents Error:", error);
    return res.status(500).json({ message: "Server error while fetching documents", error: error.message });
  }
};

/**
 * PUT /documents/:id
 * Allows a writer to update their own document.
 * Automatically increases the version number.
 */
export const updateDocument = async (req, res) => {
  try {
    const userId = req.user.id;
    const documentId = req.params.id;
    const { title, content } = req.body;

    // どちらか missing
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    // 自分の document だけ更新可能
    const doc = await Document.findOne({ _id: documentId, ownerId: userId });

    if (!doc) {
      return res.status(404).json({ message: "Document not found or not owned by user" });
    }

    // 更新処理
    doc.title = title;
    doc.content = content;
    doc.version = doc.version + 1;

    await doc.save();

    return res.status(200).json({
      message: "Document updated successfully",
      document: doc
    });

  } catch (error) {
    console.error("Update Document Error:", error);
    return res.status(500).json({
      message: "Server error while updating document",
      error: error.message
    });
  }
};

/**
 * DELETE /documents/:id
 * Deletes a document owned by the logged‑in user.
 */
export const deleteDocument = async (req, res) => {
  try {
    const userId = req.user.id;
    const documentId = req.params.id;

    // Document が自分のものか確認
    const doc = await Document.findOne({ _id: documentId, ownerId: userId });

    if (!doc) {
      return res.status(404).json({
        message: "Document not found or not owned by user"
      });
    }

    // 削除
    await Document.deleteOne({ _id: documentId });

    return res.status(200).json({
      message: "Document deleted successfully"
    });

  } catch (error) {
    console.error("Delete Document Error:", error);
    return res.status(500).json({
      message: "Server error while deleting document",
      error: error.message
    });
  }
};

export const submitDocument = (req, res) => {
  res.send("SUBMIT DOCUMENT: Not implemented yet");
};

/**
 * GET /documents/published
 * Returns all documents that have state = "published".
 * Used by both writers and editors to view published content.
 */
export const getPublishedDocuments = async (req, res) => {
  try {
    const docs = await Document.find({ state: "published" })
      .sort({ updatedAt: -1 });

    return res.json(docs);
  } catch (error) {
    console.error("Get Published Documents Error:", error);
    return res.status(500).json({
      message: "Server error while fetching published documents",
      error: error.message
    });
  }
};