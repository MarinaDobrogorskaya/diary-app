import { Injectable } from '@angular/core';
import { Task } from './task/task';

@Injectable()
export class TaskService {
  constructor() { }
  getAllTasks(): Task[] {
    const tasks: Task[] = [];
    Object.keys(localStorage).forEach((id) => {
      tasks.push(this.getTask(id));
    });
    return tasks;
  }
  // noinspection JSMethodCanBeStatic
  addTask(task: Task): void {
    localStorage.setItem(task.id, JSON.stringify(task));
  }
  // noinspection JSMethodCanBeStatic
  getTask(id: string): Task {
    return JSON.parse(localStorage.getItem(id));
  }
  // noinspection JSMethodCanBeStatic
  updateTask(id: string, task: Task): void {
    localStorage.setItem(id, JSON.stringify(task));
  }
  // noinspection JSMethodCanBeStatic
  removeTask(id: string): void {
    localStorage.removeItem(id);
  }
}
