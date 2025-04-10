import React from 'react';
import { Accessibility, Lock, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const Offer = () => {
    const features = [
        {
            icon: <Accessibility className="w-10 h-10" />,
            title: "Lifetime Access",
            description: [
                "Once enrolled, you gain lifetime access",
                "to our courses and any future updates",
                "Learn at your own pace"
            ]
        },
        {
            icon: <Lock className="w-10 h-10" />,
            title: "Secure Payments",
            description: [
                "Enjoy peace of mind with our security",
                "Secure payment gateway integration",
                "Powered by Paystack"
            ]
        },
        {
            icon: <DollarSign className="w-10 h-10" />,
            title: "24-Hour Refund",
            description: [
                "Not satisfied within 24 hours?",
                "We offer a hassle-free refund",
                "No questions asked"
            ]
        }
    ];

    return (
        <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-6 p-4 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                                    {feature.title}
                                </h3>
                                <div className="space-y-2">
                                    {feature.description.map((line, i) => (
                                        <p key={i} className="text-gray-600 dark:text-gray-400">
                                            {line}
                                        </p>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

export default Offer;