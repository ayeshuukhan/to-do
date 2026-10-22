import { useEffect, useReducer } from 'react';
import type { Todo, TodoAction } from '../types/todo';

const STORAGE_KEY = 'typed-todo-app.todos';

function readStoredTodos(): Todo[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed)) return [];

    return parsed.filter(isTodo);
  } catch {
    return [];
  }
}

function isTodo(value: unknown): value is Todo {
  if (typeof value !== 'object' || value === null) return false;
  if (!('id' in value) || !('title' in value) || !('status' in value) || !('createdAt' in value)) {
    return false;
  }

  return (
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    (value.status === 'active' || value.status === 'completed') &&
    typeof value.createdAt === 'number'
  );
}

function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case 'add': {
      const title = action.title.trim();
      if (!title) return state;

      const newTodo: Todo = {
        id: crypto.randomUUID(),
        title,
        status: 'active',
        createdAt: Date.now(),
      };
      return [newTodo, ...state];
    }
    case 'toggle':
      return state.map((todo) =>
        todo.id === action.id
          ? { ...todo, status: todo.status === 'active' ? 'completed' : 'active' }
          : todo,
      );
    case 'delete':
      return state.filter((todo) => todo.id !== action.id);
    case 'clear-completed':
      return state.filter((todo) => todo.status !== 'completed');
    case 'hydrate':
      return action.todos;
    default: {
      const exhaustiveCheck: never = action;
      return exhaustiveCheck;
    }
  }
}

export function useTodos() {
  const [todos, dispatch] = useReducer(todoReducer, [], readStoredTodos);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      // The app remains usable if storage is unavailable or full.
    }
  }, [todos]);

  return { todos, dispatch };
}
