/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { getAllTodo, deleteTodo, addTodo, updateTodo } from '../api/todos';

// interface Todos {
//   id: number
//   todo: string
//   completed: boolean
//   userId: number
// }

async function receiveAllTodo () {
  try {
    return await getAllTodo();
  } catch (error) {
    return error;
  }
}

async function addOneTodo (todo: string) {
  try {
    return await addTodo(todo);
  } catch (error) {
    return error;
  }
}

async function updateOneTodo (id: number | string, todo: string) {
  try {
    return await updateTodo(id, todo);
  } catch (error) {
    return error;
  }
}

async function deleteTodoById (id: number | string) {
  try {
    return await deleteTodo(id);
  } catch (error) {
    return error;
  }
}

export { receiveAllTodo, deleteTodoById, addOneTodo, updateOneTodo };
