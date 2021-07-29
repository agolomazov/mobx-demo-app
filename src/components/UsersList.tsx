import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { useStore } from '../stores/helpers/useStore';
import TodoList from './TodoList';

function UsersList() {
  const { dataStore: { userStore } } = useStore();
  const [userName, setUserName] = useState('');
  const [currentUser, setCurrentUser] = useState(userStore.users[0]);

  const addUser = () => {
    if (!userName.trim()) {
      return;
    }

    userStore.addUser(userName);
    setUserName('');
  }

  return (
    <div className="row">
      <div className="col-sm-4">
        <div className="input-group">
          <input type="text" value={userName} onChange={e => setUserName(e.target.value)} />
          <div className="input-groupo-append">
            <button className="btn btn-outline-secondary" onClick={addUser}>Add User</button>
          </div>
        </div>

        <ul className="list-group">
          { userStore.users.map(user => (
            <li className={
              cn({
                "list-group-item": true,
                "active": currentUser.id === user.id,
                "hover": currentUser.id !== user.id
              })
            }
              key={user.id}
              onClick={() => setCurrentUser(user)}
            >
              <span>{ user.name }</span>
              <button onClick={() => userStore.removeUser(user.name)} className="btn btn-danger float-right">Remove</button>
            </li>
          )) }
        </ul>
      </div>
      <div className="col-sm-8">
        <TodoList user={currentUser} />
      </div>
    </div>
  )
}

export default observer(UsersList);