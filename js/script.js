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

    const sideMenu = $('.fixed-menu');
    sideMenu.find('.fixed-menu__item').removeClass('fixed-menu__item-active')
    sideMenu.find('.fixed-menu__item').eq(transitionNumber).addClass('fixed-menu__item-active');

})

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





//сделать через prev() next()







//Яндекс карты

let myMap;

const init = () => {
    myMap = new ymaps.Map('map', {
    center: [55.742049, 37.584159],
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

//video

var player;
const playerContainer = $(".player");




const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);
    
    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime - minutes * 60);
    
    function addZero(num) {
      return num < 10 ? `0${num}` : num;
    }
    
    return `${minutes} : ${seconds}`;
};

const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();
    
    $(".player__duration-estimate").text(formatTime(durationSec));
    
    if (typeof interval !== "undefined") {
      clearInterval(interval);
    }
    
    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;
      
        $(".player__playback-button").css({
          left: `${completedPercent}%`
        });
       
        $(".player__duration-completed").text(formatTime(completedSec));
    }, 1000);
};

$(".player__start").click(e => {
    e.preventDefault();
  
    if (playerContainer.hasClass("paused")) {
      playerContainer.removeClass("paused");
      player.pauseVideo();
      e.currentTarget.style.background = 'url(./img/icons_png/video-play.png) left center no-repeat'
    } else {
      playerContainer.addClass("paused");
      player.playVideo();
      e.currentTarget.style.background = 'url(./img/icons_png/video-pause.png) left center no-repeat';
  
    }
  });
  
  $(".player__playback").click(e => {
      const bar = $(e.currentTarget);
      const clickedPosition = e.originalEvent.layerX;
      
      const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
      const newPlaybackPositionSec =
        (player.getDuration() / 100) * newButtonPositionPercent;
      
      $(".player__playback-button").css({
        left: `${newButtonPositionPercent}%`
      });
      
      player.seekTo(newPlaybackPositionSec);
     });
  
  $(".player__volume-level").click(e => {
      const bar1 = $(e.currentTarget);
      const clickedPosition1 = e.originalEvent.layerX;
      
      const newButtonPositionPercent1 = (clickedPosition1 / bar1.width()) * 100;
  
      const newPlaybackPositionSec1 = (player.getVolume() / 100) 
  
      $(".player__volume-level-button").css({
        left: `${newButtonPositionPercent1}%`
      });
      
      player.setVolume(newButtonPositionPercent1);
  
     });
  

function onYouTubeIframeAPIReady() {
    if (viewportWidth <= 480) {
        console.log('test')
        player = new YT.Player('yt-player', {
            height: '234',
            width: '394',
            videoId: 'V2i1YkfrM54',
            events: {
              'onReady': onPlayerReady,
              //'onStateChange': onPlayerStateChange
            },
            playerVars: {
                controls: 0,
                disablekb: 0,
                showinfo: 0,
                rel: 0,
                autoplay: 0,
                modestbranding: 0
            }
          });
    }

    if (viewportWidth <= 768) {
        player = new YT.Player('yt-player', {
            height: '352',
            width: '596',
            videoId: 'V2i1YkfrM54',
            events: {
              'onReady': onPlayerReady,
              //'onStateChange': onPlayerStateChange
            },
            playerVars: {
                controls: 0,
                disablekb: 0,
                showinfo: 0,
                rel: 0,
                autoplay: 0,
                modestbranding: 0
            }
          });
    }

    if (viewportWidth > 768) {
        player = new YT.Player('yt-player', {
            height: '405',
            width: '660',
            videoId: 'V2i1YkfrM54',
            events: {
              'onReady': onPlayerReady,
              //'onStateChange': onPlayerStateChange
            },
            playerVars: {
                controls: 0,
                disablekb: 0,
                showinfo: 0,
                rel: 0,
                autoplay: 0,
                modestbranding: 0
            }
          });        
    }
  
}


