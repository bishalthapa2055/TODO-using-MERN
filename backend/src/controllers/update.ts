import { Response, Request } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { Todo } from "../model/todo";

const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const isExistedtodo = await Todo.findById(id);
    if (!isExistedtodo) {
      throw new BadRequestError("Todo Unavailable");
    }
    isExistedtodo!.title = title || isExistedtodo?.title;
    isExistedtodo!.description = description || isExistedtodo?.description;
    isExistedtodo!.status = status || isExistedtodo?.status;

    const updateTodos = await isExistedtodo.save();

    res.status(200).json({
      status: true,
      message: "sucessfully updated todo",
      updatedData: updateTodos,
    });
  } catch (e) {
    res.status(400).json({
      status: false,
      message: (e as any).message ? (e as any).message : "Unable to update",
    });
  }
};

export { updateTodo as updateTodoHandler };
