import  { useState } from 'react';
import AuthImagePattern from '../components/skeletons/AuthImagePattern';
import { Eye, EyeOff, Loader, Lock, Mail, MessageSquare, User } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';



interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string
}

interface ChangeEvent {
    target: {
        name: string;
        value: string;
    };
}

const SignUp = () => {
    const { isSigningUp,signUp, } = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [formData,setFormData] = useState({firstName:"",lastName:"",email:"",password:"",confirmPassword:""});




    const validateUser = () => {
        if(!formData.firstName) return toast.error("firstName is required");
        if(!formData.lastName) return toast.error("lastName is required");
        if(!formData.email) return toast.error("Email is required");
        if(!formData.password) return toast.error("Password is required");
        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("Invalid email format")
        if(formData.password.length < 5 ) return toast.error("Password must be at least 6 characters");
        if(formData.password !== formData.confirmPassword) return toast.error("Passwords Do not Match ");
        return true;
      }

      
    const handleChange = (evt: ChangeEvent) => {
        const { name, value } = evt.target;
        setFormData((prev: FormData) => ({
            ...prev,
            [name]: value,
        }));
       
    };


    const handleSubmit = (e:any) =>{
        e.preventDefault();

        const success = validateUser();

        if(success === true){
            signUp(formData);
        }
    }
    return (
        <div className="grid grid-cols-1 md:grid-cols-2  bg-gray-100 min-h-screen">
            <div className="flex flex-col justify-center items-center p-10 sm:p-12">
                <div className="w-full max-w-md space-x-8 bg-white p-8 rounded-lg shadow-lg">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                <MessageSquare className="w-6 h-6 text-primary"  color='purple'/>
                            </div>
                            <h1 className="text-3xl font-semibold text-gray-800">Sign Up</h1>
                            <p className="text-gray-600">Sign up today and unlock endless learning opportunities!</p>
                        </div>
                    </div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* User Name Field */}
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">First Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <User className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter your First name"
                                    className="input input-bordered w-full bg-white border border-gray-300 focus:ring-2 focus:ring-primary pl-10 py-3 rounded-md "
                                    name='firstName'
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">Last Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <User className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter your Last name"
                                    className="input input-bordered w-full bg-white border border-gray-300 focus:ring-2 focus:ring-primary pl-10 py-3 rounded-md "
                                    name='lastName'
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

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
                                    name='email'
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

                        
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text font-medium text-gray-700">Confirm Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Lock className="w-5 h-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="********"
                                    className="input input-bordered w-full bg-white border border-gray-300 focus:ring-2 focus:ring-primary pl-10 py-3 rounded-md"
                                    name='confirmPassword'
                                    value={formData.confirmPassword}
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
                            className={`bg-[#9185de] w-full py-3 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary ${isSigningUp? "flex items-center justify-center" : ""}`}
                            disabled={isSigningUp}
                        >
                            {isSigningUp ? (
                                <>
                                    <Loader className="w-5 h-5 animate-spin" />
                                   
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-4">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link to="/signin" className="text-primary hover:text-primary-dark">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Image */}
            <AuthImagePattern
                tittle="Join Our Community"
                subtittle="GuidED, Learn Anytime Anywhere AnyDay"
            />
        </div>
    );
};

export default SignUp;
