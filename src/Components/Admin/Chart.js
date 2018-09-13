import React, { Component } from 'react';
import { Doughnut } from 'react-chartjs-2';

class Chart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false
    };
  }

  static defaultProps = {
    displayLegend: true,
    legendPosition: 'right'
  };

  render() {
    let chartData = {
      labels: ['Documents', 'Leaks'],
      datasets: [
        {
          data: [this.props.docsCount, this.props.leaksCount],
          backgroundColor: ['rgba(255, 255, 255, 0.8)', 'rgba(255, 0, 0, 1)']
        }
      ]
    };
    return (
      <div className="chart">
        <Doughnut
          data={chartData}
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
