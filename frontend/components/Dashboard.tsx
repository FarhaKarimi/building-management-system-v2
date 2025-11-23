import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'فروردین', income: 4000, expense: 2400 },
  { name: 'اردیبهشت', income: 3000, expense: 1398 },
  { name: 'خرداد', income: 2000, expense: 9800 },
  { name: 'تیر', income: 2780, expense: 3908 },
  { name: 'مرداد', income: 1890, expense: 4800 },
  { name: 'شهریور', income: 2390, expense: 3800 },
];

const StatCard: React.FC<{ 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  trend?: string; 
  trendUp?: boolean 
}> = ({ title, value, icon, trend, trendUp }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
        {icon}
      </div>
      {trend && (
        <span className={`text-sm font-medium px-2 py-1 rounded-full ${trendUp ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {trend}
        </span>
      )}
    </div>
    <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="موجودی صندوق" 
          value="۴۵,۲۰۰,۰۰۰ تومان" 
          icon={<TrendingUp size={24} />}
          trend="+۱۲٪"
          trendUp={true}
        />
        <StatCard 
          title="بدهی معوقه" 
          value="۳,۵۰۰,۰۰۰ تومان" 
          icon={<TrendingDown size={24} />}
          trend="-۵٪"
          trendUp={true}
        />
        <StatCard 
          title="خرابی‌های فعال" 
          value="۳ مورد" 
          icon={<AlertCircle size={24} />}
          trend="نیاز به بررسی"
          trendUp={false}
        />
        <StatCard 
          title="ساکنین فعال" 
          value="۲۴ واحد" 
          icon={<CheckCircle2 size={24} />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">نمودار مالی ۶ ماه گذشته</h3>
          <div className="h-[300px] w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <Tooltip />
                <Area type="monotone" dataKey="income" stroke="#3B82F6" fillOpacity={1} fill="url(#colorIncome)" name="درآمد" />
                <Area type="monotone" dataKey="expense" stroke="#EF4444" fillOpacity={1} fill="url(#colorExpense)" name="هزینه" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">آخرین اطلاعیه‌ها</h3>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-yellow-800 bg-yellow-200 px-2 py-0.5 rounded">فوری</span>
                <span className="text-xs text-yellow-600">۱۴۰۳/۰۴/۱۰</span>
              </div>
              <p className="text-sm text-yellow-900 font-medium">قطعی آب فردا از ساعت ۹ تا ۱۱ صبح</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-blue-800 bg-blue-200 px-2 py-0.5 rounded">جلسه</span>
                <span className="text-xs text-blue-600">۱۴۰۳/۰۴/۱۲</span>
              </div>
              <p className="text-sm text-blue-900 font-medium">جلسه سالانه ساختمان در لابی</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
