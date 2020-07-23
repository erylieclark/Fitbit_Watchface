// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

export function strDay(day){
  let arrayDays = ['Sun', 'Mon', 'Tue','Wed'
                   ,'Thu','Fri','Sat'];
  return arrayDays[day];
}

export function strMonth(month){
  let arrayMonth = ['Jan','Feb','Mar','Apr',
                   'May','Jun','Jul','Aug',
                   'Sep','Oct','Nov','Dec'];
  return arrayMonth[month];
}

