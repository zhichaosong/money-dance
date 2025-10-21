/**
 * 时薪展示弹窗组件
 * 显示当前时薪和今日工作进度
 */
import React from 'react';
import { X, Clock } from 'lucide-react';

interface HourlyRateModalProps {
  monthlySalary: number;
  currentTime: Date;
  onClose: () => void;
  workStartTime: string;
  workEndTime: string;
}

const HourlyRateModal: React.FC<HourlyRateModalProps> = ({ monthlySalary, currentTime, workStartTime, workEndTime, onClose }) => {
  // 计算时薪 (按22个工作日，每天8小时计算)
  const hourlyRate = monthlySalary / 22 / 8;
  
  // 计算今日工作进度
  const today = new Date();
  const workStart = workStartTime ? new Date(today.getFullYear(), today.getMonth(), today.getDate(), ...workStartTime.split(':')) : new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30, 0);
  const workEnd = workEndTime ? new Date(today.getFullYear(), today.getMonth(), today.getDate(), ...workEndTime.split(':')) : new Date(today.getFullYear(), today.getMonth(), today.getDate(), 21, 30, 0);
  
  let progress = 0;
  if (currentTime >= workStart && currentTime <= workEnd) {
    const totalWorkMs = workEnd.getTime() - workStart.getTime();
    const workedMs = currentTime.getTime() - workStart.getTime();
    progress = (workedMs / totalWorkMs) * 100;
  } else if (currentTime > workEnd) {
    progress = 100;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-text">时薪详情</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-surface">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
        
        <div className="text-center mb-6">
          <div className="text-4xl font-bold text-primary mb-2">¥{hourlyRate.toFixed(2)}</div>
          <div className="text-sm text-text-secondary">每小时收入</div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-text-secondary">今日工作进度</span>
            <span className="text-sm font-semibold">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-surface rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="text-xs text-text-secondary text-center">
          <div className="flex items-center justify-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>工作时间: {workStartTime} - {workEndTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyRateModal;