import '../styles/index.scss';

if (process.env.NODE_ENV === 'development') {
    require('../index.html');
}

console.log('webpack starterkit');
let unlock = true;
//Menu
let iconMenu = document.querySelector(".icon-menu");
if (iconMenu != null) {
    let delay = 500;
    let menuBody = document.querySelector(".menu__body");
    iconMenu.addEventListener("click", function(e) {
        if (unlock) {
            body_lock(delay);
            iconMenu.classList.toggle("_active");
            menuBody.classList.toggle("_active");
        }
    });
    menuBody.addEventListener("click", function(e) {
        if (unlock) {
            menu_close();
        }
    });
};

function menu_close() {
    let iconMenu = document.querySelector(".icon-menu");
    let menuBody = document.querySelector(".menu__body");
    iconMenu.classList.remove("_active");
    menuBody.classList.remove("_active");
}


//=================
//BodyLock
function body_lock(delay) {
    let body = document.querySelector("body");
    if (body.classList.contains('_lock')) {
        body_lock_remove(delay);
    } else {
        body_lock_add(delay);
    }
}

function body_lock_remove(delay) {
    let body = document.querySelector("body");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        setTimeout(() => {
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            body.classList.remove("_lock");
        }, delay);

        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, delay);
    }
}

function body_lock_add(delay) {
    let body = document.querySelector("body");
    if (unlock) {
        let lock_padding = document.querySelectorAll("._lp");
        for (let index = 0; index < lock_padding.length; index++) {
            const el = lock_padding[index];
            el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        }
        body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
        body.classList.add("_lock");

        unlock = false;
        setTimeout(function() {
            unlock = true;
        }, delay);
    }
}

// popup
//* for popup (magnificPopup):
function popup(popupClass) {
    if (document.querySelector(`${popupClass}`)) {
        let scrollPosition;
        $(`${popupClass}`).magnificPopup({
            /* Фикс для корректного открытия popup (отключаем скроллинг сайта на фоне popup) и возврата на текущее расположение на странице после закрытия popup: */
            type: 'inline',
            fixedContentPos: true,
            fixedBgPos: true,
            callbacks: {
                beforeOpen: () => {
                    scrollPosition = $(window).scrollTop();
                    $('html').addClass('mfp-helper');
                },
                close: () => {
                    $('html').removeClass('mfp-helper');
                    $(window).scrollTop(scrollPosition);
                },
            },
        });
    }

    /* //! add this class to .scss file:
      html.mfp-helper {
       body {
        overflow: hidden;
        .wrapper {
         display: none;
         visibility: hidden !important;
         -webkit-overflow-scrolling: none;
        }
       }
      }
    */
};
popup('.popup');

// swiper
// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
function bildSliders() {
    //BildSlider
    let sliders = document.querySelectorAll('[class*="__swiper"]:not(.swiper-wrapper)');
    if (sliders) {
        sliders.forEach(slider => {

            slider.parentElement.classList.add('swiper');
            slider.classList.add('swiper-wrapper');
            for (const slide of slider.children) {
                slide.classList.add('swiper-slide');
            }
        });
    }
}
// Инициализация слайдеров
function initSliders() {
    // Добавление классов слайдера
    // при необходимости отключить
    bildSliders();

    // Перечень слайдеров
    if (document.querySelector('.body-main-slider')) {
        new Swiper('.swiper', {
            // Подключаем модули слайдера
            // для конкретного случая
            effect: '',
            autoplay: true,
            observer: true,
            observeParents: true,
            slidesPerView: 1, // Количество слайдов
            spaceBetween: 80, // Отступы между слайдами
            autoHeight: false,
            speed: 3000,
            //touchRatio: 0,
            //simulateTouch: false,
            loop: false, // Бесконечное проигрывание слайдов
            preloadImages: false, // Загружает картинки только на активных слайдах
            //lazy: true, // Ленивая загрузка
            lazy: {
                loadPrevNext: true, // + Загрузка изображения на предыдущем/следующем слайдах
            },
            // Dotts
            pagination: {
                el: '.body-main-slider__controll',
                type: 'bullets',
                clickable: true,
            },
            // Arrows
            /*
            navigation: {
            	nextEl: '.about__more .more__item_next',
            	prevEl: '.about__more .more__item_prev',
            },
            */

            breakpoints: {
                500: {
                    autoHeight: true,
                    slidesPerView: 1,
                },
                992: {
                    autoHeight: false,
                    slidesPerView: 2,
                }
            },

        });
    }
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
    // Добавление классов слайдера
    // при необходимости отключить
    bildSliders();

    let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
    if (sliderScrollItems.length > 0) {
        for (let index = 0; index < sliderScrollItems.length; index++) {
            const sliderScrollItem = sliderScrollItems[index];
            const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
            const sliderScroll = new Swiper(sliderScrollItem, {
                observer: true,
                observeParents: true,
                direction: 'vertical',
                slidesPerView: 'auto',
                freeMode: {
                    enabled: true,
                },
                scrollbar: {
                    el: sliderScrollBar,
                    draggable: true,
                    snapOnRelease: false
                },
                mousewheel: {
                    releaseOnEdges: true,
                },
            });
            sliderScroll.scrollbar.updateSize();
        }
    }
}

window.addEventListener("load", function(e) {
    // Запуск инициализации слайдеров
    initSliders();
    // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
    initSlidersScroll();
});

document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('form');
        const form2 = document.getElementById('form2');


        form.addEventListener('submit', formSend);
        form2.addEventListener('submit', formSend2);


        async function formSend(e) {
            e.preventDefault();
            const formMsg = form.querySelector('.form_msg')
            let formData = new FormData(form);
            form.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();

                formMsg.innerHTML = result.message;
                form.reset();
                form.classList.remove('_sending');
                form.classList.add('_send');

            } else {
                formMsg.innerHTML = `<p class="error">
                Произошла ошибка
            </p>'`
                form.classList.remove('_sending');
            }
        }

        async function formSend2(e) {
            e.preventDefault();
            const formMsg = form2.querySelector('.form_msg')
            let formData = new FormData(form2);
            form2.classList.add('_sending');
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                formMsg.innerHTML = result.message;
                form2.reset();
                form2.classList.remove('_sending');
                form2.classList.add('_send');

            } else {
                formMsg.innerHTML = `<p class="error">
                
                Произошла ошибка
            </p>`
                form2.classList.remove('_sending');
            }
        }

    }

);