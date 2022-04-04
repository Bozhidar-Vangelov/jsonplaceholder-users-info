import { Routes, Route } from 'react-router-dom';

import './App.scss';
import UsersList from './features/users/UsersList';
import UserInfo from './features/userInfo/UserInfo';

import ThemeProvider from './shared/styles/theme/ThemeProvider';

const App = () => {
  return (
    <>
      <ThemeProvider />
      <Routes>
        <Route path='/' element={<UsersList />} />
        <Route path='users/:userId/' element={<UserInfo />} />
      </Routes>
    </>
  );
};

export default App;
