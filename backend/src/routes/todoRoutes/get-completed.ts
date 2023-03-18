import { Router } from "express";
import { getCompletedTodoHandler } from "../../controllers/get-completed";

const router = Router();

router.get("/status/completed", getCompletedTodoHandler);

export { router as getCompletedRouter };
