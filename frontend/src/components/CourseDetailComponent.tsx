import React, { useState } from 'react';
import { X, PlayCircle, BookOpen, Users, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEnrollStore } from '../../store/useEnrollStore';
import { useAuthStore } from '../../store/useAuthStore';
import { Loader } from 'lucide-react';
type CourseType = {
  courseId: string
  _id: string
}

interface CourseDetailBannerProps {
  singleCourseContainer: {
    _id: string;
    category: string;
    createdAt: string;
    description: string;
    duration: number;
    instructor: {
      _id: string;
      firstName: string;
      lastName: string;
      email: string;
      biography: string;
      courses: CourseType[];
    };
    level: string;
    price: number;
    ratings: any[];
    thumbnail: string;
    tittle: string;
    updatedAt: string;
    videos: any[];
    __v: number;
  };
}

interface Video {
  _id: string;
  duration: number;
  tittle: string;
  videoFilePath: string;
}

const CourseDetailBanner: React.FC<CourseDetailBannerProps> = ({ singleCourseContainer }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [email,setEmail] = useState("");
  const {enrollUser,isEnrolled } = useEnrollStore();

 const {authUser} = useAuthStore() as unknown as { authUser: { user: any } };
 const userEmail = authUser.user.email;
 const userID = authUser?.user._id;

  const openModal = (video: Video) => {
    setSelectedVideo(video);
  }

  const closeModal = () => {
    setSelectedVideo(null);
  }

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Course Header Section */}
      <div className="w-full py-12 px-4 sm:px-8 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center">
          {/* Course Thumbnail */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-1/3 aspect-video bg-white dark:bg-gray-800 p-2 rounded-xl shadow-xl overflow-hidden"
          >
            <img
              className="w-full h-full object-cover rounded-lg"
              src={singleCourseContainer.thumbnail}
              alt="Course Thumbnail"
            />
          </motion.div>

          {/* Course Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full md:w-2/3 space-y-4 text-white"
          >
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {singleCourseContainer.category}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                {singleCourseContainer.level}
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-bold">{singleCourseContainer.tittle}</h1>
            <p className="text-lg opacity-90">{singleCourseContainer.description}</p>
            
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>Instructor: {singleCourseContainer.instructor.firstName} {singleCourseContainer.instructor.lastName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{singleCourseContainer.duration} hours</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4">
              <div className="text-2xl font-bold">${singleCourseContainer.price}</div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white flex items-center justify-center text-purple-600 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
                
                onClick={()=>{ if(enrollUser){
                  enrollUser(userID,singleCourseContainer._id,{email:userEmail,amount:singleCourseContainer.price})
                }}}
              >
                {
                  isEnrolled ? <Loader className='animate-spin size-5 ' color='white'  /> : "Enroll Now"
                }
             
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      

      {/* Course Content Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-8">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
        >
          Course Curriculum
        </motion.h2>

        {/* Video Lessons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {singleCourseContainer.videos.map((video) => (
            <motion.div
              key={video._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div 
                className="relative aspect-video bg-gray-200 dark:bg-gray-700 cursor-pointer group"
                onClick={() => openModal(video)}
              >
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all">
                  <PlayCircle className="w-12 h-12 text-white/90 group-hover:text-white/100 transition-all" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration} sec
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{video.tittle}</h3>
                <button
                  onClick={() => openModal(video)}
                  className="mt-3 w-full py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all"
                >
                  Preview Lesson
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instructor Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8 flex flex-col md:flex-row gap-8 text-white">
            <div className="w-full md:w-1/4 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 mb-4 overflow-hidden">
                {/* Instructor image would go here */}
              </div>
              <h3 className="text-xl font-bold text-center">
                {singleCourseContainer.instructor.firstName} {singleCourseContainer.instructor.lastName}
              </h3>
            </div>
            <div className="w-full md:w-3/4">
              <h2 className="text-2xl font-bold mb-4">About the Instructor</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6">
                {singleCourseContainer.instructor.biography}
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/50 rounded-full">
                  <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-medium">{singleCourseContainer.instructor.courses.length} Courses</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/50 rounded-full">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span className="font-medium">500+ Students</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl"
          >
            <button
              className="absolute top-4 right-4 z-10 p-2 bg-gray-800/80 text-white rounded-full hover:bg-gray-700 transition-all"
              onClick={closeModal}
            >
              <X size={24} />
            </button>
            <div className="aspect-video bg-black">
              <video 
                controls 
                autoPlay 
                className="w-full h-full object-contain"
              >
                <source src={selectedVideo.videoFilePath} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedVideo.tittle}</h3>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CourseDetailBanner;