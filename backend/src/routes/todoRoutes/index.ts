import { Router } from "express";
import { createTodoRouter } from "./create";
import { deleteTodoRouter } from "./delete";
import { getAllTodoRouter } from "./get";
import { getCompletedRouter } from "./get-completed";
import { getCompletionRouter } from "./get-completion-rate";
import { getOneTodoRouter } from "./get-one-todo";
import { updateTodoRouter } from "./update";
const router = Router();

router.use(getAllTodoRouter);
router.use(deleteTodoRouter);
router.use(createTodoRouter);
router.use(updateTodoRouter);
router.use(getOneTodoRouter);
router.use(getCompletedRouter);
router.use(getCompletionRouter);

export { router as indexTodoRouter };
