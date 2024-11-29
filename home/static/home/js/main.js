// Initialize skill bars
function initializeSkillBars() {
  const skillBars = document.querySelectorAll(".skill-bar");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const percent = entry.target.dataset.percent;
          entry.target.style.width = `${percent}%`;
        }
      });
    },
    { threshold: 0.5 }
  );

  skillBars.forEach((bar) => observer.observe(bar));
}

// Handle contact form submission
function initializeContactForm() {
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Here you would typically send this data to a server
      console.log("Form submitted:", { name, email, message });

      // Clear form
      form.reset();
      alert("Thank you for your message! I will get back to you soon.");
    });
  }
}

// Animate elements on scroll
function initializeScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-fade-in");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedElements.forEach((element) => observer.observe(element));
}

function initializeCardTiltEffect() {
  const cards = document.querySelectorAll(".card-wrap");

  cards.forEach((cardWrap) => {
    const card = cardWrap.querySelector(".card");
    const cardBg = cardWrap.querySelector(".card-bg");
    let rect = cardWrap.getBoundingClientRect();
    let width = rect.width;
    let height = rect.height;
    let mouseX = 0;
    let mouseY = 0;
    let mouseLeaveDelay = null;

    function handleMouseMove(e) {
      mouseX = e.clientX - rect.left - width / 2;
      mouseY = e.clientY - rect.top - height / 2;

      const rX = (mouseX / width) * 30;
      const rY = (mouseY / height) * -30;
      const tX = (mouseX / width) * -40;
      const tY = (mouseY / height) * -40;

      card.style.transform = `rotateY(${rX}deg) rotateX(${rY}deg)`;
      cardBg.style.transform = `translateX(${tX}px) translateY(${tY}px)`;
    }

    function handleMouseEnter() {
      clearTimeout(mouseLeaveDelay);
      rect = cardWrap.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
    }

    function handleMouseLeave() {
      mouseLeaveDelay = setTimeout(() => {
        mouseX = 0;
        mouseY = 0;
        card.style.transform = `rotateY(0deg) rotateX(0deg)`;
        cardBg.style.transform = `translateX(0px) translateY(0px)`;
      }, 1000);
    }

    cardWrap.addEventListener("mousemove", handleMouseMove);
    cardWrap.addEventListener("mouseenter", handleMouseEnter);
    cardWrap.addEventListener("mouseleave", handleMouseLeave);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const navItems = document.querySelectorAll(".nav-item");
  const indicator = document.querySelector(".nav-indicator");

  // Set initial position
  const activeItem = document.querySelector(".nav-item");
  if (activeItem) {
    indicator.style.width = `${activeItem.offsetWidth}px`;
    indicator.style.left = `${activeItem.offsetLeft}px`;
  }

  // Update indicator position on hover
  navItems.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      indicator.style.width = `${item.offsetWidth}px`;
      indicator.style.left = `${item.offsetLeft}px`;
    });
  });

  // Update indicator position on scroll
  window.addEventListener("scroll", () => {
    const sections = ["hero", "about", "skills", "app", "contact"];
    let current = "";

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          current = section;
        }
      }
    });

    navItems.forEach((item) => {
      const href = item.getAttribute("href").substring(1);
      if (href === current) {
        indicator.style.width = `${item.offsetWidth}px`;
        indicator.style.left = `${item.offsetLeft}px`;
        item.style.color = "var(--primary)";
      } else {
        item.style.color = "var(--text)";
      }
    });
  });
});

// Initialize everything when the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeSkillBars();
  initializeContactForm();
  initializeScrollAnimations();
  initializeCardTiltEffect();
});

