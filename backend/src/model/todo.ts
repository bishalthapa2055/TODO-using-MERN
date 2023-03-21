import mongoose from "mongoose";

export enum modelStatus {
  completed = "completed",
  incomplete = "incomplete",
}

export interface todoAttrs {
  title: string;
  description: string;
  status?: modelStatus;
  // completedAt?: Date;
}

interface todoModel extends mongoose.Model<todoDoc> {
  build(attrs: todoAttrs): todoDoc;
}

export interface todoDoc extends mongoose.Document, todoAttrs {
  title: string;
  description: string;
  status?: modelStatus.incomplete;
  // completedAt?: Date;
  created_at?: Date;
  updated_at?: Date;
}

const todoSchema = new mongoose.Schema<todoDoc>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      // minlength: 10,
    },
    status: {
      type: String,
      enum: modelStatus,
      default: modelStatus.incomplete,
    },
    completedAt: {
    //   type: Date,
    //   default: new Date(),
    // },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);
todoSchema.index({ title: "text" });

todoSchema.statics.build = (attrs: todoAttrs) => {
  return new Todo(attrs);
};

const Todo = mongoose.model<todoDoc, todoModel>("Todo", todoSchema);
export { Todo };
