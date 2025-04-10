import React from 'react';
import { motion } from 'framer-motion';
import Learn from '../../src/assets/team-meeting-report-success-manager-invest (1).jpg';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Lightbulb, Code } from 'lucide-react';

const Form = () => {
    const benefits = [
        {
            icon: <Lightbulb className="w-5 h-5 text-blue-500" />,
            text: "Gain insights to create the best products"
        },
        {
            icon: <Code className="w-5 h-5 text-purple-500" />,
            text: "Real-life experience and rapid product shaping"
        },
        {
            icon: <Users className="w-5 h-5 text-blue-500" />,
            text: "Explore our open source projects"
        }
    ];

    return (
        <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
                {/* Image - Mobile */}
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="w-full lg:hidden rounded-2xl overflow-hidden shadow-xl"
                >
                    <img 
                        src={Learn} 
                        alt="Team collaborating" 
                        className="w-full h-auto object-cover rounded-r-full border-4 border-blue-600/20 dark:border-blue-400/20"
                    />
                </motion.div>

                {/* Content */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-full space-y-6"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        Join Our Team of Developers
                    </h2>

                    <ul className="space-y-4">
                        {benefits.map((benefit, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * index, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-3"
                            >
                                <span className="mt-0.5 flex-shrink-0">
                                    {benefit.icon}
                                </span>
                                <p className="text-lg text-gray-700 dark:text-gray-300">
                                    {benefit.text}
                                </p>
                            </motion.li>
                        ))}
                    </ul>

                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Link 
                                to="/" 
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-medium shadow hover:shadow-lg transition-all"
                            >
                                Join Our Community
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            <Link 
                                to="/" 
                                className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg font-medium shadow hover:shadow-lg transition-all"
                            >
                                Contact Us
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Image - Desktop */}
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="w-full hidden lg:block rounded-2xl overflow-hidden shadow-xl"
                >
                    <img 
                        src={Learn} 
                        alt="Team collaborating" 
                        className="w-full h-auto object-cover rounded-r-full border-4 border-blue-600/20 dark:border-blue-400/20"
                    />
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Form;