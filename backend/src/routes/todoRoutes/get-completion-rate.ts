import { Router } from "express";
import { getCompletionRateHandler } from "../../controllers/get-completion-rate";

const router = Router();

router.get("/day/rate", getCompletionRateHandler);

export { router as getCompletionRouter };
