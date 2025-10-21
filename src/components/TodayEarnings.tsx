/**
 * 今日收入实时展示组件
 * 根据月薪计算并实时显示今天已赚取的金额
 */
import React, { useEffect, useState } from 'react';
import { DollarSign } from 'lucide-react';
import CoinAnimation from './CoinAnimation';

interface TodayEarningsProps {
  monthlySalary: number;
  currentTime: Date;
  workEndTime?: string;
  workStartTime?: string;
}

const TodayEarnings: React.FC<TodayEarningsProps> = ({ monthlySalary, currentTime, workEndTime, workStartTime }) => {
  const [previousEarnings, setPreviousEarnings] = useState(0);
  const [animationTrigger, setAnimationTrigger] = useState(0);
  
  // 计算今日收入 (按22个工作日/月计算)
  const dailySalary = monthlySalary / 21.75;
  const today = new Date();
  const workStart = workStartTime ? new Date(today.getFullYear(), today.getMonth(), today.getDate(), ...workStartTime.split(':')) : new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 30, 0);
  const workEnd = workEndTime ? new Date(today.getFullYear(), today.getMonth(), today.getDate(), ...workEndTime.split(':')) : new Date(today.getFullYear(), today.getMonth(), today.getDate(), 21, 30, 0);
  
  let todayEarnings = 0;
  const safeSalary = Number(monthlySalary) || 0;
  const safeDaily = safeSalary / 21.75;
  if (currentTime >= workStart && currentTime <= workEnd) {
    const workSeconds = (workEnd.getTime() - workStart.getTime()) / 1000;
    const workedSeconds = (currentTime.getTime() - workStart.getTime()) / 1000;
    todayEarnings = (safeDaily * workedSeconds) / workSeconds;
  } else if (currentTime > workEnd) {
    todayEarnings = safeDaily;
  }

  // 检测收入变化触发动画
  useEffect(() => {
    const roundedEarnings = Math.floor(todayEarnings * 100) / 100;
    const roundedPrevious = Math.floor(previousEarnings * 100) / 100;
    
    if (roundedEarnings > roundedPrevious && previousEarnings > 0) {
      setAnimationTrigger(prev => prev + 1);
    }
    setPreviousEarnings(todayEarnings);
  }, [todayEarnings]);

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white shadow-lg card-hover">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 flex items-center justify-center text-2xl font-bold">¥</div>
          <div>
            <h2 className="text-lg font-semibold">今日收入</h2>
            <p className="text-sm opacity-90">实时更新中...</p>
          </div>
        </div>
        <div className="text-right flex items-center space-x-3">
          <div className="text-3xl font-bold number-roll">
            ¥{todayEarnings.toFixed(2)}
          </div>
          <CoinAnimation trigger={animationTrigger} />
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm opacity-80">
        <span>日薪: ¥{safeDaily.toFixed(2)}</span>
        <span>月薪: ¥{safeSalary.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default TodayEarnings;