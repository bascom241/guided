import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, BarElement } from 'chart.js';

// Register required Chart.js components
ChartJS.register(ArcElement, Legend, Tooltip, LinearScale, CategoryScale, BarElement);


interface BarProps {
    courseLength: number
    totalStudents: number
    totalReviews: number
}
const BarChat: React.FC<BarProps> = ({ totalReviews, totalStudents, courseLength }) => {

    const chartData = {
        labels: ["Total Courses", "Total Students", "Total Reviews"], // X-axis labels
        datasets: [
            {
                label: "Courses Created",
                data: [courseLength, 0, 0], // Assigning value to correct category
                backgroundColor: "rgba(75, 192, 192, 0.6)", // Teal
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
            {
                label: "Students Enrolled",
                data: [0, totalStudents, 0], // Assigning value to correct category
                backgroundColor: "rgba(255, 99, 132, 0.6)", // Red
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
            {
                label: "Reviews Given",
                data: [0, 0, totalReviews], // Assigning value to correct category
                backgroundColor: "rgba(54, 162, 235, 0.6)", // Blue
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    // Chart Options
    const options = {
        responsive: true,
        plugins: {
            legend: { display: true }, // Show legend
            title: { display: true, text: "Platform Statistics" }, // Chart title
        },
        scales: {
            y: { beginAtZero: true }, // Y-axis starts at 0
        },
    };
    return (
        <Bar data={chartData} options={options}/>
    )
}

export default BarChat
