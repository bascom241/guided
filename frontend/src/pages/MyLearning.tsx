import  { useEffect, useState } from 'react';
import { useEnrollStore } from '../../store/useEnrollStore';
import { useAuthStore } from '../../store/useAuthStore';
import { PlayCircle, BookOpen, Clock, ChevronRight, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MyLearning = () => {
  const { getAllEnrollCourses, enrollments, fetchingEnrollments } = useEnrollStore();
  const { authUser } = useAuthStore() as unknown as { authUser: { user: any } };
  const userId = authUser?.user?._id;
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('courses');
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    if (getAllEnrollCourses && userId) {
      getAllEnrollCourses(userId)
        .then(() => {
          // No need to do anything here as Zustand will update the state
        })
        .catch(error => {
          console.error("Error fetching enrollments:", error);
        });
    }
  }, [getAllEnrollCourses, userId]);

  // Transform enrollments data when it changes
  useEffect(() => {
    if (enrollments && Array.isArray(enrollments)) {
      setCourses(enrollments);
    } else if (enrollments && typeof enrollments === 'object') {
      // Handle case where enrollments is an object instead of array
      setCourses(Object.values(enrollments));
    } else {
      setCourses([]);
    }
  }, [enrollments]);

  const openCourse = (course: any) => {
    setSelectedCourse(course);
    setSelectedVideo(null);
  };

  const openVideo = (video: any) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const backToCourses = () => {
    setSelectedCourse(null);
    setSelectedVideo(null);
  };

  if (fetchingEnrollments) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin h-12 w-12 text-blue-500" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Learning</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {selectedCourse ? selectedCourse.tittle : 'Your enrolled courses'}
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('courses')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'courses' ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
            >
              My Courses
            </button>
            <button
              onClick={() => setActiveTab('progress')}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'progress' ? 'border-blue-500 text-blue-600 dark:text-blue-400 dark:border-blue-400' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'}`}
            >
              Learning Progress
            </button>
          </nav>
        </div>

        {activeTab === 'courses' && (
          <>
            {selectedCourse ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                {/* Course Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <button
                      onClick={backToCourses}
                      className="mr-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <ChevronRight className="h-5 w-5 rotate-180" />
                    </button>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedCourse.tittle}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        {selectedCourse.videos?.length || 0} lessons • {selectedCourse.duration} hours
                      </p>
                    </div>
                  </div>
                </div>

                {/* Video List */}
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {selectedCourse.videos?.map((video: any, index: number) => (
                    <motion.div
                      key={video._id || index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer"
                      onClick={() => openVideo(video)}
                    >
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mr-4">
                          <PlayCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {index + 1}. {video.tittle}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {video.duration} seconds
                          </p>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300">
                            Watch
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses?.map((course: any) => (
                  <motion.div
                    key={course._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden cursor-pointer"
                    onClick={() => openCourse(course)}
                  >
                    <div className="aspect-video bg-gray-200 dark:bg-gray-700 relative">
                      <img
                        src={course.thumbnail}
                        alt={course.tittle}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <PlayCircle className="h-12 w-12 text-white/90" />
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                        {course.tittle}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
                        {course.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <BookOpen className="h-4 w-4 mr-1" />
                          <span>{course.videos?.length || 0} lessons</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{course.duration} hours</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'progress' && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Learning Progress</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Your progress tracking will appear here as you complete lessons.
            </p>
          </div>
        )}

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl">
              <button
                onClick={closeVideo}
                className="absolute -top-10 right-0 z-10 p-2 text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <video
                  controls
                  autoPlay
                  className="w-full h-full"
                  src={selectedVideo.videoFilePath}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedVideo.tittle}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {selectedCourse?.tittle}
                </p>
              </div>
            </div>
          </div>
        )}

        {courses.length === 0 && !fetchingEnrollments && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              You haven't enrolled in any courses yet
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Browse our courses to start learning today!
            </p>
            <div className="mt-6">
              <Link
                to="/courses"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Explore Courses
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default MyLearning;