const sectionIds = ["#home", "#about", "#skills", "#work", "#design", "#testimonial", "#contact"];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) => document.querySelector(`[href="${id}"]`));

const visibleSections = sectionIds.map(() => false);
let activeNavItem = navItems[0];

const options = {
  rootMargin: "-20% 0px 0px 0px",
  threshold: [0, 0.98],
};
const observer = new IntersectionObserver(observerCallback, options);
sections.forEach((section) => observer.observe(section));

navItems.forEach((item, index) => {
  item.addEventListener("click", (event) => {
    event.preventDefault();

    document.querySelector(sectionIds[index]).scrollIntoView({ behavior: "smooth" });

    selectNavItem(index);

    observerCallback([
      {
        target: document.querySelector(sectionIds[index]),
        isIntersecting: true,
        intersectionRatio: 1,
      },
    ]);
  });
});

function observerCallback(entries) {
  let selectLastOne = false;
  entries.forEach((entry) => {
    const index = sectionIds.indexOf(`#${entry.target.id}`);
    visibleSections[index] = entry.isIntersecting;
    selectLastOne = index === sectionIds.length - 1 && entry.isIntersecting && entry.intersectionRatio >= 0.95;

    const title = entry.target.querySelector(".title");
    const description = entry.target.querySelector(".description");
    const content = entry.target.querySelector(".content");
    if (title && description) {
      if (entry.isIntersecting) {
        title.classList.add("visible");
        description.classList.add("visible");
        content.classList.add("visible");
      } else {
        title.classList.remove("visible");
        description.classList.remove("visible");
        content.classList.remove("visible");
      }
    }
    if (entry.target.id === "skills") {
      const skillBars = document.querySelectorAll(".bar__value");
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          const width = bar.getAttribute("data-width");
          bar.style.width = width;
        });
      } else {
        skillBars.forEach((bar) => {
          bar.style.width = "0";
        });
      }
    }

    if (entry.target.id === "about") {
      const profilePic = document.querySelector(".about__profile-pic");
      if (entry.isIntersecting) {
        anime({
          targets: profilePic,
          opacity: [0, 1],
          translateY: [-100, 0],
          elasticity: 500,
          duration: 1000,
          easing: "easeOutBounce",
        });
      } else {
        anime({
          targets: profilePic,
          opacity: [1, 0],
          translateY: [0, -100],
          duration: 500,
          easing: "easeInBack",
        });
      }
    }
  });

  const navIndex = selectLastOne ? sectionIds.length - 1 : findFirstIntersecting(visibleSections);
  selectNavItem(navIndex);
}

function findFirstIntersecting(intersections) {
  const index = intersections.indexOf(true);
  return index >= 0 ? index : 0;
}

function selectNavItem(index) {
  const navItem = navItems[index];
  if (!navItem) return;
  if (activeNavItem !== navItem) {
    activeNavItem.classList.remove("active");
    activeNavItem = navItem;
    activeNavItem.classList.add("active");
  }
}
