import { makeAutoObservable } from 'mobx';
import RootStore from '../../root-store';
import { User } from './user';

export default class UserStore {
  collection: User[] = [];

  private rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }

  addUser(name: string) {
    const user = new User(name, this.rootStore);
    this.collection.push(user);
    return user;
  }

  getUser(name: string) {
    return this.collection.find(user => user.name === name) as User;
  }

  getUserById(id: string) {
    return this.collection.find(user => user.id === id) as User;
  }

  removeUser(name: string) {
    const user = this.getUser(name);

    if (user) {
      user.todos.forEach(todo => todo.remove());
      const userIndexToRemove = this.rootStore.dataStore.userStore.collection.findIndex(mUser => mUser.id === user.id);
      this.collection.splice(userIndexToRemove, 1);
    }
  }

  get users() {
    return this.collection;
  }

  removeAll() {
    this.rootStore.dataStore.todoStore.removeAll();
    this.collection.map(user => user.remove());
    this.collection = [];
  }
}