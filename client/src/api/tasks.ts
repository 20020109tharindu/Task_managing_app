const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'Pending' | 'Completed';
  createdAt: string;
}

export interface CreateTaskBody {
  title: string;
  description?: string;
  status?: 'Pending' | 'Completed';
}

export interface UpdateTaskBody {
  title?: string;
  description?: string;
  status?: 'Pending' | 'Completed';
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || res.statusText || 'Request failed');
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${API_URL}/tasks`);
  return handleResponse<Task[]>(res);
}

export async function createTask(body: CreateTaskBody): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return handleResponse<Task>(res);
}

export async function updateTask(id: string, body: UpdateTaskBody): Promise<Task> {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  return handleResponse<Task>(res);
}

export async function deleteTask(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
  return handleResponse<void>(res);
}
