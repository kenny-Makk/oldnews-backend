/**
 * Middleware: editorOnly
 * ----------------------
 * Purpose:
 *   - Restricts access so that only users with role "editor" can continue.
 *
 * Behaviour:
 *   - Checks req.user.role (set by authMiddleware).
 *   - If role !== "editor" → returns 403 "Access denied".
 *   - Otherwise → request proceeds to next().
 *
 * Used in:
 *   - /editor/inbox
 *   - /editor/approve/:id
 *   - /editor/reject/:id
 *   - /editor/publish/:id
 *
 * Dependencies:
 *   - Must run AFTER authMiddleware since it depends on req.user.
 */
export default function editorOnly(req, res, next) {
  if (req.user.role !== "editor") {
    return res.status(403).json({ message: "Access denied (editor only)" });
  }
  next();
}