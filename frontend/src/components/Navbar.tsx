import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Bell,  ChevronRight, LogOut, Edit, BookOpenText,  Menu, X,  } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../../store/useAuthStore';
import { useCourseStore } from '../../store/useCourseStore';

type NavbarProps = {
    authUser: { user: { email: string, firstName: string, lastName: string } } | null;
};

const Navbar = ({ authUser }: NavbarProps) => {
    const { logout } = useAuthStore();
    const { getCoursesBySearch, getCategories, categoriesContainer } = useCourseStore();
    const { getCourses } = useCourseStore();

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const [searchValue, setSearchValue] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        getCategories();
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsExploreOpen(false);
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Search functionality
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchValue) {
                getCoursesBySearch({ tittle: searchValue });
            } else {
                getCourses();
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchValue, getCoursesBySearch]);

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") getCoursesBySearch({ tittle: searchValue });
    };

    const handleCategoryClick = (category: string) => {
        navigate(`/all-courses?category=${encodeURIComponent(category)}`);
        setIsExploreOpen(false);
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between h-16">
                {/* Logo and Mobile Menu Button */}
                <div className="flex items-center">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="sm:hidden text-gray-400 hover:text-white focus:outline-none mr-4"
                    >
                        <Menu size={24} />
                    </button>

                    <Link to="/" className="flex-shrink-0">
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                            GuidEd
                        </h1>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden sm:flex items-center space-x-8">
                    {/* Explore Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsExploreOpen(!isExploreOpen)}
                            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center"
                        >
                            Explore
                            <ChevronRight className={`ml-1 h-4 w-4 transition-transform ${isExploreOpen ? 'rotate-90' : ''}`} />
                        </button>

                        <AnimatePresence>
                            {isExploreOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute left-0 mt-2 w-56 rounded-lg shadow-lg bg-gray-800 border border-gray-700 z-50"
                                >
                                    <div className="p-4">
                                        <h3 className="text-sm font-medium text-white border-b border-gray-700 pb-2 mb-2">
                                            Course Categories
                                        </h3>
                                        <div className="space-y-1">
                                            {Object.keys(categoriesContainer).map((category) => (
                                                <button
                                                    key={category}
                                                    onClick={() => handleCategoryClick(category)}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white rounded-md transition"
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <Link
                        to="/all-courses"
                        className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                        All Courses
                    </Link>

                    {location.pathname !== "/instructor" && (
                        <Link
                            to="/instructor"
                            className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        >
                            Become an Instructor
                        </Link>
                    )}
                </div>

                {/* Search Bar */}
                <div className="hidden sm:block mx-4 flex-1 max-w-md">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={handleSearch}
                        />
                    </div>
                </div>

                {/* Desktop Right Navigation */}

                {authUser ? (
                    <div className="hidden sm:flex items-center space-x-4">
                          <Link to="/my-learning" className="text-gray-400 hover:text-white p-2 rounded-full">
                            <BookOpenText className="h-5 w-5" />
                        </Link>
                        <button className="text-gray-400 hover:text-white p-2 rounded-full">
                            <Bell className="h-5 w-5" />
                        </button>
                        <Link to="/cart" className="text-gray-400 hover:text-white p-2 rounded-full">
                            <ShoppingCart className="h-5 w-5" />
                        </Link>

                       
                        <div className="relative ml-4" ref={dropdownRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="flex items-center text-sm rounded-full focus:outline-none"
                            >
                                <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                                    {authUser.user.firstName[0]}{authUser.user.lastName[0]}
                                </div>
                            </button>

                            <AnimatePresence>
                                {isProfileOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="origin-top-right absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-gray-800 border border-gray-700 z-50"
                                    >
                                        <div className="py-1">
                                            <div className="px-4 py-3 border-b border-gray-700">
                                                <p className="text-sm text-white">{authUser.user.firstName} {authUser.user.lastName}</p>
                                                <p className="text-xs text-gray-400 truncate">{authUser.user.email}</p>
                                            </div>
                                            <Link
                                                to="/edit-profile"
                                                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                            >
                                                <div className="flex items-center">
                                                    <Edit className="mr-2 h-4 w-4" />
                                                    Edit Profile
                                                </div>
                                            </Link>
                                            <button
                                                onClick={logout}
                                                className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                                            >
                                                <div className="flex items-center">
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    Sign out
                                                </div>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>


                    </div>) : (
                    <div className="flex space-x-3 ml-4">
                        <Link
                            to="/signin"
                            className="px-4 py-2 text-sm font-medium text-purple-400 hover:text-purple-300"
                        >
                            Log in
                        </Link>
                        <Link
                            to="/signup"
                            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md"
                        >
                            Sign up
                        </Link>
                    </div>
                )}

                {/* Mobile Search Button */}
                <button className="sm:hidden text-gray-400 hover:text-white p-2">
                    <Search className="h-5 w-5" />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -300 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -300 }}
                        transition={{ duration: 0.3 }}
                        className="sm:hidden fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 overflow-y-auto"
                    >
                        <div className="px-4 py-6">
                            <div className="flex items-center justify-between">
                                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                                    GuidEd
                                </h1>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-gray-400 hover:text-white"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="mt-8">
                                <div className="relative mb-4">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Search className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search courses..."
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                        onKeyDown={handleSearch}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <button
                                        onClick={() => setIsExploreOpen(!isExploreOpen)}
                                        className="w-full flex justify-between items-center px-4 py-3 text-left text-gray-300 hover:bg-gray-700 rounded-md"
                                    >
                                        <span>Explore</span>
                                        <ChevronRight className={`h-4 w-4 transition-transform ${isExploreOpen ? 'rotate-90' : ''}`} />
                                    </button>

                                    {isExploreOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="ml-4 space-y-1 overflow-hidden"
                                        >
                                            {Object.keys(categoriesContainer).map((category) => (
                                                <button
                                                    key={category}
                                                    onClick={() => handleCategoryClick(category)}
                                                    className="block w-full px-4 py-2 text-left text-sm text-gray-400 hover:bg-gray-700 hover:text-white rounded-md"
                                                >
                                                    {category}
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}

                                    <Link
                                        to="/all-courses"
                                        className="block px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-md"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        All Courses
                                    </Link>

                                    {location.pathname !== "/instructor" && (
                                        <Link
                                            to="/instructor"
                                            className="block px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-md"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Become an Instructor
                                        </Link>
                                    )}

                                    <Link
                                        to="/cart"
                                        className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-md"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                        My Cart
                                    </Link>
                                </div>

                                <div className="mt-8 pt-6 border-t border-gray-700">
                                    {authUser ? (
                                        <div className="space-y-2">
                                            <div className="flex items-center px-4 py-3">
                                                <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white mr-3">
                                                    {authUser.user.firstName[0]}{authUser.user.lastName[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{authUser.user.firstName} {authUser.user.lastName}</p>
                                                    <p className="text-xs text-gray-400">{authUser.user.email}</p>
                                                </div>
                                            </div>
                                            <Link
                                                to="/edit-profile"
                                                className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 rounded-md"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <Edit className="mr-2 h-5 w-5" />
                                                Edit Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="w-full flex items-center px-4 py-3 text-left text-gray-300 hover:bg-gray-700 rounded-md"
                                            >
                                                <LogOut className="mr-2 h-5 w-5" />
                                                Sign out
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            <Link
                                                to="/signin"
                                                className="block w-full px-4 py-2 text-center text-purple-400 hover:text-purple-300 border border-purple-400 rounded-md"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Log in
                                            </Link>
                                            <Link
                                                to="/signup"
                                                className="block w-full px-4 py-2 text-center text-white bg-purple-600 hover:bg-purple-700 rounded-md"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                Sign up
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;