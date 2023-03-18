import { Router } from "express";
import { body, param } from "express-validator";
import { isValidObjectId } from "mongoose";
import { updateTodoHandler } from "../../controllers/update";
import { validateRequest } from "../../middlewares/validate-request";

const router = Router();

router.patch(
  "/:id",

  [
    param("id")
      .notEmpty()
      .custom((id) => isValidObjectId(id)),
  ],
  validateRequest,
  updateTodoHandler
);

export { router as updateTodoRouter };
