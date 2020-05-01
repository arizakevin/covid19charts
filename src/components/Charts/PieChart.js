import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import './Canvas.css';

export default function PieChart (props) {
	const chartContainer = useRef(null);

	useEffect(() => {
		if (chartContainer && chartContainer.current) {
			const newChartInstance = new Chart(chartContainer.current, {
				type: 'pie',
				options: {
					mantainAspectRatio: false
				},
				data: {
					labels: props.data.map(d => d.label),
					datasets: [{
						data: props.data.map(d => d.value),
						backgroundColor: // [NewConfirmed, TotalConfirmed, NewDeaths    , TotalDeaths, NewRecovered, TotalRecovered ]
                                            [   '#d9cc0f',    '#6ebf89'  , '#bf9d6e'    , '#bf756e'  , '#6ea4bf'   ,   '#22CECE'    ]
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