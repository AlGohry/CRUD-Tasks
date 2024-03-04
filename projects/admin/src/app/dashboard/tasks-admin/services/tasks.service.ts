import { CreateTask } from './../context/DTOs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getAllTasks() {
    return this.http.get('https://crud-gsvs.onrender.com/tasks/all-tasks');
  }

  createTask(model: CreateTask) {
    return this.http.post('https://crud-gsvs.onrender.com/tasks/add-tasks', model);
  }
}
