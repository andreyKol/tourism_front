import './i18n/i18n';
import { Router } from './navigation/Router';
import { memo } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const App = memo(() => (
  <Provider store={store}>
      <Router />
  </Provider>
));

App.displayName = 'App';
