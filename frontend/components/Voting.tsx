import React from 'react';
import { Poll } from '../types';

const mockPolls: Poll[] = [
  {
    id: '1',
    question: 'آیا با نصب دوربین مداربسته در پارکینگ موافق هستید؟',
    options: [
      { id: 'opt1', text: 'بله، موافقم', votes: 15 },
      { id: 'opt2', text: 'خیر، نیازی نیست', votes: 3 },
      { id: 'opt3', text: 'نظری ندارم', votes: 2 },
    ],
    totalVotes: 20,
    isActive: true
  },
  {
    id: '2',
    question: 'رنگ آمیزی راه پله‌ها به چه رنگی باشد؟',
    options: [
      { id: 'c1', text: 'کرم', votes: 8 },
      { id: 'c2', text: 'سفید', votes: 12 },
    ],
    totalVotes: 20,
    isActive: false
  }
];

const Voting: React.FC = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">صندوق نظرسنجی و رای‌گیری</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockPolls.map((poll) => (
          <div key={poll.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-bold text-gray-800 leading-snug">{poll.question}</h3>
              <span className={`px-3 py-1 text-xs rounded-full font-bold ${poll.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                {poll.isActive ? 'فعال' : 'پایان یافته'}
              </span>
            </div>
            
            <div className="space-y-4">
              {poll.options.map((option) => {
                const percentage = poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
                return (
                  <div key={option.id}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{option.text}</span>
                      <span className="text-gray-500">{percentage}٪ ({option.votes} رای)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {poll.isActive && (
                <div className="mt-6 pt-4 border-t border-gray-50 flex justify-end">
                    <button className="text-sm bg-blue-50 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                        ثبت رای جدید
                    </button>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Voting;
