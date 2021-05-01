//********************************************* */
//* TARGETING HTML ELEMENTS
const updateCartBtn = document.querySelector('.cart__content--left__buttons--update');
const subTotalRight = document.querySelector('.cart__content--right__table--data__subtotal--price');
const totalRight = document.querySelector('.cart__content--right__table--data__total--price');
const checkOutBtn = document.querySelector('.cart__content--right__buttons--update');
const tbody = document.querySelector('.cart__content--left__table tbody');

//********************************************* */
//* FUNCTION TO CALCULATE AND UPDATE CART
const calculation = () => {
    console.log()

    let subTotal = 0;
    if (event.target === document ? true : event.target.classList.contains('cart__content--left__table--data__product--remove')) {
        tbody.innerHTML = '';
    }

    for (let i = 0; i < localStorage.length; i++) {
        const localStorageKey = localStorage.key(i);
        const productItem = JSON.parse(localStorage.getItem(localStorageKey));
        if (event.target === document ? true : event.target.classList.contains('cart__content--left__table--data__product--remove')) {
            tbody.insertAdjacentHTML('beforeend', `<tr><td class="cart__content--left__table--data table__span--2"><div class="cart__content--left__table--data__product"><span class="cart__content--left__table--data__product--remove" id="${productItem.id}">x</span><img src="${productItem.image}" class="cart__content--left__table--data__product--image"><p class="cart__content--left__table--data__product--name">${productItem.name}</p></div></td><td class="cart__content--left__table--data">Rs ${productItem.price}</td><td class="cart__content--left__table--data"><input type="number" name="cart_quantity" id="cartQuantity__${productItem.id}" class="cart__content--left__table--data__input" min="1" value="${productItem.quantity}"></td><td class="cart__content--left__table--data cart__content--left__table--data__total" id="cartTotal__${productItem.id}">Rs ${productItem.price * productItem.quantity}</td></tr>`);
        }
        //********************************************* */
        //* CALCULATIN SUBTOTAL AND UPDATING CART LEFT SIDE TOTAL
        const cartLeftQuantity = tbody.querySelector(`#cartQuantity__${productItem.id}`).value;
        const cartLeftTotal = tbody.querySelector(`#cartTotal__${productItem.id}`);
        subTotal += productItem.price * cartLeftQuantity;
        cartLeftTotal.innerHTML = `Rs ${productItem.price * cartLeftQuantity}`;
    }

    //********************************************* */
    //* UPDATING SUBTOTAL AND CART RIGHT SIDE TOTAL ON THE UI
    subTotalRight.innerHTML = `Rs ${subTotal}`;
    totalRight.innerHTML = subTotalRight.innerHTML;

    //********************************************* */
    //* SELECTING ALL REMOVE BTNS IN THE CART PRODUCTS
    tbody.querySelectorAll('.cart__content--left__table--data__product--remove')
        .forEach(element => {
            element.addEventListener('click', () => {
                elementId = event.target.id;
                localStorage.removeItem(elementId);
                calculation();
            })
        });
}

//********************************************* */
//* UPDATING CART ON LOAD AND UPDATE BUTTON
window.addEventListener('load', calculation);
updateCartBtn.addEventListener('click', calculation);