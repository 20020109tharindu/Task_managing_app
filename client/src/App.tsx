import { useState, useEffect, useCallback } from 'react';
import { getTasks, createTask, updateTask, type Task, type CreateTaskBody } from './api/tasks';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [appError, setAppError] = useState('');
  const [editing, setEditing] = useState<Task | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setAppError('');
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setAppError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  async function handleCreate(body: CreateTaskBody) {
    await createTask(body);
    await fetchTasks();
  }

  async function handleUpdate(body: CreateTaskBody) {
    if (!editing) return;
    await updateTask(editing._id, { ...body, status: body.status ?? editing.status });
    setEditing(null);
    await fetchTasks();
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-slate-600">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-5">
          <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Task Manager
          </h1>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8">
        {appError && (
          <div
            className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
            role="alert"
          >
            {appError}
            <button
              type="button"
              onClick={() => setAppError('')}
              className="ml-2 font-medium underline"
            >
              Dismiss
            </button>
          </div>
        )}

        <section className="mb-8">
          {editing ? (
            <TaskForm
              initial={editing}
              onSubmit={handleUpdate}
              onCancel={() => setEditing(null)}
            />
          ) : (
            <TaskForm onSubmit={handleCreate} />
          )}
        </section>

        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-800">Your tasks</h2>
          <TaskList
            tasks={tasks}
            onRefresh={fetchTasks}
            onEdit={setEditing}
          />
        </section>
      </main>
    </div>
  );
}
