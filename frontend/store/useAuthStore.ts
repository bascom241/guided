import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

interface AuthState {
    authUser: null | string
    isLoggingIn: boolean,
    isSigningUp: boolean,
    isCheckingAuth: boolean,
    isVerifyingEmail:boolean,
    checkAuth: () => Promise<void>,
    signIn: (formData: object) => Promise<void>,
    signUp: (formData: object) => Promise<void>,
    logout:()=> Promise<void>,
    result:boolean,
    editingProfile:boolean
    editProfile:(userId:string,formData:object ) => Promise<void>
    userProfileData:null | string 
    verifyEmail:(code:object)=>Promise<void>
}


export const useAuthStore = create<AuthState>((set) => ({
    authUser: null,
    isLoggingIn: false,
    isSigningUp: false,
    isCheckingAuth: true,
    result:false,
    editingProfile:false,
    userProfileData:null,
    isVerifyingEmail:false,
    checkAuth: async () => {
        try {
            set({isCheckingAuth:true})
            const response = await axiosInstance.get('/check-auth');
            set({ authUser: response.data });

        } catch (error) {
            console.log(error);
            set({ authUser: null })
            set({isCheckingAuth:false})
        }finally{
            set({isCheckingAuth:false})
        }
    },
    signUp: async (formData: object) => {
        set({ isSigningUp: true });
        try {
            const response = await axiosInstance.post('/signup', formData)
            set({ authUser: response.data})
            window.location.href="/verify-email";
            toast.success("Account created successfully");

        } catch (error) {
            set({ isSigningUp: false })
            if (error instanceof Error) {
                toast.error((error as any).response.data.message);
            } else {
                toast.error('An unknown error occurred');
            }
            console.log(error)
        } finally {
            set({ isSigningUp: false })
        }
    },

    verifyEmail:async(code:object)=> {
        set({isVerifyingEmail:true});
        try {
            console.log(code)
            const response = await axiosInstance.post('/verify-email',code);
            console.log(response.data);
            
            window.location.href="/";
            set({isVerifyingEmail:false});
            
        } catch (error) {
            if (error instanceof Error) {
                toast.error((error as any).response.data.message);
            }
        }
        finally{
            set({isVerifyingEmail:false})
        }

    },


    signIn: async (formData: object) => {
        set({ isLoggingIn: true })
        try {
            const response = await axiosInstance.post('/login', formData);
            set({ authUser: response.data })
            toast.success("Successfully logged in")
            set({result:true});

        } catch (err) {
            set({ isLoggingIn: false })
            if (err instanceof Error) {
                toast.error((err as any).response.data.message);
            } else {
                toast.error("Something went wrong")
            }
            set({result:false})
        } finally {
            set({ isLoggingIn: false })
        }
    },
    logout:async()=>{
        try{
             await axiosInstance.post("/logout");
                            
             set({authUser:null});
            toast.success("Logged out successfully");
        } catch (err) {
          
            if (err instanceof Error) {
                toast.error(err.message)
            } else {
                toast.error("Something went wrong")
            }
        } finally {
            set({ isLoggingIn: false })
        }
    },
    editProfile:async(userId:string, formData:object) => {
        set({editingProfile:true})
        try {
            const response = await axiosInstance.put(`/edit-profile/${userId}`,formData );
            set({editingProfile:false})
            set({userProfileData:response.data});
            toast.success(response.data.message);
        } catch (error) {
            set({editingProfile:false})
            if(error instanceof Error){
                toast.error(error.message);
            }else{
                toast.error("Unexpected Error Occured")
            }
        }
    }
}))
