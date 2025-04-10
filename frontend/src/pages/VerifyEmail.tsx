import React, { HtmlHTMLAttributes, useState } from 'react'
import { MessageCircleReplyIcon } from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import toast from 'react-hot-toast'
import {Loader} from 'lucide-react'

// Interface for the event handler //
interface HandleChangeEvent {
    target: {
        value: string;
    };

};
const VerifyEmail = () => {

    // Extracting the authUser From Zustand store 
    const { authUser, verifyEmail, isVerifyingEmail } = useAuthStore() as { authUser: { user: { _id: string, email: string, firstName: string, lastName: string, biography: string } } | null, verifyEmail: (code: object) => Promise<void>, isVerifyingEmail: boolean }

    // useState for the Otp Input
    // Defaulting the input to take 4 Values
    const [otp, setOtp] = useState(new Array(6).fill(""));



    // Function to handle Change in the Otp Input// 
    function handleChange(e: HandleChangeEvent, index: number) {

        // Check if the value of the input is not a number
        // if (isNaN(e.target.value)) return false;

        // JavaScript Expression to make sure the value is between 0-9
        if (!/^\d$/.test(e.target.value)) return;

        // Setting the Value of the new array to the current value id index Matches
        setOtp([...otp.map((data, idx) => (idx === index ? e.target.value : data))])

        // Focus on the nextSibling the input has a value //
        // Type Casting the HTMLINPUT because nextSbling does not exist on target.value//
        const target = e.target as HTMLInputElement;
        if (target.value && target.nextElementSibling) {
            (target.nextElementSibling as HTMLInputElement).focus();
        }
    }
    function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
        e.preventDefault(); // Prevent default paste behavior

        // Extract the pasted value
        const pasteValue = e.clipboardData.getData("text").trim(); // Remove any extra spaces

        // Check if the entire string contains only numbers
        if (!/^\d+$/.test(pasteValue)) return;

        // Extracting the first four digits from the pasted value
        const updatedOtp = pasteValue.split("").slice(0, 4);

        // Fill the OTP state
        setOtp(updatedOtp.concat(new Array(4 - updatedOtp.length).fill("")));

        // Move focus to the last filled input field
        setTimeout(() => {
            const otpInputs = document.querySelectorAll<HTMLInputElement>("input[type='text']");
            otpInputs[Math.min(updatedOtp.length, 3)]?.focus(); // Focus last filled box
        }, 10);
    }

  

    // Function to delete an input from BackSpace Event
    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>, index: number) {
        if (e.key === "Backspace") {
            setOtp((prevOtp) => {
                const newOtp = [...prevOtp];

                newOtp[index] = "";

                if (index > 0) {
                    setTimeout(() => {
                        const prevInput = document.querySelectorAll<HTMLInputElement>("input[type ='text']")[index - 1];
                        prevInput?.focus();
                    }, 10)

                }
                return newOtp;
            })
        }

    }



    function handleSubmitVerification (){
        const token = otp.join("");
        if(token.length !== 6 ) return toast.error("Token must be 6 numbers");
        verifyEmail({code:token})
    }


    // Saving the userEmail to the userEmail
    const userEmail = authUser?.user.email;
    return (
        <main className='flex h-screen w-full items-center justify-center bg-zinc-400'>
            <div className='bg-white py-8 px-12 rounded-lg shadow-lg'>
                <div className='flex items-center justify-center'>
                    <MessageCircleReplyIcon className='text-5xl text-zinc-500' />
                </div>


                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-2xl text-center mt-4 font-bold text-zinc-500 '>
                        Please Check Your Email
                    </h1>
                    <p className='text-center mt-2 text-zinc-500  '>
                        We have sent a code <span className=' text-black font-semibold'>{userEmail}</span>
                    </p>
                </div>

                <div className='flex gap-4 items-center justify-center mt-4'>
                    {
                        otp.map((data, i) => {
                            return <input
                                className='border-[1px] border-black w-12 h-12 text-center text-2xl font-semibold rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-40 cursor-pointer focus:cursor-text'
                                key={i}
                                type='text'
                                value={data}
                                onChange={(e) => handleChange(e, i)}
                                onPaste={handlePaste}
                                maxLength={1} // i dont really need this just for safety
                                onKeyDown={(e) => handleKeyDown(e, i)}
                            />
                        })
                    }
                </div>

                <div className='w-full flex flex-col items-center justify-center mt-4'>
                <button className='bg-blue-500 w-full p-3 rounded-md text-white flex items-center justify-center hover:bg-gray-400 hover:text-black transition duration-300' onClick={handleSubmitVerification }>
                        {isVerifyingEmail ? <Loader className='animate-spin size-5 ' color='white'  /> : "Verify Email"}
                        
                    </button>
                    <p className='text-gray-400 mt-4'>Didnt recieve an Email? <span className='text-black cursor-pointer'>Resend Code</span></p>
                </div>
            </div>
        </main>
    )
}

export default VerifyEmail
