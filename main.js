// Main JavaScript for Blues Katz Bar website

// Email form handling (if it exists)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("emailForm");
  const emailInput = document.getElementById("emailInput");
  const feedback = document.getElementById("emailFeedback");

  if (form && emailInput && feedback) {
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
  }
});

// Scroll to calendar function
function scrollToCalendar() {
  const calendar = document.getElementById("calendar");
  if (calendar) {
    calendar.scrollIntoView({ behavior: "smooth" });
  }
}

// Age gate functionality
function confirmAge(isOfAge) {
  if (isOfAge) {
    document.getElementById('age-gate').style.display = 'none';
    sessionStorage.setItem('isOfAge', 'true');
  } else {
    window.location.href = "about:blank";
  }
}

// Check age gate on page load
window.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('isOfAge') === 'true') {
    document.getElementById('age-gate').style.display = 'none';
  } else {
    document.getElementById('age-gate').style.display = 'flex';
  }
});

// Vinyl loader (if exists)
window.addEventListener("load", () => {
  const loader = document.getElementById("vinyl-loader");
  if (loader) {
    loader.style.opacity = "0";
    loader.style.transition = "opacity 0.5s ease-out";
    setTimeout(() => loader.remove(), 500);
  }
});

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// Mobile navigation
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});

// MailerLite integration
(function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
.push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
(window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
ml('account', '1573519');
