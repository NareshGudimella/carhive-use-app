import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';

dayjs.extend(updateLocale);

// moment prints "Invalid date"; dayjs prints "Invalid Date". Keep the old text.
dayjs.updateLocale('en', { invalidDate: 'Invalid date' });

// Match moment on bad input: `false` and out-of-range 'YYYY-MM-DD[ HH:mm:ss]'
// values are invalid in moment, but dayjs turns them into 1970 / rolled-over dates.
const API_DATE = /^(\d{4})-(\d{2})-(\d{2})(?:[ T](\d{2}):(\d{2}):(\d{2}))?$/;

dayjs.extend((_option, dayjsClass: any) => {
  const parse = dayjsClass.prototype.parse;
  dayjsClass.prototype.parse = function (cfg: any) {
    const { date } = cfg;
    if (date === false) {
      cfg.date = null;
    } else if (typeof date === 'string') {
      const m = API_DATE.exec(date);
      if (m) {
        const [y, mo, d, h = 0, mi = 0, s = 0] = m.slice(1).map(Number);
        const daysInMonth = new Date(y, mo, 0).getDate();
        if (
          mo < 1 ||
          mo > 12 ||
          d < 1 ||
          d > daysInMonth ||
          h > 24 ||
          mi > 59 ||
          s > 59
        ) {
          cfg.date = null;
        }
      }
    }
    return parse.call(this, cfg);
  };
});

export default dayjs;
