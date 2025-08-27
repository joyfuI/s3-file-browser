const humanBytes = (bytes: number, fractionDigits = 2): string => {
  if (bytes === 0) {
    return '0 B';
  }
  const k = 1024;
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.min(
    Math.floor(Math.log(bytes) / Math.log(k)),
    units.length - 1,
  );
  const value = bytes / k ** i;
  const fixed = value.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: fractionDigits,
    useGrouping: false,
  });
  return `${fixed} ${units[i]}`;
};

export default humanBytes;
