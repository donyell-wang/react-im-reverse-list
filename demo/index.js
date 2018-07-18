import React from 'react';
import { render } from 'react-dom';
import Demo from './Demo';

function renderApp() {
  // const App = require('./containers/App').default
  render(<Demo />, root);
}

renderApp();

module.hot.accept(renderApp);
