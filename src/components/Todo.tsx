import { observer } from 'mobx-react-lite';
import { FC, DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { Todo } from '../stores/data/todo/todo';

interface TodoItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  todo: Todo
}

const TodoComponent: FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setEditing] = useState(false);
  const [text, setText] = useState('');

  const saveTodo = () => {
    if (!text.trim()) {
      return;
    }

    todo.updateName(text.trim());
    setText('');
    setEditing(false);
  };

  const editTodo = () => {
    setText(todo.name);
    setEditing(true);
  };

  const cancelTodo = () => {
    setEditing(false);
    setText('');
  }

  const todoName = isEditing ? <input type="text" value={text} onChange={e => setText(e.target.value)} /> : <span>Name: {todo.name}, Author Todo: <b>{todo.author.name}</b></span>;

  const editButton = isEditing ? <button className="btn btn-primary" onClick={saveTodo}>Save</button> : <button className="btn btn-warning float-right" onClick={editTodo}>Edit</button>;

  const cancelButton = isEditing ? <button className="btn btn-warning" onClick={cancelTodo}>Cancel</button> : null;

  const toggleTodo = isEditing ? null : <button className="btn btn-info float-right" onClick={() => todo.toggleTodo()}>Toggle todo</button>

  return (
    <li className="list-group-item">
      { todoName }
      { cancelButton }
      { toggleTodo }
      { editButton }
      { !isEditing && <button className="float-right btn btn-danger" onClick={() => todo.remove()}>Remove</button> }
    </li>
  )
};

export default observer(TodoComponent);