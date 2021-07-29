import { makeAutoObservable, autorun } from 'mobx';
import RootStore from '../root-store';

export enum Views {
  Todos = 'Todos',
  Users = 'Users',
}

export default class GlobalView {
  themeColor: string = 'blue';

  currentView: Views = Views.Todos;

  constructor(rootStore: RootStore) {
    makeAutoObservable(this);

    autorun(() => {
      console.log(`We have ${rootStore.dataStore.userStore.collection.length} users`);
    });
  }

  updateView(view: Views) {
    this.currentView = view;
  }
}