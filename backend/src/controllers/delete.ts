import { Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { Todo } from "../model/todo";

const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const isExistedTodo = await Todo.findById(id);
    if (!isExistedTodo) {
      throw new BadRequestError("Todo doesnot exists");
    }
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      throw new BadRequestError("Error occured during Deletion");
    }
    res
      .status(200)
      .json({ status: true, message: "Todo Deleted Sucessfully", data: todo });
  } catch (e) {
    res.status(400).json({
      status: false,
      message: (e as any).message
        ? (e as any).message
        : "Unable to delete todo",
    });
  }
};

export { deleteTodo as deleteTodoHandler };
