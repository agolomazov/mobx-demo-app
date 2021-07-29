import { makeAutoObservable, reaction, when } from 'mobx';
import RootStore from '../../root-store';
import { User } from '../user/user';
import { Todo } from './todo';

export default class TodoStore {
  todoList: Todo[] = [];

  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
    reaction(
      () => this.todoList.length,
      () => console.log(`Current Todo count: ${this.todoList.length}`)
    );

    when(
      () => this.todoList.length > 0 && this.todoList.every(todo => todo.isCompleted),
      () => console.log('Congradulations!')
    );
  }

  addTodo(name: string, userId: string) {
    this.todoList.push(new Todo(name, userId, this));
  }

  getUserTodos(userId: string) {
    return this.todoList.filter(todo => todo.userId === userId);
  }

  getUserTodo(userId: string) {
    return this.rootStore.dataStore.userStore.collection.find(user => user.id === userId) as User;
  }

  getTodo(name: string) {
    return this.todoList.find((todo) => todo.name === name);
  }

  removeTodo(name: string) {
    const todoToRemove = this.getTodo(name);

    if (todoToRemove) {
      todoToRemove.dispose();
      const todoIndex = this.todoList.indexOf(todoToRemove);
      this.todoList.splice(todoIndex, 1);
    }
  }

  removeAll() {
    this.todoList = [];
  }

  get completed(): Todo[] {
    return this.todoList.filter((todo) => todo.isCompleted);
  }

  get unCompleted(): Todo[] {
    return this.todoList.filter((todo) => !todo.isCompleted);
  }
}