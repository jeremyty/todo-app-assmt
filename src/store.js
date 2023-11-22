import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./feature/todos/todosSlice"

export default configureStore({
    reducer: {
        todos: todosReducer,
    },
})