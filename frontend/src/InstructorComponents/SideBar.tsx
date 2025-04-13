import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Home from './components/Home';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import Students from './components/Students';
import Settings from './components/Settings';
import { 
  Home as HomeIcon, 
  Settings as SettingsIcon, 
  Book, 
  User,

  PlusCircle,
  X // Add close icon
} from 'lucide-react';

const SideBar = ({ selectedComponent, setSelectedComponent, closeSidebar }: any) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  console.log(hoveredItem)
  const sideBarItems = [
    { name: 'Home', icon: <HomeIcon size={18} />, component: <Home /> },
    { name: 'Courses', icon: <Book size={18} />, component: <Courses /> },
    { name: 'Create Course', icon: <PlusCircle size={18} />, component: <CreateCourse /> },
    { name: 'Students', icon: <User size={18} />, component: <Students /> },
    { name: 'Settings', icon: <SettingsIcon size={18} />, component: <Settings /> },
  ];

  const handleItemClick = (component: React.ReactNode) => {
    setSelectedComponent(component);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      closeSidebar?.();
    }
  };

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl relative"
    >
      {/* Close button for mobile */}
      <button 
        onClick={closeSidebar}
        className="md:hidden absolute top-4 right-4 p-1 text-gray-400 hover:text-white"
      >
        <X size={20} />
      </button>

      <div className="p-6">
        {/* ... rest of your sidebar code ... */}
        
        <ul className="space-y-2">
          {sideBarItems.map((item, index) => {
            const isSelected = selectedComponent.type === item.component.type;
            
            return (
              <motion.li
                key={index}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredItem(index)}
                onHoverEnd={() => setHoveredItem(null)}
                onClick={() => handleItemClick(item.component)}
                className={`relative rounded-lg transition-all ${isSelected ? 'bg-blue-600/20' : 'hover:bg-gray-700/50'}`}
              >
                {/* ... rest of your list item code ... */}
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* ... rest of your sidebar code ... */}
    </motion.div>
  );
};

export default SideBar;