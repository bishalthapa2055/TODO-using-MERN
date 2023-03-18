import express from "express";
import { Router } from "express";
import { indexTodoRouter } from "./todoRoutes";

const router = Router();

router.use("/todo", indexTodoRouter);

export { router as indexRouter };
