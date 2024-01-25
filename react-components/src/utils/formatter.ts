import * as d3 from 'd3';
import dayjs from 'dayjs';

function number(value: number | null, specifier = ',.0f') {
  if (value === null) {
    return '';
  }

  const locale = d3.formatLocale({
    decimal: ',',
    thousands: '\u00a0',
    grouping: [3],
    currency: ['', '\u00a0€'],
    minus: '\u2212',
    percent: '\u202f%',
  });

  const format = locale.format(specifier);
  return format(value);
}

function date(value: string | null, format = 'DD MMM YYYY', offset = false) {
  if (value === null) {
    return '';
  }

  const milliseconds = offset
    ? new Date(value).getTime() - new Date().getTimezoneOffset() * 60 * 1000
    : new Date(value).getTime();

  return dayjs(milliseconds).locale('ru').format(format);
}

export const Formatter = {
  number,
  date,
};
