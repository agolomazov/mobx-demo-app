import { makeAutoObservable } from 'mobx';
import { v4 as uuidV4 } from 'uuid';

import RootStore from '../../root-store';

export class User {
  id: string = uuidV4();

  name: string;

  private readonly rootStore: RootStore;

  constructor(name: string, rootStore: RootStore) {
    
    this.name = name;
    this.rootStore = rootStore;
    this.rootStore.dataStore.todoStore.addTodo(`#New user todo by ${this.name}`, this.id);
    
    makeAutoObservable(this);
  }

  get todos() {
    return this.rootStore.dataStore.todoStore.getUserTodos(this.id);
  }

  get completedTodos() {
    return this.todos.filter(todo => todo.isCompleted);
  }

  get unCompletedTodos() {
    return this.todos.filter(todo => !todo.isCompleted);
  }

  remove() {
    this.rootStore.dataStore.userStore.removeUser(this.name);
  }
}