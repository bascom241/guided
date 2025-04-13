
import { CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
const PaymentSuccess = () => {
    return (

        <main className='h-screen flex items-center flex-col gap-10 justify-center'>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className='bg-green-900 text-white w-[32rem] h-48 rounded-md flex flex-col items-center p-10 gap-5'>
                <motion.p className='text-[1.2rem]'>Thank You for Your Purchase</motion.p>
                <CheckCircle className='w-48' />
            </motion.div>
            <div className='bg-white text-black hover:bg-green-400 transition duration-300 p-3 rounded-md border-2 border-green-900 '>
                <Link to="/">Go Back Home</Link>
            </div>

        </main>
    )
}

export default PaymentSuccess
