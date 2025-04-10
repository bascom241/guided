import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image1 from "../assets/E1.jpg";
import Image2 from "../assets/E2.jpg";
import Image3 from "../assets/E3.jpg";
import Image4 from "../assets/E4.jpg";
import { motion } from 'framer-motion';
import { Link } from "react-router-dom";
import { ArrowRight, PlayCircle } from "lucide-react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Hero: React.FC = () => {
    const images: string[] = [Image1, Image2, Image3, Image4];

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 w-full min-h-screen flex flex-col lg:flex-row items-center justify-center p-6 md:p-12 gap-8">
            {/* Text Content */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="max-w-2xl lg:mr-12"
            >
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 mb-4">
                    Master Any Course With Expert Guidance
                </h1>
                
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                    Transform your learning experience with the power of personal guidance. 
                    Our platform connects you with expert tutors for a tailored educational journey.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                    >
                        Get Started
                        <ArrowRight className="w-4 h-4" />
                    </motion.button>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-6 py-3 rounded-lg font-medium border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                    >
                        <PlayCircle className="w-5 h-5" />
                        Watch Demo
                    </motion.button>
                </div>
            </motion.div>

            {/* Image Slider */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="w-full max-w-2xl"
            >
                <Swiper
                    modules={[Autoplay, Pagination]}
                    autoplay={{ 
                        delay: 3000,
                        disableOnInteraction: false 
                    }}
                    pagination={{ 
                        clickable: true,
                        bulletClass: 'swiper-pagination-bullet dark:!bg-white/50',
                        bulletActiveClass: '!bg-blue-600 dark:!bg-blue-400'
                    }}
                    loop={true}
                    className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-700"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${image})` }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </div>
    );
};

export default Hero;