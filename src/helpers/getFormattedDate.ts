const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

/**
 * Returns a string in the format 'DD MMM YYYY' for the given date string, number or Date object.
 * @param {string | number | Date} dateString The date to format.
 * @returns {string} The formatted date string.
 */
export const getFormattedDate = (
  dateString: string | number | Date,
): string => {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
