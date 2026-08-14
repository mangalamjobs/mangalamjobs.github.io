const body = document.body;
const menuToggle = document.querySelector('.menu-toggle, .portal-menu');
const navLinks = document.querySelectorAll('.nav a, .portal-nav a');
const searchForm = document.querySelector('#job-search');
const keywordInput = document.querySelector('#keyword');
const locationInput = document.querySelector('#location');
const jobCards = [...document.querySelectorAll('.job-card, .portal-job')];
const emptyState = document.querySelector('#empty-state');

menuToggle?.addEventListener('click', () => {
  const open = body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

navLinks.forEach((link) => link.addEventListener('click', () => {
  body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

function filterJobs() {
  const keyword = keywordInput.value.trim().toLowerCase();
  const location = locationInput.value.trim().toLowerCase();
  let matches = 0;

  jobCards.forEach((card) => {
    const searchable = `${card.dataset.title} ${card.dataset.category}`;
    const visible = searchable.includes(keyword) && card.dataset.location.includes(location);
    card.hidden = !visible;
    if (visible) matches += 1;
  });

  emptyState.hidden = matches !== 0;
  document.querySelector('#jobs, #featured-jobs')?.scrollIntoView({ behavior: 'smooth' });
}

searchForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  filterJobs();
});

document.querySelectorAll('[data-search]').forEach((button) => {
  button.addEventListener('click', () => {
    keywordInput.value = button.dataset.search;
    filterJobs();
  });
});

document.querySelectorAll('[data-category-link]').forEach((link) => {
  link.addEventListener('click', () => {
    keywordInput.value = link.dataset.categoryLink;
    locationInput.value = '';
    setTimeout(filterJobs, 100);
  });
});

document.querySelector('.newsletter')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const button = event.currentTarget.querySelector('button');
  button.textContent = '✓';
  event.currentTarget.querySelector('input').value = '';
});

const revealLeaders = document.querySelectorAll('.reveal-leader');
if ('IntersectionObserver' in window && revealLeaders.length) {
  const leaderObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  revealLeaders.forEach((leader) => leaderObserver.observe(leader));
} else {
  revealLeaders.forEach((leader) => leader.classList.add('is-visible'));
}
