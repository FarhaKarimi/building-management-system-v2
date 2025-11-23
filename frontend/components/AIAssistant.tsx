import React, { useState } from 'react';
import { generateAnnouncement } from '../services/geminiService';
import { Bot, Send, Loader2, Copy, Check } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('رسمی');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!topic) return;
    setLoading(true);
    setCopied(false);
    const result = await generateAnnouncement(topic, tone);
    setGeneratedText(result);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl text-white">
            <Bot size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800">دستیار هوشمند</h2>
            <p className="text-xs text-gray-500">تولید محتوا با هوش مصنوعی</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">موضوع اطلاعیه</label>
            <textarea
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-200 focus:border-purple-400 outline-none transition-all resize-none h-32"
              placeholder="مثلا: تعمیرات آسانسور در روز جمعه..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">لحن پیام</label>
            <div className="grid grid-cols-3 gap-2">
              {['رسمی', 'دوستانه', 'هشدار دهنده'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTone(t)}
                  className={`py-2 text-sm rounded-lg border transition-all ${
                    tone === t 
                      ? 'bg-purple-50 border-purple-200 text-purple-700 font-medium' 
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !topic}
            className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-xl hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            <span>تولید متن</span>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col min-h-[500px]">
        <h3 className="text-lg font-bold text-gray-800 mb-4">پیش‌نمایش متن</h3>
        
        {generatedText ? (
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-6 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 leading-8 whitespace-pre-wrap">
              {generatedText}
            </div>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleCopy}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  copied 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                <span>{copied ? 'کپی شد' : 'کپی متن'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
            <Bot size={48} className="mb-4 text-gray-300" />
            <p>موضوع را وارد کنید تا هوش مصنوعی متن را برای شما بنویسد</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistant;
