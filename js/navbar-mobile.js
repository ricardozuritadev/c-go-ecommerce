const toggleBtn = document.querySelector('#toggle-nav-button');
const menuItems = document.querySelector('.nav__list');

toggleBtn.addEventListener('click', () => {
  menuItems.classList.toggle('show-menu-items');
});
