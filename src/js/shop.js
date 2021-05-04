//********************************************* */
//* TARGETING HTML ELEMENTS
const catagories = document.querySelectorAll('.shop__content--left__catagories');
const shopProducts = document.querySelector('.shop__content--right__products');

//********************************************* */
//* RENDER THE PRODUCTS IN THE SHOP

const renderShopProducts = (data, pageNo = 0, catagory = '') => {
    const startingPoint = pageNo * 12;
    const endingPoint = startingPoint + 12;
    shopProducts.innerHTML = '';

    data.forEach((item, index) => {
        const html = `<div class="shop__content--right__products--product display__products" id="product__${item.id}"><img class="shop__content--right__products--product__images" src="${item.image}" alt="bestSelling product"><p class="shop__content--right__products--product__name">${item.name}</p><p class="shop__content--right__products--product__price">Rs ${item.price}</p><button class="popup__open--btn">add to cart</button></div>`;

        if (catagory !== '' && catagory !== 'all catagories') {

            if (item.catagory === catagory) {
                shopProducts.insertAdjacentHTML('beforeend', html);
            }

        } else if (index === startingPoint || index < endingPoint) {
            shopProducts.insertAdjacentHTML('beforeend', html);
        }
    })
}

//********************************************* */
//* ADDING LISTNERS TO ELEMENTS

const catagory = sessionStorage.getItem(sessionStorage.key(1));

renderShopProducts(productsData, 0, catagory === null ? '' : catagory);

catagories.forEach(element => {
    element.addEventListener('click', () => {
        const renderCatagory = event.target.innerText.toLowerCase();
        renderShopProducts(productsData, 0, renderCatagory)
    })
})