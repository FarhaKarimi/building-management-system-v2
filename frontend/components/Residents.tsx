
import React, { useState } from 'react';
import { Resident, UserRole } from '../types';
import { Phone, Car, User, KeyRound, Plus, Pencil, Trash2 } from 'lucide-react';
import Modal from './Modal';

interface ResidentsProps {
  residents: Resident[];
  onAdd: (resident: Resident) => void;
  onEdit: (resident: Resident) => void;
  onDelete: (id: string) => void;
}

const Residents: React.FC<ResidentsProps> = ({ residents, onAdd, onEdit, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const emptyForm: Resident = {
    id: '',
    unit: '',
    name: '',
    role: UserRole.OWNER,
    phone: '',
    plateNumber: '',
    moveInDate: '',
    password: '1234'
  };

  const [formData, setFormData] = useState<Resident>(emptyForm);

  const openAddModal = () => {
    setFormData({ ...emptyForm, id: Date.now().toString() });
    setEditMode(false);
    setIsModalOpen(true);
  };

  const openEditModal = (resident: Resident) => {
    setFormData({ ...resident });
    setEditMode(true);
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.unit || !formData.password) return;
    
    if (editMode) {
      onEdit(formData);
    } else {
      onAdd(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">مدیریت ساکنین و واحدها</h2>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
        >
          <Plus size={18} />
          <span>تعریف ساکن جدید</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {residents.map((resident) => (
          <div key={resident.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
                <span className="font-bold text-gray-800">واحد {resident.unit}</span>
                <div className="flex gap-2 items-center">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                        resident.role === UserRole.OWNER ? 'bg-purple-100 text-purple-700' :
                        resident.role === UserRole.TENANT ? 'bg-orange-100 text-orange-700' :
                        'bg-gray-200 text-gray-700'
                    }`}>
                        {resident.role}
                    </span>
                    <button onClick={() => onDelete(resident.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                    </button>
                </div>
            </div>
            <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <User size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">{resident.name}</p>
                        <p className="text-xs text-gray-500">تاریخ سکونت: {resident.moveInDate || '-'}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <Phone size={16} className="text-gray-400" />
                    <span>{resident.phone || '---'}</span>
                </div>
                
                <div className="flex items-center gap-3 text-sm text-gray-600 bg-gray-50 p-2 rounded-lg">
                    <Car size={16} className="text-gray-400" />
                    <span>{resident.plateNumber || 'بدون خودرو'}</span>
                </div>

                {/* Admin Info for Password */}
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-2 px-1 border-t border-dashed border-gray-100 pt-2">
                   <KeyRound size={12} />
                   <span>رمز عبور: {resident.password}</span>
                </div>
            </div>
            <div className="px-4 py-3 bg-gray-50/50 border-t border-gray-100 flex gap-2">
                <button onClick={() => openEditModal(resident)} className="flex-1 flex items-center justify-center gap-2 text-xs bg-white border border-gray-200 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <Pencil size={14} />
                    <span>ویرایش</span>
                </button>
                <button className="flex-1 text-xs bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">ارسال پیام</button>
            </div>
          </div>
        ))}

        {/* Empty State if few items */}
        <button 
            onClick={openAddModal}
            className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all min-h-[300px]"
        >
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Plus size={32} />
            </div>
            <span className="font-bold">افزودن ساکن جدید</span>
        </button>
      </div>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editMode ? "ویرایش اطلاعات ساکن" : "تعریف ساکن جدید"}
      >
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">شماره واحد</label>
                    <input 
                        type="text" 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        value={formData.unit}
                        onChange={e => setFormData({...formData, unit: e.target.value})}
                        placeholder="مثلا: 10"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">نقش</label>
                    <select 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        value={formData.role}
                        onChange={e => setFormData({...formData, role: e.target.value as UserRole})}
                    >
                        <option value={UserRole.OWNER}>مالک</option>
                        <option value={UserRole.TENANT}>مستأجر</option>
                        <option value={UserRole.STAFF}>نگهبان/خدمات</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نام و نام خانوادگی</label>
                <input 
                    type="text" 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">شماره تماس</label>
                <input 
                    type="text" 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="0912..."
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">تاریخ سکونت</label>
                    <input 
                        type="text" 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        value={formData.moveInDate}
                        onChange={e => setFormData({...formData, moveInDate: e.target.value})}
                        placeholder="1402/01/01"
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">رمز عبور</label>
                    <input 
                        type="text" 
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                        value={formData.password}
                        onChange={e => setFormData({...formData, password: e.target.value})}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">پلاک خودرو (اختیاری)</label>
                <input 
                    type="text" 
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    value={formData.plateNumber || ''}
                    onChange={e => setFormData({...formData, plateNumber: e.target.value})}
                    placeholder="مثلا: ۱۲ب۳۴۵ - ایران ۱۱"
                />
            </div>

            <button 
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 mt-4"
            >
                {editMode ? 'ذخیره تغییرات' : 'ثبت ساکن جدید'}
            </button>
        </div>
      </Modal>
    </div>
  );
};

export default Residents;
