import { Router } from "express";
import { createCompany } from "../controllers/company.controller.js";

const router = Router();

router.post("/api/company/create", createCompany);

export default router;
