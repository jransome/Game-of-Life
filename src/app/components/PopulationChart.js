import React from 'react';
import { Line } from 'react-chartjs-2';

export default class PopulationChart extends React.Component{
  constructor(props){
    super(props);
    this.staticChartOpts = {
      responsive: true,
      legend: {
        labels:{
          fontSize: 25,
          fontColor: "rgba(255, 255, 255, 1)"
        }
      },
      scales: {
        xAxes: [{
            ticks: {
              fontSize: 16,
              fontColor: "rgba(255, 255, 255, 1)"
            },
            scaleLabel: {
              display: true,
              labelString: 'Generation',
              fontSize: 18,
              fontColor: "rgba(255, 255, 255, 1)"
            },
            gridLines:{
              display: false
            }
        }],
        yAxes: [{
            ticks: {
              fontSize: 14,
              fontColor: "rgba(255, 255, 255, 1)"
            },
            scaleLabel: {
              display: true,
              labelString: 'Population',
              fontSize: 18,
              fontColor: "rgba(255, 255, 255, 1)"
            },
            gridLines:{
              display: false
            }
        }]
      }
    }
    this.state = {
      chartData:{
        labels: [],
        datasets: [{
            lineTension: 0,
            label: "Population per generation",
            backgroundColor: "rgba(14, 39, 199, 0.44)",
            borderColor: "rgb(255, 92, 0)",
            data: [],
            fill: true,
        }]
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props === nextProps) return;
    let newChartData = this.state.chartData;;

    // reset population history if generation counter is 0
    if (nextProps.generation === 0) {
      newChartData.datasets[0].data = [];
    }

    // create x axis values
    let xValues = [];
    for (var i = 0; i < nextProps.generation + 1; i++) {
      xValues.push(i);
    }
    newChartData.labels = xValues;

    // push new population data
    newChartData.datasets[0].data.push(nextProps.population);

    this.setState({
      chartData: newChartData
    })
  }

  render(){
    return(
      <div className="population-chart">
      <Line
        data={this.state.chartData}
        options={this.staticChartOpts}
      />
      </div>
    )
  }
}
