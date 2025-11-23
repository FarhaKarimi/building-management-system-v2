import React from 'react';
import { Calendar, Clock, MapPin, Users, Plus } from 'lucide-react';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'past';
  attendees: number;
  agenda: string[];
}

const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'مجمع عمومی سالانه',
    date: '۱۴۰۳/۰۴/۱۵',
    time: '۱۸:۳۰',
    location: 'لابی ساختمان',
    status: 'upcoming',
    attendees: 18,
    agenda: ['بررسی بودجه سالانه', 'انتخاب مدیر جدید', 'مشکلات پارکینگ']
  },
  {
    id: '2',
    title: 'جلسه اضطراری موتورخانه',
    date: '۱۴۰۳/۰۳/۱۰',
    time: '۲۰:۰۰',
    location: 'پارکینگ منفی ۱',
    status: 'past',
    attendees: 12,
    agenda: ['تصمیم‌گیری برای تعویض دیگ بخار']
  }
];

const Meetings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">مدیریت جلسات و مجامع</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
          <Plus size={18} />
          <span>جلسه جدید</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mockMeetings.map((meeting) => (
          <div key={meeting.id} className={`bg-white rounded-2xl border p-6 transition-shadow hover:shadow-md ${meeting.status === 'upcoming' ? 'border-blue-100 shadow-sm' : 'border-gray-100 opacity-80'}`}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-1">{meeting.title}</h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${meeting.status === 'upcoming' ? 'bg-blue-50 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
                  {meeting.status === 'upcoming' ? 'پیش‌رو' : 'برگزار شده'}
                </span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl text-center min-w-[80px]">
                <span className="block text-sm text-gray-500">تیر</span>
                <span className="block text-2xl font-bold text-gray-900">{meeting.date.split('/')[2]}</span>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Clock size={16} />
                <span>ساعت: {meeting.time}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <MapPin size={16} />
                <span>مکان: {meeting.location}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600 text-sm">
                <Users size={16} />
                <span>شرکت‌کنندگان: {meeting.attendees} نفر</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-sm font-bold text-gray-700 mb-2">دستور جلسه:</p>
              <ul className="list-disc list-inside space-y-1">
                {meeting.agenda.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-600">{item}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
               {meeting.status === 'upcoming' ? (
                 <>
                   <button className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg hover:bg-blue-700 transition-colors">ارسال یادآوری</button>
                   <button className="flex-1 bg-white border border-gray-200 text-gray-600 text-sm py-2 rounded-lg hover:bg-gray-50 transition-colors">ویرایش</button>
                 </>
               ) : (
                 <button className="flex-1 bg-white border border-gray-200 text-gray-600 text-sm py-2 rounded-lg hover:bg-gray-50 transition-colors">مشاهده صورت‌جلسه</button>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meetings;