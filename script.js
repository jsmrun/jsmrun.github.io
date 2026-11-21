const PROJECTS = [
  {
    counter: "PROJECT 01 / 04",
    title: "CompostSync",
    subtitle: "SMART DUAL-BIN AEROBIC–ANAEROBIC COMPOSTING SYSTEM",
    image: "assets/project-compost-thesis.jpg",
    imageAlt: "Smart Dual-Bin Aerobic-Anaerobic Composting System thesis manuscript",
    overview:
      "A capstone project featuring a dual-bin system that composts organic waste aerobically in one bin and anaerobically in the other, producing fertilizer and biogas. Through a microcontroller and a sensor network, it monitors temperature, moisture, pH, and gas levels in real time.",
    role: "Design and Documentation",
    timeline: "Aug 2025 - Nov 2026",
    status: "Completed",
    features: [
      "Aerobic bin with automated tumbling for aeration and mixing",
      "Airtight anaerobic bin with biogas collection and filtration",
      "Real-time sensing: temperature, moisture, pH, methane, ammonia",
      "Documented in a full thesis manuscript"
    ],
    stack: ["Microcontroller", "Sensors", "Embedded C++"],
    link: "",
    linkLabel: ""
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
    stack: ["JavaScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Capacitor"],
    link: "",
    linkLabel: ""
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
    stack: ["Python", "Streamlit", "Git"],
    link: "",
    linkLabel: ""
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
    stack: ["Figma", "Wireframing", "Prototyping", "UI Design"],
    link: "https://www.figma.com/proto/FnSsIhZOqXiRHvLSh2Hdw1?node-id=0-1&t=hTyNUlgg3LKW7phx-6",
    linkLabel: "OPEN IN FIGMA ↗"
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
const modalPrevBtn = document.getElementById("modalPrevBtn");
const modalNextBtn = document.getElementById("modalNextBtn");
const modalExternalBtn = document.getElementById("modalExternalBtn");
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

  if (p.link) {
    modalExternalBtn.href = p.link;
    modalExternalBtn.textContent = p.linkLabel || "OPEN PROJECT ↗";
    modalExternalBtn.hidden = false;
  } else {
    modalExternalBtn.hidden = true;
  }
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
modalPrevBtn.addEventListener("click", () => {
  renderProjectModal(currentProjectIndex - 1);
});
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

// Interactive Cursor-Reactive Dot Grid (Hero Section)
const dotCanvas = document.getElementById("heroDotCanvas");

if (dotCanvas) {
  const ctx = dotCanvas.getContext("2d");
  const GRID_COUNT = 13;
  const INFLUENCE_RADIUS = 115;
  const MAX_PULL = 14;

  let width = 0;
  let height = 0;
  let dots = [];
  const pointer = { x: -9999, y: -9999, active: false };

  function buildDotGrid() {
    const dpr = window.devicePixelRatio || 1;
    const rect = dotCanvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;

    dotCanvas.width = width * dpr;
    dotCanvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    dots = [];
    const padding = 34;
    const stepX = (width - padding * 2) / (GRID_COUNT - 1);
    const stepY = (height - padding * 2) / (GRID_COUNT - 1);

    for (let row = 0; row < GRID_COUNT; row++) {
      for (let col = 0; col < GRID_COUNT; col++) {
        const baseX = padding + col * stepX;
        const baseY = padding + row * stepY;
        const isTerracotta = (row + col) % 3 === 0;
        dots.push({
          baseX,
          baseY,
          x: baseX,
          y: baseY,
          radius: 2.4,
          isTerracotta
        });
      }
    }
  }

  function animateDots() {
    ctx.clearRect(0, 0, width, height);

    for (const dot of dots) {
      const dx = pointer.x - dot.baseX;
      const dy = pointer.y - dot.baseY;
      const dist = Math.hypot(dx, dy);

      let targetX = dot.baseX;
      let targetY = dot.baseY;
      let targetRadius = 2.4;
      let proximity = 0;

      if (pointer.active && dist < INFLUENCE_RADIUS) {
        proximity = 1 - dist / INFLUENCE_RADIUS;
        const ease = proximity * proximity;
        const angle = Math.atan2(dy, dx);
        targetX = dot.baseX + Math.cos(angle) * MAX_PULL * ease;
        targetY = dot.baseY + Math.sin(angle) * MAX_PULL * ease;
        targetRadius = 2.4 + 4.4 * ease;
      }

      // Smooth spring interpolation
      dot.x += (targetX - dot.x) * 0.16;
      dot.y += (targetY - dot.y) * 0.16;
      dot.radius += (targetRadius - dot.radius) * 0.18;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);

      if (proximity > 0.12) {
        ctx.fillStyle = dot.isTerracotta
          ? `rgba(194, 73, 29, ${0.45 + proximity * 0.55})`
          : `rgba(122, 152, 128, ${0.45 + proximity * 0.55})`;
      } else {
        ctx.fillStyle = "rgba(158, 179, 162, 0.45)";
      }

      ctx.fill();
    }

    requestAnimationFrame(animateDots);
  }

  dotCanvas.addEventListener("mousemove", (e) => {
    const rect = dotCanvas.getBoundingClientRect();
    pointer.x = e.clientX - rect.left;
    pointer.y = e.clientY - rect.top;
    pointer.active = true;
  });

  dotCanvas.addEventListener("mouseleave", () => {
    pointer.active = false;
  });

  // Touch support for mobile devices
  dotCanvas.addEventListener(
    "touchmove",
    (e) => {
      if (!e.touches.length) return;
      const rect = dotCanvas.getBoundingClientRect();
      pointer.x = e.touches[0].clientX - rect.left;
      pointer.y = e.touches[0].clientY - rect.top;
      pointer.active = true;
    },
    { passive: true }
  );

  dotCanvas.addEventListener("touchend", () => {
    pointer.active = false;
  });

  window.addEventListener("resize", buildDotGrid);
  buildDotGrid();
  animateDots();
}
