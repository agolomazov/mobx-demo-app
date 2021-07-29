import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from './stores/helpers/create-store';
import { StoreProvider } from './stores/helpers/store-context';

const rootStore = createStore();
const newUser = rootStore.dataStore.userStore.addUser('Georgy');
rootStore.dataStore.userStore.addUser('Student 1');
rootStore.dataStore.userStore.addUser('Student 2');
rootStore.dataStore.userStore.addUser('Student 3');

rootStore.dataStore.todoStore.addTodo('Some todo #1', newUser.id);
rootStore.dataStore.todoStore.addTodo('Some todo #2', newUser.id);
rootStore.dataStore.todoStore.addTodo('Some todo #3', newUser.id);
rootStore.dataStore.todoStore.todoList[0].toggleTodo();

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider value={rootStore}>
      <>
        <App />
      </>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

