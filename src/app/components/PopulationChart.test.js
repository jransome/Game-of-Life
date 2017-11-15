import React from 'react';
import ReactDOM from 'react-dom';
import PopulationChart from './PopulationChart';

jest.mock('react-chartjs-2');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PopulationChart />, div);
});
