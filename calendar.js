const events = [
  { title: "Shangalu Latin Music", date: "2025-03-29", time: "8pm" },
  { title: "Talent Show Tuesdays with Kira", date: "2025-04-01", time: "8pm" },
  { title: "Open Jam Night", date: "2025-04-03", time: "8pm" },
  { title: "Latin Dance with DJ Tony", date: "2025-04-04", time: "9pm" },
  { title: "Atomic City U2 Tribute", date: "2025-04-05", time: "8pm" },
  { title: "Talent Show Tuesdays with Kira", date: "2025-04-08", time: "8pm" },
  { title: "Open Jam Night", date: "2025-04-10", time: "8pm" },
  { title: "Latin Dance with DJ Tony", date: "2025-04-11", time: "9pm" },
  { title: "Fast Eddie / Classic Rock", date: "2025-04-12", time: "8pm" },
  { title: "Talent Show Tuesdays with Kira", date: "2025-04-15", time: "8pm" },
  { title: "Open Jam Night", date: "2025-04-17", time: "8pm" },
  { title: "Latin Dance with DJ Tony", date: "2025-04-18", time: "9pm" },
  { title: "Talent Show Tuesdays with Kira", date: "2025-04-22", time: "8pm" },
  { title: "Open Jam Night", date: "2025-04-24", time: "8pm" },
  { title: "Latin Dance with DJ Tony", date: "2025-04-25", time: "9pm" },
  { title: "Talent Show Tuesdays with Kira", date: "2025-04-29", time: "8pm" },
  { title: "Open Jam Night", date: "2025-05-01", time: "8pm" },
  { title: "Latin Dance with DJ Tony", date: "2025-05-02", time: "9pm" },
  { title: "Groovonix Cinco De Mayo Party", date: "2025-05-03", time: "8pm" },
  { title: "Talent Show Tuesdays with Kira", date: "2025-05-06", time: "8pm" },
  { title: "Open Jam Night", date: "2025-05-08", time: "8pm" },
  { title: "Latin Dance with DJ Tony", date: "2025-05-09", time: "9pm" },
  { title: "Talent Show Tuesdays with Kira", date: "2025-05-13", time: "8pm" },
  { title: "Open Jam Night", date: "2025-05-15", time: "8pm" },
  { title: "Latin Dance with DJ Tony", date: "2025-05-16", time: "9pm" },
  { title: "Talent Show Tuesdays with Kira", date: "2025-05-20", time: "8pm" },
  { title: "Open Jam Night", date: "2025-05-22", time: "8pm" },
  { title: "Latin Dance with DJ Tony", date: "2025-05-23", time: "9pm" },
  { title: "Talent Show Tuesdays with Kira", date: "2025-05-27", time: "8pm" },
  { title: "Open Jam Night", date: "2025-05-29", time: "8pm" },
  { title: "Latin Dance with DJ Tony", date: "2025-05-30", time: "9pm" },
];

const today = new Date();

function isSaturday(date) {
  return date.getDay() === 6;
}

function isFuture(date) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return date >= now;
}

function isSaturdayTBA(dateStr) {
  return events.some(event => event.date === dateStr && event.title === "TBA");
}


let lastSelectedCell = null;
let currentDate = new Date();


function formatEventLabel(dateStr, time) {
  const [year, month, day] = dateStr.split('-').map(Number);
  const eventDate = new Date(year, month - 1, day);
  const now = new Date();
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const displayDate = new Date(eventDate);
  displayDate.setHours(0, 0, 0, 0);

  if (displayDate.getTime() === today.getTime()) {
    return `Tonight at ${time}`;
  } else if (displayDate.getTime() === tomorrow.getTime()) {
    return `Tomorrow at ${time}`;
  } else {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formatted = eventDate.toLocaleDateString(undefined, options);
    return `${formatted} at ${time}`;
  }
}

