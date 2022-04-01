import { Routes, Route } from 'react-router-dom';

import './App.scss';
import UsersList from './features/users/UsersList';
import UserInfo from './features/userInfo/UserInfo';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<UsersList />} />
      <Route path='users/:userId/' element={<UserInfo />} />
    </Routes>
  );
};

export default App;
