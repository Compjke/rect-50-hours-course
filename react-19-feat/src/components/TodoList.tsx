import { use } from 'react';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Функция для имитации задержки
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Функция для получения todos
const fetchTodos = async (): Promise<Todo[]> => {
  try {
    await wait(2000); // Симуляция задержки 2 секунды
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos?limit=10',
    );

    return response.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};

const todosPromise = fetchTodos();
// Компонент TodoList
export const TodoList = () => {
  const todos = use(todosPromise);

  return (
    <div>
      <h1 className="font-bold text-xl text-center py-2 text-mint-500 dark:text-slate-300">
        TodoList
      </h1>

      <ul className="flex flex-col gap-2 pl-5 px-10 max-h-[50vh] overflow-y-auto p-4 bg-white dark:bg-gray-800 rounded shadow-md">
        {todos.map((todo) => (
          <li
            className="border p-4 rounded border-e-cyan-600 dark:border-e-slate-300 color-green-500 dark:text-slate-300 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            key={todo.id}
          >
            <p>{todo.title}</p>
            <p>{todo.completed ? 'Completed' : 'Not Completed'}</p>
            <p>User ID: {todo.userId}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
