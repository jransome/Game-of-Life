import React from 'react';
import ReactDOM from 'react-dom';
import Helpers from './helpers.js';
import './index.css';
import { ButtonToolbar, MenuItem, DropdownButton } from 'react-bootstrap';

class Box extends React.Component{
  selectBox=() => {
    this.props.selectBox(this.props.row, this.props.col);
  }

  render(){
    return(
      <div
        className={this.props.boxClass}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}

class Grid extends React.Component{
  render(){
    const width = this.props.cols * 14;
    var rowsArr = [];

    var boxClass = "";
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
      <div className="grid" style={{width: width}}>
        {rowsArr}
      </div>
    )
  }
}

class Buttons extends React.Component {

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

class Main extends React.Component {
  constructor(){
    super();
    this.speed = 200;
    this.cols = 30;
    this.rows = 20;
    this.seedBoxes = Math.round((this.cols * this.rows) * 0.6);

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(()=> Array(this.cols).fill(false)) // create 2d array with each element as false
    }
  }

  componentDidMount(){
    this.seed();
    this.playButton();
  }

  play = () => {
    let g = this.state.gridFull;
    let gClone = Helpers.cloneArray(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
		    let count = 0;
		    if (i > 0) if (g[i - 1][j]) count++;
		    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
		    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
		    if (j < this.cols - 1) if (g[i][j + 1]) count++;
		    if (j > 0) if (g[i][j - 1]) count++;
		    if (i < this.rows - 1) if (g[i + 1][j]) count++;
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
		    if (i < this.rows - 1 && this.cols - 1) if (g[i + 1][j + 1]) count++;
		    if (g[i][j] && (count < 2 || count > 3)) gClone[i][j] = false;
		    if (!g[i][j] && count === 3) gClone[i][j] = true;
		  }
		}

		this.setState({
		  gridFull: gClone,
		  generation: this.state.generation + 1
		});
  }

  playButton = () => {
    clearInterval(this.intervalId)
    this.intervalId = setInterval(this.play, this.speed);
  }

  pauseButton = () => {
    clearInterval(this.intervalId);
  }

  clear = () => {
    this.setState({
      generation: 0,
      gridFull: Array(this.rows).fill().map(()=> Array(this.cols).fill(false)) // create 2d array with each element as false
    })
  }

  slow = () => {
    this.speed = 750;
    this.playButton();
  }

  fast = () => {
    this.speed = 200;
    this.playButton();
  }

  seed = () => {
    let gridCopy = Helpers.cloneArray(this.state.gridFull); // deep clone the array
    for (let i = 0; i < this.seedBoxes; i++) {
      let x = Helpers.getRandomInt(0, this.rows - 1);
      let y = Helpers.getRandomInt(0, this.cols - 1);
      gridCopy[x][y] = true;
    }
    this.setState({
      gridFull: gridCopy
    })
  }

  gridSize = (size) => {
    console.log(size)
    switch (size) {
      case "1":
        this.cols = 30;
        this.rows = 20;
        break;
      case "2":
        this.cols = 60;
        this.rows = 40;
        break;
      case "3":
        this.cols = 90;
        this.rows = 60;
        break;
      default:
        this.cols = 30;
        this.rows = 20;
    }
    this.clear();
  }

  selectBox = (row, col) => {
    let gridCopy = Helpers.cloneArray(this.state.gridFull); // deep clone the array
    gridCopy[row][col] = !gridCopy[row][col]; // toggle box 'on/off'
    this.setState({
      gridFull: gridCopy
    })
  }

  render(){
    return(
      <div>
        <h1>Conway's Game of Life</h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          gridSize={this.gridSize}
        />
        <Grid
          gridFull = {this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <h2>Generations: {this.state.generation}</h2>
      </div>
    );
  }
}

ReactDOM.render(<Main />, document.getElementById('root'));