function getNextUpcomingEvent() {
  const now = new Date();

  const parseEventDateTime = (event) => {
    const [hourStr, modifier] = event.time.toLowerCase().replace(' ', '').match(/(\d+)(am|pm)/).slice(1);
    let hour = parseInt(hourStr);
    if (modifier === 'pm' && hour !== 12) hour += 12;
    if (modifier === 'am' && hour === 12) hour = 0;

    return new Date(`${event.date}T${hour.toString().padStart(2, '0')}:00:00`);
  };

  const sortedEvents = [...events].sort((a, b) => parseEventDateTime(a) - parseEventDateTime(b));
  return sortedEvents.find(event => {
    const eventTime = parseEventDateTime(event);
    return eventTime >= now;
  });
  
}

function updateEventDetail(event) {
  const eventInfoBox = document.getElementById("event-info");

  const [year, month, day] = event.date.split('-').map(Number);
const eventDate = new Date(year, month - 1, day); // Local time, no timezone offset
  const dateString = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  const timeString = event.time;

  eventInfoBox.innerHTML = `
    <h3>${event.title}</h3>
    <p><strong>${dateString} at ${timeString}</strong></p>
    <p>${event.description || ''}</p>
  `;

  const addLink = document.getElementById("add-to-google-calendar");
  addLink.href = formatGoogleCalendarUrl(event);
  addLink.style.display = "inline-block";
}

function updateMusicBanner(event) {
  const banner = document.getElementById("music-banner");
  const [year, month, day] = event.date.split('-').map(Number);
  const eventDate = new Date(year, month - 1, day);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const isToday =
    eventDate.getFullYear() === today.getFullYear() &&
    eventDate.getMonth() === today.getMonth() &&
    eventDate.getDate() === today.getDate();

  const label = isToday
    ? `Tonight at ${event.time}: ${event.title}`
    : `Next Up – ${formatEventLabel(event.date, event.time)}: ${event.title}`;

  banner.textContent = label;
}


