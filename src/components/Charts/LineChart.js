import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js';
import './Canvas.css';

export default function LineChart (props) {
	const chartContainer = useRef(null);
	const myData = useRef([]);

	useEffect(() => {
		formatData();
		//console.log('In Line Chart; Data: ', data); 
		//console.log('Formated Data: ', myData);
		if (chartContainer && chartContainer.current) {
			const newChartInstance = new Chart(chartContainer.current, {
				type: 'line',
				options: {
					mantainAspectRatio: false,
					scales: {
						xAxes: [
							{
								type:'time',
								time: {
									unit:'week'
								},
								gridLines: {
      							  display: false
      							}
							}
						],
						yAxes: [
							{
								ticks: {
									min: 0,
								}
							}
						]
					}
				},
				data: {
					labels: myData.current.map(d => d[0]),
					datasets: [{
						label: props.title,
						data: myData.current.map(d => d[1]),
						fill: 'none',
						backgroundColor: '#4c738c',
						pointRadius: 2,
						borderColor: "rgba(60,92,116,0.5)",
						borderWidth: 1,
						lineTension: 0
					}]
				}
			});
	
	  	    return () => {
	  			newChartInstance.destroy();
  	  		}
  	  	}
	}, [props.data]);

	const formatData = () => {
		let formatedData = props.data.map(elt => {
			return (
				[
					elt[1].value,  //Value
					elt[0].value //Date
				]
			)
		})
		let byGreater = [[[''],[0]]];
		let i = 0;
		formatedData.forEach(elt => {
			if(byGreater[i][0].includes(elt[0])) { // If current date is in 'byGreater' date, then
				if(byGreater[i][1] < elt[1]) { // If current value is greater than current saved, then
					byGreater.pop();
					byGreater.push(elt);
					//i++;
				} 
			} else {
				byGreater.push(elt);
				i++;
			}
		})
		// Deleting duplicates dates
		let cleaned = [[0]];
		i = 0; 
		byGreater.forEach(elt => {
			if(!cleaned[i].includes(elt[0])) {
				cleaned.push(elt);
				i++;
			}
		})
		cleaned.shift();
		cleaned.shift();
		cleaned.pop();
		//console.log("cleaned: ", cleaned);
		myData.current = cleaned;
	}

	return (
		<canvas className="canvas" ref={chartContainer} />
	);
}