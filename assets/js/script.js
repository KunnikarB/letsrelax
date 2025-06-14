
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

  let currentLang = currentPath.startsWith('/sv/') ? 'sv' : 'en';

  const fileName = currentPath.split('/').pop() || 'index.html';

  const pageNameMap = {
    'index.html': 'index.html',
    'about.html': 'om-oss.html',
    'contact.html': 'kontakt.html',
    'treatments.html': 'behandlingar.html',
    'fitness.html': 'fitness.html',
    'wellness.html': 'valbefinnande.html',
    'om-oss.html': 'about.html',
    'kontakt.html': 'contact.html',
    'behandlingar.html': 'treatments.html',
    'valbefinnande.html': 'wellness.html',
  };

  function switchLanguage(targetLang) {
    const targetPage = pageNameMap[fileName] || 'index.html';
    const newUrl = `/${targetLang}/${targetPage}`;
    window.location.href = newUrl;
  }

  if (langEnLink) {
    langEnLink.addEventListener('click', function (e) {
      e.preventDefault();
      if (currentLang !== 'en') switchLanguage('en');
    });
  }

  if (langSvLink) {
    langSvLink.addEventListener('click', function (e) {
      e.preventDefault();
      if (currentLang !== 'sv') switchLanguage('sv');
    });
  }
});



