/**
 * 有盼头APP主仪表盘组件
 * 展示实时收入、各类倒计时信息和快捷导航
 */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings, Clock, Calendar, Gift, Coffee, TrendingUp } from 'lucide-react';
import TodayEarnings from './TodayEarnings';
import CountdownCard from './CountdownCard';
import HolidayList from './HolidayList';
import HourlyRateModal from './HourlyRateModal';
import WorkProgressModal from './WorkProgressModal';
import WeekCalendarModal from './WeekCalendarModal';
import MonthlySalaryModal from './MonthlySalaryModal';
import RetirementYearsModal from './RetirementYearsModal';
import { getWorkDaysLeft, getDaysUntilWeekend, getDaysUntilHoliday, getDaysUntilRetirement } from '../utils/dateUtils';

interface DashboardProps {
  monthlySalary: number;
  birthYear: number;
  retirementAge: number;
  workEndTime?: string;
  workStartTime?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ monthlySalary, birthYear, retirementAge, workEndTime, workStartTime }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [showHolidayList, setShowHolidayList] = useState(false);
  const [showHourlyRate, setShowHourlyRate] = useState(false);
  const [showWorkProgress, setShowWorkProgress] = useState(false);
  const [showWeekCalendar, setShowWeekCalendar] = useState(false);
  const [showMonthlySalary, setShowMonthlySalary] = useState(false);
  const [showRetirementYears, setShowRetirementYears] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 计算离下班时间
  const getHoursUntilWorkEnd = () => {
    const now = currentTime;
    const [hours, minutes] = workEndTime.split(':').map(Number);
    const workEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    
    if (now > workEnd) {
      return 0; // 已下班
    }
    
    const diffMs = workEnd.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const diffMinutes = (diffHours - Math.floor(diffHours)) * 60;
    const diffSeconds = (diffMinutes - Math.floor(diffMinutes)) * 60;

    return `${Math.floor(diffHours)}:${Math.floor(diffMinutes)}:${Math.floor(diffSeconds)}`
  };
  
  const hoursUntilWorkEnd = getHoursUntilWorkEnd();

  const today = new Date();
  const workDaysLeft = getWorkDaysLeft(today);
  const daysUntilWeekend = getDaysUntilWeekend(today);
  const daysUntilHoliday = getDaysUntilHoliday(today);
  const daysUntilRetirement = getDaysUntilRetirement(birthYear ?? 2000, retirementAge ?? 60);
  const remainingHolidays = getDaysUntilHoliday(today, true) as { name: string; date: Date; daysLeft: number }[];

  return (
    <div className="min-h-screen p-4">
      {/* 头部 */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">薪动倒计时（Money Dance）</h1>
        <Link 
          to="/settings" 
          className="p-2 rounded-full bg-surface shadow-md hover:shadow-lg transition-shadow"
        >
          <Settings className="w-6 h-6 text-text-secondary hover:text-primary" />
        </Link>
      </div>

      {/* 今日收入卡片 */}
      <div onClick={() => setShowHourlyRate(true)} className="cursor-pointer">
        <TodayEarnings monthlySalary={monthlySalary} currentTime={currentTime}
          workEndTime={workEndTime} workStartTime={workStartTime} />
      </div>

      {/* 倒计时卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div onClick={() => setShowWorkProgress(true)} className="cursor-pointer">
          <CountdownCard
            icon={Clock}
            title="距离下班"
            value={hoursUntilWorkEnd}
            unit="小时"
            color="primary"
            description={hoursUntilWorkEnd == 0 ? "下班啦！" : "继续加油！"}
          />
        </div>
        
        <div onClick={() => setShowWeekCalendar(true)} className="cursor-pointer">
          <CountdownCard
            icon={Coffee}
            title="距离周末"
            value={daysUntilWeekend}
            unit="天"
            color="secondary"
            description="周末在向你招手"
          />
        </div>
        
        <div onClick={() => setShowMonthlySalary(true)} className="cursor-pointer">
          <CountdownCard
            icon={Calendar}
            title="距离发工资"
            value={workDaysLeft}
            unit="个工作日"
            color="secondary"
            description="钱包即将回血"
          />
        </div>
        
        <div onClick={() => setShowHolidayList(true)} className="cursor-pointer">
          <CountdownCard
            icon={Gift}
            title="距离节日"
            value={daysUntilHoliday}
            unit="天"
            color="primary"
            description="点击查看全部节日"
          />
        </div>
      </div>

      {/* 退休倒计时大卡片 */}
      <div onClick={() => setShowRetirementYears(true)} className="mt-6 bg-gradient-to-r from-primary to-secondary rounded-2xl p-6 text-white card-hover cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">距离退休</h3>
              <p className="text-sm opacity-90">人生自由倒计时</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{daysUntilRetirement}</div>
            <div className="text-sm opacity-90">天</div>
          </div>
        </div>
        <div className="mt-4 text-center text-sm opacity-80">
          还有 {Math.floor(daysUntilRetirement / 365)} 年 {daysUntilRetirement % 365} 天
        </div>
      </div>

      {/* 底部激励语 */}
      <div className="mt-8 text-center">
        <p className="text-text-secondary text-sm">
          每一天都是向梦想💰钱进的一步 💪
        </p>
      </div>

      {/* 节日列表弹窗 */}
      {showHolidayList && (
        <HolidayList
          holidays={remainingHolidays}
          onClose={() => setShowHolidayList(false)}
        />
      )}
      
      {/* 时薪详情弹窗 */}
      {showHourlyRate && (
        <HourlyRateModal
          monthlySalary={monthlySalary}
          currentTime={currentTime}
          workEndTime={workEndTime}
          workStartTime={workStartTime}
          onClose={() => setShowHourlyRate(false)}
        />
      )}
      
      {/* 下班进度弹窗 */}
      {showWorkProgress && (
        <WorkProgressModal
          workEndTime={workEndTime}
          workStartTime={workStartTime}
          currentTime={currentTime}
          onClose={() => setShowWorkProgress(false)}
        />
      )}
      
      {/* 本周日历弹窗 */}
      {showWeekCalendar && (
        <WeekCalendarModal
          currentDate={currentTime}
          onClose={() => setShowWeekCalendar(false)}
        />
      )}
      
      {/* 本月薪资弹窗 */}
      {showMonthlySalary && (
        <MonthlySalaryModal
          monthlySalary={monthlySalary}
          currentDate={currentTime}
          onClose={() => setShowMonthlySalary(false)}
        />
      )}
      
      {/* 退休年份列表弹窗 */}
      {showRetirementYears && (
        <RetirementYearsModal
          birthYear={birthYear}
          retirementAge={retirementAge}
          currentDate={currentTime}
          onClose={() => setShowRetirementYears(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;