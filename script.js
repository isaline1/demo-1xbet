document.addEventListener("DOMContentLoaded", function () {
  function loadHTML(className, fileName) {
    fetch(fileName)
      .then((response) => response.text())
      .then((data) => {
        document.querySelector(`.${className}`).innerHTML = data;
      })
      .catch((error) => console.error("Ошибка загрузки файла:", error));
  }

  loadHTML("header-block", "header.html");
  loadHTML("footer-block", "footer.html");
});

function toggleMenu() {
  const sideMenu = document.querySelector(".side-menu");
  sideMenu.classList.toggle("active");
}

// анимация заголовков

document.addEventListener("DOMContentLoaded", function () {
  const animatedText = document.querySelectorAll(".animated-text");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedText.forEach((el) => observer.observe(el));
});

// анимация заголовков с картинками

document.addEventListener("DOMContentLoaded", function () {
  const animatedText = document.querySelectorAll(".animated-text2");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  animatedText.forEach((el) => observer.observe(el));
});

// круглая кнопка виджет
document.addEventListener("DOMContentLoaded", function () {
  const fixedElements = document.querySelectorAll(".fixed-btn");
  const scrollThreshold = 500;
  const mobileBreakpoint = 800;

  function isPopupOpen() {
    const popup = document.getElementById("popup-take-part");
    return popup && getComputedStyle(popup).display === "flex";
  }

  function isFooterVisible() {
    const footer = document.querySelector(".footer");
    if (!footer) return false;
    const rect = footer.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  function isContactVisible() {
    const contact = document.querySelector(".contact-container");
    if (!contact) return false;
    const rect = contact.getBoundingClientRect();

    return rect.top <= window.innerHeight && rect.bottom >= 0;
  }

  function checkScroll() {
    const isMobile = window.innerWidth <= mobileBreakpoint;
    const contactVisible = isContactVisible();

    fixedElements.forEach((fixedElement) => {
      if (isPopupOpen() || isFooterVisible()) {
        fixedElement.classList.add("hidden");
        return;
      }

      if (isMobile) {
        if (window.scrollY > scrollThreshold) {
          fixedElement.classList.add("visible");
          fixedElement.classList.remove("hidden");
        } else {
          fixedElement.classList.remove("visible");
          fixedElement.classList.add("hidden");
        }
      } else {
        if (contactVisible) {
          fixedElement.classList.remove("visible");
          fixedElement.classList.add("hidden");
        } else {
          fixedElement.classList.add("visible");
          fixedElement.classList.remove("hidden");
        }
      }
    });
  }

  window.addEventListener("scroll", checkScroll);
  window.addEventListener("resize", checkScroll);
  checkScroll();
});

// открытие формы
document.addEventListener("DOMContentLoaded", function () {
  function loadHTML(className, fileName) {
    const popupBlock = document.querySelector(`.${className}`);

    fetch(fileName)
      .then((response) => response.text())
      .then((data) => {
        popupBlock.innerHTML = data;

        initializePopup();
        addCustomHeader();
      })
      .catch((error) => {
        console.error("Ошибка загрузки файла:", error);
      });
  }

  function initializePopup() {
    const modal = document.getElementById("popup-take-part");
    const closeBtn = modal.querySelector(".close");

    document.querySelectorAll(".open-popup-link").forEach((link) => {
      link.addEventListener("click", (event) => {
        event.preventDefault();
        modal.style.display = "flex";
        setTimeout(() => {
          modal.classList.add("show");
        }, 10);
      });
    });

    closeBtn.addEventListener("click", () => {
      modal.classList.remove("show");
      setTimeout(() => {
        modal.style.display = "none";
      }, 300);
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.classList.remove("show");
        setTimeout(() => {
          modal.style.display = "none";
        }, 300);
      }
    });

    document
      .getElementById("contactForm")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        alert("The form has been successfully submitted!");
        modal.classList.remove("show");
        setTimeout(() => {
          modal.style.display = "none";
        }, 300);
      });
  }

  function addCustomHeader() {
    const currentPath = decodeURIComponent(window.location.pathname);

    if (currentPath.endsWith("/cashagentship.html")) {
      const form = document.getElementById("contactForm");
      if (form) {
        const header = document.createElement("h2");
        header.textContent =
          "Fill out the form and a personal manager will contact you";
        header.classList.add("form-header");
        form.insertBefore(header, form.firstChild);
      }
    }
  }
  loadHTML("popup-block", "popup.html");
});

// отправка в гугл

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    messengervalue: document.getElementById("messengervalue").value,
    number: document.getElementById("number").value,
    amount: document.getElementById("amount").value,
    message: document.getElementById("message").value,
  };

  fetch(
    "https://script.google.com/macros/s/AKfycbyZ3hSK0JpB-qs61hwekX7MIMc3EBiczSJnEWXpwgSuiAShh5IG-pLshJw-Wqp5S61k3w/exec",
    {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }
  ).catch((error) => alert("Ошибка отправки: " + error));
});
