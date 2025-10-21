/**
 * 本月薪资弹窗组件
 * 展示本月已收获的薪资和剩余薪资
 */
import React from 'react';
import { X, Calendar, TrendingUp } from 'lucide-react';

interface MonthlySalaryModalProps {
  monthlySalary: number;
  currentDate: Date;
  onClose: () => void;
}

const MonthlySalaryModal: React.FC<MonthlySalaryModalProps> = ({ monthlySalary, currentDate, onClose }) => {
  // 计算本月已工作日和总工作日
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
  let workedDays = 0;
  let totalWorkDays = 0;
  
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = checkDate.getDay();
    
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      totalWorkDays++;
      if (day <= currentDate.getDate()) {
        workedDays++;
      }
    }
  }
  
  const earnedSalary = (monthlySalary / totalWorkDays) * workedDays;
  const remainingSalary = monthlySalary - earnedSalary;
  const progress = (earnedSalary / monthlySalary) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-text">本月薪资</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-surface">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
        
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-primary mb-1">¥{earnedSalary.toFixed(2)}</div>
          <div className="text-sm text-text-secondary">本月已收获</div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-text-secondary">工作进度</span>
            <span className="text-sm font-semibold">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-surface rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center p-3 bg-surface rounded-lg">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm">已工作天数</span>
            </div>
            <span className="font-semibold">{workedDays} / {totalWorkDays} 天</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-surface rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-secondary" />
              <span className="text-sm">剩余薪资</span>
            </div>
            <span className="font-semibold text-secondary">¥{remainingSalary.toFixed(2)}</span>
          </div>
        </div>
        
        <div className="text-xs text-text-secondary text-center">
          按 {totalWorkDays} 个工作日计算，日均 ¥{(monthlySalary / totalWorkDays).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default MonthlySalaryModal;