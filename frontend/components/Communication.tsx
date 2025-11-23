
import React, { useState } from 'react';
import { Megaphone, AlertTriangle, Info, BellRing, Plus } from 'lucide-react';
import Modal from './Modal';

interface Announcement {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'urgent';
  date: string;
  author: string;
}

const mockAnnouncements: Announcement[] = [
  {
    id: '1',
    title: 'قطعی موقت آب',
    content: 'به اطلاع ساکنین محترم می‌رساند به دلیل تعمیرات پمپ، آب ساختمان فردا از ساعت ۹ تا ۱۱ قطع می‌باشد.',
    type: 'warning',
    date: '۱۴۰۳/۰۴/۱۰',
    author: 'مدیر ساختمان'
  },
  {
    id: '2',
    title: 'نظافت راه‌پله‌ها',
    content: 'نظافت کلی مشاعات روز پنج‌شنبه انجام خواهد شد. لطفاً وسایل شخصی (کفش، گلدان) را از جلوی واحدها بردارید.',
    type: 'info',
    date: '۱۴۰۳/۰۴/۰۸',
    author: 'مدیر ساختمان'
  },
  {
    id: '3',
    title: 'نشت گاز در موتورخانه - برطرف شد',
    content: 'مشکل بوی گاز گزارش شده بررسی و برطرف گردید. خطری ساکنین را تهدید نمی‌کند.',
    type: 'urgent',
    date: '۱۴۰۳/۰۴/۰۱',
    author: 'تاسیسات'
  }
];

const Communication: React.FC = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAnnounce, setNewAnnounce] = useState<Partial<Announcement>>({
    type: 'info'
  });

  const handleAdd = () => {
    if (!newAnnounce.title || !newAnnounce.content) return;
    const item: Announcement = {
      id: Date.now().toString(),
      title: newAnnounce.title || '',
      content: newAnnounce.content || '',
      type: newAnnounce.type as any || 'info',
      date: new Date().toLocaleDateString('fa-IR'),
      author: 'مدیر ساختمان'
    };
    setAnnouncements([item, ...announcements]);
    setIsModalOpen(false);
    setNewAnnounce({ type: 'info' });
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'urgent': return 'bg-red-50 border-red-100 text-red-900';
      case 'warning': return 'bg-amber-50 border-amber-100 text-amber-900';
      default: return 'bg-blue-50 border-blue-100 text-blue-900';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'urgent': return <BellRing size={20} className="text-red-600" />;
      case 'warning': return <AlertTriangle size={20} className="text-amber-600" />;
      default: return <Info size={20} className="text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">تابلو اعلانات و ارتباطات</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          <Plus size={18} />
          <span>ثبت اطلاعیه جدید</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <button className="p-4 bg-white border border-gray-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-center group">
            <Megaphone className="mx-auto mb-2 text-gray-400 group-hover:text-blue-600" size={28} />
            <span className="block font-bold text-gray-700 group-hover:text-blue-700">کانال عمومی</span>
        </button>
        <button className="p-4 bg-white border border-gray-200 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all text-center group">
            <Info className="mx-auto mb-2 text-gray-400 group-hover:text-purple-600" size={28} />
            <span className="block font-bold text-gray-700 group-hover:text-purple-700">قوانین ساختمان</span>
        </button>
        <button className="p-4 bg-white border border-gray-200 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all text-center group">
            <AlertTriangle className="mx-auto mb-2 text-gray-400 group-hover:text-green-600" size={28} />
            <span className="block font-bold text-gray-700 group-hover:text-green-700">گزارش‌های فوری</span>
        </button>
      </div>

      <div className="space-y-4">
        {announcements.map((item) => (
          <div key={item.id} className={`p-6 rounded-2xl border ${getTypeStyles(item.type)}`}>
            <div className="flex items-start gap-4">
              <div className="mt-1 p-2 bg-white bg-opacity-60 rounded-lg">
                {getTypeIcon(item.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <span className="text-xs font-medium opacity-70">{item.date}</span>
                </div>
                <p className="text-sm leading-relaxed opacity-90 mb-3">
                  {item.content}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-black/5">
                  <span className="text-xs font-medium">ارسال شده توسط: {item.author}</span>
                  <button className="text-xs font-bold underline hover:no-underline">ارسال نظر</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="ثبت اطلاعیه جدید">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">عنوان اطلاعیه</label>
            <input 
              type="text" 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="مثلا: جلسه ساختمان"
              value={newAnnounce.title || ''}
              onChange={e => setNewAnnounce({...newAnnounce, title: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">متن اطلاعیه</label>
            <textarea 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-32 resize-none"
              placeholder="متن کامل را بنویسید..."
              value={newAnnounce.content || ''}
              onChange={e => setNewAnnounce({...newAnnounce, content: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">نوع پیام</label>
            <div className="grid grid-cols-3 gap-2">
                {['info', 'warning', 'urgent'].map((t) => (
                    <button
                        key={t}
                        onClick={() => setNewAnnounce({...newAnnounce, type: t as any})}
                        className={`py-2 rounded-lg text-sm font-medium border transition-all ${
                            newAnnounce.type === t 
                            ? 'bg-blue-50 border-blue-200 text-blue-700' 
                            : 'bg-gray-50 border-gray-200 text-gray-600'
                        }`}
                    >
                        {t === 'info' ? 'اطلاع‌رسانی' : t === 'warning' ? 'هشدار' : 'فوری'}
                    </button>
                ))}
            </div>
          </div>

          <button 
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 mt-4"
          >
            انتشار اطلاعیه
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Communication;
