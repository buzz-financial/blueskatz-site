document.addEventListener('DOMContentLoaded', () => {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarTitle = document.getElementById('calendar-title');
  const calendarBody = document.getElementById('calendar-body');
  const weekDetail = document.getElementById('week-detail-grid');
  const weekView = document.getElementById('week-view');

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  calendarTitle.textContent = `${monthNames[month]} ${year}`;

  let date = 1;
  for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");
      for (let j = 0; j < 7; j++) {
          const cell = document.createElement("td");
          if (i === 0 && j < firstDay) {
              cell.textContent = "";
          } else if (date > daysInMonth) {
              cell.textContent = "";
          } else {
              cell.setAttribute("data-date", date);  // Add date as data attribute
              const clickedDate = new Date(year, month, date);
              cell.addEventListener("click", () => {
                  renderWeekView(clickedDate);
              });

              if (
                  date === now.getDate() &&
                  month === now.getMonth() &&
                  year === now.getFullYear()
              ) {
                  cell.classList.add("today");
              }

              date++;
          }
          row.appendChild(cell);
      }
      calendarBody.appendChild(row);
  }

  function renderWeekView(selectedDate) {
      weekDetail.innerHTML = "";
      weekView.classList.remove("hidden");

      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const selectedDay = selectedDate.getDay(); // 0 (Sun) to 6 (Sat)
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(selectedDate.getDate() - selectedDay);

      for (let i = 0; i < 7; i++) {
          const day = new Date(startOfWeek);
          day.setDate(startOfWeek.getDate() + i);

          const box = document.createElement("div");
          box.classList.add("day-box");
          box.innerHTML = `<strong>${dayNames[day.getDay()]}</strong><br>${monthNames[day.getMonth()]} ${day.getDate()}`;
          weekDetail.appendChild(box);
      }
  }
});
