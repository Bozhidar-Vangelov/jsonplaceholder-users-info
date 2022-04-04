import { useDispatch, useSelector } from 'react-redux';
import { setThemeState, themeSelector } from './themeProviderSlice';
import { Switch } from 'antd';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';

const ThemeProvider = () => {
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
    <Switch
      onClick={switchTheme}
      checkedChildren={<BulbOutlined />}
      unCheckedChildren={<BulbFilled />}
      defaultChecked={false}
    />
  );
};

export default ThemeProvider;
