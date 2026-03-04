import { useState } from 'react';
import type { Task } from '../api/tasks';
import TaskItem from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  onRefresh: () => void;
  onEdit: (task: Task) => void;
}

export default function TaskList({ tasks, onRefresh, onEdit }: TaskListProps) {
  const [error, setError] = useState('');

  if (tasks.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-8 text-center text-slate-600">
        No tasks yet. Add one above.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
          role="alert"
        >
          {error}
          <button
            type="button"
            onClick={() => setError('')}
            className="ml-2 font-medium underline"
          >
            Dismiss
          </button>
        </div>
      )}
      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task._id}>
            <TaskItem
              task={task}
              onUpdate={onRefresh}
              onEdit={onEdit}
              setError={setError}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
