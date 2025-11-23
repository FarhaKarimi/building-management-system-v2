
import React, { useState } from 'react';
import { MaintenanceTicket, TicketStatus } from '../types';
import { AlertTriangle, CheckCircle, Clock, Plus } from 'lucide-react';
import Modal from './Modal';

const mockTickets: MaintenanceTicket[] = [
  { id: '1', title: 'خرابی لامپ پارکینگ', description: 'لامپ ردیف ۳ سوخته است', reporter: 'واحد ۲', date: '1403/04/10', status: TicketStatus.OPEN, priority: 'low' },
  { id: '2', title: 'نشتی لوله موتورخانه', description: 'آب از لوله اصلی چکه میکند', reporter: 'نگهبان', date: '1403/04/09', status: TicketStatus.IN_PROGRESS, priority: 'high' },
  { id: '3', title: 'تنظیم جک درب ورودی', description: 'درب با سرعت زیاد بسته میشود', reporter: 'واحد ۵', date: '1403/04/01', status: TicketStatus.DONE, priority: 'medium' },
];

const Maintenance: React.FC = () => {
  const [tickets, setTickets] = useState<MaintenanceTicket[]>(mockTickets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTicket, setNewTicket] = useState<Partial<MaintenanceTicket>>({
    priority: 'medium',
    status: TicketStatus.OPEN
  });

  const handleAdd = () => {
    if (!newTicket.title || !newTicket.description) return;
    const ticket: MaintenanceTicket = {
      id: Date.now().toString(),
      title: newTicket.title || '',
      description: newTicket.description || '',
      reporter: newTicket.reporter || 'مدیر',
      date: new Date().toLocaleDateString('fa-IR'),
      status: TicketStatus.OPEN,
      priority: newTicket.priority as 'low' | 'medium' | 'high'
    };
    setTickets([ticket, ...tickets]);
    setIsModalOpen(false);
    setNewTicket({ priority: 'medium', status: TicketStatus.OPEN });
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case TicketStatus.OPEN: return 'bg-red-100 text-red-600';
      case TicketStatus.IN_PROGRESS: return 'bg-yellow-100 text-yellow-600';
      case TicketStatus.DONE: return 'bg-green-100 text-green-600';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch(priority) {
        case 'high': return <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-xs border border-red-100">فوری</span>
        case 'medium': return <span className="bg-orange-50 text-orange-600 px-2 py-0.5 rounded text-xs border border-orange-100">متوسط</span>
        default: return <span className="bg-slate-50 text-slate-600 px-2 py-0.5 rounded text-xs border border-slate-100">عادی</span>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">مدیریت خرابی و تعمیرات</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
            <Plus size={18} />
            <span>گزارش خرابی جدید</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-red-50 text-red-500 rounded-lg">
                <AlertTriangle size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500">مشکلات باز</p>
                <p className="text-xl font-bold text-gray-800">{tickets.filter(t => t.status === TicketStatus.OPEN).length}</p>
            </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-yellow-50 text-yellow-500 rounded-lg">
                <Clock size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500">در حال انجام</p>
                <p className="text-xl font-bold text-gray-800">{tickets.filter(t => t.status === TicketStatus.IN_PROGRESS).length}</p>
            </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-green-50 text-green-500 rounded-lg">
                <CheckCircle size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500">تکمیل شده (ماه جاری)</p>
                <p className="text-xl font-bold text-gray-800">{tickets.filter(t => t.status === TicketStatus.DONE).length}</p>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tickets.map((ticket) => (
            <div key={ticket.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all group">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-start gap-3">
                        <div className={`mt-1 w-2 h-2 rounded-full ${ticket.status === TicketStatus.OPEN ? 'bg-red-500' : ticket.status === TicketStatus.IN_PROGRESS ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{ticket.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{ticket.description}</p>
                        </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(ticket.status)}`}>
                        {ticket.status}
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50 text-sm">
                    <div className="flex gap-4 text-gray-500">
                        <span>گزارش دهنده: <span className="font-medium text-gray-700">{ticket.reporter}</span></span>
                        <span>تاریخ: {ticket.date}</span>
                    </div>
                    <div>
                        {getPriorityBadge(ticket.priority)}
                    </div>
                </div>
            </div>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="گزارش خرابی جدید">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">عنوان خرابی</label>
            <input 
              type="text" 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="مثلا: خرابی آیفون واحد ۳"
              value={newTicket.title || ''}
              onChange={e => setNewTicket({...newTicket, title: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">توضیحات کامل</label>
            <textarea 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 h-32 resize-none"
              placeholder="جزئیات مشکل را بنویسید..."
              value={newTicket.description || ''}
              onChange={e => setNewTicket({...newTicket, description: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">اولویت</label>
            <div className="flex gap-2">
                {['low', 'medium', 'high'].map((p) => (
                    <button
                        key={p}
                        onClick={() => setNewTicket({...newTicket, priority: p as any})}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium border transition-all ${
                            newTicket.priority === p 
                            ? 'bg-blue-50 border-blue-200 text-blue-700' 
                            : 'bg-gray-50 border-gray-200 text-gray-600'
                        }`}
                    >
                        {p === 'low' ? 'عادی' : p === 'medium' ? 'متوسط' : 'فوری'}
                    </button>
                ))}
            </div>
          </div>

          <button 
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 mt-4"
          >
            ثبت گزارش
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Maintenance;
