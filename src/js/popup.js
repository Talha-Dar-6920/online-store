//********************************************* */
//* TARGETING HTML ELEMENTS
const popup = document.querySelector('.popup');
const popupWindow = popup.querySelector('.popup__window');
const popupClose = popupWindow.querySelector('.popup__window--close');
const popupContent = popup.querySelector('.popup__window--content');
const displayProducts = document.querySelectorAll('.display__products');
const popupOpenBtns = document.querySelectorAll('.popup__open--btn');


//********************************************* */
//* POPUP
popupOpenBtns.forEach(popupOpenBtn => {
    popupOpenBtn.addEventListener('click', (event) => {
        //********************************************* */
        //* POPUP OPEN
        let elementId = event.target.closest('div').id;
        elementId = elementId.slice(elementId.lastIndexOf('_') + 1);

        console.log(event.target)

        popup.style.display = 'block';
        popupWindow.classList.add('popup__open');

        productsData.forEach(el => {
            if (el.id === elementId) {
                popupContent.innerHTML = `<div class="popup__window--content__left"><img src="${el.image}" alt="popup image"></div><div class="popup__window--content__right"><h2 class="section__heading section__heading--tertiory">${el.name}</h2><p class="section__text tagline">${el.title}</p><p class="section__text">${el.description}</p><p class="section__text popup__price">Rs ${el.price}</p><p class="section__text"><input type="number" name="popup_amount" id="popup__amount" min="1" value="1"></p><p class="section__text"><button class="popup__button">add to cart</button></p></div>`;
            }
        })

        //********************************************* */
        //* ADDING EVENT LISTNERS TO POPUP ELEMENTS
        const popupAddToCartBtn = popup.querySelector('.popup__button');
        let popupItemQuantity = popup.querySelector('#popup__amount');

        popupAddToCartBtn.addEventListener('click', () => {
            addToCart(elementId, popupItemQuantity.value);
        });

    });
})

const closePopup = () => {
    const element = event.target.classList;
    if (element.contains('popup') || element.contains('popup__window--close') || element.contains('popup__button')) {
        popup.style.display = 'none';
        popupWindow.classList.remove('popup__open');
    }
}

popupClose.addEventListener('click', closePopup);
popup.addEventListener('click', closePopup);

//********************************************* */
//* ADD TO CART
//! Getting the element in the popup open lictner
const addToCart = (elementId, quantity) => {
    for (element of productsData) {
        if (element.id === elementId && !localStorage.hasOwnProperty(elementId)) {
            element.quantity = quantity;
            localStorage.setItem(elementId, JSON.stringify(element))
        }
    }
    closePopup();
}

//********************************************* */
//* DISPLAY PRODUCTS
let displayElementId;
displayProducts.forEach(element => {
    element.addEventListener('click', event => {
        if (event.target.className.includes('__products--product__images')) {
            let cartUrl;
            if (document.location.href.includes('index')) {
                cartUrl = document.location.href.replace('index', 'product');
            } else {
                cartUrl = document.location.href.replace('shop', 'product');
            }

            let currentElementId = event.target.closest('div').id;
            currentElementId = currentElementId.slice(currentElementId.lastIndexOf('_') + 1);
            displayElementId = currentElementId;

            //********************************************* */
            //* STORING ID TEMPORARLY IN SESSION STORAGE TO USE IN PRODUCTS JS 
            sessionStorage.clear();
            sessionStorage.setItem(currentElementId, currentElementId)
            console.log(currentElementId)

            window.location = cartUrl;
        }
    })
})