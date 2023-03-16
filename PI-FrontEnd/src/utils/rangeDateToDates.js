export function rangeDateToDates(startDate, endDate) {
  let dates = [];
  let currentDate = new Date(startDate);

  while (new Date(startDate) <= new Date(endDate)) {
    dates.push(currentDate.toISOString().slice(0, 10));
    currentDate.setDate(currentDate.getDate() + 1);
    startDate = currentDate.toISOString().slice(0, 10);
  }
  return dates;
}
// rangeDateToDates("2023-01-27", "2023-02-03");
