//********************************************* */
//* TARGETING HTML ELEMENTS
const carouselInner = document.querySelectorAll('.carousel__inner--slide');
const carouselNavigators = document.querySelectorAll(
  '.carousel__navigator div'
);
const featuredProducts = document.querySelector('.featured__products');
const bestSellingProducts = document.querySelector('.bestselling__products');

//********************************************* */
//* MAIN CAROUSEL
carouselNavigators.forEach((element) => {
  element.addEventListener('click', (event) => {
    const direction = event.target.className.includes('left')
      ? 'left'
      : 'right';

    for (el of carouselInner) {
      if (el.classList.contains('carousel__inner--slide__active')) {
        const slide = el;
        const move =
          direction === 'left'
            ? slide.previousElementSibling === null
              ? slide.parentElement.lastElementChild.classList
              : slide.previousElementSibling.classList
            : slide.nextElementSibling === null
            ? slide.parentElement.firstElementChild.classList
            : slide.nextElementSibling.classList;

        slide.classList.remove('carousel__inner--slide__active');
        move.add('carousel__inner--slide__active');
        break;
      }
    }
  });
});

//********************************************* */
//* CREATE PRODUCTS
const createProducts = (number, catagory, data) => {
  const targetElement =
    catagory === 'featured'
      ? featuredProducts
      : catagory === 'bestselling'
      ? bestSellingProducts
      : 'talha';

  for (let i = 0; i < number; i++) {
    const div = document.createElement('div');
    const image = document.createElement('img');
    const button = document.createElement('button');

    div.className = `${catagory}__products--product`;
    div.id = `${catagory}__products--product__${data[i].id}`;
    image.className = `${catagory}__products--product__images`;
    image.src = data[i].image;
    image.alt = `${catagory} product ${i + 1}`;
    button.className = 'popup__open--btn';
    button.textContent = 'quick view';

    if (i === 0 && targetElement === bestSellingProducts) {
      div.classList.add('bestselling__products--product__main');
    }

    targetElement.appendChild(div);
    div.appendChild(image);
    div.appendChild(button);
  }
};

const fetchProductData = (data, catagory) => {
  const fetchedData = [];
  const noOfItems = catagory === 'featured' ? 8 : 7;
  const requiredData =
    catagory === 'featured'
      ? data.reverse()
      : data
          .map((element) => element.sold)
          .sort((a, b) => a - b)
          .reverse();

  for (let i = 0; i < noOfItems; i++) {
    if (catagory === 'featured') {
      fetchedData.push(requiredData[i]);
      continue;
    }

    for (item of data) {
      if (item.sold === requiredData[i] && fetchedData.length < noOfItems) {
        fetchedData.push(item);
      }
    }
  }

  return [noOfItems, catagory, fetchedData];
};

createProducts(...fetchProductData(productsData, 'featured'));
createProducts(...fetchProductData(productsData, 'bestselling'));
