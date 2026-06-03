// =====================================================
// ROYAL FUTSAL NEPAL - FINAL FULL SCRIPT
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ================= PRELOADER ================= */
  window.addEventListener("load", () => {
    const preloader = document.getElementById("preloader");
    preloader && setTimeout(() => preloader.classList.add("hidden"), 1500);
  });

  /* ================= THEME TOGGLE ================= */
  const themeToggle = document.getElementById("themeToggle");
  let theme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", theme);

  themeToggle?.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  });

  /* ================= NAVIGATION ================= */
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  window.addEventListener("scroll", () => {
    navbar?.classList.toggle("scrolled", window.scrollY > 50);
  });

  navToggle?.addEventListener("click", () => {
    navMenu?.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu?.classList.remove("active");
      navToggle?.classList.remove("active");
    });
  });

  /* ================= LIVE STATUS ================= */
  const liveStatusBar = document.getElementById("liveStatusBar");
  const liveStatusText = document.getElementById("liveStatusText");

  const statuses = [
    "3 slots available this evening!",
    "Weekend bookings filling fast!",
    "Saturday premium slots available!",
    "Book now to secure your game!"
  ];

  setTimeout(() => {
    if (liveStatusBar && liveStatusText) {
      liveStatusBar.classList.add("visible");
      liveStatusText.textContent =
        statuses[Math.floor(Math.random() * statuses.length)];
    }
  }, 3000);

  document.getElementById("closeStatus")?.addEventListener("click", () => {
    liveStatusBar?.classList.remove("visible");
  });

  /* ================= STATS COUNTER ================= */
  const counters = document.querySelectorAll(".stat-number[data-count]");
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counters.forEach(el => {
          let current = 0;
          const target = +el.dataset.count;
          const inc = target / 100;
          const timer = setInterval(() => {
            current += inc;
            if (current >= target) {
              el.textContent = target;
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(current);
            }
          }, 20);
        });
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  document.querySelector(".hero-stats") &&
    counterObserver.observe(document.querySelector(".hero-stats"));

  /* ================= DASHBOARD ================= */
  function updateDashboard() {
    const d = new Date();
    document.getElementById("dashboardDate").textContent = d.toDateString();

    const booked = Math.floor(Math.random() * 6) + 4;
    document.getElementById("bookedCount").textContent = booked;
    document.getElementById("availableCount").textContent = 16 - booked;

    let next = d.getHours() + 1;
    if (next > 22) next = 6;
    document.getElementById("nextSlot").textContent =
      `${next > 12 ? next - 12 : next}:00 ${next >= 12 ? "PM" : "AM"}`;
  }
  updateDashboard();

  /* ================= BOOKING SYSTEM ================= */

  let selectedDate = null;
  let selectedSlot = null;

  const bookings = {};
  const pricingSlots = [
    "06:00 - 07:00","07:00 - 08:00","08:00 - 09:00","09:00 - 10:00",
    "10:00 - 11:00","11:00 - 12:00","12:00 - 13:00","13:00 - 14:00",
    "14:00 - 15:00","15:00 - 16:00","16:00 - 17:00","17:00 - 18:00",
    "18:00 - 19:00","19:00 - 20:00","20:00 - 21:00","21:00 - 22:00"
  ];

  function hourlyRate(date) {
    return date.getDay() === 6 ? 3000 : 2500; // Saturday = 3000
  }

  /* ---- Calendar ---- */
  let currentMonth = new Date();
  const calendarGrid = document.getElementById("calendarGrid");
  const monthLabel = document.getElementById("currentMonth");

  function renderCalendar() {
    calendarGrid.innerHTML = "";
    monthLabel.textContent = currentMonth.toLocaleDateString("en-US", {
      month: "long", year: "numeric"
    });

    const days = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();

    for (let i = 1; i <= days; i++) {
      const d = document.createElement("div");
      d.className = "calendar-day";
      d.textContent = i;

      d.onclick = () => {
        selectedDate = new Date(
          currentMonth.getFullYear(),
          currentMonth.getMonth(),
          i
        );
        document.getElementById("selectedDate").textContent =
          selectedDate.toDateString();
        renderSlots();
      };
      calendarGrid.appendChild(d);
    }
  }

  renderCalendar();
  document.getElementById("prevMonth").onclick = () => {
    currentMonth.setMonth(currentMonth.getMonth() - 1);
    renderCalendar();
  };
  document.getElementById("nextMonth").onclick = () => {
    currentMonth.setMonth(currentMonth.getMonth() + 1);
    renderCalendar();
  };

  /* ---- Time Slots ---- */
  function renderSlots() {
    const container = document.getElementById("timeSlots");
    container.innerHTML = "";

    pricingSlots.forEach(slot => {
      const div = document.createElement("div");
      div.className = "time-slot";
      div.innerHTML = `
        <div>${slot}</div>
        <div>NPR ${hourlyRate(selectedDate)}</div>
      `;
      div.onclick = () => selectSlot(slot);
      container.appendChild(div);
    });
  }

  function selectSlot(slot) {
    selectedSlot = {
      time: slot,
      rate: hourlyRate(selectedDate),
      hours: 1
    };

    document.getElementById("bookingSummary").style.display = "block";
    document.getElementById("summaryDate").textContent = selectedDate.toDateString();
    document.getElementById("summaryTime").textContent = slot;

    updateTotal();
  }

  const durationSelect = document.getElementById("duration");

  function updateTotal() {
    selectedSlot.hours = +durationSelect.value;
    const total = selectedSlot.hours * selectedSlot.rate;
    document.getElementById("summaryPrice").textContent = `NPR ${total}`;
  }

  durationSelect?.addEventListener("change", updateTotal);

  /* ================= PAYMENT ================= */
  document.getElementById("proceedPayment").onclick = () => {
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    if (!name || !phone) return alert("Name & phone required");

    const total = selectedSlot.hours * selectedSlot.rate;

    document.getElementById("paymentDate").textContent = selectedDate.toDateString();
    document.getElementById("paymentTime").textContent = selectedSlot.time;
    document.getElementById("paymentName").textContent = name;
    document.getElementById("paymentAmount").textContent = `NPR ${total}`;

    document.getElementById("paymentModal").classList.add("active");
  };

  document.querySelectorAll(".payment-option").forEach(opt => {
    opt.onclick = () => {
      const msg = `Hi! I've booked a futsal slot:
Date: ${selectedDate.toDateString()}
Time: ${selectedSlot.time}
Duration: ${selectedSlot.hours} hour(s)
Rate: NPR ${selectedSlot.rate}/hr
Total: NPR ${selectedSlot.hours * selectedSlot.rate}

Please confirm my booking.`;

      window.open(
        `https://wa.me/9779861893463?text=${encodeURIComponent(msg)}`,
        "_blank"
      );

      document.getElementById("paymentModal").classList.remove("active");
      document.getElementById("successModal").classList.add("active");
    };
  });

  document.getElementById("closeModal")?.addEventListener("click", () => {
    document.getElementById("paymentModal").classList.remove("active");
  });
  document.getElementById("closeSuccess")?.addEventListener("click", () => {
    document.getElementById("successModal").classList.remove("active");
  });

});
