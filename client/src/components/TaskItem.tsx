import type { Task } from '../api/tasks';
import { updateTask, deleteTask } from '../api/tasks';

interface TaskItemProps {
  task: Task;
  onUpdate: () => void;
  onEdit: (task: Task) => void;
  setError: (msg: string) => void;
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return iso;
  }
}

export default function TaskItem({ task, onUpdate, onEdit, setError }: TaskItemProps) {
  const isCompleted = task.status === 'Completed';

  async function handleToggleStatus() {
    try {
      await updateTask(task._id, { status: isCompleted ? 'Pending' : 'Completed' });
      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this task?')) return;
    try {
      await deleteTask(task._id);
      onUpdate();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    }
  }

  return (
    <article
      className={`rounded-xl border p-4 shadow-sm transition sm:p-5 ${
        isCompleted
          ? 'border-green-200 bg-green-50/50'
          : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h3
            className={`font-medium text-slate-900 ${
              isCompleted ? 'line-through text-slate-500' : ''
            }`}
          >
            {task.title}
          </h3>
          {task.description && (
            <p className="mt-1 text-sm text-slate-600">{task.description}</p>
          )}
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                isCompleted
                  ? 'bg-green-100 text-green-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              {task.status}
            </span>
            <span className="text-xs text-slate-500">
              Created: {formatDate(task.createdAt)}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 sm:shrink-0">
          <button
            type="button"
            onClick={handleToggleStatus}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {isCompleted ? 'Mark Pending' : 'Mark Completed'}
          </button>
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
