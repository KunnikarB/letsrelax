/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 * navbar toggle
 */

const navbar = document.querySelector('[data-navbar]');
const navTogglers = document.querySelectorAll('[data-nav-toggler]');
const navLinks = document.querySelectorAll('[data-nav-link]');

const toggleNavbar = function () {
  navbar.classList.toggle('active');
};

addEventOnElem(navTogglers, 'click', toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove('active');
};

addEventOnElem(navLinks, 'click', closeNavbar);

/**
 * header & back top btn active
 */

const header = document.querySelector('[data-header]');
const backTopBtn = document.querySelector('[data-back-top-btn]');

window.addEventListener('scroll', function () {
  if (window.scrollY >= 100) {
    header.classList.add('active');
    backTopBtn.classList.add('active');
  } else {
    header.classList.remove('active');
    backTopBtn.classList.remove('active');
  }
});

const year = document.getElementById('year');
const thisYear = new Date().getFullYear();
year.setAttribute('datetime', thisYear);
year.textContent = thisYear;


// Switch En/Sv
document.addEventListener('DOMContentLoaded', function () {
  const langEnLink = document.getElementById('lang-en');
  const langSvLink = document.getElementById('lang-sv');
  const currentPath = window.location.pathname;

  let currentLang = 'en';
  if (currentPath.startsWith('/sv/')) {
    currentLang = 'sv';
  }

  if (currentLang === 'en') {
    langEnLink?.classList.add('active');
    langSvLink?.classList.remove('active');
  } else {
    langSvLink?.classList.add('active');
    langEnLink?.classList.remove('active');
  }

  const pageNameMap = {
    'index.html': 'index.html',
    'treatments.html': 'behandlingar.html',
    'about.html': 'om-oss.html',
    'contact.html': 'kontakt.html',
    'fitness.html': 'fysisk-traning.html',
    'wellness.html': 'valbefinnande.html',
    // Add more mappings as needed
  };

  function getTranslatedPath(targetLang) {
    let corePath = window.location.pathname;

    // Remove current language prefix
    if (corePath.startsWith('/en/')) {
      corePath = corePath.slice(4); // Remove "/en/"
    } else if (corePath.startsWith('/sv/')) {
      corePath = corePath.slice(4); // Remove "/sv/"
    }

    // Ensure no leading slash
    if (corePath.startsWith('/')) {
      corePath = corePath.slice(1);
    }

    // If no page specified (e.g., root folder)
    if (corePath === '' || corePath === '/') {
      return `/${targetLang}/`;
    }

    let targetPageName = corePath;

    if (targetLang === 'sv') {
      targetPageName = pageNameMap[corePath] || corePath;
    } else if (targetLang === 'en') {
      const enPage = Object.keys(pageNameMap).find(
        (key) => pageNameMap[key] === corePath
      );
      targetPageName = enPage || corePath;
    }

    // Normalize to remove double slashes
    return `/${targetLang}/${targetPageName}`.replace(/\/{2,}/g, '/');
  }

  if (langEnLink) {
    langEnLink.addEventListener('click', function (event) {
      event.preventDefault();
      if (currentLang !== 'en') {
        window.location.href = getTranslatedPath('en');
      }
    });
  }

  if (langSvLink) {
    langSvLink.addEventListener('click', function (event) {
      event.preventDefault();
      if (currentLang !== 'sv') {
        window.location.href = getTranslatedPath('sv');
      }
    });
  }

  const allNavLinks = document.querySelectorAll('.navbar-link');
  const removeActiveClass = () => {
    allNavLinks.forEach((link) => link.classList.remove('active'));
  };

  const setActiveNavLink = () => {
    removeActiveClass();

    const pathSegments = currentPath.split('/');
    let currentFileName = pathSegments[pathSegments.length - 1] || 'index.html';

    const englishEquivalent =
      Object.keys(pageNameMap).find(
        (key) => pageNameMap[key] === currentFileName
      ) || currentFileName;

    const targetLink = document.querySelector(
      `.navbar-link[href="${englishEquivalent}"]`
    );
    if (targetLink) {
      targetLink.classList.add('active');
    }
  };

  setActiveNavLink();

  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
