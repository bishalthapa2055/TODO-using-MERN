import { Router } from "express";
import { param } from "express-validator";
import { isValidObjectId } from "mongoose";
import { deleteTodoHandler } from "../../controllers/delete";
import { validateRequest } from "../../middlewares/validate-request";

const router = Router();

router.delete(
  "/:id",
  [
    param("id")
      .notEmpty()
      .custom((id) => isValidObjectId(id))
      .withMessage("Invalid ID"),
  ],
  validateRequest,
  deleteTodoHandler
);

export { router as deleteTodoRouter };
