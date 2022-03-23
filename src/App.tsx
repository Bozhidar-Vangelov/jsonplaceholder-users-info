import { Routes, Route } from 'react-router-dom';

import UsersList from './features/users/UsersList';
import './App.css';
import Posts from './features/posts/Posts';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<UsersList />} />
      <Route path='users/:userId/posts' element={<Posts />} />
    </Routes>
  );
};

export default App;
