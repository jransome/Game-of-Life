import React from 'react';
import Box from './Box.js'

export default class Grid extends React.Component{
  render(){
    const gridWidth = this.props.cols * 14;
    var rowsArr = [];

    for (let i = 0; i < this.props.rows; i++) {
      for (let j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;
        let boxClass = this.props.gridFull[i][j] ? "box on" : "box off";

        rowsArr.push(
          <Box
            key={boxId}
            boxClass={boxClass}
            id={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        );
      }
    }

    return(
      <div className="grid" style={{width: gridWidth}}>
        {rowsArr}
      </div>
    )
  }
}
