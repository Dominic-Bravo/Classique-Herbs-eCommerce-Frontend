import { useState } from "react";
import Navbar from "./layout/navbar";
import Sidebar from "./layout/sidebar"

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  return (
    
    <div className="flex flex-col h-screen">
      <Navbar 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-8">
           {/* Your Content Here */}
        </main>
      </div>
    </div>
  )
}