export type TodoStatus = 'active' | 'completed';

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  createdAt: number;
}

export type TodoFilter = 'all' | TodoStatus;

export type TodoAction =
  | { type: 'add'; title: string }
  | { type: 'toggle'; id: string }
  | { type: 'delete'; id: string }
  | { type: 'clear-completed' }
  | { type: 'hydrate'; todos: Todo[] };
