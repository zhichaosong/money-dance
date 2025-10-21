/**
 * 节日列表组件
 * 展示今年剩余节日及天数
 */
import React from 'react';
import { X, Gift } from 'lucide-react';

interface Holiday {
  name: string;
  date: Date;
  daysLeft: number;
}

interface HolidayListProps {
  holidays: Holiday[];
  onClose: () => void;
}

const HolidayList: React.FC<HolidayListProps> = ({ holidays, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-96 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Gift className="w-6 h-6 text-primary" />
            <h3 className="text-xl font-bold text-primary">今年剩余节日</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <div className="space-y-3">
          {holidays.map((holiday, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold text-gray-800">{holiday.name}</div>
                <div className="text-sm text-gray-500">
                  {holiday.date.getMonth() + 1}月{holiday.date.getDate()}日
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-primary">{holiday.daysLeft}</div>
                <div className="text-sm text-gray-500">天</div>
              </div>
            </div>
          ))}
        </div>
        
        {holidays.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            今年没有更多节日了，期待明年吧！
          </div>
        )}
      </div>
    </div>
  );
};

export default HolidayList;