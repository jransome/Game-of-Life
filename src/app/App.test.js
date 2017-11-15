import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.mock('react-chartjs-2'); //mocking chartjs

// "smoke test". Note: test not isolated from child components
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
