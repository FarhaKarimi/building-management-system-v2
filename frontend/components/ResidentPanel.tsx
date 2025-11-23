
import React, { useState } from 'react';
import { Wallet, Wrench, Bell, LogOut, CreditCard, CheckCircle2, Settings, KeyRound } from 'lucide-react';
import Modal from './Modal';
import { Resident } from '../types';

interface ResidentPanelProps {
  user: Resident;
  onLogout: () => void;
  onChangePassword: (newPass: string) => void;
}

const ResidentPanel: React.FC<ResidentPanelProps> = ({ user, onLogout, onChangePassword }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'settings'>('home');
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  // Password Change State
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passMessage, setPassMessage] = useState({ text: '', type: '' });

  const handlePasswordSubmit = () => {
    if (oldPass !== user.password) {
      setPassMessage({ text: 'رمز عبور فعلی اشتباه است', type: 'error' });
      return;
    }
    if (newPass.length < 4) {
      setPassMessage({ text: 'رمز عبور باید حداقل ۴ رقم باشد', type: 'error' });
      return;
    }
    if (newPass !== confirmPass) {
       setPassMessage({ text: 'تکرار رمز عبور مطابقت ندارد', type: 'error' });
       return;
    }

    onChangePassword(newPass);
    setPassMessage({ text: 'رمز عبور با موفقیت تغییر کرد', type: 'success' });
    setOldPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="min-h-screen bg-gray-100 font-[Vazirmatn] pb-20 md:pb-0">
      {/* Header Mobile */}
      <div className="bg-blue-600 text-white p-6 rounded-b-[2.5rem] shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-white opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="relative z-10 flex justify-between items-start">
            <div>
                <h1 className="text-xl font-bold mb-1">سلام، {user.name} 👋</h1>
                <p className="text-blue-100 text-sm">واحد {user.unit} - {user.role}</p>
            </div>
            <div className="flex gap-2">
                <button onClick={() => setActiveTab(activeTab === 'home' ? 'settings' : 'home')} className="bg-blue-700 p-2 rounded-lg hover:bg-blue-800 transition-colors">
                    {activeTab === 'home' ? <Settings size={20} /> : <Wallet size={20} />}
                </button>
                <button onClick={onLogout} className="bg-blue-700 p-2 rounded-lg hover:bg-blue-800 transition-colors">
                    <LogOut size={20} />
                </button>
            </div>
        </div>
        
        {/* Debt Card - Only Show on Home */}
        {activeTab === 'home' && (
            <div className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl animate-in fade-in slide-in-from-bottom-4">
                <p className="text-blue-100 text-sm mb-1">مبلغ قابل پرداخت</p>
                <div className="flex justify-between items-center">
                    <span className="text-3xl font-bold">۴۵۰,۰۰۰ <span className="text-sm font-normal">تومان</span></span>
                    <button 
                        onClick={() => setIsPayModalOpen(true)}
                        className="bg-white text-blue-600 px-4 py-2 rounded-xl font-bold text-sm shadow-lg hover:bg-blue-50 transition-colors"
                    >
                        پرداخت آنی
                    </button>
                </div>
            </div>
        )}
      </div>

      <div className="p-4 max-w-md mx-auto space-y-6">
        
        {activeTab === 'home' ? (
          <>
            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
                <button 
                    className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors"
                >
                    <div className="p-3 bg-orange-100 text-orange-600 rounded-full">
                        <Wrench size={24} />
                    </div>
                    <span className="font-bold text-gray-700 text-sm">اعلام خرابی</span>
                </button>
                <button className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center gap-2 hover:bg-gray-50 transition-colors">
                    <div className="p-3 bg-green-100 text-green-600 rounded-full">
                        <CheckCircle2 size={24} />
                    </div>
                    <span className="font-bold text-gray-700 text-sm">شرکت در رای‌گیری</span>
                </button>
            </div>

            {/* Latest Announcements */}
            <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Bell size={18} className="text-blue-600" />
                    <span>آخرین اطلاعیه‌ها</span>
                </h3>
                <div className="space-y-3">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-yellow-400">
                        <div className="flex justify-between mb-1">
                            <span className="font-bold text-sm">قطعی آب</span>
                            <span className="text-xs text-gray-400">امروز</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">ساکنین محترم، آب ساختمان از ساعت ۹ تا ۱۱ قطع می‌باشد.</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border-l-4 border-blue-400">
                        <div className="flex justify-between mb-1">
                            <span className="font-bold text-sm">جلسه ساختمان</span>
                            <span className="text-xs text-gray-400">۲ روز پیش</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">جمعه ساعت ۱۸ در لابی منتظر حضور گرم شما هستیم.</p>
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div>
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <Wallet size={18} className="text-blue-600" />
                    <span>تراکنش‌های اخیر شما</span>
                </h3>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                        <span className="text-sm font-medium">شارژ خرداد ماه</span>
                        <span className="text-sm font-bold text-red-500">۴۵۰,۰۰۰ -</span>
                    </div>
                     <div className="p-4 flex justify-between items-center bg-gray-50">
                        <span className="text-sm font-medium">پرداخت آنلاین</span>
                        <span className="text-sm font-bold text-green-600">۶۵۰,۰۰۰ +</span>
                    </div>
                </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-in fade-in zoom-in duration-300">
            <div className="text-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                    <Settings size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-800">تنظیمات امنیتی</h2>
                <p className="text-sm text-gray-500">تغییر رمز عبور حساب کاربری</p>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">رمز عبور فعلی</label>
                    <input 
                        type="password" 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={oldPass}
                        onChange={(e) => setOldPass(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">رمز عبور جدید</label>
                    <input 
                        type="password" 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={newPass}
                        onChange={(e) => setNewPass(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">تکرار رمز عبور جدید</label>
                    <input 
                        type="password" 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                    />
                </div>

                {passMessage.text && (
                    <div className={`p-3 rounded-lg text-sm ${passMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                        {passMessage.text}
                    </div>
                )}

                <button 
                    onClick={handlePasswordSubmit}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 mt-2 flex items-center justify-center gap-2"
                >
                    <KeyRound size={18} />
                    <span>تغییر رمز عبور</span>
                </button>
            </div>
          </div>
        )}

      </div>

      {/* Pay Modal */}
      <Modal isOpen={isPayModalOpen} onClose={() => setIsPayModalOpen(false)} title="پرداخت آنلاین شارژ">
        <div className="space-y-6 text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600">
                <CreditCard size={40} />
            </div>
            <div>
                <p className="text-gray-500 text-sm mb-1">مبلغ قابل پرداخت</p>
                <p className="text-3xl font-bold text-gray-800">۴۵۰,۰۰۰ <span className="text-sm text-gray-500 font-normal">تومان</span></p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-right space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-500">بابت:</span>
                    <span className="font-medium">شارژ ماهانه + نظافت</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-500">مهلت پرداخت:</span>
                    <span className="font-medium text-red-500">۳ روز دیگر</span>
                </div>
            </div>
            <button onClick={() => {alert('اتصال به درگاه بانک...'); setIsPayModalOpen(false);}} className="w-full bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg shadow-green-200 transition-all">
                انتقال به درگاه پرداخت
            </button>
        </div>
      </Modal>

    </div>
  );
};

export default ResidentPanel;
