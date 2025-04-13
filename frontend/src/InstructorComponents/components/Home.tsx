import  { useEffect } from 'react'
import { useCourseStore } from '../../../store/useCourseStore'
import PieChart from '../DashboardVisuals/PieChart';
import BarChat from '../DashboardVisuals/BarChat';

const Home = () => {
    const { courseContainer, getCourses,instructorCoursesContainer} = useCourseStore();
    
    useEffect(() => {
        getCourses()
    }, [])
    
    const stats = [
        { 
            title: "Courses", 
            value: instructorCoursesContainer?.length || 0, 
            bg: "bg-green-500", 
            border: "border-green-500" 
        },
        { 
            title: "Students", 
            value: 26, 
            bg: "bg-blue-800", 
            border: "border-blue-800" 
        },
        { 
            title: "Reviews", 
            value: 1000, 
            bg: "bg-purple-600", 
            border: "border-purple-600" 
        }
    ];

    return (
        <div className="p-4 md:p-6">
            {/* Stats Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
                {stats.map((stat, index) => (
                    <div 
                        key={index}
                        className={`${stat.bg} ${stat.border} border-2 rounded-lg p-6 flex flex-col items-center justify-center gap-3 text-white transition-all hover:scale-[1.02]`}
                    >
                        <p className='text-xl md:text-2xl font-medium'>{stat.title}</p>
                        <p className='text-3xl md:text-4xl font-bold'>{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Course Analytics</h2>
                    <div className="h-80 md:h-96">
                        <BarChat
                            courseLength={courseContainer.length}
                            totalReviews={1000}
                            totalStudents={26}
                        />
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Distribution</h2>
                    <div className="h-80 md:h-96">
                        <PieChart
                            courseLength={courseContainer.length}
                            totalReviews={1000}
                            totalStudents={26}
                        />
                    </div>
                </div>
            </div>

            {/* Additional Content Area */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Recent Activity</h2>
                <p className="text-gray-600 dark:text-gray-300">
                    Dashboard overview and quick statistics. Add your recent activities or notifications here.
                </p>
            </div>
        </div>
    )
}

export default Home