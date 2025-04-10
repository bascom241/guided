import { useState } from 'react'
import InstructorBanner from '../assets/Teacher-removebg-preview.png'
import { motion } from 'framer-motion'
import { X, ArrowRight, BookOpen, Clock, Heart, Star } from 'lucide-react'
import InstructorSignUp from './InstructorSignUp'
import InstructorSignIn from './InstructorSignIn'

const InstructorHero = () => {
    const [showModal, setShowModal] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const features = [
        { icon: <Clock className="w-5 h-5" />, text: "Flexible Hours" },
        { icon: <BookOpen className="w-5 h-5" />, text: "Teach What You Love" },
        { icon: <Heart className="w-5 h-5" />, text: "Empower Learners" },
        { icon: <Star className="w-5 h-5" />, text: "Build Your Brand" }
    ]

    return (
        <div className='bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 w-full min-h-screen flex flex-col lg:flex-row items-center justify-center p-6 md:p-12'>
            {/* Left Content */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className='flex flex-col gap-6 max-w-2xl lg:mr-12 mb-12 lg:mb-0'
            >
                <h1 className='text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400'>
                    Share Your Knowledge, Inspire the Future!
                </h1>
                
                <p className='text-lg text-gray-600 dark:text-gray-300'>
                    Join our platform of passionate educators and create impactful learning experiences.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                            <span className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full text-blue-600 dark:text-blue-400">
                                {feature.icon}
                            </span>
                            <span>{feature.text}</span>
                        </div>
                    ))}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleModal}
                    className='w-full sm:w-64 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2'
                >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                </motion.button>
            </motion.div>

            {/* Right Image */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className='max-w-xl lg:max-w-2xl'
            >
                <img 
                    src={InstructorBanner} 
                    alt="Instructor teaching" 
                    className='w-full h-auto object-contain drop-shadow-2xl' 
                />
            </motion.div>

            {/* Modal */}
            {showModal && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className='bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md relative border border-gray-200 dark:border-gray-700'
                    >
                        <button 
                            className='absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors'
                            onClick={toggleModal}
                        >
                            <X className='w-6 h-6 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500' />
                        </button>

                        <div className="text-center mb-6">
                            <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>
                                {isSignUp ? "Join as Instructor" : "Welcome Back"}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">
                                {isSignUp ? "Start your teaching journey today" : "Continue sharing your knowledge"}
                            </p>
                        </div>

                        {isSignUp ? 
                            <InstructorSignUp setShowModal={setShowModal} /> : 
                            <InstructorSignIn setShowModal={setShowModal} />
                        }

                        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                            <button 
                                onClick={() => setIsSignUp(!isSignUp)} 
                                className="text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    )
}

export default InstructorHero