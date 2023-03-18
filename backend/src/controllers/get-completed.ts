import { Response, Request, NextFunction } from "express";

import { Todo } from "../model/todo";
import { ApiFeatures } from "../utils/api-services";

// serching and pagination of users

const getCompletedTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // searching the users
  try {
    let documentCount = await Todo.estimatedDocumentCount();
    const searchTerm = req.query.searchTerm as string | undefined;

    // advance features within users
    let features: ApiFeatures;
    if (searchTerm) {
      features = new ApiFeatures(
        Todo.find({
          $and: [
            {
              name: {
                $regex: searchTerm,
                $options: "xi",
              },
            },
          ],
        }),
        req.query
      )
        .filter()
        .sort()
        .limitFields()
        .paginate();
    } else {
      features = new ApiFeatures(Todo.find({ status: "completed" }), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    }

    let doc = await features.query;

    res.status(200).json({
      result: doc.length,
      total: documentCount,
      data: doc,
    });
    // console.log("hit");
    // const todoData = await Todo.find({ status: "completed" });
    // res.status(200).json({ data: todoData });
  } catch (error) {
    res.status(400).json({ status: false, message: "Failed to get all Todos" });
  }
};

export { getCompletedTodo as getCompletedTodoHandler };
