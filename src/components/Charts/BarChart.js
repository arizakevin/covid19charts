import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import './Canvas.css';

export default function BarChart (props) {
	const chartContainer = useRef(null);

	useEffect(() => {
  	  if (chartContainer && chartContainer.current) {
  	    const newChartInstance = new Chart(chartContainer.current, {
			type: 'bar',
			options: {
				mantainAspectRatio: false,
				scales: {
					xAxes: [
						{
							gridLines: {
      						  display: false
      						}
						}
					],
					yAxes: [
						{	
							stacked: true,
							ticks: {
								min: 0,
								max: Math.round(props.data[1].value*1.1)
							},
							gridLines: {
      						  display: true,
      						  color: "rgba(60,92,116,0.2)"
      						}
						}
					]
				}
			},
			data: {
				labels: props.data.map(d => d.label),
				datasets: [{
					label: props.title,
					data: props.data.map(d => d.value),
					backgroundColor: "rgba(34,206,206,0.5)",
					borderColor: "rgba(60,92,116,0.5)",
    				borderWidth: 2,
    				hoverBackgroundColor: "rgba(34,206,206,0.7)"
				}]
			}
		});

  	    return () => {
  			newChartInstance.destroy();
  	  	}
  	  }
  	},[props.data]);

	return (
		<canvas className="canvas" ref={chartContainer} />
	);
}



