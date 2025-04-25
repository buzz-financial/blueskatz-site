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
      banner.textContent = `🎶 ${label}: ${event.title} at ${event.time}`;
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

    const slides = document.querySelectorAll(".carousel-slide");
    let currentSlide = 0;
    
    function showNextSlide() {
      slides[currentSlide].classList.remove("active");
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add("active");
    }
    
    setInterval(showNextSlide, 4000); // change slide every 4 seconds
    
    function confirmAge(isOfAge) {
      if (isOfAge) {
        document.getElementById('age-gate').style.display = 'none';
        sessionStorage.setItem('isOfAge', 'true'); // Only for this browser session
      } else {
        window.location.href = "https://www.responsibility.org/";
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
    