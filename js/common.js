$(document).ready(function () {
    //스크롤
    let pageWrap = document.querySelector('.pageWrap');
    let page = document.querySelectorAll('.page');
    let pageLength = page.length;
    let current = 0;
    let windowHeight = window.innerHeight;
    let footerHeight = $('.page.footer').innerHeight();
    let scrollHeight = 0;
    let animation = true;

    function ani() {
        animation = false;
        pageWrap.addEventListener('transitionend', function () {
            animation = true;
        });
    }

    function wheel() {
        if (current == pageLength - 1) {
            scrollHeight = windowHeight * (current - 1) + footerHeight;
        } else {
            scrollHeight = windowHeight * current;
        }
        $(".pageWrap").css('transform', 'translateY(-' + scrollHeight + 'px)');
        $(".page").removeClass('now');
        $(".page").eq(current).addClass('now on');

        $(".pageMenu li,.topBtn").removeClass('on');
        if (current == 1 || current == 2 ) {
            $("header").addClass('on');
        } else{
            $("header").removeClass('on');
        }
        if (current == pageLength - 1) {
            $(".topBtn").addClass('on');
        }
    }

    function up() {
        if (current > 0 && $(".page").eq(current).children('.scrollBox').scrollTop() == 0 && animation == true) {
            current--;
            ani();
            wheel();
        }
    }

    function down() {
        if (current < pageLength - 1 && animation == true) {
            if ($(".page").eq(current).children('.scrollBox').scrollTop() + $(".page").eq(current).children('.scrollBox').innerHeight() >= $(".page").eq(current).children('.scrollBox').prop('scrollHeight')) {
                current++;
                ani();
                wheel();
            }
        }
    }
    window.addEventListener("wheel", function (e) {
        if (e.deltaY < 0) {
            up();
        } else {
            down();
        }
    });
    window.addEventListener('resize', function () {
        windowHeight = window.innerHeight;
        footerHeight = $('.page.footer').innerHeight();
        //windowHeight =  $(".page").eq(current).innerHeight();  
        wheel();
    })


    var UserAgent = navigator.userAgent;
    if (UserAgent.match(/iPhone|iPod|iPad|Macintosh|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null) { //모바일
        console.log('mobile js');
        var mobClass = document.querySelector('.container');
        mobClass.classList.add('is-mob');

        let touchHorizon, touchVertical;
        $(window).on('touchstart', function (e) {
            e.stopImmediatePropagation();
            startX = e.originalEvent.changedTouches[0].screenX;
            startY = e.originalEvent.changedTouches[0].screenY;
        });
        $(window).on('touchend', function (e) {
            endX = e.originalEvent.changedTouches[0].screenX;
            endY = e.originalEvent.changedTouches[0].screenY;
            touchHorizon = Math.abs(endX - startX);
            touchVertical = Math.abs(endY - startY);

            if (touchHorizon < touchVertical) {
                //console.log('세로세로');
                touchY = endY - startY;
                if (touchY <= 0) {
                    if (current < pageLength - 1 && animation == true) {
                        down();
                    }
                } else {
                    up();
                }
            }
        });

    } else { //PC 
        console.log('pc js');
        var windowWidth = $(window).width();
        if (windowWidth <= 768) {
            $('.container').addClass('view-mob');
        }
        window.addEventListener('resize', function () {
            if (windowWidth <= 768) {
                $('.container').addClass('view-mob');
            } else {
                $('.container').removeClass('view-mob');
            }
        })

    }



    $('.topBtn').on('click', function () {
        current = 0;
        wheel();
    });




    //팝업
    $('.popOpenBtn').on('click', function () {
        animation = false;
        let popNow = $('#' + $(this).data("popname") + '');
        popNow.addClass('on');
    });
    $('.popCloseBtn, .popDim').on('click', function () {
        animation = true;
        $(this).parents('.popLayer').removeClass('on').removeAttr('tabindex');
    });

});