import { Routes, Route } from 'react-router-dom';
import { Switch } from 'antd';

import './App.scss';
import UsersList from './features/users/UsersList';
import UserInfo from './features/userInfo/UserInfo';

const App = () => {
  return (
    <>
      <Switch
        checkedChildren={'\u263C'}
        unCheckedChildren={'\u263E'}
        defaultChecked={false}
      />
      <Routes>
        <Route path='/' element={<UsersList />} />
        <Route path='users/:userId/' element={<UserInfo />} />
      </Routes>
    </>
  );
};

export default App;
