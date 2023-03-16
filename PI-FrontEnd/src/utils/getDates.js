export function getDates(startDate, endDate) {
    let dates = [];
    let currentDate = new Date(startDate);
  
    while (new Date(startDate) <= new Date(endDate)) {
      dates.push(currentDate.toISOString().slice(0, 10));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return(dates)
  }
  
//   getDates("2023-01-27","2023-02-03");