import React, { useState } from 'react';
import { ShieldCheck, User, Building2, ArrowLeft, Lock, KeyRound, ArrowRight, Home } from 'lucide-react';
import { Resident } from '../types';

interface LoginProps {
  onManagerLogin: () => void;
  onResidentLogin: (resident: Resident) => void;
  residents: Resident[];
  adminPassword: string;
}

const Login: React.FC<LoginProps> = ({ onManagerLogin, onResidentLogin, residents, adminPassword }) => {
  const [step, setStep] = useState<'select' | 'admin_pass' | 'resident_auth'>('select');
  const [password, setPassword] = useState('');
  const [selectedResidentId, setSelectedResidentId] = useState<string>('');
  const [error, setError] = useState('');

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      onManagerLogin();
    } else {
      setError('رمز عبور اشتباه است.');
    }
  };

  const handleResidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resident = residents.find(r => r.id === selectedResidentId);
    if (resident) {
      if (resident.password === password) {
        onResidentLogin(resident);
      } else {
        setError('رمز عبور اشتباه است.');
      }
    } else {
      setError('لطفا واحد خود را انتخاب کنید.');
    }
  };

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center p-4 font-[Vazirmatn]">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl overflow-hidden flex flex-col md:flex-row min-h-[550px]">

          {/* Left Side - Hero */}
          <div className="md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden border-b md:border-b-0 md:border-l border-gray-200">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#3b82f6_2px,transparent_2px)] [background-size:25px_25px] opacity-10 animate-pulse"></div>
            <div className="w-28 h-28 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-blue-300 rotate-6 z-10 transition-transform hover:rotate-0 duration-500">
              <Building2 size={56} className="text-white" />
            </div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4 z-10">سامانه مدیریت ساختمان</h1>
            <p className="text-gray-500 leading-relaxed max-w-xs z-10">
              مدیریت هوشمند شارژ، تعمیرات، جلسات و ارتباطات داخلی ساختمان در یک نگاه.
            </p>
          </div>

          {/* Right Side - Interaction */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center transition-all duration-500">

            {step === 'select' && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">خوش آمدید 👋</h2>
                  <p className="text-center text-gray-500 mb-8 -mt-2">لطفاً نقش خود را انتخاب کنید</p>

                  <div className="space-y-4">
                    <button
                        onClick={() => { setStep('admin_pass'); setError(''); setPassword(''); }}
                        className="group w-full bg-white border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 p-4 rounded-2xl transition-all flex items-center gap-4 text-right relative overflow-hidden shadow hover:shadow-lg"
                    >
                      <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors z-10 animate-bounce">
                        <ShieldCheck size={24} />
                      </div>
                      <div className="flex-1 z-10">
                        <h3 className="font-bold text-gray-800 group-hover:text-blue-700">ورود مدیر ساختمان</h3>
                        <p className="text-xs text-gray-500 mt-1">دسترسی به پنل مدیریت</p>
                      </div>
                      <ArrowLeft size={20} className="text-gray-300 group-hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 z-10" />
                    </button>

                    <button
                        onClick={() => { setStep('resident_auth'); setError(''); setPassword(''); }}
                        className="group w-full bg-white border-2 border-gray-100 hover:border-green-500 hover:bg-green-50 p-4 rounded-2xl transition-all flex items-center gap-4 text-right relative overflow-hidden shadow hover:shadow-lg"
                    >
                      <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-colors z-10 animate-bounce">
                        <User size={24} />
                      </div>
                      <div className="flex-1 z-10">
                        <h3 className="font-bold text-gray-800 group-hover:text-green-700">ورود ساکنین</h3>
                        <p className="text-xs text-gray-500 mt-1">مشاهده وضعیت واحد</p>
                      </div>
                      <ArrowLeft size={20} className="text-gray-300 group-hover:text-green-500 opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 z-10" />
                    </button>
                  </div>
                </div>
            )}

            {step === 'admin_pass' && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <button
                      onClick={() => { setStep('select'); setError(''); }}
                      className="flex items-center gap-1 text-gray-400 hover:text-gray-600 mb-6 text-sm transition-colors"
                  >
                    <ArrowRight size={16} />
                    <span>بازگشت</span>
                  </button>

                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 animate-pulse">
                      <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">احراز هویت مدیر</h2>
                    <p className="text-sm text-gray-500 mt-2">رمز عبور مدیریتی را وارد کنید</p>
                  </div>

                  <form onSubmit={handleAdminSubmit} className="space-y-4">
                    <div className="relative">
                      <KeyRound size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                          type="password"
                          autoFocus
                          className={`w-full pr-12 pl-4 py-4 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-blue-500'}`}
                          placeholder="رمز عبور..."
                          value={password}
                          onChange={(e) => { setPassword(e.target.value); setError(''); }}
                      />
                    </div>

                    {error && <p className="text-red-500 text-xs font-medium animate-pulse">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                    >
                      <span>ورود به پنل</span>
                      <ArrowLeft size={20} />
                    </button>
                  </form>

                  <p className="text-center mt-6 text-xs text-gray-400">
                    رمز عبور پیش‌فرض: 1234
                  </p>
                </div>
            )}

            {step === 'resident_auth' && (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                  <button
                      onClick={() => { setStep('select'); setError(''); }}
                      className="flex items-center gap-1 text-gray-400 hover:text-gray-600 mb-6 text-sm transition-colors"
                  >
                    <ArrowRight size={16} />
                    <span>بازگشت</span>
                  </button>

                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600 animate-pulse">
                      <Home size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">ورود ساکنین</h2>
                    <p className="text-sm text-gray-500 mt-2">واحد خود را انتخاب کرده و رمز عبور را وارد کنید</p>
                  </div>

                  <form onSubmit={handleResidentSubmit} className="space-y-4">

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 mr-1">شماره واحد / نام ساکن</label>
                      <div className="relative">
                        <select
                            value={selectedResidentId}
                            onChange={(e) => setSelectedResidentId(e.target.value)}
                            className="w-full pr-4 pl-10 py-3 bg-gray-50 border-2 border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-500 transition-all appearance-none"
                        >
                          <option value="" disabled>انتخاب کنید...</option>
                          {residents.map(r => (
                              <option key={r.id} value={r.id}>واحد {r.unit} - {r.name}</option>
                          ))}
                        </select>
                        <Home size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-700 mr-1">رمز عبور</label>
                      <div className="relative">
                        <KeyRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="password"
                            className={`w-full pr-4 pl-12 py-3 bg-gray-50 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-100 transition-all ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-100 focus:border-green-500'}`}
                            placeholder="رمز عبور..."
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                        />
                      </div>
                    </div>

                    {error && <p className="text-red-500 text-xs font-medium animate-pulse">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-200 flex items-center justify-center gap-2 mt-2"
                    >
                      <span>ورود به حساب</span>
                      <ArrowLeft size={20} />
                    </button>
                  </form>

                  <p className="text-center mt-6 text-xs text-gray-400">
                    رمز عبور پیش‌فرض: 1234
                  </p>
                </div>
            )}

            <p className="text-center text-xs text-gray-300 mt-auto pt-8">
              نسخه آزمایشی ۱.۱.۰
            </p>
          </div>

        </div>
      </div>
  );
};

export default Login;
