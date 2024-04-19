import { Todo } from "../models/todo.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { apiError } from "../utils/apiError.js";

// const addTodo = asyncHandler(async (req, res) => {
//     const { owner, todoMessage } = req.body
//     if (!owner || !todoMessage) {
//         throw new apiError(400, 'owner and todoMessage are required')
//     }
//     console.log(owner, todoMessage)
//     let newTodo = await new Todo.create({ owner, todos: [{ todoMessage }] });
//     if (!newTodo) {
//         throw new apiError(500, "Error creating new todo");
//     }
//     return res
//         .status(201)
//         .json(
//             new apiResponse(201, newTodo, "Todo add successfully")
//         )
// })

// const deleteTodo = asyncHandler(async (req, res) => {
//     const { todoId } = req.body
//     if (!todoId) {
//         throw new apiError(400, " todoId is required")
//     }
//     const delete_todo = await Todo.findByIdAndDelete(todoId);
//     if (!delete_todo) {
//         throw new apiError(500, "field to delete todo")
//     }
//     return res
//         .status(200)
//         .json(
//             new apiResponse(200, delete_todo, "Delete Successfull")
//         )
// })

// export { addTodo, deleteTodo }