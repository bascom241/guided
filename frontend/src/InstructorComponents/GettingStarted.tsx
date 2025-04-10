import React, { useState } from 'react';
import { BookOpen, Video, Share2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GettingStarted = () => {
    const [activeTab, setActiveTab] = useState(0);

    const steps = [
        {
            title: "Plan Your Curriculum",
            icon: <BookOpen className="w-6 h-6" />,
            content: [
                "Identify your target audience and their learning needs",
                "Break down the course into modules and lessons",
                "Include exercises and quizzes for engagement",
                "Review and revise for clarity and completeness"
            ],
        },
        {
            title: "Record Your Videos",
            icon: <Video className="w-6 h-6" />,
            content: [
                "Use proper lighting and audio equipment",
                "Record clear, concise lectures",
                "Edit with visuals and animations",
                "Preview before publishing"
            ],
        },
        {
            title: "Promote Your Course",
            icon: <Share2 className="w-6 h-6" />,
            content: [
                "Share on social media platforms",
                "Create engaging course trailers",
                "Collect student testimonials",
                "Collaborate with niche influencers"
            ],
        },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mt-12 border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                Getting Started Guide
            </h2>
            
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                {steps.map((step, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveTab(index)}
                        className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                            activeTab === index 
                                ? 'bg-blue-600 text-white shadow-md' 
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                        {step.icon}
                        <span className="font-medium">{step.title}</span>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-blue-50 dark:bg-gray-700/50 p-6 rounded-lg border border-blue-100 dark:border-gray-600"
                >
                    <h3 className="text-xl font-semibold mb-4 text-blue-800 dark:text-blue-400 flex items-center gap-2">
                        {steps[activeTab].icon}
                        {steps[activeTab].title}
                    </h3>
                    
                    <ul className="space-y-3">
                        {steps[activeTab].content.map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                                <span className="inline-flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-sm font-medium">
                                    {i + 1}
                                </span>
                                <span className="text-gray-700 dark:text-gray-300">
                                    {item}
                                </span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </AnimatePresence>

            <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                Need more help? <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Contact our support team</a>
            </div>
        </div>
    );
};

export default GettingStarted;