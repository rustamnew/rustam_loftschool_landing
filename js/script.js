//Мобильное меню

const menuButton = document.querySelector('#menuButton');
const menuCloseButton =document.querySelector('#menuCloseButton');
const menuMobile = document.querySelector('.menu-mobile');

menuButton.addEventListener('click', function() {
    menuMobile.style.display = "flex";
});

menuCloseButton.addEventListener('click', function() {
    menuMobile.style.display = "none";
});

const menuLink = document.querySelectorAll('.menu-mobile__item');
menuLink.forEach(e => e.addEventListener('click', function() {
    menuMobile.style.display = "none";
}));




//Команда аккордеон
const openCloseItem = item => {
    const container = item.closest('.team__item');
    const description = container.find('.team__description');
    const descriptionBlock = description.find('.team__description-block');
    const reqHeight = descriptionBlock.height();

    const name = container.find('.team__name');


    if (description.height() == 0) {
        description.height(reqHeight);
        name.addClass('team__name-active')
    } else {
        description.height(0);
        name.removeClass('team__name-active')
    }
}

const closeAll = container => {
    const items = container.find('.team__description');
    const names = container.find('.team__name');

    items.height(0);
    names.removeClass('team__name-active');
}


$('.team__item').click(e => {
    const $this = $(e.currentTarget);
    const container = $this.closest('.team__list');

    

    closeAll(container);
    openCloseItem($this);
})

// слайдер
let viewportWidth = window.innerWidth;


if (viewportWidth <= 768) {
    var slideWidth = viewportWidth - 80;
}

if (viewportWidth <= 480) {
    var slideWidth = viewportWidth - 10;
}


$('.slider__list').bxSlider({
    pager: false,
    adaptiveHeight: true,
    slideWidth: slideWidth
});



//слайдшоу
const findBlockByAlias = (alias) => {
    return $('.reviews__item').filter((ndx, item) => {
        return $(item).attr('data-linked-width') == alias;
    });
}

$('.reviews__selector-item-link').click((e) => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr('data-open');
    const itemToShow = findBlockByAlias(target);
    const currentItem = $this.closest('.reviews__selector-item');

    itemToShow.addClass('active-review').siblings().removeClass('active-review');
    currentItem.addClass('active-avatar').siblings().removeClass('active-avatar');

})

//модальное окно
$('.form').submit( e => {
    e.preventDefault();

    const form = $(e.currentTarget);
    const name = form.find("[name='name']");
    const phone = form.find("[name='phone']");
    const comment = form.find("[name='comment']");
    const to = form.find("[name='to']");

    const modal = $('#modal');
    const content = modal.find('.modal__content');



    [name, phone, comment,to].forEach(field => {
        field.removeClass('form__input-error');
        if (field.val().trim() == "") {
            field.addClass('form__input-error');
        }
    });

    const errorFields = $('.form__input-error');
    if (errorFields.length == 0) {
        $.ajax({
            url: "https://webdev-api.loftschool.com/sendmail",
            method: 'post',
            data: {
                name:name.val(),
                phone:phone.val(),
                comment:comment.val(),
                to:to.val()
            },

            success: data => {
                content.text(data.message)

                $.fancybox.open({
                    src: '#modal',
                    type: 'inline',
                })
            },

            error: data => {
                const message = data.responseJSON.message;
                content.text(message)

                $.fancybox.open({
                    src: '#modal',
                    type: 'inline',
                })
            },
        })

        const fields = $('.form__input');
        fields.val('');
    }

})

$('.submit-button').click( e => {
    e.preventDefault();

    $.fancybox.close();
})



//горизонтальный аккордеон


const windowWidth = $(window).width();
console.log(windowWidth)

const mesureWidth = item => {
    const screenWidth = $(window).width();
    
    const container = item.closest('.colors__list');

    const titleBlocks = container.find('.color__title');

    const titleWidth = titleBlocks.width() * titleBlocks.length;

    if (windowWidth <= 480) {
        const reqWidth = screenWidth - 90;
        const reqWidthString = reqWidth.toString() +'px';
        return reqWidthString
    } else {
        const reqWidth = screenWidth - 3 * 104;
        const reqWidthString = reqWidth.toString() +'px';
        return reqWidthString
    
    }

}

