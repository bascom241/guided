
import { Code, Database, Monitor, TrendingUp, BarChart, Shield, Lock, Layers, Smartphone } from 'lucide-react';

const CourseCategories = () => {
  const courseCategories = [
    { name: 'Web Development', icon: <Code size={36} className="text-blue-500" /> },
    { name: 'Data Science', icon: <Database size={36} className="text-green-500" /> },
    { name: 'Graphic Design', icon: <Monitor size={36} className="text-purple-500" /> },
    { name: 'Machine Learning', icon: <TrendingUp size={36} className="text-teal-500" /> },
    { name: 'Digital Marketing', icon: <BarChart size={36} className="text-yellow-500" /> },
    { name: 'Business Management', icon: <Shield size={36} className="text-indigo-500" /> },
    { name: 'Cybersecurity', icon: <Lock size={36} className="text-red-500" /> },
    { name: 'UI/UX Design', icon: <Layers size={36} className="text-pink-500" /> },
    { name: 'Mobile App Development', icon: <Smartphone size={36} className="text-orange-500" /> }
  ];

  return (
    <div className="container mx-auto mt-8 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseCategories.map((category, index) => (
          <div
            key={index}
            className="border-2 border-gray-300 p-6 w-full h-40 rounded-md shadow-lg hover:bg-gray-100 transition hover:text-black duration-300 flex flex-col items-center justify-center gap-4"
          >
            {/* Icon and Text */}
            <div className="text-center flex flex-col items-center justify-center">
              <div className="mb-2 flex items-center justify-center">{category.icon}</div>
              <p className="text-lg font-semibold">{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCategories;
