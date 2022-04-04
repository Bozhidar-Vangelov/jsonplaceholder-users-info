import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Switch } from 'antd';

import './App.scss';
import UsersList from './features/users/UsersList';
import UserInfo from './features/userInfo/UserInfo';
import { setThemeState, themeSelector } from './shared/theme/themeProvider';

const App = () => {
  const dispatch = useDispatch();
  const { currentTheme } = useSelector(themeSelector);

  const switchTheme = () => {
    if (currentTheme === 'light') {
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
    }

    dispatch(setThemeState(currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <Switch
        onClick={switchTheme}
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
