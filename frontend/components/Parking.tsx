import React from 'react';
import { Car, AlertCircle, CheckCircle2 } from 'lucide-react';

interface ParkingSpot {
  id: string;
  spotNumber: number;
  unit: string;
  status: 'occupied' | 'empty' | 'unauthorized';
  plateNumber?: string;
  vehicle?: string;
}

const spots: ParkingSpot[] = [
  { id: '1', spotNumber: 1, unit: 'واحد ۱', status: 'occupied', plateNumber: '۱۲ ب ۳۴۵ - ۱۱', vehicle: 'پژو ۲۰۶' },
  { id: '2', spotNumber: 2, unit: 'واحد ۲', status: 'occupied', plateNumber: '۶۶ ص ۱۱۱ - ۴۴', vehicle: 'تویوتا کمری' },
  { id: '3', spotNumber: 3, unit: 'واحد ۳', status: 'empty' },
  { id: '4', spotNumber: 4, unit: 'واحد ۴', status: 'unauthorized', plateNumber: '۹۹ ل ۸۸۸ - ۲۲', vehicle: 'پراید ناشناس' },
  { id: '5', spotNumber: 5, unit: 'واحد ۵', status: 'occupied', plateNumber: '۵۵ ج ۳۳۳ - ۸۸', vehicle: 'مزد ۳' },
];

const Parking: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">مدیریت پارکینگ</h2>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 bg-white border border-red-200 text-red-600 px-4 py-2 rounded-xl hover:bg-red-50 transition-colors">
                <AlertCircle size={18} />
                <span>گزارش تخلف</span>
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                ثبت پلاک جدید
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {spots.map((spot) => (
          <div key={spot.id} className={`relative p-5 rounded-2xl border-2 transition-all ${
            spot.status === 'unauthorized' ? 'bg-red-50 border-red-200' : 
            spot.status === 'empty' ? 'bg-gray-50 border-gray-200 border-dashed' : 
            'bg-white border-green-100 hover:border-green-300 hover:shadow-md'
          }`}>
            <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-800 text-white font-bold text-lg">
                    {spot.spotNumber}
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                    spot.status === 'unauthorized' ? 'bg-red-200 text-red-800' : 
                    spot.status === 'empty' ? 'bg-gray-200 text-gray-600' : 
                    'bg-green-100 text-green-700'
                }`}>
                    {spot.status === 'occupied' ? 'مجاز' : spot.status === 'empty' ? 'خالی' : 'غیرمجاز'}
                </span>
            </div>

            {spot.status === 'empty' ? (
                <div className="flex flex-col items-center justify-center h-24 text-gray-400">
                    <p className="text-sm font-medium mb-2">متعلق به {spot.unit}</p>
                    <p className="text-xs">خودرویی پارک نشده</p>
                </div>
            ) : (
                <div className="space-y-3">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">مالک پارکینگ</p>
                        <p className="font-bold text-gray-800">{spot.unit}</p>
                    </div>
                    <div className="bg-white/50 p-2 rounded-lg border border-gray-100/50">
                        <div className="flex items-center gap-2 text-gray-700 mb-1">
                            <Car size={16} />
                            <span className="text-sm font-medium">{spot.vehicle}</span>
                        </div>
                        <div className="inline-block bg-yellow-50 border border-yellow-400/50 px-2 py-0.5 rounded text-sm font-mono text-gray-900">
                            {spot.plateNumber}
                        </div>
                    </div>
                    {spot.status === 'unauthorized' && (
                        <div className="flex items-center gap-2 text-red-600 text-xs font-bold mt-2">
                            <AlertCircle size={14} />
                            <span>پارک غیرمجاز شناسایی شد</span>
                        </div>
                    )}
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Parking;