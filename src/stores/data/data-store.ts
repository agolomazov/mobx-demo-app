import RootStore from '../root-store';
import TodoStore from './todo/todo-store';
import UserStore from './user/user-store';

export default class DataStore {
  todoStore: TodoStore;
  userStore: UserStore;

  constructor(rootStore: RootStore) {
    this.todoStore = new TodoStore(rootStore);
    this.userStore = new UserStore(rootStore);
  }
}