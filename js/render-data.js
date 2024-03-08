const navList = document.querySelector('.nav__list');
const mainSection = document.querySelector('.main');
const modal = document.querySelector('#info-modal');
const modalClose = document.querySelector('#modal-close');
const addOrderBtn = document.querySelector('.modal__add-to-order');
const modalTitle = modal.querySelector('.modal__title');
const modalPrice = modal.querySelector('.modal__price');
const modalQuantity = modal.querySelector('.modal__quantity');

const API_URL = 'https://api.npoint.io/5f458ccb947908d10993';

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
      <div class="card" onclick="showModal('${data.Name}', '${data.Price}', ${
    data.SoldOut
  })">
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

// MODAL FUNCTIONALITY
modalClose.onclick = function () {
  modal.style.display = 'none';
  modalQuantity.value = 1;
};

addOrderBtn.onclick = function () {
  modal.style.display = 'none';
  modalQuantity.value = 1;
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
    modalQuantity.value = 1;
  }
};

window.showModal = function (name, price, soldout) {
  modalTitle.textContent = name;
  modalPrice.textContent = 'Price: ' + price + '€';

  addOrderBtn.textContent = soldout ? 'Sold Out' : 'Add to order';
  addOrderBtn.classList.toggle('modal__add-to-order--disabled', soldout);
  addOrderBtn.disabled = soldout;

  modal.style.display = 'block';
};
