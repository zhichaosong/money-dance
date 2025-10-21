/**
 * 日期工具函数
 * 用于计算各种时间相关的倒计时信息
 */

/**
 * 获取本月剩余工作日数量
 */
export function getWorkDaysLeft(currentDate: Date): number {
  const currentDay = currentDate.getDate();
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  let workDaysLeft = 0;

  // 从明天开始计算到月底的工作日
  for (let day = currentDay + 1; day <= daysInMonth; day++) {
    const checkDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = checkDate.getDay();
    // 0是周日，6是周六，不计算在内
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      workDaysLeft++;
    }
  }

  return workDaysLeft;
}

/**
 * 获取距离周末还有多少天
 */
export function getDaysUntilWeekend(currentDate: Date): number {
  const dayOfWeek = currentDate.getDay();
  
  // 如果今天是周六或周日，返回0
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return 0;
  }
  
  // 距离周六还有多少天
  return 6 - dayOfWeek;
}

/**
 * 获取距离下一个节日还有多少天
 */
export function getDaysUntilHoliday(currentDate: Date): number;

/**
 * 获取今年剩余的所有节日及天数
 */
export function getDaysUntilHoliday(currentDate: Date, getAll: true): { name: string; date: Date; daysLeft: number }[];

export function getDaysUntilHoliday(currentDate: Date, getAll?: boolean): number | { name: string; date: Date; daysLeft: number }[] {
  if (getAll) {
    // 国务院发布的2024-2025年放假安排
    const officialHolidays = [
      // 2024年剩余节日
      { month: 0, day: 1, name: '2024元旦', year: 2024 },
      { month: 1, day: 10, name: '2024春节', year: 2024 },
      { month: 3, day: 4, name: '2024清明节', year: 2024 },
      { month: 4, day: 1, name: '2024劳动节', year: 2024 },
      { month: 5, day: 10, name: '2024端午节', year: 2024 },
      { month: 8, day: 15, name: '2024中秋节', year: 2024 },
      { month: 9, day: 1, name: '2024国庆节', year: 2024 },
      // 2025年节日
      { month: 0, day: 1, name: '2025元旦', year: 2025 },
      { month: 1, day: 29, name: '2025春节', year: 2025 },
      { month: 3, day: 4, name: '2025清明节', year: 2025 },
      { month: 4, day: 1, name: '2025劳动节', year: 2025 },
      { month: 5, day: 30, name: '2025端午节', year: 2025 },
      { month: 9, day: 1, name: '2025国庆节', year: 2025 }
    ];

    // 传统节日补充
    const traditionalHolidays = [
      // 2024年剩余
      { month: 1, day: 14, name: '2024情人节', year: 2024 },
      { month: 2, day: 8, name: '2024妇女节', year: 2024 },
      { month: 3, day: 1, name: '2024愚人节', year: 2024 },
      { month: 5, day: 1, name: '2024儿童节', year: 2024 },
      { month: 6, day: 1, name: '2024建党节', year: 2024 },
      { month: 7, day: 1, name: '2024建军节', year: 2024 },
      { month: 8, day: 10, name: '2024教师节', year: 2024 },
      { month: 10, day: 11, name: '2024双十一', year: 2024 },
      { month: 11, day: 25, name: '2024圣诞节', year: 2024 },
      // 2025年
      { month: 1, day: 14, name: '2025情人节', year: 2025 },
      { month: 2, day: 8, name: '2025妇女节', year: 2025 },
      { month: 3, day: 1, name: '2025愚人节', year: 2025 },
      { month: 5, day: 1, name: '2025儿童节', year: 2025 },
      { month: 6, day: 1, name: '2025建党节', year: 2025 },
      { month: 7, day: 1, name: '2025建军节', year: 2025 },
      { month: 8, day: 10, name: '2025教师节', year: 2025 },
      { month: 10, day: 11, name: '2025双十一', year: 2025 },
      { month: 11, day: 25, name: '2025圣诞节', year: 2025 }
    ];

    const holidays = [...officialHolidays, ...traditionalHolidays];
    const remainingHolidays: { name: string; date: Date; daysLeft: number }[] = [];

    for (const holiday of holidays) {
      const holidayDate = new Date(holiday.year, holiday.month, holiday.day);
      if (holidayDate > currentDate) {
        const daysLeft = Math.ceil((holidayDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        remainingHolidays.push({
          name: holiday.name,
          date: holidayDate,
          daysLeft
        });
      }
    }

    // 按日期排序
    remainingHolidays.sort((a, b) => a.date.getTime() - b.date.getTime());
    return remainingHolidays;
  }

  // 国务院发布的2024-2025年放假安排（实际应用中应从API获取最新数据）
const officialHolidays = [
  // 2024年
  { month: 0, day: 1, name: '2024元旦', days: 1 },
  { month: 1, day: 10, name: '2024春节', days: 7 },
  { month: 3, day: 4, name: '2024清明节', days: 3 },
  { month: 4, day: 1, name: '2024劳动节', days: 5 },
  { month: 5, day: 10, name: '2024端午节', days: 3 },
  { month: 8, day: 15, name: '2024中秋节', days: 3 },
  { month: 9, day: 1, name: '2024国庆节', days: 7 },
  // 2025年
  { month: 0, day: 1, name: '2025元旦', days: 1 },
  { month: 1, day: 29, name: '2025春节', days: 7 },
  { month: 3, day: 4, name: '2025清明节', days: 3 },
  { month: 4, day: 1, name: '2025劳动节', days: 5 },
  { month: 5, day: 30, name: '2025端午节', days: 3 },
  { month: 9, day: 1, name: '2025国庆节', days: 7 }
];

// 传统节日补充（包含2024-2025年）
const traditionalHolidays = [
  // 2024年剩余
  { month: 1, day: 14, name: '2024情人节' },
  { month: 2, day: 8, name: '2024妇女节' },
  { month: 3, day: 1, name: '2024愚人节' },
  { month: 5, day: 1, name: '2024儿童节' },
  { month: 6, day: 1, name: '2024建党节' },
  { month: 7, day: 1, name: '2024建军节' },
  { month: 8, day: 10, name: '2024教师节' },
  { month: 10, day: 11, name: '2024双十一' },
  { month: 11, day: 25, name: '2024圣诞节' },
  // 2025年
  { month: 1, day: 14, name: '2025情人节' },
  { month: 2, day: 8, name: '2025妇女节' },
  { month: 3, day: 1, name: '2025愚人节' },
  { month: 5, day: 1, name: '2025儿童节' },
  { month: 6, day: 1, name: '2025建党节' },
  { month: 7, day: 1, name: '2025建军节' },
  { month: 8, day: 10, name: '2025教师节' },
  { month: 10, day: 11, name: '2025双十一' },
  { month: 11, day: 25, name: '2025圣诞节' }
];

const holidays = [...officialHolidays, ...traditionalHolidays];

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  // 查找今年的下一个节日
  for (const holiday of holidays) {
    const holidayDate = new Date(currentYear, holiday.month, holiday.day);
    if (holidayDate > currentDate) {
      return Math.ceil((holidayDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    }
  }

  // 如果今年的节日都过了，计算明年第一个节日（元旦）
  const nextYearHoliday = new Date(currentYear + 1, 0, 1);
  return Math.ceil((nextYearHoliday.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
}

/**
 * 获取距离退休还有多少天
 */
export function getDaysUntilRetirement(birthYear: number, retirementAge: number): number {
  const today = new Date();
  const currentYear = today.getFullYear();
  const age = currentYear - birthYear;
  
  // 如果已经退休，返回0
  if (age >= retirementAge) {
    return 0;
  }
  
  // 计算退休年份的生日
  const retirementYear = birthYear + retirementAge;
  const retirementDate = new Date(retirementYear, today.getMonth(), today.getDate());
  
  // 如果今年的生日已经过了，退休日期是明年的生日
  if (today > retirementDate) {
    retirementDate.setFullYear(retirementYear + 1);
  }
  
  return Math.ceil((retirementDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}