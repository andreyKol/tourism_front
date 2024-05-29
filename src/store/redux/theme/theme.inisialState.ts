import { ThemeProps } from '../../../models/themeTypes';

const ifSavedTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';

export const themeInitialState: ThemeProps = {
  theme: ifSavedTheme,
};
