import React from 'react';
import { Provider } from 'react-redux';
import store from './Redux_Tookit/store';
import MainApp from './MainApp';

const App = () => (
  <Provider store={store}>
    <MainApp />
  </Provider>
);

export default App;
