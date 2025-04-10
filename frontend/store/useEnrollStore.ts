import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { toast } from 'react-hot-toast'
interface EnrolledService {
    isEnrolled?: boolean

    enrollments?: [],
    failedCourses?: [],
    enrollUser?: (userId: string, courseId: string, payload: { email: string, amount: number }) => Promise<void>
    verifyPayment?:(reference:any) => Promise<void>
    getAllEnrollCourses?: (userId: string) => Promise<void>
    fetchingEnrollments:boolean
}

export const useEnrollStore = create<EnrolledService>((set) => ({
    isEnrolled: false,
    fetchingEnrollments:false,
    enrollUser: async (userId: string, courseId: string, { email, amount }: { email: string, amount: number }) => {
        set({ isEnrolled: true })
        try {
            const response = await axiosInstance.post(`/enroll/enroll-student/${userId}/${courseId}`, {
                email,
                amount

            });
            console.log(response.data);
            const { enrollments, failedCourses, authorizationUrls } = response.data;
            if (authorizationUrls.length > 0) {
                window.location.href = authorizationUrls[0].authorization_url;
            }
            set({ enrollments, failedCourses, isEnrolled: false });
            set({isEnrolled:false})
            console.log("enrollments", enrollments);
            console.log("failedCourses", failedCourses);
            // toast.success(response.data);
            // return response.data
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
            set({isEnrolled:false})
        }finally{
            set({isEnrolled:false})
        }
    },

    getAllEnrollCourses: async (userId: string) => {
        set({ fetchingEnrollments: true })
        try {
            const response = await axiosInstance.get(`/enroll/enrolled-courses/${userId}`)
            console.log("enrollment", response.data);
            set({ enrollments: response.data.courses, fetchingEnrollments: false })
            
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error('An unknown error occurred');
            }
            set({ fetchingEnrollments: false })
        }
    },
    verifyPayment: async (reference:any) =>{
        try {
            const response = await axiosInstance.get(`enroll/payment-success?reference=${reference}`)
            return response.data
        } catch (error) {
            console.error(error);
            return { message: "Payment verification failed" };
        }
    }
}))