import { Router } from "express";
import { body, check } from "express-validator";
import { createTodoHandler } from "../../controllers/create";
import { validateRequest } from "../../middlewares/validate-request";

const router = Router();

router.post(
  "/",
  [
    body("title")
      .isLength({ min: 4 })
      .withMessage("Title must be greater than 4 characters"),
    body("description")
      .notEmpty()
      .isLength({ min: 10 })
      .withMessage("Descriptiion should be greater than 10 characters"),
  ],
  validateRequest,
  createTodoHandler
);

export { router as createTodoRouter };
