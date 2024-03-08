const API_URL = 'https://api.npoint.io/5f458ccb947908d10993';
const navList = document.querySelector('.nav__list');

window.addEventListener('DOMContentLoaded', () => {
  fetchData(API_URL);
});

async function fetchData(url) {
  try {
    const res = await fetch(url);
    const { MenuSections } = await res.json();
    renderNavItems(MenuSections);
  } catch (err) {
    return console.log(err);
  }
}

function renderNavItems(data) {
  let navItems = ``;

  navList.innerHTML = data?.map((item, index) => {
    navItems += `
        <li class="nav__items">
          <a href="#${item.Name}">${item.Name}</a>
        </li>
      `;
  });

  navList.innerHTML = navItems;

  // Add onClick event to each nav item
  const liItems = navList.querySelectorAll('.nav__items');
  liItems.forEach((item) => {
    item.addEventListener('click', function () {
      liItems.forEach((item) => {
        item.classList.remove('nav__items--selected');
      });

      // Add "selected" class to the clicked nav item
      this.classList.add('nav__items--selected');
    });
  });

  // Select the first nav item by default
  if (liItems.length > 0) {
    liItems[0].classList.add('nav__items--selected');
  }
}
