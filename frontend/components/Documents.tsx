import React from 'react';
import { FileText, Download, FileCode, Image as ImageIcon, FolderOpen, Upload } from 'lucide-react';

const documents = [
  { id: 1, name: 'اساسنامه ساختمان.pdf', type: 'pdf', size: '2.4 MB', date: '1402/01/15', category: 'قوانین' },
  { id: 2, name: 'صورت‌جلسه مجمع ۱۴۰۲.pdf', type: 'pdf', size: '1.1 MB', date: '1402/12/20', category: 'صورت‌جلسات' },
  { id: 3, name: 'فاکتور تعمیر آسانسور.jpg', type: 'img', size: '450 KB', date: '1403/03/05', category: 'فاکتورها' },
  { id: 4, name: 'قرارداد نگهداری موتورخانه.pdf', type: 'pdf', size: '3.2 MB', date: '1403/01/10', category: 'قراردادها' },
];

const Documents: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">اسناد و فایل‌های ساختمان</h2>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
          <Upload size={18} />
          <span>بارگذاری فایل</span>
        </button>
      </div>

      {/* Categories */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {['همه', 'اساسنامه', 'صورت‌جلسات', 'فاکتورها', 'قراردادها'].map((cat, i) => (
          <button key={i} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-gray-800 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-500">نام فایل</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-500 hidden md:table-cell">دسته‌بندی</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-500 hidden sm:table-cell">تاریخ</th>
              <th className="px-6 py-4 text-right text-sm font-bold text-gray-500 hidden sm:table-cell">حجم</th>
              <th className="px-6 py-4 text-center text-sm font-bold text-gray-500">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${doc.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'}`}>
                      {doc.type === 'pdf' ? <FileText size={20} /> : <ImageIcon size={20} />}
                    </div>
                    <span className="font-medium text-gray-800">{doc.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell">
                  <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium">{doc.category}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell dir-ltr text-right">{doc.date}</td>
                <td className="px-6 py-4 text-sm text-gray-500 hidden sm:table-cell dir-ltr text-right">{doc.size}</td>
                <td className="px-6 py-4 text-center">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Download size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {documents.length === 0 && (
          <div className="p-10 text-center text-gray-400 flex flex-col items-center">
            <FolderOpen size={48} className="mb-4 opacity-50" />
            <p>هیچ سندی یافت نشد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Documents;