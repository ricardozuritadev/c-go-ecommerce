const API_URL = 'https://api.npoint.io/5f458ccb947908d10993';
const navList = document.querySelector('.nav__list');
const mainSection = document.querySelector('.main');

window.addEventListener('DOMContentLoaded', () => {
  fetchData(API_URL);
});

async function fetchData(url) {
  try {
    const res = await fetch(url);
    const { MenuSections } = await res.json();
    renderNavItems(MenuSections);
    renderMenuSection(MenuSections);
  } catch (err) {
    return console.log(err);
  }
}

function renderNavItems(data) {
  let navItems = ``;

  navList.innerHTML = data?.map((item) => {
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

function cardTemplate(data, image) {
  return ` 
      <div class="card">
        <div class="card__img-container">
          ${data.SoldOut ? `<div class="soldout-tag">Sold out</div>` : ''}
          <img src="assets/img/${image}.jpg" alt="${
    data.Name
  }" class="card__img ${data.SoldOut ? 'card__img--soldout' : ''}" />
        </div>
        <div class="card__info">
          <h2 class="card__title">${data.Name}</h2>
          <p class="card__price">${data.Price}&#x20AC;</p>
        </div>
      </div>
  `;
}

function renderMenuSection(data) {
  let cards = ``;

  data?.map((item) => {
    cards += `
    <section id="${item.Name}" class="menu-section">
      <h2 class="menu-section__title">${item.Name}</h2>
      <div class="menu-section__cards">
        ${item.MenuItems.map((menuItem) =>
          cardTemplate(menuItem, menuItem.Name)
        ).join('')}
      </div>    
    </section>
    `;
  });

  mainSection.innerHTML = cards;
}
