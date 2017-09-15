'use strict';

const Main = {};

Main.settings = {};

Main.init = function () {
    this.bindUIActions();
    Vue.use(VueMaterial);
    Vue.use(VeeValidate);
    Vue.material.registerTheme('default', {
        primary: 'blue',
        background: 'white',
    });
};

Main.bindUIActions = function () {
    $(document).ready(function () {
        $('.dropdown').hover(
            function () {
                $('.dropdown-menu', this).fadeIn('fast');
            },
            function () {
                $('.dropdown-menu', this).fadeOut('fast');
            });

        // Product page
        //Handles the carousel thumbnails
        $('[id^=carousel-selector-]').click(function () {
            let id_selector = $(this).attr('id');
            try {
                let id = /-(\d+)$/.exec(id_selector)[1];
                console.log(id_selector, id);
                jQuery('#myCarousel').carousel(parseInt(id));
            } catch (e) {
                console.log('Regex failed!', e);
            }
        });
        // When the carousel slides, auto update the text
        $('#myCarousel')
            .on('slid.bs.carousel', function (e) {
                let id = $('.item.active').data('slide-number');
                $('#carousel-text').html($('#slide-content-' + id).html());
            })
            .carousel({
                interval: false,
            });

        $('.list').click(function () {

            $('.hover_div_outer').toggleClass('displayblock');
        });

        $('.card').mouseleave(function () {

            $('.hover_div_outer').removeClass('displayblock');
        });

        $('.like-btn2').on('click', function () {
            $(this).toggleClass('is-active');
        });
    });

    let $window = $(window);
    if ($window.width() < 767) {
        $('.megamenu').insertAfter('#hlink');
    } else {
        // change functionality for larger screens
    }
};

function megamenu(menu_name) {
    $('.sub_menu').hide();

    $('#' + menu_name).show();
}

$(function () {
    Main.init();
});
