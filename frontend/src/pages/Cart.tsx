import React, { useEffect } from "react";
import { useCourseStore } from "../../store/useCourseStore";
import { useAuthStore } from "../../store/useAuthStore";
import { Loader, Trash2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Cart = () => {
  const { authUser } = useAuthStore() as unknown as { authUser: { user: any } };
  const { getCarts, courseCarts, isFetchingCarts, isRemovingFromCart, removeFromCart } = useCourseStore();
  const navigate = useNavigate();
  const userID = authUser?.user._id;

  useEffect(() => {
    getCarts(userID);
  }, []);

  // Calculate total price of the cart
  let courseCartPrice = courseCarts.flatMap((c) => c.courses?.map((cd) => cd.price));
  const totalPrice = courseCartPrice?.reduce((sum, price) => sum + price, 0);

  // Navigate and pass the course data to the payment page
  const handleCheckout = () => {
    const cartSummary = courseCarts.flatMap((cart) =>
      cart.courses?.map((course) => ({
        id: course.courseId, 
        title: course.tittle,
        price: course.price,
        duration: course.duration,
        level: course.level,
        thumbnail: course.thumbnail,
      }))
    );

    navigate("/payment", { state: { cartSummary, totalPrice } });
  };

  if (isFetchingCarts)
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Loader className="animate-spin h-12 w-12 text-blue-600 dark:text-blue-400" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 text-center mb-8 sm:mb-12"
        >
          Your Shopping Cart
        </motion.h1>

        {courseCarts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center mt-20"
          >
            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center max-w-md">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Your cart is empty</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Looks like you haven't added any courses yet. Start exploring our catalog!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium"
                onClick={() => navigate('/all-courses')}
              >
                Browse Courses
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course List */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Your Selected Courses</h2>
              <div className="space-y-6">
                {courseCarts.map((cart) =>
                  cart.courses?.map((course) => (
                    <motion.div
                      key={course.courseId}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex flex-col sm:flex-row gap-4 p-4 border-b border-gray-200 dark:border-gray-700"
                    >
                      <img 
                        className="w-full sm:w-32 h-32 object-cover rounded-lg"
                        src={course.thumbnail} 
                        alt={course.tittle} 
                      />

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{course.tittle}</h3>
                          <div className="flex flex-wrap gap-2 my-2">
                            <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 rounded-full">
                              {course.level}
                            </span>
                            <span className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-200 rounded-full">
                              {course.duration} hours
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            ${course.price}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 text-red-600 hover:text-red-500 transition-colors"
                            onClick={() => removeFromCart(course.courseId, userID)}
                          >
                            {isRemovingFromCart ? (
                              <Loader className="animate-spin h-5 w-5" />
                            ) : (
                              <Trash2 size={20} />
                            )}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Checkout Summary */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg h-fit sticky top-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                  <span className="font-medium text-gray-900 dark:text-white">${totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Discount:</span>
                  <span className="font-medium text-green-600 dark:text-green-400">$0.00</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 flex justify-between">
                  <span className="text-lg font-semibold text-gray-900 dark:text-white">Total:</span>
                  <span className="text-xl font-bold text-blue-600 dark:text-blue-400">${totalPrice}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 hover:shadow-md transition-all"
                onClick={handleCheckout}
              >
                Proceed to Checkout
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;