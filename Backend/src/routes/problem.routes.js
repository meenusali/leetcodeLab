import express from 'express';
import { authMiddleware, checkAdmin } from '../middleware/auth.middleware.js';
import { createProblem, deleteProblem, getAllProblems, getAllProblemsSolvedByUser, getProblemById, updateProblem,importProblemsFromCSV, downloadProblemTemplate} from '../controllers/problem.controller.js';
import fileUpload from 'express-fileupload';


 const problemRoutes = express.Router();

// Add this middleware before your routes
problemRoutes.use(fileUpload({
    createParentPath: true,
    limits: { 
        fileSize: 5 * 1024 * 1024 // 5MB max file size
    },
}));

 problemRoutes.post("/create-problem" , authMiddleware,checkAdmin , createProblem)

 problemRoutes.get("/get-all-problems" , authMiddleware, getAllProblems);

 problemRoutes.get("/get-problem/:id" , authMiddleware , getProblemById);

 problemRoutes.put("/update-problem/:id" , authMiddleware,checkAdmin , updateProblem)

 problemRoutes.delete("/delete-problem/:id" , authMiddleware,checkAdmin , deleteProblem)

 problemRoutes.get("/get-solved-problems" , authMiddleware, getAllProblemsSolvedByUser);

 
 problemRoutes.post("/import-problems", authMiddleware, checkAdmin, importProblemsFromCSV);

 problemRoutes.get("/download-template", authMiddleware, downloadProblemTemplate);

//  problemRoutes.get("/companies", authMiddleware, getAllCompanies);

 export default problemRoutes;