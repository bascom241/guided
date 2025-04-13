
import { motion } from "framer-motion";
import Banner from "../assets/still-life-books-versus-technology (1).jpg";
import { Rocket, Award, UserCheck, BookOpen } from "lucide-react";

const Join = () => {
  const benefits = [
    {
      icon: <Rocket className="w-6 h-6 text-blue-500" />,
      title: "Boost Your Brainpower",
      description: "Learn skills that make you say, 'Why didn't they teach me this in school?'"
    },
    {
      icon: <BookOpen className="w-6 h-6 text-purple-500" />,
      title: "Engaging Courses",
      description: "Our lessons are exciting and interactive—no boring lectures!"
    },
    {
      icon: <UserCheck className="w-6 h-6 text-blue-500" />,
      title: "Learn from Experts",
      description: "Our instructors are industry leaders with real-world experience"
    },
    {
      icon: <Award className="w-6 h-6 text-purple-500" />,
      title: "Get Certified",
      description: "Earn certificates that enhance your professional profile"
    }
  ];

  return (
    <motion.section 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="w-full mt-12 mb-12 px-4 sm:px-6"
    >
      {/* Background Image with Overlay - Changed to responsive container */}
      <div className="relative w-full min-h-[800px] md:min-h-[600px] rounded-lg overflow-hidden">
        <img 
          src={Banner} 
          className="absolute w-full h-full object-cover"
          alt="Join Guided learning community" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-purple-900/60" />
        
        {/* Content Container - Adjusted padding and flex direction */}
        <div className="relative container mx-auto h-full flex flex-col lg:flex-row items-center justify-center p-4 sm:p-8 md:p-12 text-white">
          {/* Left Content - Adjusted width and spacing */}
          <motion.div 
            className="w-full lg:w-1/2 space-y-6 lg:space-y-8 lg:pr-4"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h1 className="text-3xl text-center sm:text-4xl md:text-5xl font-bold">
              Why Join <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Guided?</span>
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white/10 backdrop-blur-sm p-4 sm:p-6 rounded-lg border border-white/10 hover:border-white/20 transition-all"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 bg-white/20 rounded-full">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold">{benefit.title}</h3>
                      <p className="text-sm sm:text-base text-gray-300">{benefit.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Form - Adjusted width and margins */}
          <motion.div 
            className="w-full lg:w-1/2 mt-8 lg:mt-0 lg:pl-4"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-xl shadow-xl max-w-md mx-auto">
              <h3 className="text-xl sm:text-2xl font-bold text-center mb-4 sm:mb-6 text-gray-800 dark:text-white">
                Join Our Learning Revolution!
              </h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Your Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-2 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all text-sm sm:text-base"
                >
                  Subscribe Now
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Join;