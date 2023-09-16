import dayjs from 'dayjs';

export const formatDate = (dayjs: dayjs.Dayjs) : string => {
    return dayjs.format('YYYY-MM-DD');
}