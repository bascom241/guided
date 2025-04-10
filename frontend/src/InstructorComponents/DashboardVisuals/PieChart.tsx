import React from 'react'
import {Pie} from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


ChartJS.register(ArcElement,Legend,Tooltip)

interface PieChartProp {
    courseLength:number
    totalStudents:number
    totalReviews:number
}
const PieChart:React.FC<PieChartProp> = ({courseLength,totalStudents,totalReviews}) => {

    const chartData = {
        labels: ["Total Courses", "Total Students", "Total Reviews"],
        datasets: [
            {
                data: [courseLength, totalStudents, totalReviews], // Data values
                backgroundColor: [
                    "rgba(75, 192, 192, 0.6)", // Teal - Courses
                    "rgba(255, 99, 132, 0.6)", // Red - Students
                    "rgba(54, 162, 235, 0.6)", // Blue - Reviews
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { display: true }, // Show legend
            title: { display: true, text: "Distribution of Platform Statistics" }, // Chart title
        },
    };


  return (



    <Pie data={chartData} options={options} width={30} />
  )
}

export default PieChart
