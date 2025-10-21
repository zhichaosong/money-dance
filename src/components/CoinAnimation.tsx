/**
 * 金币跳动动画组件
 * 为金额变化添加单个金币跳动效果
 */
import React, { useEffect, useState } from 'react';

interface CoinAnimationProps {
  trigger: number; // 触发动画的值
}

const CoinAnimation: React.FC<CoinAnimationProps> = ({ trigger }) => {
  const [isAnimating, setIsAnimating] = useState(true);

  // useEffect(() => {
  //   if (trigger > 0) {
  //     setIsAnimating(true);
  //     // 2秒后停止动画，让跳动更持久
  //     setTimeout(() => {
  //       setIsAnimating(false);
  //     }, 2000);
  //   }
  // }, [trigger]);

  return (
    <div className={`inline-block ${isAnimating ? 'animate-bounce' : ''} transition-all duration-300`}>
      <div className="w-8 h-8 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-lg border-2 border-yellow-400">
        <div className="w-full h-full flex items-center justify-center text-lg font-bold text-yellow-800">¥</div>
      </div>
    </div>
  );
};

export default CoinAnimation;