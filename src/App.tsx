/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState, type ChangeEvent } from 'react';
import { MdOutlineCheck, MdDeleteOutline, MdCreate } from 'react-icons/md';
import { receiveAllTodo, deleteTodoById, addOneTodo, updateOneTodo } from './features/todos';

interface Todos {
  id: number | string
  todo: string
  completed: boolean
  userId: number
}

type Action =
  | { type: 'add' }
  | { type: 'update' }
  | { type: 'all' }
  | { type: 'active' }
  | { type: 'completed' };

function App (): React.ReactElement {
  const [todos, setTodos] = useState<Todos[] | []>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [selectedTodo, setSelectedTodo] = useState<number | string>('');
  const [action, setAction] = useState<Action>({ type: 'add' });

  useEffect(() => {
    (async function () {
      const data = await receiveAllTodo();
      setTodos(data.todos);
    })();
  }, []);

  const handleDeleteTodo = async (id: number | string): Promise<void> => {
    const del = await deleteTodoById(id);
    const newTodos = todos.filter((item) => item.id !== del.id);
    setTodos(newTodos);
  };

  const handleChangeInputTodo = (event: ChangeEvent<HTMLInputElement>): void => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = async (): Promise<void> => {
    if (newTodo.trim() !== '') {
      const added = await addOneTodo(newTodo);
      setTodos((prev) => [added, ...prev]);
      setNewTodo('');
    }
  };

  const handleUpdateTodo = async (): Promise<void> => {
    if (newTodo.trim() !== '') {
      const added = await updateOneTodo(selectedTodo, newTodo);
      setTodos((prev) => [added, ...prev]);
      setNewTodo('');
    }
  };

  const handleSelected = (item: Todos): void => {
    setAction({ type: 'update' });
    setSelectedTodo(item.id);
    setNewTodo(item.todo);
  };

  const handleSave = (): void => {
    if (action.type === 'update') {
      setNewTodo('');
      handleUpdateTodo();
      setAction({ type: 'add' });
    } else {
      handleAddTodo();
    }
  };

  const handleUpdateTabs = (tab: Action): void => {
    if (tab.type === 'completed') {
      setTodos(todos.filter((item) => item.completed));
    } else if (tab.type === 'active') {
      setTodos(todos.filter((item) => !item.completed));
    } else {
      setTodos(todos);
    }
  };

  return (
    <div className="w-screen h-screen pt-4 bg-white overflow-auto">
      <div className="container h-screen rounded-lg relative">
        <div className="h-1/4 rounded-xl bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500"></div>
        {/* Form List */}
        <div className="w-3/4 h-min flex flex-col gap-6 absolute top-12 translate-x-[15%]">
          <div>
            <h1 className="text-white text-5xl font-semibold tracking-[0.2em]">TODO</h1>
          </div>
          <div className="flex justify-between p-6 bg-slate-200 rounded-md">
            <div className="w-3/4 pr-2">
              <input value={newTodo} onChange={handleChangeInputTodo} type="text" className="w-full bg-white text-xl text-dark mt-1 px-4 py-3 shadow-lg rounded-lg focus:outline-none focus:ring-primary focus:ring-1 focus:border-primary"/>
            </div>
              <button onClick={() => { handleSave(); }} className="text-base w-1/4 md:w-64 font-semibold text-white bg-sky-500 py-3 px-8 rounded-full shadow-lg hover:opacity-80 hover:shadow-lg transition duration-500">{action.type === 'update' ? 'Update' : 'Create'}</button>
          </div>
          <div className="bg-white rounded-lg h-min p-4 shadow-xl">
              <div className="flex justify-between pb-6 px-2">
                <div>
                  <span>{todos.length} items</span>
                </div>
                <div className="flex">
                  <div className="px-3" onClick={() => {
                    handleUpdateTabs(
                      {
                        type: 'all'
                      }
                    );
                  }}>
                    <span className="text-purple-400 hover:cursor-pointer">All</span>
                  </div>
                  <div className="px-3" onClick={() => {
                    handleUpdateTabs(
                      {
                        type: 'active'
                      }
                    );
                  }}>
                    <span className='hover:cursor-pointer'>Active</span>
                  </div>
                  <div className="px-3" onClick={() => {
                    handleUpdateTabs(
                      {
                        type: 'completed'
                      }
                    );
                  }}>
                    <span className='hover:cursor-pointer'>Completed</span>
                  </div>
                </div>
                <div className="text-slate-400">
                  <span>Clear Completed</span>
                </div>
              </div>
              {
                todos?.map((item, index) => (
                  <div className="flex justify-between px-2 py-3 border-t border-slate-300 text-xl hover:bg-slate-100" key={index + 1}>
                    <p>{item.todo}</p>
                    <div className="flex gap-4">
                      <div className="flex items-center p-2 border border-primary rounded hover:cursor-pointer">
                        <MdOutlineCheck className="text-primary" />
                      </div>
                      <div onClick={() => { handleSelected(item); } } className="flex items-center p-2 border border-primary rounded hover:cursor-pointer">
                        <MdCreate className="text-primary" />
                      </div>
                      <div onClick={(): void => { handleDeleteTodo(item.id); }} className="flex items-center p-2 border border-primary rounded hover:cursor-pointer">
                        <MdDeleteOutline className="text-red-500" />
                      </div>
                    </div>
                  </div>
                ))
              }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
