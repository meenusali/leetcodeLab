import express from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { getAllSubmission, getAllTheSubmissionsForProblem, getSubmissionsForProblem, getUserStatistics, getAdminStatistics } from "../controllers/submission.controller.js";

const submissionRoutes = express.Router()

submissionRoutes.get("/get-all-submissions", authMiddleware, getAllSubmission);
submissionRoutes.get("/get-submission/:problemId", authMiddleware, getSubmissionsForProblem)
submissionRoutes.get("/get-submissions-count/:problemId", authMiddleware, getAllTheSubmissionsForProblem)

// Add new routes for statistics
submissionRoutes.get("/user-statistics", authMiddleware, getUserStatistics);
submissionRoutes.get("/admin-statistics", authMiddleware, getAdminStatistics);

export default submissionRoutes;