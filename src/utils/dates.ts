export const formatDateToISO = (date: Date) => {
  function pad(number: number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());
  const milliseconds = pad(date.getMilliseconds());

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
};

export const fromISO = (iso: string) => {
  const dateArray = iso.split('T')[0].split('-');
  return `${dateArray[2]}.${dateArray[1]}.${dateArray[0]}`;
};

export const getToday = () => {
  let start = new Date();
  let end = new Date();
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  return {
    date_from: formatDateToISO(start),
    date_to: formatDateToISO(end),
  };
};

export const getMonth = () => {
  const start = new Date();
  const firstDay = new Date(start.getFullYear(), start.getMonth(), 1);
  const lastDay = new Date(start.getFullYear(), start.getMonth() + 1, 0);

  firstDay.setHours(0, 0, 0, 0);
  lastDay.setHours(23, 59, 59, 999);

  return {
    date_from: formatDateToISO(firstDay),
    date_to: formatDateToISO(lastDay),
  };
};

export const getYesterday = () => {
  const start = new Date();
  const end = new Date();
  start.setDate(start.getDate() - 1);
  start.setHours(0, 0, 0, 0);
  end.setDate(end.getDate() - 1);
  end.setHours(23, 59, 59, 999);

  return {
    date_from: formatDateToISO(start),
    date_to: formatDateToISO(end),
  };
};
