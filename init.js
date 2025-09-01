// Typing effect for subtitle (looping)
document.addEventListener("DOMContentLoaded", function () {
  const subtitle = document.querySelector(".title-subhead");
  const text = "A Programmer...";
  let i = 0;
  let deleting = false;

  function typing() {
    if (!deleting && i <= text.length) {
      subtitle.textContent = text.substring(0, i);
      i++;
      setTimeout(typing, 150);
    } else if (deleting && i >= 0) {
      subtitle.textContent = text.substring(0, i);
      i--;
      setTimeout(typing, 100);
    } else {
      deleting = !deleting;
      setTimeout(typing, 500);
    }
  }
  typing();
});
// Data
const solvedData = {
  leetcode: 150,
  codingNinjas: 110,
  other: 50
};
const totalSolved = solvedData.leetcode + solvedData.codingNinjas + solvedData.other;

const ctx = document.getElementById('codingPie');
const centerText = document.getElementById('centerText');

if (ctx) {
  const codingChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['LeetCode', 'Coding Ninjas', 'Other'],
      datasets: [{
        data: [solvedData.leetcode, solvedData.codingNinjas, solvedData.other],
        backgroundColor: ['#3498db', '#f1c40f', '#e74c3c'],
        borderWidth: 3,
        hoverOffset: 20,
        cutout: '75%'
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false } // disable default tooltip
      },
      animation: {
        onComplete: () => {
          centerText.textContent = totalSolved; // Show total initially
        }
      },
      onHover: (event, chartElement) => {
        if (chartElement.length) {
          const index = chartElement[0].index;
          const value = codingChart.data.datasets[0].data[index];
          centerText.textContent = value; // Show hovered value
        } else {
          centerText.textContent = totalSolved; // Reset to total
        }
      }
    }
  });
}

// Reveal animation on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".intro, .skills, .row, .about, .footer").forEach((el) => {
  el.classList.add("hidden");
  observer.observe(el);
});

// Add hover pulse effect for footer icons
document.querySelectorAll(".foot").forEach((icon) => {
  icon.addEventListener("mouseenter", () => {
    icon.classList.add("pulse");
  });
  icon.addEventListener("mouseleave", () => {
    icon.classList.remove("pulse");
  });
});

// Dark/Light Mode Toggle
const toggleBtn = document.createElement("button");
toggleBtn.textContent = "🌙";
toggleBtn.classList.add("theme-toggle");
document.body.appendChild(toggleBtn);

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    toggleBtn.textContent = "☀️";
  } else {
    toggleBtn.textContent = "🌙";
  }
});
