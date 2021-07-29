import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { useStore } from './stores/helpers/useStore';
import { Views } from './stores/ui/global-view';
import TodoList from './components/TodoList';
import UsersList from './components/UsersList';

function App() {
  const { uiStore: { globalView } } = useStore();

  const getCurrentView = () => {
    if (globalView.currentView === Views.Todos) {
      return <TodoList />
    }

    if (globalView.currentView === Views.Users) {
      return <UsersList />
    }

    return null;
  }

  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <div style={{ flexDirection: 'row' }} className="navbar-nav">
          <span className={ cn('nav-item', { active: globalView.currentView === Views.Todos }) }>
            <a href="#" className="nav-link" onClick={() => globalView.updateView(Views.Todos)}>
              {`${Views.Todos}`} View
            </a>
          </span>
          <span className={ cn('nav-item', { active: globalView.currentView === Views.Users }) }>
            <a style={{ marginLeft: '15px' }} href="#" className="nav-link" onClick={() => globalView.updateView(Views.Users)}>
              {`${Views.Users}`} View
            </a>
          </span>
        </div>
      </nav>

      { getCurrentView() }
    </div>
  );
}

export default observer(App);
