//* HIGH-LIGHT THE ACTIVE NAV LINK FOR ONE PAGE AAPLICATION

// const navvarNav = document.querySelector('.navbar-nav');
// const navbarLinks = navvarNav.querySelectorAll('li');

// navvarNav.addEventListener('click', (event) => {
//   navbarLinks.forEach((element) => {
//     element.classList.remove('active');
//   });
//   event.target.closest('li').classList.add('active');
// });

//********************************************* */
//* TARGETING HTML ELEMENTS

const navigation = document.querySelector('.navigation');
const navigationIcon = document.querySelector('.navigation__icon');
const searchIcon = navigation.querySelector(
  '.navigation__nav--list__item--search__icon'
);
const searchBox = document.querySelector('.search');
const searchForm = searchBox.querySelector('.search__form');
const searchBoxInput = searchBox.querySelector('.search__form--input');
const searchFormSearchIcon = searchForm.querySelector('a');
const register = document.querySelector('.register');
const registerWindow = register.querySelector('.register__window');
const registerClose = registerWindow.querySelector('.register__window--close');
const registerOpen = document.getElementById('login');

//********************************************* */
//* LOGIN AND REGISTER
const closeRegister = () => {
  const element = event.target.classList;
  if (
    element.contains('register') ||
    element.contains('register__window--close')
  ) {
    register.style.display = 'none';
    registerWindow.classList.remove('register__open');
  }
};

registerOpen.addEventListener('click', () => {
  register.style.display = 'block';
  registerWindow.classList.add('register__open');
});

registerClose.addEventListener('click', closeRegister);
register.addEventListener('click', closeRegister);

//********************************************* */
//* SEARCH

const removeSearchBackground = () => {
  const element = event.target;
  if (
    element.classList.contains('search') ||
    element.closest('a').classList.contains('search__form--btn')
  ) {
    searchBox.style.display = 'none';
    searchForm.classList.remove('search__form--open');
  }
};

navigationIcon.addEventListener('click', (event) => {
  const element =
    event.target.firstElementChild === null
      ? event.target.closest('span')
      : event.target.firstElementChild;
  element.classList.toggle('navigation__icon--toggle');
  navigation.classList.toggle('navigation__open');
});

searchIcon.addEventListener('click', () => {
  searchBox.style.display = 'block';
  searchForm.classList.add('search__form--open');
});

searchBox.addEventListener('click', removeSearchBackground);
searchFormSearchIcon.addEventListener('click', (event) => {
  const url = window.location.href;
  const page = url.slice(url.lastIndexOf('/') + 1, url.lastIndexOf('.'));
  event.preventDefault();

  sessionStorage.clear();
  sessionStorage.setItem(searchBoxInput.value, searchBoxInput.value);

  window.location = url.replace(page, 'shop');

  removeSearchBackground();
});
