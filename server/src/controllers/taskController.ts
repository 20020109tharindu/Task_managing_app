import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Task from '../models/Task';

export const getAllTasks = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, description, status } = req.body;
    const trimmedTitle = typeof title === 'string' ? title.trim() : '';
    if (!trimmedTitle) {
      res.status(400).json({ error: 'Title is required' });
      return;
    }
    const task = await Task.create({
      title: trimmedTitle,
      description: description?.trim() ?? '',
      status: status === 'Completed' ? 'Completed' : 'Pending',
    });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid task ID' });
      return;
    }
    const { title, description, status } = req.body;
    const update: Record<string, unknown> = {};
    if (typeof title === 'string') {
      const trimmed = title.trim();
      if (!trimmed) {
        res.status(400).json({ error: 'Title is required' });
        return;
      }
      update.title = trimmed;
    }
    if (description !== undefined) update.description = String(description).trim();
    if (status === 'Completed' || status === 'Pending') update.status = status;

    const task = await Task.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    );
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid task ID' });
      return;
    }
    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      res.status(404).json({ error: 'Task not found' });
      return;
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
