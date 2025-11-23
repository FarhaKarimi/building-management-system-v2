
import React from 'react';
import { 
  LayoutDashboard, 
  Wallet, 
  Wrench, 
  Users, 
  Vote, 
  MessageSquare, 
  Calendar,
  FileText,
  Car,
  Dumbbell,
  Menu,
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isOpen, toggleSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'داشبورد', icon: <LayoutDashboard size={20} /> },
    { id: 'finance', label: 'امور مالی', icon: <Wallet size={20} /> },
    { id: 'communication', label: 'ارتباطات و اعلانات', icon: <MessageSquare size={20} /> },
    { id: 'maintenance', label: 'تعمیرات و خرابی', icon: <Wrench size={20} /> },
    { id: 'residents', label: 'ساکنین', icon: <Users size={20} /> },
    { id: 'parking', label: 'مدیریت پارکینگ', icon: <Car size={20} /> },
    { id: 'facilities', label: 'امکانات رفاهی', icon: <Dumbbell size={20} /> },
    { id: 'voting', label: 'نظرسنجی', icon: <Vote size={20} /> },
    { id: 'meetings', label: 'جلسات ساختمان', icon: <Calendar size={20} /> },
    { id: 'documents', label: 'اسناد و فایل‌ها', icon: <FileText size={20} /> },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed md:static inset-y-0 right-0 z-30
        w-64 bg-slate-900 text-white transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
        flex flex-col h-full shadow-xl
      `}>
        <div className="p-6 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold">مدیر ساختمان</h1>
          </div>
          <button onClick={toggleSidebar} className="md:hidden text-slate-400 hover:text-white">
            <Menu size={24} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 768) toggleSidebar();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                    ${activeTab === item.id 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                  `}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            ))}
            
            {/* Settings Divider */}
            <li className="my-2 border-t border-slate-800"></li>
            
            <li>
                <button
                  onClick={() => {
                    setActiveTab('settings');
                    if (window.innerWidth < 768) toggleSidebar();
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                    ${activeTab === 'settings' 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                  `}
                >
                  <Settings size={20} />
                  <span className="font-medium">تنظیمات سیستم</span>
                </button>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-3 py-2">
            <img 
              src="https://picsum.photos/40/40" 
              alt="Profile" 
              className="w-10 h-10 rounded-full border-2 border-slate-600"
            />
            <div>
              <p className="text-sm font-semibold text-white">علی محمدی</p>
              <p className="text-xs text-slate-400">مدیر ساختمان</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
