import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {
        labels: ['Documents', 'Leaks'],
        datasets: [
          {
            data: [2, 4],
            backgroundColor: ['rgba(255, 255, 255, 0.8)', 'rgba(255, 0, 0, 1)']
          }
        ]
      }
    };
  }

  static defaultProps = {
    displayLegend: true,
    legendPosition: 'right'
  };

  render() {
    return (
      <div className="chart">
        <Doughnut
          data={this.state.chartData}
          options={{
            maintainAspectRatio: false,
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;