if (windowWidth > 768) {
    console.log('Аккордеон Desktop')

    $('.color__title').click( e => {

        const item = $(e.currentTarget);
        
        const description = item.siblings('.color__description');
    
        const items = $('.color__description');
        items.removeClass('active-description');
        
    
        if (description.width() == 0) {
            description.addClass('active-description');
        } else if (description.width > 0) {
            description.removeClass('.active-description');
        }
    })
    
    
    $('.color__close-button').click( e => {
        const item = $(e.currentTarget);
        const description = item.closest('.color__description');
    
        description.removeClass('active-description');
    })

} else if (windowWidth <= 480) {
    console.log('Аккордеон Mobile')

    $('.color__title').click( e => {

        const item = $(e.currentTarget);
        const description = item.siblings('.color__description');
    
        const items = $('.color__description');
        items.removeClass('active-description');
        items[0].style.width = '0px';
        items[1].style.width = '0px';
        items[2].style.width = '0px';

        const container1 = item.closest('.colors__list');

        const titleBlocks1 = container1.find('.color__title');

        /*titleBlocks1[0].style.display = 'none';
        titleBlocks1[1].style.display = 'none';
        titleBlocks1[2].style.display = 'none';

        e.currentTarget.style.display = 'block';*/
    
        if (description.width() == 0) {
            description.addClass('active-description');
            
            description[0].style.width = mesureWidth(item);
            
        } else {
            description.width(0)
            description.removeClass('.active-description');
            description[0].style.width = '0px'

            titleBlocks1[0].style.display = 'block';
            titleBlocks1[1].style.display = 'block';
            titleBlocks1[2].style.display = 'block';
        }

        
    })

    $('#gray').click(e => {
        console.log('click gray')

        const item = $(e.currentTarget);
        const container1 = item.closest('.colors__list');


        const transform = container1[0].style.transform


        if (transform == 'translateX(0px)' || transform == '') {

            container1[0].style.transform = 'translateX(90px)'
        } else if (transform == 'translateX(90px)') {

            container1[0].style.transform = 'translateX(0px)'
        } 
    })
    
    $('#black').click(e => {
        console.log('click black')

        const item = $(e.currentTarget);
        const container1 = item.closest('.colors__list');

        container1[0].style.transform = 'translateX(0px)'
    })

    $('#red').click(e => {
        console.log('click red')

        const item = $(e.currentTarget);
        const container1 = item.closest('.colors__list');

        //container1[0].style.transform = 'translateX(-90px)'

        const transform = container1[0].style.transform


        if (transform == 'translateX(0px)' || transform == '') {

            container1[0].style.transform = 'translateX(-90px)'
        } else if (transform == 'translateX(-90px)') {

            container1[0].style.transform = 'translateX(0px)'
        } 
    })
    
    
    $('.color__close-button').click( e => {
        const item = $(e.currentTarget);
        const description = item.closest('.color__description');
    
        description.removeClass('active-description');
    })
} else if (windowWidth <= 768) {
    console.log('Аккордеон Tablet')

    $('.color__title').click( e => {

        const item = $(e.currentTarget);
        const description = item.siblings('.color__description');
    
        const items = $('.color__description');
        items.removeClass('active-description');
        items[0].style.width = '0px';
        items[1].style.width = '0px'
        items[2].style.width = '0px'


    
        if (description.width() == 0) {
            description.addClass('active-description');
            
            description[0].style.width = mesureWidth(item);
            
        } else {
            description.width(0)
            description.removeClass('.active-description');
            description[0].style.width = '0px'
        }
        
    })
    
    
    $('.color__close-button').click( e => {
        const item = $(e.currentTarget);
        const description = item.closest('.color__description');
    
        description.removeClass('active-description');
    })
} 



//onepage scroll 

const sections = $('.section');
const display = $('.maincontent');

const performTransition = sectionEq => {
    const position = sectionEq * -100;
    display.css({
        transform: `translateY(${position}%)`
    })
}

const sideUpdate = transitionNumber => {
    const sideMenu = $('.fixed-menu');
    sideMenu.find('.fixed-menu__item').removeClass('fixed-menu__item-active')
    sideMenu.find('.fixed-menu__item').eq(transitionNumber).addClass('fixed-menu__item-active');
}

var transitionNumber = 0;
var inScroll = false;

$(window).on('wheel', e => {
    const deltaY = e.originalEvent.deltaY;

    if (inScroll == false) {
        inScroll = true;

        if (transitionNumber > 0) {
            if (deltaY < 0) {
                transitionNumber--;
                performTransition(transitionNumber);
            }
        }
    
        if (transitionNumber < 8) {
            if (deltaY > 0) {
                transitionNumber++;
                performTransition(transitionNumber);
            }
        }

        setTimeout(() => {
            inScroll = false;
        }, 200);
    }

    sideUpdate(transitionNumber)
})

$("body").swipe( {
    swipe:function(event, direction) {
        if (inScroll == false) {
            inScroll = true;

            if (transitionNumber > 0) {
                if (direction === 'down') {
                    transitionNumber--;
                    performTransition(transitionNumber);
                }
            }
        
            if (transitionNumber < 8) {
                if (direction === 'up') {
                    transitionNumber++;
                    performTransition(transitionNumber);
                }
            }

            setTimeout(() => {
                inScroll = false;
            }, 200);
        }

        sideUpdate(transitionNumber)
    }
});


$('[data-scroll-to]').click( e => {
    e.preventDefault();

    const $this = $(e.currentTarget);
    const target = $this.attr('data-scroll-to');
    const reqSection = $(`[data-section-id=${target}]`);
    transitionNumber = reqSection.index();

    performTransition(reqSection.index());
    const sideMenu = $('.fixed-menu');
    sideMenu.find('.fixed-menu__item').removeClass('fixed-menu__item-active')
    sideMenu.find('.fixed-menu__item').eq(transitionNumber).addClass('fixed-menu__item-active');
    
})


//Яндекс карты

let myMap;

const init = () => {
    myMap = new ymaps.Map('map', {
    center: [55.7445, 37.584159],
    zoom: 15,
    controls: [],
    });

    const coords = [
        [55.743364, 37.578186],
        [55.748689, 37.588957],
        [55.743460, 37.588440],
        [55.750330, 37.582549],
        
    ];

    const myCollection = new ymaps.GeoObjectCollection({}, {
        draggable: false,
        iconLayout: 'default#image',
        iconImageHref: './img/icons/map.svg',
        iconImageSize: [46, 57],
        iconImageOffset: [-35, 52]
    });

    coords.forEach(coord => {
        myCollection.add(new ymaps.Placemark(coord));
    });

    myMap.geoObjects.add(myCollection);

    myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);

