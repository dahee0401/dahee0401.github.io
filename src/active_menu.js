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

function observerCallback(entries) {
  let selectLastOne;
  entries.forEach((entry) => {
    const index = sectionIds.indexOf(`#${entry.target.id}`);
    visibleSections[index] = entry.isIntersecting;
    selectLastOne = index === sectionIds.length - 1 && entry.isIntersecting && entry.intersectionRatio >= 0.95;

    if (entry.isIntersecting && index !== sectionIds.length - 1) {
      anime({
        targets: entry.target,
        opacity: [0, 1],
        translateY: [30, 0],
        easing: "easeOutCubic",
        duration: 800,
      });
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
  activeNavItem.classList.remove("active");
  activeNavItem = navItem;
  activeNavItem.classList.add("active");
}
