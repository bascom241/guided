import  { FormEvent, useEffect } from 'react'
import { useState } from 'react'
import { useAuthStore } from '../../store/useAuthStore'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

type authProp = {
    authUser: { user: { _id: string, email: string, firstName: string, lastName: string, biography: string } } | null
}

interface ChangeEvent {
    target: {
        name: string,
        value: string
    }
}

const EditPage = ({ authUser }: authProp) => {
    const { editProfile, editingProfile } = useAuthStore()
    const userId = authUser?.user._id || '';

    // State variables for user Information //
    const [formData, setFormData] = useState({ firstName: "", lastName: "", biography: "" });

    useEffect(() => {
        if (authUser) {
            setFormData({
                firstName: authUser.user.firstName,
                lastName: authUser.user.lastName,
                biography: authUser.user.biography
            });
        }
    }, [authUser])

    const handleChange = (evt: ChangeEvent) => {
        const { name, value } = evt.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        editProfile(userId, formData);
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden"
            >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-center">
                    <h1 className="text-2xl font-bold text-white">Edit My Profile</h1>
                </div>

                <form className="p-6 space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            First Name
                        </label>
                        <input
                            id="firstName"
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={formData.firstName}
                            onChange={handleChange}
                            name="firstName"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            type="text"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={formData.lastName}
                            onChange={handleChange}
                            name="lastName"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="biography" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Biography
                        </label>
                        <textarea
                            id="biography"
                            rows={4}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            value={formData.biography}
                            onChange={handleChange}
                            name="biography"
                        />
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg shadow hover:shadow-md transition-all flex items-center justify-center gap-2"
                        disabled={editingProfile}
                    >
                        {editingProfile ? (
                            <>
                                <Loader2 className="animate-spin h-5 w-5" />
                                Updating...
                            </>
                        ) : (
                            'Update Profile'
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    )
}

export default EditPage