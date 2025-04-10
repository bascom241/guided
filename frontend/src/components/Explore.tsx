import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { motion } from 'framer-motion';
import CourseCategories from './Category';

const Explore = () => {
    const [isScrollingDown, setIsScrollingDown] = useState(false);
    const checkpointRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const checkpoint = checkpointRef.current ? checkpointRef.current.getBoundingClientRect().top + window.scrollY : 0;

            if (currentScrollY > lastScrollY && currentScrollY >= checkpoint) {
                setIsScrollingDown(true);
            } else if (currentScrollY < lastScrollY && currentScrollY < checkpoint) {
                setIsScrollingDown(false);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='mt-12 bg-gradient-to-b from-gray-900 to-gray-800 py-16 px-4 sm:px-6 lg:px-8'
        >
            <div className='max-w-7xl mx-auto'>
                <div className='flex flex-col items-center gap-8'>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='text-center'
                    >
                        <h2 className='text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400'>
                            Explore Courses in Your Field
                        </h2>
                        <p className='mt-4 text-lg text-gray-300 max-w-2xl mx-auto'>
                            Discover the perfect course to advance your skills and knowledge
                        </p>
                    </motion.div>

                    <motion.div
                        ref={checkpointRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='w-full max-w-md'
                    >
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            className='w-full flex items-center justify-between gap-4 px-6 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 text-gray-200 transition-all duration-300'
                        >
                            <span className='font-medium text-lg'>All Categories</span>
                            {isScrollingDown ? (
                                <ChevronUp className='text-blue-400' />
                            ) : (
                                <ChevronDown className='text-blue-400' />
                            )}
                        </motion.button>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className='mt-12 text-white'
                >
                    <CourseCategories />
                </motion.div>
            </div>
        </motion.div>
    );
};

export default Explore;