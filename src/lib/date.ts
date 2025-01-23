/**
 * 格式化日期时间
 * @param date 日期对象或时间戳（毫秒）
 * @param format 格式化选项：'date'（仅日期）, 'time'（仅时间）, 'full'（完整日期时间）
 * @returns 格式化后的字符串
 */
export function formatDateTime(date: Date | number, format: 'date' | 'time' | 'full' = 'date'): string {
  // 确保输入的时间戳是毫秒级的
  const d = typeof date === 'number' 
    ? new Date(date) 
    : date;
  
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Shanghai', // 使用中国时区
  };

  if (format === 'date' || format === 'full') {
    options.year = 'numeric';
    options.month = '2-digit';
    options.day = '2-digit';
  }

  if (format === 'time' || format === 'full') {
    options.hour = '2-digit';
    options.minute = '2-digit';
    options.second = '2-digit';
    options.hour12 = false;
  }

  return new Intl.DateTimeFormat('zh-CN', options).format(d);
}

/**
 * 获取相对时间描述
 * @param date 日期对象或时间戳（毫秒）
 * @returns 相对时间描述
 */
export function getRelativeTimeString(date: Date | number): string {
  // 确保输入的时间戳是毫秒级的
  const d = typeof date === 'number' 
    ? new Date(date) 
    : date;
    
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  
  const rtf = new Intl.RelativeTimeFormat('zh-CN', { numeric: 'auto' });
  
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return rtf.format(-years, 'year');
  if (months > 0) return rtf.format(-months, 'month');
  if (days > 0) return rtf.format(-days, 'day');
  if (hours > 0) return rtf.format(-hours, 'hour');
  if (minutes > 0) return rtf.format(-minutes, 'minute');
  return rtf.format(-seconds, 'second');
} 