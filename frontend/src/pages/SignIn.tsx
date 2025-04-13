import  { useState } from 'react';
import AuthImagePatternSignIn from '../components/skeletons/AuthImagePatternSign';
import { Eye, EyeOff, Loader, Lock, Mail, MessageSquare} from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';




type EventChange = {
    target:{
        name:string
        value:string
    }
}
const SignIn = () => {
    const {  isLoggingIn,signIn } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [formData,setFormData] = useState({email:"",password:""});
    const handleChange = (evt:EventChange) =>{
        const {name,value} = evt.target;
        setFormData((prev)=>({
            ...prev, [name]:value
        }))
    }

    

    const validateUser = () =>{
        if(!formData.email) return toast.error("Email is required");
        if(!formData.password) return toast.error("Password is required");
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid email format")
        return true;
    }


    const handleSubmit = (e:any) =>{
        e.preventDefault();
        const success = validateUser();
        if(success === true){
            signIn(formData);
          
        }
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2  bg-gray-100 min-h-screen">
            <div className="flex flex-col justify-center items-center p-10 sm:p-12">
                <div className="w-full max-w-md space-x-8 bg-white p-8 rounded-lg shadow-lg">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-primary" color='green' />
                            </div>
                            <h1 className="text-3xl font-semibold text-gray-800">Log In</h1>
                            <p className="text-gray-600">Sign up today and unlock endless learning opportunities!</p>
                        </div>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* User Name Field */}
               

                        {/* Email Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Enter your Email"
                                    className="input input-bordered w-full bg-white border border-gray-300 focus:ring-2 focus:ring-primary pl-10 py-3 rounded-md"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="********"
                                    className="input input-bordered w-full bg-white border border-gray-300 focus:ring-2 focus:ring-primary pl-10 py-3 rounded-md"
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5 text-gray-400" />
                                    ) : (
                                        <Eye className="w-5 h-5 text-gray-400" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className={`bg-[#9185de] w-full py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary ${isLoggingIn? "flex items-center justify-center" : ""}`}
                            disabled={ isLoggingIn}
                        >
                            { isLoggingIn? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" />
                                 
                                </>
                            ) : (
                                'Log In'
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-4">
                        <p className="text-gray-600">
                            Dont have an account?{' '}
                            <Link to="/signup" className="text-primary hover:text-primary-dark">
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Image */}
            <AuthImagePatternSignIn
                title="Welcome Back"
                subtitle="GuidED, Learn Anytime Anywhere AnyDay"
            />
        </div>
    );
};

export default SignIn;
