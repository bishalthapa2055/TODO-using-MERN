import * as Yup from "yup";

export const todoSchema = Yup.object({
  title: Yup.string()
    .min(4)
    .required("Required and Must be greater than 4 char."),
  description: Yup.string()
    .min(10)
    .required("Required and Must be greater than 10 char."),
});
