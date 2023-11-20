import React from 'react'
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'
import { Bar } from 'react-chartjs-2'

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

function BarChartComponent({ chartData }) {

    const data = chartData;

    const options = {

    }

    return (
        <div>
            <Bar data={data} options={options} >
            </Bar>
        </div>
    )
}

export default BarChartComponent