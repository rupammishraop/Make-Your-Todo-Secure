import mongoose, { Schema } from "mongoose";


const todoSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    todos: [
        {
            todoId: { type: Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
            todoMessage: String
        },
    ]



}, { timestamps: true })

export const Todo = mongoose.model("Todo", todoSchema)