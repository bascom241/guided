
import { motion } from 'framer-motion';
import { Users, BookOpen, Award } from 'lucide-react';

const StatsBanner = () => {
    const stats = [
        { 
            label: "Enrolled Students", 
            value: "12,000+", 
            icon: <Users className="w-8 h-8" />,
            color: "text-blue-400"
        },
        { 
            label: "Courses Available", 
            value: "500+", 
            icon: <BookOpen className="w-8 h-8" />,
            color: "text-purple-400"
        },
        { 
            label: "Certificates Issued", 
            value: "8,000+", 
            icon: <Award className="w-8 h-8" />,
            color: "text-green-400"
        },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl shadow-xl mt-12"
        >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            {/* Content */}
            <div className="relative z-10 px-8 py-12 md:px-12">
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-4xl font-bold text-center mb-8 text-white"
                    >
                        Join Our Thriving Learning Community
                    </motion.h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all"
                            >
                                <div className={`${stat.color} mb-4`}>
                                    {stat.icon}
                                </div>
                                <p className="text-4xl font-bold text-white mb-2">
                                    {stat.value}
                                </p>
                                <p className="text-lg text-white/80">
                                    {stat.label}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default StatsBanner;