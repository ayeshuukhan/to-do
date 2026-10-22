import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('Todo app', () => {
  it('adds a task and trims whitespace', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('What needs to get done?'), '  Finish homework  ');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    expect(screen.getByText('Finish homework')).toBeInTheDocument();
    expect(screen.getByText('1 task left to do')).toBeInTheDocument();
  });

  it('does not add an empty task', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(screen.getByRole('button', { name: /add task/i })).toBeDisabled();
    await user.type(screen.getByLabelText('What needs to get done?'), '   ');
    expect(screen.getByRole('button', { name: /add task/i })).toBeDisabled();
  });

  it('toggles, filters, and deletes tasks', async () => {
    const user = userEvent.setup();
    render(<App />);

    const input = screen.getByLabelText('What needs to get done?');
    await user.type(input, 'Read a book');
    await user.click(screen.getByRole('button', { name: /add task/i }));
    await user.type(input, 'Go for a walk');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    await user.click(screen.getByRole('button', { name: 'Complete Read a book' }));
    await user.click(screen.getByRole('button', { name: 'Completed' }));
    expect(screen.getByText('Read a book')).toBeInTheDocument();
    expect(screen.queryByText('Go for a walk')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'All' }));
    await user.click(screen.getByRole('button', { name: 'Delete Go for a walk' }));
    expect(screen.queryByText('Go for a walk')).not.toBeInTheDocument();
  });

  it('persists tasks in localStorage', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('What needs to get done?'), 'Persist me');
    await user.click(screen.getByRole('button', { name: /add task/i }));

    const stored = localStorage.getItem('typed-todo-app.todos');
    expect(stored).not.toBeNull();
    expect(stored).toContain('Persist me');
  });

  it('clears completed tasks', async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(screen.getByLabelText('What needs to get done?'), 'Done task');
    await user.click(screen.getByRole('button', { name: /add task/i }));
    await user.click(screen.getByRole('button', { name: 'Complete Done task' }));
    await user.click(screen.getByRole('button', { name: 'Clear completed' }));

    expect(screen.queryByText('Done task')).not.toBeInTheDocument();
  });
});
