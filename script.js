const PROJECTS = [
  {
    counter: "PROJECT 01 / 04",
    title: "Smart Composting System",
    subtitle: "SMART DUAL-BIN AEROBIC–ANAEROBIC COMPOSTING SYSTEM",
    image: "assets/project-compost-thesis.jpg",
    imageAlt: "Smart Dual-Bin Aerobic-Anaerobic Composting System thesis manuscript",
    overview:
      "A capstone project featuring a dual-bin system that composts organic waste aerobically in one bin and anaerobically in the other, producing fertilizer and biogas. Through a microcontroller and a sensor network, it monitors temperature, moisture, pH, and gas levels in real time.",
    role: "Design and Documentation",
    timeline: "Aug 2025 - Present",
    status: "In progress",
    features: [
      "Aerobic bin with automated tumbling for aeration and mixing",
      "Airtight anaerobic bin with biogas collection and filtration",
      "Real-time sensing: temperature, moisture, pH, methane, ammonia",
      "Documented in a full thesis manuscript"
    ],
    stack: ["Microcontroller", "Sensors", "Embedded C++"]
  },
  {
    counter: "PROJECT 02 / 04",
    title: "Peranoid",
    subtitle: "CROSS-PLATFORM PERSONAL FINANCE & EXPENSE TRACKER",
    image: "assets/project-peranoid.png",
    imageAlt: "Peranoid personal finance dashboard",
    overview:
      "A mobile-first personal finance and expense tracker deployed to the web and native Android. It pairs offline-capable local storage with Supabase authentication and cloud sync and was built with an AI-assisted development workflow.",
    role: "Developer",
    timeline: "Oct 2026",
    status: "Deployed (Private)",
    features: [
      "Hybrid storage: offline access plus Supabase cloud sync",
      "Row-Level Security and custom PostgreSQL RPC triggers",
      "Daily spend pace, balance privacy masking, and cross-filtering",
      "Thermal POS-style receipt generation"
    ],
    stack: ["JavaScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Capacitor"]
  },
  {
    counter: "PROJECT 03 / 04",
    title: "DueNow",
    subtitle: "STUDENT COURSEWORK & TASK ORGANIZER",
    image: "assets/project-duenow.jpg",
    imageAlt: "DueNow coursework tracker dashboard",
    overview:
      "A cloud-hosted academic task and coursework organizer built with Python and Streamlit. It tracks courses, tasks, and deadlines, and saves its data by syncing local state files to a private GitHub repository through REST API calls.",
    role: "Developer",
    timeline: "Oct 2026",
    status: "Deployed (Private)",
    features: [
      "Six-tab dashboard with task prioritization and overdue separation",
      "Real-time course metrics and productivity streak tracking",
      "Automated three-day trash cleanup and multi-format date parsing",
      "Data persistence through GitHub REST API sync"
    ],
    stack: ["Python", "Streamlit", "Git"]
  },
  {
    counter: "PROJECT 04 / 04",
    title: "RoverCraft Tech",
    subtitle: "FIVE-PAGE MOBILE APP WIREFRAME & FIGMA PROTOTYPE",
    image: "assets/project-rovercraft.png",
    imageAlt: "RoverCraft Tech Figma wireframes and prototype screens",
    overview:
      "A five-page mobile app wireframe and Figma prototype for RoverCraft Tech, made for students, educators, and tech enthusiasts to explore product models, learn about STEM, and send inquiries. Built with a team of four for BSCPE401.",
    role: "UI/UX Design",
    timeline: "May 2025",
    status: "Completed",
    features: [
      "Homepage that showcases the product models",
      "Product catalog with brief descriptions and prices",
      "Product details page with an add-to-bag option",
      "About Us page, and a contact page with form and inquiries"
    ],
    stack: ["Figma", "Wireframing", "Prototyping", "UI Design"]
  }
];

// Mobile Navigation Toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Active Navigation Highlight on Scroll
const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY + 140;
  sections.forEach((sec) => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");
    if (scrollY >= top && scrollY < top + height) {
      navItems.forEach((item) => {
        item.classList.toggle("active", item.getAttribute("href") === `#${id}`);
      });
    }
  });
});

// Project Category Filtering
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    const filter = btn.dataset.filter;

    projectCards.forEach((card) => {
      const match = filter === "all" || card.dataset.category === filter;
      card.classList.toggle("hidden", !match);
    });
  });
});

// Project Case Study Modal
const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");
const modalBackBtn = document.getElementById("modalBackBtn");
const modalNextBtn = document.getElementById("modalNextBtn");
let currentProjectIndex = 0;

function renderProjectModal(index) {
  currentProjectIndex = (index + PROJECTS.length) % PROJECTS.length;
  const p = PROJECTS[currentProjectIndex];

  document.getElementById("modalCounter").textContent = p.counter;
  document.getElementById("modalTitle").textContent = p.title;
  document.getElementById("modalSubtitle").textContent = p.subtitle;
  document.getElementById("modalImage").src = p.image;
  document.getElementById("modalImage").alt = p.imageAlt;
  document.getElementById("modalOverview").textContent = p.overview;
  document.getElementById("modalRole").textContent = p.role;
  document.getElementById("modalTimeline").textContent = p.timeline;
  document.getElementById("modalStatus").textContent = p.status;

  const featuresList = document.getElementById("modalFeatures");
  featuresList.innerHTML = "";
  p.features.forEach((feat) => {
    const li = document.createElement("li");
    li.textContent = feat;
    featuresList.appendChild(li);
  });

  const stackWrap = document.getElementById("modalStack");
  stackWrap.innerHTML = "";
  p.stack.forEach((tech) => {
    const span = document.createElement("span");
    span.textContent = tech;
    stackWrap.appendChild(span);
  });
}

function openModal(index) {
  renderProjectModal(index);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

projectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const idx = Number(card.dataset.project || 0);
    openModal(idx);
  });
});

modalClose.addEventListener("click", closeModal);
modalBackBtn.addEventListener("click", closeModal);
modalNextBtn.addEventListener("click", () => {
  renderProjectModal(currentProjectIndex + 1);
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("open")) return;
  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") renderProjectModal(currentProjectIndex + 1);
  if (e.key === "ArrowLeft") renderProjectModal(currentProjectIndex - 1);
});

// Copy Contact Info
document.querySelectorAll(".copy-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
      const original = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => {
        btn.textContent = original;
      }, 1800);
    } catch {
      btn.textContent = "Failed";
    }
  });
});
