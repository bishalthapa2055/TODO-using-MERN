import { Request, Response } from "express";
import { Todo } from "../model/todo";

const getCompletionRate = async (req: Request, res: Response) => {
  try {
    const completedTodos = await Todo.find({ status: "completed" });

    const completionRate = completedTodos.reduce((acc: any, todo: any) => {
      const date = todo.completedAt.toISOString().substr(0, 10);

      acc[date] = acc[date] ? acc[date] + 1 : 1;

      return acc;
    }, {});
    console.log(completionRate);
    const dates = Object.keys(completionRate);

    dates.forEach((date) => {
      const rate = (
        (completionRate[date] / completedTodos.length) *
        100
      ).toFixed(2);
      // console.log(date);
      completionRate[date] = rate + "%";
    });
    res.status(200).json({ status: true, data: completionRate });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: (e as any).message
        ? (e as any).message
        : "Failed to Get Percentage ",
    });
  }
};

export { getCompletionRate as getCompletionRateHandler };
