import { makeAutoObservable, reaction } from 'mobx';
import { v4 as uuidV4 } from 'uuid';

import TodoStore from './todo-store';

export class Todo {
  id: string = uuidV4();

  name: string;

  userId: string;

  isCompleted: boolean = false;

  private readonly disposer: () => void;
  private readonly todoStore: TodoStore;

  constructor(name: string, userId: string, todoStore: TodoStore) {
    this.name = name;
    this.userId = userId;
    this.todoStore = todoStore;

    makeAutoObservable(this);

    this.disposer = reaction(
      () => this.isCompleted,
      () => console.log(`${this.id}-Todo: ${this.name} changed to ${this.isCompleted ? 'Done' : 'Undone'}`)
    );
  }

  get author() {
    return this.todoStore.getUserTodo(this.userId);
  }

  toggleTodo() {
    this.isCompleted = !this.isCompleted;
  }

  updateName(name: string) {
    this.name = name;
  }

  remove() {
    this.todoStore.removeTodo(this.name);
  }

  dispose() {
    this.disposer();
  }
}