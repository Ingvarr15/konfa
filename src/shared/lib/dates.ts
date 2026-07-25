import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isToday from 'dayjs/plugin/isToday';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/ru';

type Format
  = | 'DD.MM.YYYY (HH:mm)'
    | 'DD.MM.YYYY'
    | 'HH:mm';

type FormatDate = (
  date: dayjs.ConfigType,
  format?: Format,
  type?: 'unix',
) => string;

dayjs.locale('ru');
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(localeData);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(isToday);
dayjs.extend(isSameOrAfter);
dayjs.extend(duration);

export const formatDate: FormatDate = (
  date,
  format = 'DD.MM.YYYY (HH:mm)',
  type,
) => {
  if (!date) {
    return '-';
  }

  if (type === 'unix' && typeof date === 'number') {
    return dayjs.unix(date).format(format);
  }

  return dayjs(date).format(format);
};

export { dayjs };
