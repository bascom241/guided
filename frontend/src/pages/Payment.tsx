import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useEnrollStore } from '../../store/useEnrollStore';
import { useAuthStore } from "../../store/useAuthStore";
import { useSearchParams } from "react-router-dom";
const Payment = () => {
    const location = useLocation();
    const { cartSummary, totalPrice } = location.state || {}; // Safe fallback
    const { authUser } = useAuthStore() as unknown as { authUser: { user: any } };
    const userID = authUser?.user._id;
    const { enrollUser,verifyPayment } = useEnrollStore();
console.log(cartSummary)
    const [email, setEmail] = useState("");

    if (!cartSummary || !totalPrice) {
        return (
            <div className="h-screen flex items-center justify-center bg-black text-white">
                <div className="p-6 bg-gray-900 rounded-lg shadow-xl text-center">
                    <h2 className="text-3xl font-semibold mb-4">Oops </h2>
                    <p>No cart data available. Please add Your course to Cart.</p>
                </div>
            </div>
        );
    }

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Payment submitted:", { email, amount: totalPrice });

    };

    const [searchParams] = useSearchParams();

    useEffect(()=>{
    const reference = searchParams.get('reference');
      if (reference && verifyPayment) {
            verifyPayment(reference).then((res: any) => {
                if (res && res.message) {
                    window.location.href = "/payment-success" // Show success message
                } else {
                    console.error("Invalid response from verifyPayment");
                }
            });
        }
    
    },[searchParams, verifyPayment])
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-white p-6">
            {/* Course Summary Section */}
            <div className="w-full max-w-3xl bg-gray-900 p-6 rounded-lg shadow-lg mb-6">
                <h2 className="text-3xl font-bold text-center mb-6">🛍️ Order Summary</h2>
                <ul className="space-y-4">
                    {Array.isArray(cartSummary) && cartSummary.map((course: any, index: any) => (
                        <li key={index} className="flex justify-between items-center border-b border-gray-700 pb-3">
                            <div>
                                <p className="text-lg font-medium">{course.title}</p>
                                <p className="text-sm text-gray-400">⏳ Duration: {course.duration} hrs</p>
                                <p className="text-sm text-gray-400">📈 Level: {course.level}</p>
                            </div>
                            <p className="text-lg font-semibold text-green-400">#{course.price}</p>
                        </li>
                    ))}
                </ul>
                <div className="mt-6 flex justify-between text-xl font-semibold">
                    <p>Total Amount:</p>
                    <p className="text-green-400">#{totalPrice}</p>
                </div>
            </div>

            {/* Payment Form Section */}
            <div className="w-full max-w-3xl bg-gray-900 p-6 rounded-lg shadow-lg">
                <h3 className="text-3xl font-bold text-center mb-6">💳 Payment Details</h3>
                <form onSubmit={handlePayment} className="space-y-6">
                    <div>
                        <label className="block text-gray-300 font-semibold">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 bg-gray-800 text-white border border-gray-600 rounded-md focus:ring focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 font-semibold">Amount</label>
                        <input
                            type="text"
                            value={`#${totalPrice}`}
                            readOnly
                            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-md"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200"
                        onClick={() => {
                            if (enrollUser) {
                                const courseIds = cartSummary.map((course: any) => course.id);
                                console.log(courseIds) // Extract IDs properly
                                enrollUser(userID, courseIds, { email, amount: totalPrice });
                            } else {
                                console.error("enrollUser is undefined");
                            }
                        }}
                    >
                        Pay Now
                    </button>

                </form>
            </div>
        </div>
    );
};

export default Payment;
