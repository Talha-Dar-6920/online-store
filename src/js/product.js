const productImage = document.querySelector('.product__content--left__image');
const productName = document.querySelector('.product__content--right h3');
const productTitle = document.querySelector('.product__tagline');
const productDescription = document.querySelector('.product__description');
const productPrice = document.querySelector('.product__price');
const productButton = document.querySelector('.product__button');

window.addEventListener('load', () => {
  const key = sessionStorage.key(1);

  for (item of productsData) {
    if (item.id === key) {
      productImage.src = item.image;
      productName.innerHTML = item.name;
      productTitle.innerHTML = item.title;
      productDescription.innerHTML = item.description;
      productPrice.innerHTML = `Rs ${item.price}`;
    }
  }
});

//********************************************* */
//* ADD TO CART
//! Getting the element in the popup open listner

productButton.addEventListener('click', () => {
  const elementId = sessionStorage.key(1);
  const productQuantity = document.querySelector('#product__amount').value;

  for (element of productsData) {
    if (element.id === elementId && !localStorage.hasOwnProperty(elementId)) {
      element.quantity = productQuantity;
      localStorage.setItem(elementId, JSON.stringify(element));
    }
  }
});
