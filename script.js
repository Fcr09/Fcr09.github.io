const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll(".year").forEach((year) => {
  year.textContent = new Date().getFullYear();
});

document.querySelectorAll("[data-email-contact]").forEach((button) => {
  button.addEventListener("click", () => {
    const localPart = ["cf", "an", "42"].join("");
    const domainPart = ["um", "d", ".", "edu"].join("");
    window.location.href = `mailto:${localPart}@${domainPart}`;
  });
});

const publications = [...document.querySelectorAll(".publication")];
const publicationFilters = [...document.querySelectorAll("[data-pub-filter]")];
const publicationStatus = document.querySelector(".publication-status");
let activePublicationFilter = "all";

function renderPublications() {
  let visibleCount = 0;

  publications.forEach((publication) => {
    const tags = publication.dataset.tags.split(" ");
    const matchesFilter = activePublicationFilter === "all" || tags.includes(activePublicationFilter);
    publication.hidden = !matchesFilter;
    if (matchesFilter) visibleCount += 1;
  });

  publicationFilters.forEach((button) => {
    const isActive = button.dataset.pubFilter === activePublicationFilter;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  publicationStatus.textContent = `${visibleCount} of ${publications.length} publication${publications.length === 1 ? "" : "s"}`;
}

publicationFilters.forEach((button) => {
  button.addEventListener("click", () => {
    activePublicationFilter = button.dataset.pubFilter;
    renderPublications();
  });
});

if (publications.length) {
  renderPublications();
}
