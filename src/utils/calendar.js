// 恒定6行42天
const days = 42;

// 获取月份第一天是星期几
function getWeekDay(year, month, day) {
    let weekOfDay = new Date(`${year}-${month}-${day}`); // 获取当天时间
    let weeks = weekOfDay.getDay() // 获取星期天数 [0,6] 0 为周日
    return weeks
}

// 校验是否为闰年
function isLeap(year) {
    // 注被100整除可能是闰年
    let leapRes = year % 4 === 0 ? (year % 100 !== 0 ? 1 : year % 400 === 0 ? 1 : 0) : 0
    return leapRes;
}

// 返回某月的天数
function daysOfWeek(year) {
    return [31, 28 + isLeap(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
}


// 计算每个月的日期排列
export function calendarOfMonth(year, month) {
    const calendarDays = [];

    // const lastYear = month == 0 ? year - 1 : year; // 上一月的年份
    const lastMonth = month == 0 ? 12 : month - 1; // 上一月
    // const nextYear = month == 12 ? year + 1 : year; // 下个月的年份
    // const nextMonth = month == 12 ? 0 : month + 1; // 下个月
    month = month == 0 ? month + 1 : month;
    // 补全当月上个天数
    const curWeek = getWeekDay(year, month, 1); // 当月第一天周几
    const lastMonthDays = daysOfWeek(year)[lastMonth - 1]; // 上个月的总天数
    for (let i = 0; i < curWeek; i++) {
        calendarDays.push({
            // year: lastYear,
            // month: lastMonth,
            day: lastMonthDays - (curWeek - 1 - i),
            isCurrent: false,
        })
    }

    // 加入当前月份天数
    const curMonthDays = daysOfWeek(year)[month - 1];
    for (let j = 0; j < curMonthDays; j++) {
        calendarDays.push({
            // year,
            // month,
            day: j + 1,
            isCurrent: true,
        })
    }
    //  补全剩余天数
    const fillDays = days - calendarDays.length;
    for (let k = 0; k < fillDays; k++) {
        calendarDays.push({
            // year: nextYear,
            // month: nextMonth,
            day: k + 1,
            isCurrent: false,
        })
    }
    return calendarDays;
}