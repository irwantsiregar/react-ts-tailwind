/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { fetchApi } from './fetchApi';

async function getAllTodo () {
  const response = await fetchApi('/todos');
  return await response.json();
};

async function addTodo (todo: string) {
  const response = await fetchApi('/todos/add', {
    method: 'POST',
    body: JSON.stringify({ todo, completed: false, userId: 5 })
  });
  return await response.json();
};

async function updateTodo (id: number | string, todo: string) {
  const response = await fetchApi(`/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ todo })
  });
  return await response.json();
};

async function deleteTodo (id: number | string) {
  const response = await fetchApi(`/todos/${id}`, {
    method: 'DELETE'
  });
  return await response.json();
};

export { getAllTodo, deleteTodo, addTodo, updateTodo };
