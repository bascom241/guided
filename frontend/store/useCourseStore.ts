import { create } from 'zustand';
import { axiosInstance } from '../lib/axios'
import axios from 'axios';
import toast from 'react-hot-toast';

type CategoryType = {
    [key: string]: any[]; // Adjust `any[]` to the correct type of your category data
  };

  
type CourseType = {
    courseId:string
    _id:string 
  }
interface Course {
    _id: string
    category: string;
    createdAt: string;
    description: string;
    duration: number;
    instructor: {
        _id: string;
        firstName: string;
        lastName: string;
        email: string;
        biography:string;
        courses:CourseType[];

    };
    level: string;
    price: number;
    ratings: any[];
    thumbnail: string;
    tittle: string;
    updatedAt: string;
    videos: any[];
    __v: number;
}

type cartCourses = {
    courseId:string
    tittle:string
    thumbnail:string
    price:number
    duration:number,
    level:string
    _id:string

}

interface Carts {
   userId:string
   courses: cartCourses []
}


interface CourseState {
    getCategories:()=> Promise<void>
    isFetchingData: boolean
    isFetchingSingleData: boolean
    getCourses: () => Promise<void>
    getCoursesBySearch: (params: { [key: string]: any }) => Promise<void>
    courseContainer: Course[]
    instructorCoursesContainer: Course[] | null
    singleCourseContainer: Course | null
    getCourse: (couseId: string | undefined) => Promise<void>
    creatingCourse: boolean
    createCourses: (formData: Course, userId: string) => Promise<void>
    isFetchingInstructorCourses: boolean
    categoriesContainer: CategoryType
    getInstructorCourses: (userId: string) => Promise<void>
    isDeletingACourse: boolean
    deleteACourse: (courseId: string | null, userId: string) => Promise<void>
    courseCarts: Carts[]
    isFetchingCarts: boolean
    getCarts: (userId: string) => Promise<void>
    addingToCart:boolean
    addToCart:(courseId:string, userId:string) => Promise<void>
    removeFromCart:(courseId:string, userId:string) => Promise<void>
    isRemovingFromCart:boolean

    
}


