
import React, { useState } from 'react';
import { Transaction, TransactionType } from '../types';
import { Download, Plus, Search } from 'lucide-react';
import Modal from './Modal';

const mockTransactions: Transaction[] = [
  { id: '1', title: 'شارژ واحد ۳', amount: 500000, date: '1403/04/01', type: TransactionType.INCOME, category: 'شارژ', status: 'paid' },
  { id: '2', title: 'تعمیر آسانسور', amount: 2500000, date: '1403/04/05', type: TransactionType.EXPENSE, category: 'تعمیرات', status: 'paid' },
  { id: '3', title: 'قبض برق مشاعات', amount: 800000, date: '1403/04/08', type: TransactionType.EXPENSE, category: 'قبوض', status: 'pending' },
  { id: '4', title: 'شارژ واحد ۵', amount: 500000, date: '1403/04/10', type: TransactionType.INCOME, category: 'شارژ', status: 'paid' },
];

const Finance: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTx, setNewTx] = useState<Partial<Transaction>>({
    type: TransactionType.INCOME,
    status: 'paid'
  });

  const handleAdd = () => {
    if (!newTx.title || !newTx.amount) return;
    const tx: Transaction = {
      id: Date.now().toString(),
      title: newTx.title || '',
      amount: Number(newTx.amount),
      date: new Date().toLocaleDateString('fa-IR'),
      type: newTx.type || TransactionType.INCOME,
      category: newTx.category || 'سایر',
      status: 'paid'
    };
    setTransactions([tx, ...transactions]);
    setIsModalOpen(false);
    setNewTx({ type: TransactionType.INCOME, status: 'paid' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">امور مالی و حسابداری</h2>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-50 transition-colors">
            <Download size={18} />
            <span>گزارش PDF</span>
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            <Plus size={18} />
            <span>تراکنش جدید</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
          <p className="text-sm text-emerald-600 font-medium mb-1">کل درآمد ماه جاری</p>
          <p className="text-xl font-bold text-emerald-900">
            {transactions.filter(t => t.type === TransactionType.INCOME).reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()} تومان
          </p>
        </div>
        <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl">
          <p className="text-sm text-rose-600 font-medium mb-1">کل هزینه‌های ماه جاری</p>
          <p className="text-xl font-bold text-rose-900">
            {transactions.filter(t => t.type === TransactionType.EXPENSE).reduce((acc, curr) => acc + curr.amount, 0).toLocaleString()} تومان
          </p>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
          <p className="text-sm text-blue-600 font-medium mb-1">تعداد تراکنش‌ها</p>
          <p className="text-xl font-bold text-blue-900">{transactions.length} مورد</p>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-700">تراکنش‌های اخیر</h3>
            <div className="relative">
                <Search size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                    type="text" 
                    placeholder="جستجو..." 
                    className="pr-10 pl-4 py-2 bg-gray-50 rounded-lg border-none focus:ring-2 focus:ring-blue-100 text-sm w-48 transition-all focus:w-64"
                />
            </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-gray-500 text-xs">
              <tr>
                <th className="px-6 py-4 text-right">عنوان</th>
                <th className="px-6 py-4 text-right">دسته بندی</th>
                <th className="px-6 py-4 text-right">تاریخ</th>
                <th className="px-6 py-4 text-right">مبلغ</th>
                <th className="px-6 py-4 text-center">نوع</th>
                <th className="px-6 py-4 text-center">وضعیت</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{tx.title}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm">{tx.category}</td>
                  <td className="px-6 py-4 text-gray-600 text-sm font-mono dir-ltr">{tx.date}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">
                    {tx.amount.toLocaleString()} <span className="text-xs font-normal text-gray-400">تومان</span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                      tx.type === TransactionType.INCOME ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {tx.type === TransactionType.INCOME ? 'درآمد' : 'هزینه'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        tx.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-yellow-50 text-yellow-600'
                    }`}>
                        {tx.status === 'paid' ? 'پرداخت شده' : 'در انتظار'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="ثبت تراکنش جدید">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">عنوان تراکنش</label>
            <input 
              type="text" 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="مثلا: شارژ واحد ۱۰"
              value={newTx.title || ''}
              onChange={e => setNewTx({...newTx, title: e.target.value})}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">مبلغ (تومان)</label>
            <input 
              type="number" 
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="0"
              value={newTx.amount || ''}
              onChange={e => setNewTx({...newTx, amount: Number(e.target.value)})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نوع</label>
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                value={newTx.type}
                onChange={e => setNewTx({...newTx, type: e.target.value as TransactionType})}
              >
                <option value={TransactionType.INCOME}>درآمد</option>
                <option value={TransactionType.EXPENSE}>هزینه</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">دسته‌بندی</label>
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                value={newTx.category || 'شارژ'}
                onChange={e => setNewTx({...newTx, category: e.target.value})}
              >
                <option>شارژ</option>
                <option>تعمیرات</option>
                <option>قبوض</option>
                <option>نظافت</option>
                <option>سایر</option>
              </select>
            </div>
          </div>

          <button 
            onClick={handleAdd}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 mt-4"
          >
            ثبت تراکنش
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Finance;
