
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

  // Ensure trailing slash is not included and filename is captured
  let fileName = currentPath.split('/').pop();
  if (!fileName || fileName === '') {
    fileName = 'index.html';
  }

  // Full mapping between English and Swedish pages
  const pageNameMap = {
    'index.html': 'index.html',
    'about.html': 'om-oss.html',
    'om-oss.html': 'about.html',
    'contact.html': 'kontakt.html',
    'kontakt.html': 'contact.html',
    'treatments.html': 'behandlingar.html',
    'behandlingar.html': 'treatments.html',
    'fitness.html': 'fitness.html',
    'wellness.html': 'valbefinnande.html',
    'valbefinnande.html': 'wellness.html',
  };

  function getTranslatedPath(targetLang) {
    const translatedFile = pageNameMap[fileName] || 'index.html';
    return `/${targetLang}/${translatedFile}`;
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
});



