import { Router } from "express";
import { getAllTodoHandler } from "../../controllers/get-all";

const router = Router();
router.get("/", getAllTodoHandler);

export { router as getAllTodoRouter };
