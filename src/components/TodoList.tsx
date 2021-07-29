import { useState, FC } from 'react';
import { useStore } from '../stores/helpers/useStore';
import TodoComponent from '../components/Todo';
import { observer } from 'mobx-react-lite';
import { User } from '../stores/data/user/user';

interface Props {
  user?: User;
}

const TodoList: FC<Props> = ({ user }) => {
  const { dataStore: { todoStore, userStore } } = useStore();
  const [text, setText] = useState('');
  const completedTodos = user ? user.completedTodos : todoStore.completed;
  const unCompletedTodos = user ? user.unCompletedTodos : todoStore.unCompleted;

  const addTodo = () => {
    if (!text.trim()) {
      return;
    }

    const todoUser = user ? user : userStore.collection[0];
    todoStore.addTodo(text, todoUser.id);
    setText('');
  }

  return (
    <div>
      <div className="input-group">
        <input type="text" value={text} onChange={e => setText(e.target.value)} />
        <div className="input-groupo-append">
          <button className="btn btn-outline-secondary" onClick={addTodo}>Add Todo</button>
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          Incomplete Todos ({ unCompletedTodos.length })
        </div>
        <ul className="list-group">
          { unCompletedTodos.map(todo => (
            <TodoComponent key={todo.id} todo={todo} />
          )) }
        </ul>
      </div>
      <div className="card">
        <div className="card-header">
          Completed Todos ({ completedTodos.length })
        </div>
        <ul className="list-group">
          { completedTodos.map(todo => (
            <TodoComponent key={todo.id} todo={todo} />
          )) }
        </ul>
      </div>
    </div>
  )
}

export default observer(TodoList);