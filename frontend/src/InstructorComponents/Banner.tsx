
import { motion } from "framer-motion";
import { Rocket, ArrowRight } from "lucide-react";

const Banner = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative overflow-hidden rounded-xl p-8 md:p-12 mt-12 shadow-2xl border border-gray-800"
            style={{
                background: "radial-gradient(ellipse at top, #1e1e1e, #0a0a0a)",
            }}
        >
            {/* Background Accent Design */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600 opacity-10 rounded-full blur-3xl transform -translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-600 opacity-10 rounded-full blur-3xl transform translate-x-1/3 translate-y-1/3"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black opacity-20"></div>

            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-5 [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

            {/* Content */}
            <div className="relative z-10 text-center max-w-3xl mx-auto">
                <motion.div 
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-full mb-6"
                >
                    <Rocket className="h-6 w-6 text-white" />
                </motion.div>
                
                <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                    Ready to Create Your First Masterpiece?
                </h2>
                
                <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Join thousands of instructors sharing their knowledge. Our platform makes it easy to create, publish, and earn from your courses.
                </p>
                
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 bg-white text-black py-3 px-8 rounded-lg font-medium hover:bg-gray-100 transition-all shadow-lg"
                    >
                        Start Creating
                        <ArrowRight className="h-4 w-4" />
                    </motion.button>
                    
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center gap-2 bg-transparent text-white py-3 px-8 rounded-lg font-medium hover:bg-gray-800 transition-all border border-gray-700"
                    >
                        Learn How It Works
                    </motion.button>
                </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/4 left-1/6 w-8 h-8 rounded-full bg-blue-500 opacity-20 blur-sm"
            ></motion.div>
            <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute bottom-1/3 right-1/5 w-6 h-6 rounded-full bg-purple-500 opacity-20 blur-sm"
            ></motion.div>
        </motion.div>
    );
};

export default Banner;