import { useCourseStore } from '../../../store/useCourseStore';
import { useState } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { useEffect } from 'react';
import { Edit, DeleteIcon, PlusCircle } from 'lucide-react';

const Courses = () => {
  const { isFetchingInstructorCourses, instructorCoursesContainer, getInstructorCourses, deleteACourse } = useCourseStore();
  const { authUser } = useAuthStore() as unknown as { authUser: { user: any } };
  const userId = authUser?.user._id;
  const [showModal, setShowModal] = useState(false);
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    getInstructorCourses(userId);
  }, []);

  const updateModal = (courseId: string) => {
    setShowModal(true);
    setId(courseId);
  }

  const finalDelete = () => {
    deleteACourse(id, userId);
    setShowModal(false);
  }

  return (
    <div className="w-full w- p-4 md:p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Your Courses</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-xl">
            Manage and organize your course offerings
          </p>
        </div>
        <button className="mt-4 md:mt-0 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <PlusCircle size={18} />
          Add New Course
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-blue-500">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Courses</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">
            {instructorCoursesContainer?.length || 0}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-green-500">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Active Students</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">142</p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border-l-4 border-purple-500">
          <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Earnings</h3>
          <p className="text-2xl font-bold text-gray-800 dark:text-white mt-2">$3,845</p>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Course Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {instructorCoursesContainer?.map((course) => (
                <tr key={course._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{course.tittle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 dark:text-gray-400">{course.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${course.level === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                        course.level === 'Intermediate' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'}`}>
                      {course.level}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    ${course.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-4">
                      <button className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300">
                        <Edit size={18} />
                      </button>
                      <button 
                        onClick={() => updateModal(course._id)} 
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                      >
                        <DeleteIcon size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {!isFetchingInstructorCourses && instructorCoursesContainer?.length === 0 && (
        <div className="mt-12 text-center">
          <div className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No courses yet</h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Get started by creating a new course.
          </p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <PlusCircle className="-ml-1 mr-2 h-5 w-5" />
              New Course
            </button>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isFetchingInstructorCourses && (
        <div className="mt-12 flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm Deletion</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Are you sure you want to delete this course? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={finalDelete}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none"
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;