function formatGoogleCalendarUrl(event) {
  const title = encodeURIComponent(event.title);
  const details = encodeURIComponent(event.description || '');
  const location = encodeURIComponent(event.location || 'Blues Katz Bar');
  const start = new Date(event.date);
  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2-hour event

  const startUTC = start.toISOString().replace(/-|:|\.\d\d\d/g,"");
  const endUTC = end.toISOString().replace(/-|:|\.\d\d\d/g,"");

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startUTC}/${endUTC}&details=${details}&location=${location}&sf=true&output=xml`;
}


function showNextUpcomingEvent() {
  const event = getNextUpcomingEvent();

  if (!event) return;

  updateEventDetail(event);
  updateMusicBanner(event);

  const [year, month, day] = event.date.split('-').map(Number);
  const cells = document.querySelectorAll(`[data-date='${day}']`);

  cells.forEach(cell => {
    const cellDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), parseInt(cell.dataset.date));
    if (
      cellDate.getDate() === day &&
      cellDate.getMonth() === (month - 1) &&
      cellDate.getFullYear() === year
    ) {
      if (lastSelectedCell) {
        lastSelectedCell.classList.remove("selected");
      }
      cell.classList.add("selected");
      lastSelectedCell = cell;
    }
  });
}




document.addEventListener('DOMContentLoaded', () => {
  const calendarTitle = document.getElementById('calendar-title');
  const calendarBody = document.getElementById('calendar-body');
  const weekDetail = document.getElementById('week-detail-grid');
  const weekView = document.getElementById('week-view');

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  function renderCalendar(dateObj) {
    const month = dateObj.getMonth();
    const year = dateObj.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    calendarTitle.textContent = `${monthNames[month]} ${year}`;
    calendarBody.innerHTML = "";

    let date = 1;
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");
      let rowHasDate = false;

      for (let j = 0; j < 7; j++) {
        const cell = document.createElement("td");

        if (i === 0 && j < firstDay) {
          cell.textContent = "";
          cell.classList.add("no-date");
        } else if (date > daysInMonth) {
          cell.textContent = "";
          cell.classList.add("no-date");
        } else {
          rowHasDate = true;
          cell.setAttribute("data-date", date);
          const clickedDate = new Date(year, month, date);

          if (
            date === new Date().getDate() &&
            month === new Date().getMonth() &&
            year === new Date().getFullYear()
          ) {
            cell.classList.add("today");
          }

          const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${date.toString().padStart(2, '0')}`;
          const dayEvents = events.filter(e => e.date === dateStr);
          
          const clickedDateObj = new Date(year, month, date);

          if (
            isSaturday(clickedDateObj) &&
            isFuture(clickedDateObj) &&
            !events.some(event => event.date === dateStr)) {
              const bookBtn = document.createElement("a");
              bookBtn.href = "booking.html";
              bookBtn.textContent = "Book";
              bookBtn.className = "book-band-button";
              cell.appendChild(bookBtn);
          }

          
          if (dayEvents.length > 0) {
            dayEvents.forEach(event => {
              const eventDiv = document.createElement("div");
              eventDiv.classList.add("event-preview");
              eventDiv.textContent = `${event.time} - ${event.title}`;
              cell.appendChild(eventDiv);
            });
          }

          cell.addEventListener("click", () => {
            const clickedDay = cell.getAttribute("data-date").padStart(2, '0');
            const clickedDateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${clickedDay}`;
            const matchedEvent = events.find(e => e.date === clickedDateStr);
            const clickedDateObj = new Date(year, month, parseInt(clickedDay));
            const eventInfoBox = document.getElementById("event-info");
            const addLink = document.getElementById("add-to-google-calendar");
          
            if (lastSelectedCell) lastSelectedCell.classList.remove("selected");
            cell.classList.add("selected");
            lastSelectedCell = cell;
          
            const formattedDate = clickedDateObj.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            });
          
            if (matchedEvent) {
              updateEventDetail(matchedEvent);
            } else {
              const [year, month, day] = dateStr.split('-').map(Number);
              const clickedDateObj = new Date(year, month - 1, day);
              const isSunday = clickedDateObj.getDay() === 0;
            
              eventInfoBox.innerHTML = `
                <h3>${isSunday ? 'Closed' : 'No event scheduled'}</h3>
                <p><strong>${formattedDate}</strong></p>
                <p></p>
              `;
              addLink.style.display = "none";
            }
            
            
          });
          
          
          

          date++;
        }

        row.appendChild(cell);
      }

      if (rowHasDate) {
        calendarBody.appendChild(row);
      }
    }
  }

  const calendarTitleWrapper = document.getElementById('calendar-title-wrapper');
  const prevBtn = document.createElement("button");
  const nextBtn = document.createElement("button");
  prevBtn.textContent = "←";
  nextBtn.textContent = "→";
  prevBtn.className = "calendar-nav";
  nextBtn.className = "calendar-nav";

  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  calendarTitleWrapper.prepend(prevBtn);
  calendarTitleWrapper.appendChild(nextBtn);

  renderCalendar(currentDate);
  showNextUpcomingEvent();
});

const imageSection = document.querySelector('.image-break');

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      imageSection.classList.add('in-view');
    }
  },
  { threshold: 0.1 }
);

observer.observe(imageSection);


// Mobile check and event panel display adjustments
function handleMobileView() {
  const mediaQuery = window.matchMedia("(max-width: 768px)");

  // If on mobile, hide the calendar and event detail box
  if (mediaQuery.matches) {
      // Hide calendar
      document.getElementById('calendar-wrapper').style.display = 'none';
      
      // Hide event detail box
      document.getElementById('event-detail').style.display = 'none';
      
      // Adjust event info box for mobile layout
      document.querySelector('.event-info-box').style.display = 'block';
  } else {
      // Show calendar on larger screens
      document.getElementById('calendar-wrapper').style.display = 'block';
      
      // Show event detail box on larger screens
      document.getElementById('event-detail').style.display = 'block';
  }
}

// Call the function on page load and window resize
window.addEventListener('load', handleMobileView);
window.addEventListener('resize', handleMobileView);

