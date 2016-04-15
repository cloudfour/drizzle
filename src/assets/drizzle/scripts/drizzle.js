'use strict';

import 'prismjs';

const dom = {};

dom.nav = document.getElementById('nav');
dom.navMenu = document.getElementById('nav-menu');
dom.navToggle = dom.nav.querySelector('a[href="#nav"]');
dom.navLinks = dom.navMenu.querySelectorAll('a');

function setActiveNavItem (pathname) {
  const isMatch = a => new URL(a.href).pathname === pathname;
  const active = Array.from(dom.navLinks).find(isMatch);
  if (active) {
    console.log(active);
    active.classList.add('is-active');
  }
}

dom.navToggle.addEventListener('click', event => {
  event.preventDefault();
  dom.nav.classList.toggle('is-active');
});

setActiveNavItem(window.location.pathname);
