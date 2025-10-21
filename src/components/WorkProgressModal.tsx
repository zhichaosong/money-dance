/**
 * 下班进度弹窗组件
 * 展示今日工作进度条和详细信息
 */
import React from 'react';
import { X, Clock, Coffee } from 'lucide-react';

interface WorkProgressModalProps {
  workEndTime: string;
  workStartTime?: string;
  currentTime: Date;
  onClose: () => void;
}

const WorkProgressModal: React.FC<WorkProgressModalProps> = ({ workEndTime, workStartTime, currentTime, onClose }) => {
  // 解析下班时间
  const [endHours, endMinutes] = workEndTime.split(':').map(Number);
  const [startHours, startMinutes] = workStartTime?.split(':').map(Number) || [10, 30];
  
  // 计算工作时间段
  const workStart = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), startHours, startMinutes, 0);
  const workEnd = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), endHours, endMinutes, 0);
  
  let progress = 0;
  let status = '未开始';
  let timeLeft = '';
  
  if (currentTime >= workStart && currentTime <= workEnd) {
    const totalWorkMs = workEnd.getTime() - workStart.getTime();
    const workedMs = currentTime.getTime() - workStart.getTime();
    progress = (workedMs / totalWorkMs) * 100;
    status = '工作中';
    
    const remainingMs = workEnd.getTime() - currentTime.getTime();
    const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    timeLeft = `${remainingHours}小时${remainingMinutes}分钟`;
  } else if (currentTime > workEnd) {
    progress = 100;
    status = '已下班';
    timeLeft = '今日工作完成';
  } else {
    const remainingMs = workStart.getTime() - currentTime.getTime();
    const remainingHours = Math.floor(remainingMs / (1000 * 60 * 60));
    const remainingMinutes = Math.floor((remainingMs % (1000 * 60 * 60)) / (1000 * 60));
    timeLeft = `${remainingHours}小时${remainingMinutes}分钟`;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-text">今日工作进度</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-surface">
            <X className="w-5 h-5 text-text-secondary" />
          </button>
        </div>
        
        <div className="text-center mb-6">
          <div className="text-3xl font-bold text-primary mb-1">{progress.toFixed(1)}%</div>
          <div className="text-sm text-text-secondary">{status}</div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-text-secondary">工作进度</span>
            <span className="text-sm font-semibold">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-surface rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between items-center p-3 bg-surface rounded-lg">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm">工作时间</span>
            </div>
            <span className="font-semibold">{workStartTime} - {workEndTime}</span>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-surface rounded-lg">
            <div className="flex items-center space-x-2">
              <Coffee className="w-4 h-4 text-secondary" />
              <span className="text-sm">剩余时间</span>
            </div>
            <span className="font-semibold text-secondary">{timeLeft}</span>
          </div>
        </div>
        
        <div className="text-xs text-text-secondary text-center">
          {progress >= 100 ? '🎉 今日工作完成，好好休息！' : '💪 继续加油，胜利在望！'}
        </div>
      </div>
    </div>
  );
};

export default WorkProgressModal;