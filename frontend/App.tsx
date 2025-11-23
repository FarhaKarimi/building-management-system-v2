
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Finance from './components/Finance';
import Maintenance from './components/Maintenance';
import Voting from './components/Voting';
import Residents from './components/Residents';
import Communication from './components/Communication';
import Meetings from './components/Meetings';
import Documents from './components/Documents';
import Parking from './components/Parking';
import Facilities from './components/Facilities';
import Login from './components/Login';
import ResidentPanel from './components/ResidentPanel';
import Settings from './components/Settings';
import { Bell, Menu, Search, LogOut } from 'lucide-react';
import { Resident, UserRole } from './types';

// Initial Mock Data
const initialResidents: Resident[] = [
  { id: '1', unit: '1', name: 'احمد رضایی', role: UserRole.OWNER, phone: '09121111111', plateNumber: '۱۲ب۳۴۵ - ایران ۴۴', moveInDate: '1400/01/01', password: '1234' },
  { id: '2', unit: '2', name: 'سارا مولایی', role: UserRole.TENANT, phone: '09122222222', plateNumber: 'بدون خودرو', moveInDate: '1402/05/15', password: '1234' },
  { id: '3', unit: '3', name: 'حسن کاظمی', role: UserRole.OWNER, phone: '09123333333', plateNumber: '۵۵ج۹۹۹ - ایران ۲۲', moveInDate: '1399/11/20', password: '1234' },
  { id: '4', unit: '4', name: 'علی اکبری', role: UserRole.OWNER, phone: '09125555555', plateNumber: '۱۱م۱۱۱ - ایران ۳۳', moveInDate: '1401/10/10', password: '1234' },
  { id: '5', unit: 'لابی', name: 'محمد جوادی', role: UserRole.STAFF, phone: '09124444444', moveInDate: '1401/02/02', password: '1234' },
];

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<'manager' | 'resident' | null>(null);
  const [currentUser, setCurrentUser] = useState<Resident | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Global State for Data
  const [residents, setResidents] = useState<Resident[]>(initialResidents);
  const [adminPassword, setAdminPassword] = useState('1234');

  const handleManagerLogin = () => {
    setUserRole('manager');
    setCurrentUser(null);
  };

  const handleResidentLogin = (resident: Resident) => {
    setUserRole('resident');
    setCurrentUser(resident);
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  // Resident Management Logic (CRUD)
  const handleAddResident = (newResident: Resident) => {
    setResidents([...residents, newResident]);
  };

  const handleEditResident = (updatedResident: Resident) => {
    setResidents(residents.map(r => r.id === updatedResident.id ? updatedResident : r));
    // If the currently logged-in user is being edited, update their session state too
    if (currentUser && currentUser.id === updatedResident.id) {
      setCurrentUser(updatedResident);
    }
  };

  const handleDeleteResident = (id: string) => {
    if (confirm('آیا از حذف این ساکن مطمئن هستید؟')) {
      setResidents(residents.filter(r => r.id !== id));
    }
  };

  // Password Management Logic (Specific for Resident Panel)
  const handleResidentPasswordChange = (newPass: string) => {
    if (currentUser) {
      const updatedResident = { ...currentUser, password: newPass };
      handleEditResident(updatedResident);
    }
  };

  const handleAdminPasswordChange = (newPass: string) => {
    setAdminPassword(newPass);
  };

  // If user is not logged in, show Login Screen
  if (!userRole) {
    return (
      <Login 
        residents={residents}
        adminPassword={adminPassword}
        onManagerLogin={handleManagerLogin}
        onResidentLogin={handleResidentLogin}
      />
    );
  }

  // If user is a Resident, show Resident Panel (No Sidebar)
  if (userRole === 'resident' && currentUser) {
    return (
      <ResidentPanel 
        user={currentUser} 
        onLogout={handleLogout} 
        onChangePassword={handleResidentPasswordChange}
      />
    );
  }

  // --- MANAGER VIEW LOGIC ---

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'finance': return <Finance />;
      case 'maintenance': return <Maintenance />;
      case 'voting': return <Voting />;
      case 'residents': return (
        <Residents 
          residents={residents} 
          onAdd={handleAddResident}
          onEdit={handleEditResident}
          onDelete={handleDeleteResident}
        />
      );
      case 'communication': return <Communication />;
      case 'meetings': return <Meetings />;
      case 'documents': return <Documents />;
      case 'parking': return <Parking />;
      case 'facilities': return <Facilities />;
      case 'settings': return <Settings adminPassword={adminPassword} onPasswordChange={handleAdminPasswordChange} />;
      default: return <div className="p-10 text-center text-gray-500">این بخش به زودی فعال می‌شود.</div>;
    }
  };

  const getTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'داشبورد مدیریتی';
      case 'finance': return 'امور مالی و حسابداری';
      case 'communication': return 'ارتباطات داخلی';
      case 'maintenance': return 'تعمیرات و خرابی';
      case 'residents': return 'مدیریت ساکنین';
      case 'meetings': return 'جلسات ساختمان';
      case 'documents': return 'اسناد و فایل‌ها';
      case 'parking': return 'مدیریت پارکینگ';
      case 'facilities': return 'امکانات رفاهی و مشاعات';
      case 'voting': return 'نظرسنجی و رای‌گیری';
      case 'settings': return 'تنظیمات سیستم';
      default: return 'پنل مدیریت';
    }
  }

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-50 font-[Vazirmatn]">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
             <button onClick={() => setIsSidebarOpen(true)} className="md:hidden text-gray-600">
                <Menu size={24} />
             </button>
             <h2 className="text-lg font-bold text-gray-800 hidden md:block">
                {getTitle()}
             </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
                <input 
                    type="text" 
                    placeholder="جستجو در سامانه..." 
                    className="w-64 bg-gray-100 rounded-xl px-4 py-2 pr-10 text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                />
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            
            <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            <div className="h-8 w-px bg-gray-200 mx-2 hidden md:block"></div>
            
            <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors text-sm font-medium"
            >
                <span className="hidden md:inline">خروج</span>
                <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
