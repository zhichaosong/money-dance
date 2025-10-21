/**
 * 退休年份列表弹窗组件
 * 展示剩余年份的详细列表
 */
import React from 'react';
import { X, Calendar, TrendingUp } from 'lucide-react';

interface RetirementYearsModalProps {
  birthYear: number;
  retirementAge: number;
  currentDate: Date;
  onClose: () => void;
}

const RetirementYearsModal: React.FC<RetirementYearsModalProps> = ({ birthYear, retirementAge, currentDate, onClose }) => {
  const currentYear = currentDate.getFullYear();
  const retirementYear = birthYear + retirementAge;
  
  // 生成剩余年份列表
  const remainingYears = [];
  for (let year = currentYear; year <= retirementYear; year++) {
    const age = year - birthYear;
    const isRetirementYear = year === retirementYear;
    
    remainingYears.push({
      year,
      age,
      isRetirementYear,
      isPast: year < currentYear
    });
  }
  
  const yearsUntilRetirement = retirementYear - currentYear;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl max-h-96 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-text">退休倒计时</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-surface">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
        
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-primary mb-1">{yearsUntilRetirement} 年</div>
          <div className="text-sm text-text-secondary">距离退休还有</div>
        </div>
        
        <div className="space-y-2 mb-4">
          {remainingYears.map(({ year, age, isRetirementYear, isPast }) => (
            <div
              key={year}
              className={`
                flex justify-between items-center p-3 rounded-lg transition-all
                ${isRetirementYear 
                  ? 'bg-gradient-to-r from-primary to-secondary text-white' 
                  : isPast
                    ? 'bg-gray-100 text-gray-500'
                    : 'bg-surface hover:bg-primary hover:text-white'
                }
              `}
            >
              <div className="flex items-center space-x-2">
                <Calendar className={`w-4 h-4 ${isRetirementYear ? 'text-white' : 'text-primary'}`} />
                <span className="font-semibold">{year}年</span>
              </div>
              <div className="text-right">
                <div className="font-semibold">{age}岁</div>
                {isRetirementYear && (
                  <div className="text-xs opacity-90">🎉 退休啦!</div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-xs text-text-secondary text-center">
          <div className="flex items-center justify-center space-x-1">
            <TrendingUp className="w-3 h-3" />
            <span>出生年份: {birthYear} | 退休年龄: {retirementAge}岁</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RetirementYearsModal;