
import { HelpCircle, BookOpen, DollarSign } from "lucide-react";

const Reasons = () => {
    return (
        <div className="flex flex-col gap-8 items-center mt-10">
            <p className="text-center text-4xl font-bold mb-8">Why Become an Instructor?</p>
            <div className="flex flex-col md:flex-row justify-center gap-8">
                <div className="flex flex-col gap-4 items-center text-center px-4">
                    <HelpCircle className="w-10 h-10 text-blue-500" />
                    <p className="font-bold">Help Students</p>
                    <p>Guide students to achieve their goals and master new skills.</p>
                </div>
                <div className="flex flex-col gap-4 items-center text-center px-4">
                    <BookOpen className="w-10 h-10 text-green-500" />
                    <p className="font-bold">Teach Your Passion</p>
                    <p>Share what you love and inspire learners worldwide.</p>
                </div>
                <div className="flex flex-col gap-4 items-center text-center px-4">
                    <DollarSign className="w-10 h-10 text-yellow-500" />
                    <p className="font-bold">Earn Money</p>
                    <p>Get paid for every course you create while making an impact.</p>
                </div>
            </div>
        </div>
    );
};

export default Reasons;
