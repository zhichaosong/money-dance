/**
 * 设置页面组件
 * 用户可配置月薪、出生年份、退休年龄等个人信息
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, Calendar, User, Clock } from 'lucide-react';

interface SettingsProps {
  monthlySalary: number;
  setMonthlySalary: (value: number) => void;
  birthYear: number;
  setBirthYear: (value: number) => void;
  retirementAge: number;
  setRetirementAge: (value: number) => void;
  workEndTime: string;
  setWorkEndTime: (value: string) => void;
  workStartTime: string;
  setWorkStartTime: (value: string) => void;
}

const Settings: React.FC<SettingsProps> = ({
  monthlySalary,
  setMonthlySalary,
  birthYear,
  setBirthYear,
  retirementAge,
  setRetirementAge,
  workEndTime,
  setWorkEndTime,
  workStartTime,
  setWorkStartTime,
}) => {
  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-orange-50 to-amber-50">
      {/* 头部 */}
      <div className="flex items-center mb-6">
        <Link to="/" className="p-2 rounded-full bg-surface shadow-md hover:shadow-lg transition-shadow mr-4">
          <ArrowLeft className="w-6 h-6 text-text-secondary hover:text-primary" />
        </Link>
        <h1 className="text-2xl font-bold text-primary">设置（纯前端隐私保护，无 API 调用）</h1>
      </div>

      <div className="space-y-6">
        {/* 月薪设置 */}
        <div className="bg-surface rounded-2xl p-6 shadow-md card-hover">
          <div className="flex items-center mb-4">
            <DollarSign className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-lg font-semibold text-text">月薪设置</h2>
          </div>
          <div className="space-y-3">
            <label className="block text-sm text-text-secondary">当前月薪</label>
            <input
              type="number"
              value={monthlySalary ?? ''}
              onChange={(e) => setMonthlySalary(Number(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="请输入您的月薪"
            />
            <p className="text-xs text-text-secondary">纯前端计算，不录入数据库，放心使用</p>
          </div>
        </div>

        {/* 出生年份设置 */}
        <div className="bg-surface rounded-2xl p-6 shadow-md card-hover">
          <div className="flex items-center mb-4">
            <Calendar className="w-6 h-6 text-secondary mr-3" />
            <h2 className="text-lg font-semibold text-text">出生年份</h2>
          </div>
          <div className="space-y-3">
            <label className="block text-sm text-text-secondary">出生年份</label>
            <input
              type="number"
              value={birthYear ?? ''}
              onChange={(e) => setBirthYear(Number(e.target.value) || 2000)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
              placeholder="请输入您的出生年份"
              min="1900"
              max="2023"
            />
            <p className="text-xs text-text-secondary">用于计算离退休还有多少天</p>
          </div>
        </div>

        {/* 退休年龄设置 */}
        <div className="bg-surface rounded-2xl p-6 shadow-md card-hover">
          <div className="flex items-center mb-4">
            <User className="w-6 h-6 text-accent mr-3" />
            <h2 className="text-lg font-semibold text-text">退休年龄</h2>
          </div>
          <div className="space-y-3">
            <label className="block text-sm text-text-secondary">计划退休年龄</label>
            <input
              type="number"
              value={retirementAge ?? ''}
              onChange={(e) => setRetirementAge(Number(e.target.value) || 60)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
              placeholder="请输入计划退休年龄"
              min="50"
              max="80"
            />
            <p className="text-xs text-text-secondary">用于计算离退休还有多少天</p>
          </div>
        </div>


        {/* 下班时间设置 */}
        <div className="bg-surface rounded-2xl p-6 shadow-md card-hover">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-primary mr-3" />
            <h2 className="text-lg font-semibold text-text">工作时间</h2>
          </div>
          <div className="space-y-3">
            <label className="block text-sm text-text-secondary">上班时间</label>
            <input
              type="time"
              value={workStartTime ?? '10:30'}
              onChange={(e) => setWorkStartTime(e.target.value || '10:30')}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>
          <div className="space-y-3">
            <label className="block text-sm text-text-secondary">下班时间</label>
            <input
              type="time"
              value={workEndTime ?? '21:30'}
              onChange={(e) => setWorkEndTime(e.target.value || '21:30')}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
            <p className="text-xs text-text-secondary">用于计算离下班还有多少时间</p>
          </div>
        </div>

        {/* 保存提示 */}
        <div className="bg-primary/10 rounded-2xl p-4 text-center">
          <p className="text-sm text-primary font-medium">
            设置会自动保存，无需手动操作
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;