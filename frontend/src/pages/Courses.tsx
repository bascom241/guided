import React, { useState, useEffect } from 'react';
import { useCourseStore } from '../../store/useCourseStore';
import { Loader, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { motion } from 'framer-motion';

const Courses = () => {
    const { getCourses, isFetchingData, getCoursesBySearch, courseContainer, addToCart, addingToCart } = useCourseStore();
    const { authUser } = useAuthStore() as unknown as { authUser: { user: any } };
    const [loadingCourseId, setLoadingCourseId] = useState<string | null>(null);
    const userID = authUser?.user._id;
    const [selectedPrice, setSelectedPrice] = useState("");

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const category = queryParams.get("category");
        const subCategory = queryParams.get("subcategory");

        if (category || subCategory) {
            getCoursesBySearch({ category, subCategory });
        } else {
            getCourses();
        }
    }, [location.search]);

    const handleAddToCart = async (courseId: string) => {
        setLoadingCourseId(courseId);
        await addToCart(courseId, userID);
        setLoadingCourseId(null);
    };

    return (
        <div className="p-4 sm:p-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-6">
                    Explore Our Courses
                </h1>

                {/* Filter Controls */}
                <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all text-gray-800 dark:text-white font-medium border border-gray-200 dark:border-gray-700"
                        onClick={getCourses}
                    >
                        All Courses
                    </motion.button>
                    
                    <select 
                        className="px-6 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all text-gray-800 dark:text-white font-medium border border-gray-200 dark:border-gray-700"
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            setSelectedPrice(selectedValue);
                            getCoursesBySearch({ sort: selectedValue })
                        }}
                    >
                        <option value="">Sort by Price</option>
                        <option value="-price">High to Low</option>
                        <option value="price">Low to High</option>
                    </select>
                    
                    <select 
                        className="px-6 py-2 rounded-lg bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all text-gray-800 dark:text-white font-medium border border-gray-200 dark:border-gray-700"
                    >
                        <option value="">Sort by Rating</option>
                        <option value="Highest Rated">Highest Rated</option>
                        <option value="Lowest Rated">Lowest Rated</option>
                    </select>
                </div>

                {/* Courses Grid */}
                {courseContainer.length === 0 ? (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
                        <p className="text-xl">No courses available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courseContainer.map((course, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
                            >
                                <div className="relative h-48 w-full overflow-hidden">
                                    <img 
                                        src={course.thumbnail} 
                                        alt={course.tittle} 
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                        <span className="text-white font-medium">{course.category}</span>
                                    </div>
                                </div>
                                
                                <div className="p-6">
                                    <Link to={`/course/${course._id}`} className="group">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {course.tittle}
                                        </h2>
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                            {course.description}
                                        </p>
                                    </Link>
                                    
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className="text-sm px-3 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full">
                                            {course.level}
                                        </span>
                                        <span className="text-sm px-3 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full">
                                            {course.duration} hours
                                        </span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            ${course.price}
                                        </span>
                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                            By {course.instructor?.firstName} {course.instructor?.lastName}
                                        </span>
                                    </div>
                                    
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-md transition-all"
                                        onClick={() => handleAddToCart(course._id)}
                                        disabled={loadingCourseId === course._id}
                                    >
                                        {loadingCourseId === course._id ? (
                                            <Loader2 className="animate-spin h-5 w-5" />
                                        ) : (
                                            <>
                                                Add to Cart
                                                <ArrowRight className="w-4 h-4" />
                                            </>
                                        )}
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Loading Overlay */}
                {isFetchingData && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-2xl flex flex-col items-center">
                            <Loader className="animate-spin h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
                            <p className="text-gray-800 dark:text-white">Loading courses...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Courses;