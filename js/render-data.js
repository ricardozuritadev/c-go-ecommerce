const API_URL = 'https://api.npoint.io/5f458ccb947908d10993';

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
  const navList = document.querySelector('.nav__list');
  let navItems = ``;

  navList.innerHTML = data?.map((item) => {
    navItems += `
        <li class="nav__items">
          <a href="#${item.Name}">${item.Name}</a>
        </li>
      `;
  });

  navList.innerHTML = navItems;
}
