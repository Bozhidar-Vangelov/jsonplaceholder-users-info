import UsersList from './features/users/UsersList';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Posts from './features/posts/Posts';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<UsersList />} />
        <Route path='/posts/:userId' element={<Posts />} />
      </Routes>
    </>
  );
};

export default App;
