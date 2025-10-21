/**
 * 倒计时卡片组件
 * 用于展示各类倒计时信息的统一卡片样式
 */
import React from 'react';

interface CountdownCardProps {
  icon: React.ElementType;
  title: string;
  value: number | string;
  unit: string;
  color: 'primary' | 'secondary' | 'accent';
  description: string;
}

const CountdownCard: React.FC<CountdownCardProps> = ({ 
  icon: Icon, 
  title, 
  value, 
  unit, 
  color, 
  description 
}) => {
  const colorClasses = {
    primary: 'bg-gradient-to-r from-primary to-secondary text-white',
    secondary: 'bg-gradient-to-r from-secondary to-primary text-white',
    accent: 'bg-gradient-to-r from-accent to-primary-light text-white'
  };

  return (
    <div className={`rounded-2xl p-4 shadow-md card-hover ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5" />
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-xs opacity-90">{unit}</div>
        </div>
        <div className="text-xs opacity-80 text-right">
          {description}
        </div>
      </div>
    </div>
  );
};

export default CountdownCard;