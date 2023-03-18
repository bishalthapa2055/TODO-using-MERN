import { Router } from "express";
import { param } from "express-validator";
import { isValidObjectId } from "mongoose";
import { getOneTodoHandler } from "../../controllers/get-one";
import { validateRequest } from "../../middlewares/validate-request";

const router = Router();

router.get(
  "/:id",
  [
    param("id")
      .notEmpty()
      .custom((id) => isValidObjectId(id))
      .withMessage("Invalid ID"),
  ],
  validateRequest,
  getOneTodoHandler
);

export { router as getOneTodoRouter };
