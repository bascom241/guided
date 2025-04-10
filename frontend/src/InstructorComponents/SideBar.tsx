import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  CheckCircle,
  ChevronRight,
  PlusCircle
} from 'lucide-react';

const SideBar = ({ selectedComponent, setSelectedComponent }) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  const sideBarItems = [
    { name: 'Home', icon: <HomeIcon size={18} />, component: <Home /> },
    { name: 'Courses', icon: <Book size={18} />, component: <Courses /> },
    { name: 'Create Course', icon: <PlusCircle size={18} />, component: <CreateCourse /> },
    { name: 'Students', icon: <User size={18} />, component: <Students /> },
    { name: 'Settings', icon: <SettingsIcon size={18} />, component: <Settings /> },
  ];

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl"
    >
      <div className="p-6">
        <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
          <span className="bg-blue-600 p-2 rounded-lg">
            <HomeIcon size={20} />
          </span>
          Instructor Dashboard
        </h2>
        
        <ul className="space-y-2">
          {sideBarItems.map((item, index) => {
            const isSelected = selectedComponent.type === item.component.type;
            
            return (
              <motion.li
                key={index}
                whileHover={{ scale: 1.02 }}
                onHoverStart={() => setHoveredItem(index)}
                onHoverEnd={() => setHoveredItem(null)}
                onClick={() => setSelectedComponent(item.component)}
                className={`relative rounded-lg transition-all ${isSelected ? 'bg-blue-600/20' : 'hover:bg-gray-700/50'}`}
              >
                <AnimatePresence>
                  {isSelected && (
                    <motion.div 
                      layoutId="sidebar-highlight"
                      className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r-lg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </AnimatePresence>

                <div className={`flex items-center justify-between p-3 pl-4 ${isSelected ? 'text-blue-400' : 'text-gray-300'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-1.5 rounded-md ${isSelected ? 'bg-blue-600/30' : 'bg-gray-700/30'}`}>
                      {React.cloneElement(item.icon, {
                        className: isSelected ? 'text-blue-400' : 'text-gray-400'
                      })}
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </div>
                  
                  <AnimatePresence>
                    {hoveredItem === index && !isSelected && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                      >
                        <ChevronRight size={16} className="text-gray-400" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* User profile at bottom */}
      <motion.div 
        whileHover={{ backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
        className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 flex items-center gap-3 cursor-pointer"
      >
        <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
          <User size={18} className="text-gray-400" />
        </div>
        <div>
          <p className="text-white font-medium">Instructor</p>
          <p className="text-xs text-gray-400">Admin</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SideBar;