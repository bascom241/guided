import Home from '../InstructorComponents/components/Home';
import SideBar from '../InstructorComponents/SideBar';
import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';

const CourseSetup = () => {
  const [selectedComponent, setSelectedComponent] = useState(<Home />);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      }
    };

    handleResize(); // Check on initial render
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Mobile toggle button */}
      {isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white shadow-lg"
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar with dynamic width */}
      <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 transition-transform duration-300 ease-in-out 
          fixed h-screen z-40 w-64`}>
        <SideBar
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
          closeSidebar={() => setIsSidebarOpen(false)}
        />
      </div>

      {/* Main content with responsive margin */}
      <div className={`${isSidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'} 
          transition-all duration-300 ease-in-out w-full p-4`}>
        {selectedComponent}
      </div>
    </div>
  );
};

export default CourseSetup;