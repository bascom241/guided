import React from 'react';
import { motion } from 'framer-motion';
import Guided from '../../src/assets/GuidEd.mp4';
import { BookOpen, Rocket, Award, Users } from 'lucide-react';

const Video = () => {
    const features = [
        {
            icon: <Rocket className="w-6 h-6 text-blue-500" />,
            text: "Prove Mastery Through Hands-On Learning",
            description: "Engage in interactive lessons and real-world projects that solidify your understanding."
        },
        {
            icon: <Award className="w-6 h-6 text-purple-500" />,
            text: "Gain In-Demand Skills from Industry Experts",
            description: "Learn directly from professionals with years of experience and practical insights."
        },
        {
            icon: <Users className="w-6 h-6 text-blue-500" />,
            text: "Collaborate with a Thriving Community",
            description: "Join discussions and connect with like-minded learners and mentors."
        },
        {
            icon: <BookOpen className="w-6 h-6 text-purple-500" />,
            text: "Stay Ahead with Updated Content",
            description: "Access the latest knowledge and evolving industry trends."
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
                {/* Video Section */}
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-700"
                >
                    <video
                        autoPlay
                        muted
                        loop
                        src={Guided}
                        className="w-full h-auto object-cover"
                    >
                        Your browser does not support the video tag.
                    </video>
                </motion.div>

                {/* Text Section */}
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="w-full lg:w-1/2 space-y-6"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        Master New Skills with Guided!
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-white">
                        Master Skills Hands-On
                    </h3>

                    <div className="space-y-4">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index, duration: 0.5 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="mt-1 flex-shrink-0">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                                        {feature.text}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        {feature.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Video;