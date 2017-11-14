import React, { Component } from 'react';
import Buttons from './components/Buttons.js'
import Grid from './components/Grid.js'
import Helpers from '../lib/helpers.js';

export default class App extends React.Component {
  constructor(){
    super();
    this.speed = 200;
    this.cols = 30;
    this.rows = 20;

    this.state = {
      population: 0,
      seedBoxes: 360,
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
    let currentPopulation = this.state.population;

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

		    if (g[i][j] && (count < 2 || count > 3)) {
          gClone[i][j] = false;
          currentPopulation--;
        }

		    if (!g[i][j] && count === 3) {
          gClone[i][j] = true;
          currentPopulation++;
        }
		  }
		}

		this.setState({
      population: currentPopulation,
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
      population:0,
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
    let currentPopulation = this.state.population;
    let gridCopy = Helpers.cloneArray(this.state.gridFull); // deep clone the array
    for (let i = 0; i < this.state.seedBoxes; i++) {
      let x = Helpers.getRandomInt(0, this.rows - 1);
      let y = Helpers.getRandomInt(0, this.cols - 1);
      if (gridCopy[x][y] === false) {
        gridCopy[x][y] = true;
        currentPopulation++;
      }
    }
    this.setState({
      population: currentPopulation,
      gridFull: gridCopy
    })
  }

  gridSize = (size) => {
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
    this.setState({
      population: 0,
      seedBoxes: Math.round((this.cols * this.rows) * 0.6)
    })
  }

  selectBox = (row, col) => {
    let gridCopy = Helpers.cloneArray(this.state.gridFull); // deep clone the array
    let currentPopulation = this.state.population;
    gridCopy[row][col] ? currentPopulation-- : currentPopulation++ // if alive, then decrement population counter and vice versa
    gridCopy[row][col] = !gridCopy[row][col]; // toggle box 'on/off'
    this.setState({
      population: currentPopulation,
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
        <h2>Generations: {this.state.generation}, Population: {this.state.population}</h2>
      </div>
    );
  }
}
