import React, {useContext} from 'react';
import Chart from './Chart'
import './chart.css'
import {GraphContext} from '../../App'

const RadarChart = () => {
	const context = useContext(GraphContext)

	const draw = (axes) => {
		const existingGraph = document.querySelector('svg')
		if(existingGraph) existingGraph.remove()
		const mvpGraph = new Chart(600, 600, axes);
		mvpGraph.draw();
	}

	draw(context.axes)
	return <div id="graph"></div>
}	

export default RadarChart
