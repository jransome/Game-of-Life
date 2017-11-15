import React from 'react';
import ReactDOM from 'react-dom';
import Grid from './Grid';

describe('Grid', () => {
  let nRows = 20;
  let nCols = 30;
  let gridMock = Array(nRows).fill().map(()=> Array(nCols).fill(false));

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Grid
                      gridFull={gridMock}
                      rows={nRows}
                      cols={nCols}
                      selectBox={{}}
                    />, div);
  });
})
