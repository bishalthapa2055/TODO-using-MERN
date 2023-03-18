import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { Todo } from "../model/todo";

const getOneTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new BadRequestError("Todo Unavailable");
    }
    res.status(200).json({ status: true, data: todo });
  } catch (e) {
    throw new BadRequestError(
      (e as any).message ? (e as any).message : "Error Occured"
    );
  }
};

export { getOneTodo as getOneTodoHandler };
