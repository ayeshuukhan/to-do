import { useMemo, useState } from 'react';
import { TodoFilter } from './components/TodoFilter';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { useTodos } from './hooks/useTodos';
import type { TodoFilter as TodoFilterType } from './types/todo';

export default function App() {
  const { todos, dispatch } = useTodos();
  const [filter, setFilter] = useState<TodoFilterType>('all');

  const counts = useMemo(() => ({
    all: todos.length,
    active: todos.filter((todo) => todo.status === 'active').length,
    completed: todos.filter((todo) => todo.status === 'completed').length,
  }), [todos]);

  const visibleTodos = useMemo(
    () => filter === 'all' ? todos : todos.filter((todo) => todo.status === filter),
    [todos, filter],
  );

  return (
    <main className="app-shell">
      <header className="hero">
        <div className="eyebrow"><span className="status-dot" /> YOUR PERSONAL SPACE</div>
        <h1>Make room for<br /><span>what matters.</span></h1>
        <p>A little progress each day adds up to big results.</p>
      </header>

      <section className="todo-card" aria-label="Todo list">
        <TodoForm onAdd={(title) => dispatch({ type: 'add', title })} />

        <div className="list-toolbar">
          <div>
            <h2>Your tasks</h2>
            <p>{counts.active === 1 ? '1 task left to do' : `${counts.active} tasks left to do`}</p>
          </div>
          <TodoFilter value={filter} onChange={setFilter} counts={counts} />
        </div>

        {visibleTodos.length > 0 ? (
          <ul className="todo-list">
            {visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={(id) => dispatch({ type: 'toggle', id })}
                onDelete={(id) => dispatch({ type: 'delete', id })}
              />
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <div className="empty-icon" aria-hidden="true">{filter === 'completed' ? '✓' : '✳'}</div>
            <h3>{filter === 'completed' ? 'Nothing completed yet' : filter === 'active' ? 'You’re all caught up' : 'A fresh start'}</h3>
            <p>{filter === 'all' ? 'Add a task above and make today count.' : 'Tasks in this view will show up here.'}</p>
          </div>
        )}

        <footer className="card-footer">
          <span><span className="footer-sparkle">✦</span> One thing at a time.</span>
          {counts.completed > 0 && (
            <button className="clear-button" type="button" onClick={() => dispatch({ type: 'clear-completed' })}>
              Clear completed
            </button>
          )}
        </footer>
      </section>

      <p className="page-note">Made for your focus <span>·</span> Saved automatically on this device</p>
    </main>
  );
}