const getStoredCart = () =>{
    const storedCart = localStorage.getItem ("cart");
    return storedCart ? JSON.parse(storedCart) : [];
}
export const useCourseStore = create<CourseState>((set) => ({
    
    courseCarts: getStoredCart(),
    courseContainer:[],
    categoriesContainer: {
        'Project Writing': [],
        'Seminar Presentation': [],
        'Tech Courses After Graduation': [],
        'Vocational Skills (Coming Soon)': []
    },
    singleCourseContainer: null,
    isFetchingData: false,
    isFetchingSingleData: false,
    creatingCourse: false,
    instructorCoursesContainer: null,
    isFetchingInstructorCourses: false,
    isDeletingACourse: false,
    isFetchingCarts: false,
    addingToCart:false,
    isRemovingFromCart:false,
    createCourses: async (formData: Course, userId: string) => {
        set({creatingCourse:true})
        try {
            const response = await axiosInstance.post(`/course/upload-course/${userId}`, formData);
            set((state) => ({
                instructorCoursesContainer: state.instructorCoursesContainer ? [...state.instructorCoursesContainer, formData] : [formData]
            }))
            set({ creatingCourse: false});
            toast.success(response.data.message);
        } catch (err) {
            if (err instanceof Error) {
                console.log(err)
                toast.error((err as any).response.data.message);
            } else {
                toast.error("Something went wrong")
            }

        }finally{
            set({creatingCourse:false})
        }
    },
    getCourses: async () => {
        set({ isFetchingData: true })
        try {
            const response = await axiosInstance.get('/course/get-courses');
            console.log(response.data.data);
            set({ courseContainer: response.data.data })
            set({ isFetchingData: false })
        } catch (err) {
            console.log(err);
            set({ isFetchingData: false })
        }

    },

    getCoursesBySearch: async (params:{}) => {
        set({ isFetchingData: true })
        try {
            const response = await axiosInstance.get('/course/get-courses', {
                params
            });
            console.log(response.data.data);
            set({ courseContainer: response.data.data })
            set({ isFetchingData: false })
        } catch (err) {
            console.log(err);
            set({ isFetchingData: false })
        }

    },
    getInstructorCourses: async (userId: string) => {
        set({ isFetchingInstructorCourses: true });
        try {
            const response = await axiosInstance.get(`/course/get-instructor-courses/${userId}`)
            console.log(response.data);
            set({ instructorCoursesContainer: response.data.courses });
            set({ isFetchingInstructorCourses: false });
        } catch (error) {
            console.log(error);
            set({ isFetchingInstructorCourses: false })
        }
    },
    getCourse: async (couseId: string | undefined) => {
        set({ isFetchingSingleData: true })
        try {
            const response = await axiosInstance.get(`/course/get-single-course/${couseId}`);
            console.log(response);
            set({ singleCourseContainer: response.data.data });
            set({ isFetchingSingleData: false });
        } catch (error) {
            console.log(error);
            set({ isFetchingSingleData: false });
        }


    },

    deleteACourse: async (courseId: string | null, userId: string) => {
        try {
            const response = await axiosInstance.delete(`/course/delete-course/${courseId}/${userId}`);
            set({ isDeletingACourse: true });
            set((state) => ({
                instructorCoursesContainer: state.instructorCoursesContainer ? state.instructorCoursesContainer?.filter(c => c._id !== courseId) : null
            }))
            toast.success(response.data.message);
        } catch (err) {
            if (err instanceof Error) {
                console.log(err)
                toast.error((err as any).response.data.message);
            } else {
                toast.error("Something went wrong")
            }

        }

    },

    getCategories:async()=>{
        try{
            const response = await axiosInstance.get("/course/categories")
            set({ categoriesContainer: response.data.categories })
            console.log(response);
        }catch(err){

        }
    },

    //Cart Functionality Here

    getCarts: async (userId: string) => {
        set({ isFetchingCarts: true });
        try {
            const response = await axiosInstance.get(`/carts/${userId}`);
          
            set({ courseCarts: response.data.carts });
            set({isFetchingCarts:false})
        } catch (err) {
            if (err instanceof Error) {
                console.log(err)
                toast.error((err as any).response.data.message);
                set({isFetchingCarts:false})
            } else {
                toast.error("Something went wrong")
            }

        }
    },
    addToCart: async (courseId:string,userId:string) =>{
        set({addingToCart:true});
        try{
            const response = await axiosInstance.post(`/add-cart/${courseId}/${userId}`);
            set((state)=>{
                const updatedCart = [...state.courseCarts,response.data];
                localStorage.setItem("cart",JSON.stringify(updatedCart))
                return{
                    courseCarts:updatedCart
                }
            })
            set({addingToCart:false});
            toast.success(response.data.message);
        }catch(err){
            set({addingToCart:false})
            if(err instanceof Error){
                console.log(err);
                toast.error((err as any).response.data.message)
            }else{
                toast.error("Something went Wrong")
            }
          
        }
    },
    removeFromCart:async (courseId:string, userId:string) =>{
        set({isRemovingFromCart:true})
        try {
            const response = await axiosInstance.delete(`/remove-cart/${courseId}/${userId}`);
            set((state)=> {
                const updatedCart = state.courseCarts.map(cart => ({
                    ...cart,
                    courses: cart.courses.filter(course => course.courseId !== courseId)
                }));
                localStorage.setItem("cart", JSON.stringify(updatedCart));
                return {
                    courseCarts:updatedCart
                }
                
                
            })
            toast.success(response.data.message)
            set({isRemovingFromCart:false})
        } catch (error) {
            if(error instanceof Error){
                toast.error((error as any).response.data.message)
            }
            set({isRemovingFromCart:false})
        }
    }

}))