import { Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { Todo } from "../model/todo";

const createTodo = async (req: Request, res: Response) => {
  try {
    let { title, description } = req.body;
    if (!title && !description) {
      throw new BadRequestError("Title and Description Fields are required");
    }
    const createTodos = await Todo.build({
      title,
      description,
    }).save();
    if (!createTodos) {
      res.status(400).json({ status: false, message: "Failed to create TOdo" });
    }
    res.status(200).json({
      status: true,
      message: "Todo Created Sucessfully",
      data: createTodos,
    });
  } catch (e) {
    res.status(400).json({
      status: false,
      message: (e as any).message ? (e as any).message : "Unable to Create ",
    });
  }
};

export { createTodo as createTodoHandler };
