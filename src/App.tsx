import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './global.css';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';

// 自定义Tailwind配置
window.tailwind = window.tailwind ?? { config: {}};
window.tailwind.config = {
  ...window.tailwind.config,
  theme: {
    extend: {
      colors: {
        primary: '#f59e0b',
        'primary-light': '#fbbf24',
        'primary-dark': '#d97706',
        secondary: '#f97316',
        accent: '#fb923c',
        background: '#fefdf8',
        surface: '#ffffff',
        text: '#1f2937',
        'text-secondary': '#6b7280'
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite'
      }
    }
  }
};

function App() {
  const [monthlySalary, setMonthlySalary] = useState<number>(() => {
    const saved = localStorage.getItem('monthlySalary');
    return saved ? parseFloat(saved) : 8000;
  });
  
  const [birthYear, setBirthYear] = useState<number>(() => {
    const saved = localStorage.getItem('birthYear');
    return saved ? parseInt(saved) : 1990;
  });
  
  const [retirementAge, setRetirementAge] = useState<number>(() => {
    const saved = localStorage.getItem('retirementAge');
    return saved ? parseInt(saved) : 60;
  });
  
  const [workEndTime, setWorkEndTime] = useState<string>(() => {
    const saved = localStorage.getItem('workEndTime');
    return saved || '21:30';
  });
  
  const [workStartTime, setWorkStartTime] = useState<string>(() => {
    const saved = localStorage.getItem('workStartTime');
    return saved || '10:30';
  });

  useEffect(() => {
    localStorage.setItem('monthlySalary', monthlySalary.toString());
  }, [monthlySalary]);

  useEffect(() => {
    localStorage.setItem('birthYear', birthYear.toString());
  }, [birthYear]);

  useEffect(() => {
    localStorage.setItem('retirementAge', retirementAge.toString());
  }, [retirementAge]);

  useEffect(() => {
    localStorage.setItem('workStartTime', workStartTime);
  }, [workStartTime]);

  useEffect(() => {
    localStorage.setItem('workEndTime', workEndTime);
  }, [workEndTime]);

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
        <Routes>
          <Route 
            path="/" 
            element={
              <Dashboard 
                monthlySalary={monthlySalary}
                birthYear={birthYear}
                retirementAge={retirementAge}
                workStartTime={workStartTime}
                workEndTime={workEndTime}
              />
            } 
          />
          <Route 
            path="/settings" 
            element={
              <Settings 
                monthlySalary={monthlySalary}
                setMonthlySalary={setMonthlySalary}
                birthYear={birthYear}
                setBirthYear={setBirthYear}
                retirementAge={retirementAge}
                workEndTime={workEndTime}
                setRetirementAge={setRetirementAge}
                setWorkEndTime={setWorkEndTime}
                workStartTime={workStartTime}
                setWorkStartTime={setWorkStartTime}
              />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;