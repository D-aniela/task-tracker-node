import mongoose from 'mongoose'

export interface ITask {
  description: string
  status: string
}

const TaskSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['todo', 'in-progress', 'done'],
      default: 'todo',
    },
  },
  { timestamps: true }
)

const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task
