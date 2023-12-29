function updateDate(){
  const now = new Date();
  const daysOfWeek = ['Sun', 'Mon', 'Tue','Wed','Thu','Fri','Sat'];
  const dayOfWeek = daysOfWeek[now.getDay()];
  const month = now.toLocaleString('default',{month: 'short'});
  const day = now.getDate();
  const dateString = `${dayOfWeek} ${day} ${month}`;
  document.getElementById('date').textContent = dateString;
}
setInterval(updateDate, 86400000);
updateDate();

function updateClock(){
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const  ampm = hours >= 12 ? 'PM' : 'AM';
  
  hours = hours % 12;
  hours = hours ? hours : 12;
  hours = hours < 10 ? "0" + hours : hours;

  const timeString = `${hours}: ${minutes} ${ampm}`;
  document.getElementById('time').textContent = timeString;
}
setInterval(updateClock, 60000);
updateClock();
