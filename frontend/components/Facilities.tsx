import React from 'react';
import { Dumbbell, Droplets, Users, CalendarCheck, Clock, Info } from 'lucide-react';

interface Facility {
  id: string;
  name: string;
  icon: React.ReactNode;
  status: 'open' | 'closed' | 'maintenance';
  capacity: number;
  nextAvailable: string;
  rules: string;
  image: string;
}

const facilities: Facility[] = [
  {
    id: 'pool',
    name: 'استخر و سونا',
    icon: <Droplets size={24} />,
    status: 'open',
    capacity: 15,
    nextAvailable: 'امروز ۱۶:۰۰',
    rules: 'استفاده از کلاه شنا الزامی است. کودکان زیر ۱۰ سال همراه والدین.',
    image: 'https://images.unsplash.com/photo-1576013551627-5cc20eccdd7c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'gym',
    name: 'باشگاه بدنسازی',
    icon: <Dumbbell size={24} />,
    status: 'open',
    capacity: 8,
    nextAvailable: 'هم‌اکنون',
    rules: 'لطفاً پس از استفاده وزنه‌ها را سر جای خود بگذارید.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'hall',
    name: 'سالن اجتماعات',
    icon: <Users size={24} />,
    status: 'closed',
    capacity: 50,
    nextAvailable: 'پنج‌شنبه ۱۸:۰۰',
    rules: 'رزرو برای مراسم حداقل یک هفته قبل انجام شود.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=400'
  }
];

const Facilities: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">امکانات رفاهی و مشاعات</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
          <CalendarCheck size={18} />
          <span>رزرو سانس</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility) => (
          <div key={facility.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all">
            <div className="h-48 relative">
                <img src={facility.image} alt={facility.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                    <div className="text-white">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            {facility.icon}
                            {facility.name}
                        </h3>
                    </div>
                </div>
                <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                        facility.status === 'open' ? 'bg-green-500 text-white' : 
                        facility.status === 'maintenance' ? 'bg-yellow-500 text-white' : 
                        'bg-red-500 text-white'
                    }`}>
                        {facility.status === 'open' ? 'باز' : facility.status === 'maintenance' ? 'در حال تعمیر' : 'بسته'}
                    </span>
                </div>
            </div>
            
            <div className="p-5 space-y-4">
                <div className="flex justify-between text-sm text-gray-600 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-2">
                        <Users size={16} className="text-blue-500" />
                        <span>ظرفیت: {facility.capacity} نفر</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-blue-500" />
                        <span>آزاد: {facility.nextAvailable}</span>
                    </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl flex gap-3 items-start">
                    <Info size={16} className="text-gray-400 min-w-[16px] mt-1" />
                    <p className="text-xs text-gray-600 leading-relaxed">{facility.rules}</p>
                </div>

                <button className="w-full py-2.5 rounded-xl bg-white border border-blue-200 text-blue-600 font-medium hover:bg-blue-50 transition-colors">
                    مشاهده برنامه هفتگی
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;