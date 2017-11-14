import React from 'react';
import { ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';

export default class Buttons extends React.Component {

  handleSizeSelect = (evt) => {
    this.props.gridSize(evt);
  }

  render(){
    return(
      <div className="center">
        <ButtonToolbar>
          <button className="btn btn-default" onClick={this.props.playButton}>
            Play
          </button>
          <button className="btn btn-default" onClick={this.props.pauseButton}>
            Pause
          </button>
          <button className="btn btn-default" onClick={this.props.clear}>
            Clear
          </button>
          <button className="btn btn-default" onClick={this.props.slow}>
            Slow
          </button>
          <button className="btn btn-default" onClick={this.props.fast}>
            Fast
          </button>
          <button className="btn btn-default" onClick={this.props.seed}>
            Seed
          </button>
          <DropdownButton
            title="Grid Size"
            id="size-menu"
            onSelect={this.handleSizeSelect}
          >
            <MenuItem eventKey="1">30 x 20</MenuItem>
            <MenuItem eventKey="2">60 x 40</MenuItem>
            <MenuItem eventKey="3">90 x 60</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}
