export const getDateConstraints = () => {
  const today = new Date().toISOString().split('T')[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  return { today, maxDateStr };
};

export const validateDate = (selectedDate, maxDate) => {
  const currentDate = new Date();
  selectedDate.setHours(0, 0, 0, 0);
  currentDate.setHours(0, 0, 0, 0);

  if (selectedDate < currentDate) {
    return "Please select a future date";
  }
  if (selectedDate > maxDate) {
    return "Bookings are only available up to 6 months in advance";
  }
  return "";
};