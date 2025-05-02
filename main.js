document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("emailForm");
    const emailInput = document.getElementById("emailInput");
    const feedback = document.getElementById("emailFeedback");
  
    form.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (emailRegex.test(email)) {
        feedback.textContent = `Thanks for signing up, ${email}!`;
        feedback.style.color = "green";
        emailInput.value = "";
      } else {
        feedback.textContent = "Please enter a valid email address.";
        feedback.style.color = "red";
      }
    });
  });
  
  function scrollToCalendar() {
    const calendar = document.getElementById("calendar");
    if (calendar) {
      calendar.scrollIntoView({ behavior: "smooth" });
    }
  }
  
  function getTodayString() {
    const today = new Date();
    return today.toISOString().split("T")[0];
  }  

  function updateMusicBanner(event) {
    const banner = document.querySelector(".music-banner");
    if (!banner) return;
  
    if (event) {
      const isToday = event.date === getTodayString();
      const label = isToday ? "Tonight" : "Next";
  
      if (isToday) {
        banner.textContent = `🎶 ${label}: ${event.title} at ${event.time}`;
      } else {
        const [year, month, day] = event.date.split('-').map(Number);
        const eventDate = new Date(year, month - 1, day); // Month is 0-based
        const options = { weekday: 'long' };
        const dayName = eventDate.toLocaleDateString(undefined, options);
        banner.textContent = `🎶 ${label}: ${event.title} — ${dayName} at ${event.time}`;
      }
    } else {
      banner.textContent = "🎶 No upcoming events";
    }
  }
  
  
  
       
        
    function submitEmail(event) {
      event.preventDefault(); // Prevents page reload

      const email = document.getElementById("emailInput").value;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (emailRegex.test(email)) {
        alert(`Thanks for signing up, ${email}!`);
        document.getElementById("emailInput").value = "";
      } else {
        alert("Please enter a valid email address.");
      }
    }

    
    function confirmAge(isOfAge) {
      if (isOfAge) {
        document.getElementById('age-gate').style.display = 'none';
        sessionStorage.setItem('isOfAge', 'true'); // Only for this browser session
      } else {
        window.location.href = blank;
      }
    }
    
    window.addEventListener('DOMContentLoaded', () => {
      if (sessionStorage.getItem('isOfAge') === 'true') {
        document.getElementById('age-gate').style.display = 'none';
      } else {
        document.getElementById('age-gate').style.display = 'flex';
      }
    });
    
    window.addEventListener("load", () => {
      const loader = document.getElementById("vinyl-loader");
      if (loader) {
        loader.style.opacity = "0";
        loader.style.transition = "opacity 0.5s ease-out";
        setTimeout(() => loader.remove(), 500);
      }
    });


    document.addEventListener('DOMContentLoaded', function () {
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  const eventInfoBox = document.querySelector('.event-info-box');
  
  let currentEventIndex = 0;
  const events = [/* Array of events data */]; // Your events data

  function updateEventInfo() {
    const event = events[currentEventIndex];
    eventInfoBox.innerHTML = `
      <h2>${event.title}</h2>
      <p>${event.date} at ${event.time}</p>
      <p>${event.description}</p>
    `;
  }

  leftArrow.addEventListener('click', function () {
    currentEventIndex = (currentEventIndex - 1 + events.length) % events.length;
    updateEventInfo();
  });

  rightArrow.addEventListener('click', function () {
    currentEventIndex = (currentEventIndex + 1) % events.length;
    updateEventInfo();
  });

  // Initialize the event info on page load
  updateEventInfo();
});


// Cache elements
const eventInfoBox = document.querySelector('.event-info-box');
const prevArrow = document.querySelector('.prev-event');
const nextArrow = document.querySelector('.next-event');
let currentEventIndex = 0;

// Function to update the event details
function updateEventInfo(eventIndex) {
  const event = events[eventIndex];
  eventInfoBox.innerHTML = `
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Description:</strong> ${event.description}</p>
  `;
  eventInfoBox.setAttribute('data-event-index', eventIndex);
  // Update the 'Next Event' card number
  const eventNumber = eventIndex + 1; // Event # is 1-based
  eventInfoBox.querySelector('.event-number').textContent = `#${eventNumber}`;
}

// Initialize the first event
updateEventInfo(currentEventIndex);

// Function to go to the next event
function showNextEvent() {
  currentEventIndex = (currentEventIndex + 1) % events.length;  // Loop back to first event
  updateEventInfo(currentEventIndex);
}

// Function to go to the previous event
function showPrevEvent() {
  currentEventIndex = (currentEventIndex - 1 + events.length) % events.length;  // Loop to last event
  updateEventInfo(currentEventIndex);
}

// Event listeners for arrow buttons
nextArrow.addEventListener('click', showNextEvent);
prevArrow.addEventListener('click', showPrevEvent);

// Function to handle mobile-friendly view (centered elements and event box interaction)
function handleMobileView() {
  const mediaQuery = window.matchMedia("(max-width: 768px)");
  if (mediaQuery.matches) {
      // Center elements on mobile
      document.body.classList.add('mobile-view');
  } else {
      document.body.classList.remove('mobile-view');
  }
}

// Call the mobile view handler on window resize
window.addEventListener('resize', handleMobileView);
handleMobileView();
