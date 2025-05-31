import express from 'express';
import { authMiddleware, checkAdmin } from '../middleware/auth.middleware.js';

import { getProfiledata  } from "../controllers/profile.controller.js";

const profileRoutes = express.Router();

profileRoutes.get("/:id", authMiddleware, getProfiledata);

export default profileRoutes;
