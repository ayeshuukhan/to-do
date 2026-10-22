import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const completed = todo.status === 'completed';

  return (
    <li className={`todo-item${completed ? ' is-completed' : ''}`}>
      <button
        className="check-button"
        type="button"
        aria-label={completed ? `Mark ${todo.title} active` : `Complete ${todo.title}`}
        aria-pressed={completed}
        onClick={() => onToggle(todo.id)}
      >
        {completed ? '✓' : ''}
      </button>
      <span className="todo-title">{todo.title}</span>
      <button
        className="delete-button"
        type="button"
        aria-label={`Delete ${todo.title}`}
        onClick={() => onDelete(todo.id)}
      >
        <span aria-hidden="true">×</span>
      </button>
    </li>
  );
}
