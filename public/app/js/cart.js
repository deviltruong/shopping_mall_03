'use strict';

const Cart = {};

Cart.setting = {
    cookieName: 'Cart',
    cartEmpty: '.cart-outer',
    cartNonempty: '.cart-inner',
};

Cart.init = function () {
    this.cart = this.readCookie('Cart');
    this.cart = JSON.parse(this.cart);
    if (!this.cart || !this.cart.token || this.cart.token !== 'shopping123') {
        this.cart = {
            token: 'shopping123',
            totalItem: 0,
            items: [],
            totalPrice: 0,
        };
    }

    console.log(this.cart);

    this.updateUI();

    this.bindUIActions();
};

Cart.bindUIActions = function () {
    const current = this;

    $('.addToCart').on('click', function () {
        let item = {};
        let $this = $(this);
        item.id = parseInt($this.attr('data-cart-add'));
        item.name = $this.attr('data-cart-name');
        item.quantity = parseInt($('select[name="quantity"]').val());
        item.img = $this.attr('data-cart-img');
        item.price = parseFloat($this.attr('data-cart-price'));

        let itemIndex = current.cart.items.findIndex(function (ele) {
            return ele.id === item.id;
        });

        if (itemIndex < 0) {
            current.cart.totalItem += 1;
            current.cart.items.push(item);
        } else {
            current.cart.items[itemIndex].quantity += item.quantity;
            current.cart.items[itemIndex].price = item.price;
            current.updateItemPriceUI(item.id);
        }

        current.update();
        $('#flash-message').append('<div class="alert alert-success"><strong>Success!</strong> Add product to cart successfully.</div>');
        $('.alert').delay(3000).slideUp();
    });

    setTimeout(function () {
        $('.like-btn2').click();
    }, 800);

    $('.delete-btn').on('click', function (e) {
        e.preventDefault();
        let id = parseInt($(this).attr('data-id'));
        current.deleteElement('item' + id);

        let idx = current.cart.items.findIndex(function (ele, i) {
            return ele.id === id;
        });

        if (idx >= 0) {
            current.cart.totalItem -= 1;
            current.cart.items.splice(idx, 1);
        }

        current.update();
    });

    $('.btn-number').click(function (e) {
        e.preventDefault();

        let fieldName = $(this).attr('data-field');
        let type = $(this).attr('data-type');
        let input = $('input[name=\'' + fieldName + '\']');
        let currentVal = parseInt(input.val());
        if (!isNaN(currentVal)) {
            if (type === 'minus') {

                if (currentVal > input.attr('min')) {
                    input.val(currentVal - 1).change();
                }
                if (parseInt(input.val()) === input.attr('min')) {
                    $(this).attr('disabled', true);
                }

            } else if (type === 'plus') {

                if (currentVal < input.attr('max')) {
                    input.val(currentVal + 1).change();
                }
                if (parseInt(input.val()) === input.attr('max')) {
                    $(this).attr('disabled', true);
                }

            }
        } else {
            input.val(0);
        }

        let id = parseInt(fieldName);
        let idx = current.cart.items.findIndex((ele) => {
            return ele.id === id;
        });

        current.cart.items[idx].quantity = parseInt(input.val());

        current.updateItemPriceUI(id);

        current.update();
    });

    $('.input-number').focusin(function () {
        $(this).data('oldValue', $(this).val());
    });

    $('.input-number').change(function () {

        let minValue = parseInt($(this).attr('min'));
        let maxValue = parseInt($(this).attr('max'));
        let valueCurrent = parseInt($(this).val());
        let name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $('.btn-number[data-type=\'minus\'][data-field=\'' + name + '\']').removeAttr('disabled');
        } else {
            alert('Sorry, the minimum value was reached');
            $(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $('.btn-number[data-type=\'plus\'][data-field=\'' + name + '\']').removeAttr('disabled');
        } else {
            alert('Sorry, the maximum value was reached');
            $(this).val($(this).data('oldValue'));
        }

        let id = parseInt(name);

        let idx = current.cart.items.findIndex((ele) => {
            return ele.id === id;
        });

        if (idx >= 0) {
            current.cart.items[idx].quantity = parseInt($(this).val());
            current.updateItemPriceUI(id);
            current.update();
        }

    });

    $('.input-number').keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode === 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
};

Cart.calculateTotalPrice = function () {
  this.cart.totalPrice = this.cart.items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
  }, 0);
};

Cart.updateNumberCartUI = function () {
    let number = this.cart.totalItem;

    if (number < 0) {
        number = 0;
    }

    let text = '', text2 = '';
    switch (number) {
        case 0:
            text = 'empty';
            break;
        case 1:
            text = '1 item';
            text2 = '1 item in cart';
            break;
        default:
            text = number + ' items';
            text2 = number + ' items in cart';
            break;
    }
    $('.cart-logo').text(text);
    $('.panel-heading.number-item').text(text2);
};

Cart.updateItemPriceUI = function (id) {
    let item = this.cart.items.find((elem) => {
        return elem.id === id;
    });

    $('#total-price' + id).text('$' + item.price * item.quantity);
};

Cart.updateTotalPriceUI = function () {
    $('#total-price-all').text('$' + this.cart.totalPrice);
};

Cart.deleteElement = function (id) {
    let elem = $('#' + id);
    elem.remove();
};

Cart.writeCookie = function (name, value, days) {
    let date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = '; expires=' + date.toGMTString();
    } else {
        expires = '';
    }
    document.cookie = name + '=' + value + expires + '; path=/';
};

Cart.readCookie = function (name) {
    let i, c, ca, nameEQ = name + '=';
    ca = document.cookie.split(';');
    for (i = 0; i < ca.length; i++) {
        c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
};

Cart.paymentInfoUpdateUI = function () {
    $('.cart-product-price').text('$' + this.cart.totalPrice);
    $('.cart-vat').text('$' + Math.round(this.cart.totalPrice * 0.1));
    $('.cart-total-price').text('$' + Math.round(this.cart.totalPrice * 1.1));
};

Cart.setCartUI = function () {
    if (this.cart.totalItem > 0) {
        $(this.setting.cartEmpty).addClass('hidden');
        $(this.setting.cartNonempty).removeClass('hidden');
    } else {
        $(this.setting.cartNonempty).addClass('hidden');
        $(this.setting.cartEmpty).removeClass('hidden');
    }
};

Cart.updateUI = function () {
    this.setCartUI();
    this.updateNumberCartUI();
    this.updateTotalPriceUI();
    this.paymentInfoUpdateUI();
};

Cart.update = function () {
    this.calculateTotalPrice();
    this.updateUI();
    this.writeCookie(this.setting.cookieName, JSON.stringify(this.cart), 7);
};

$(function () {
    Cart.init();
});