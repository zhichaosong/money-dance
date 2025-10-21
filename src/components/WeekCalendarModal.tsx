/**
 * 本周日历弹窗组件
 * 展示本周日历和工作日安排
 */
import React from 'react';
import { X, Calendar } from 'lucide-react';

interface WeekCalendarModalProps {
  currentDate: Date;
  onClose: () => void;
}

const WeekCalendarModal: React.FC<WeekCalendarModalProps> = ({ currentDate, onClose }) => {
  const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  
  // 获取本周的开始日期（周日）
  const startOfWeek = new Date(currentDate);
  const dayOfWeek = currentDate.getDay();
  startOfWeek.setDate(currentDate.getDate() - dayOfWeek);
  
  // 生成本周日历
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    weekDates.push(date);
  }

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isWorkDay = (date: Date) => {
    const day = date.getDay();
    return day !== 0 && day !== 6; // 不是周末
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-text">本周日历</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-surface">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-2 mb-4">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center text-sm font-semibold text-text-secondary py-2">
              {day}
            </div>
          ))}
          
          {weekDates.map((date, index) => (
            <div
              key={index}
              className={`
                text-center p-3 rounded-lg border-2 transition-all
                ${isToday(date) 
                  ? 'bg-primary text-white border-primary' 
                  : isWorkDay(date)
                    ? 'bg-surface border-border text-text hover:bg-primary hover:text-white hover:border-primary'
                    : 'bg-red-50 border-red-200 text-red-600'
                }
              `}
            >
              <div className="text-lg font-bold">{date.getDate()}</div>
              <div className="text-xs mt-1">
                {isWorkDay(date) ? '工作日' : '休息日'}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-text-secondary text-center">
          <div className="flex items-center justify-center space-x-1">
            <Calendar className="w-3 h-3" />
            <span>本周还有 {weekDates.filter(isWorkDay).filter(date => date >= currentDate).length} 个工作日</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekCalendarModal;