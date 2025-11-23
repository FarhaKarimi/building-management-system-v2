
import React, { useState } from 'react';
import { Shield, KeyRound, CheckCircle2, Lock } from 'lucide-react';

interface SettingsProps {
  adminPassword: string;
  onPasswordChange: (newPass: string) => void;
}

const Settings: React.FC<SettingsProps> = ({ adminPassword, onPasswordChange }) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleSubmit = () => {
    if (oldPass !== adminPassword) {
      setMessage({ text: 'رمز عبور فعلی اشتباه است', type: 'error' });
      return;
    }
    if (newPass.length < 4) {
      setMessage({ text: 'رمز عبور باید حداقل ۴ رقم باشد', type: 'error' });
      return;
    }
    if (newPass !== confirmPass) {
       setMessage({ text: 'تکرار رمز عبور مطابقت ندارد', type: 'error' });
       return;
    }

    onPasswordChange(newPass);
    setMessage({ text: 'رمز عبور با موفقیت تغییر کرد', type: 'success' });
    setOldPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">تنظیمات سیستم</h2>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden max-w-2xl">
        <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center gap-3">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
                <Shield size={24} />
            </div>
            <div>
                <h3 className="font-bold text-gray-800">امنیت حساب مدیر</h3>
                <p className="text-sm text-gray-500">تغییر رمز عبور ورود به پنل مدیریت</p>
            </div>
        </div>

        <div className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="col-span-2">
                     <label className="block text-sm font-bold text-gray-700 mb-2">رمز عبور فعلی</label>
                    <div className="relative">
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="password" 
                            className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            value={oldPass}
                            onChange={(e) => setOldPass(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">رمز عبور جدید</label>
                    <div className="relative">
                        <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="password" 
                            className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">تکرار رمز جدید</label>
                    <div className="relative">
                        <KeyRound className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input 
                            type="password" 
                            className="w-full pr-10 pl-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                            value={confirmPass}
                            onChange={(e) => setConfirmPass(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {message.text && (
                <div className={`flex items-center gap-2 p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                    {message.type === 'success' ? <CheckCircle2 size={18} /> : <Shield size={18} />}
                    {message.text}
                </div>
            )}

            <div className="flex justify-end pt-4 border-t border-gray-50">
                <button 
                    onClick={handleSubmit}
                    className="bg-gray-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg shadow-gray-200 flex items-center gap-2"
                >
                    <span>ذخیره تغییرات</span>
                    <CheckCircle2 size={18} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
