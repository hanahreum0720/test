$(function () {
    //스크롤 통제
    var scrollHeight = 0;

    function scrollDim() {
        scrollHeight = $(window).scrollTop();
        $("body").css({
            "position": "fixed",
            "top": -scrollHeight
        });
    }

    function scrollAuto() {
        $("body").css({
            "position": "relative",
            "top": 0
        });
        $(window).scrollTop(scrollHeight);
    }
    //모바일메뉴
    $('.mob-menu-btn,.top-menu').on('click', function () {
        if ($('body').hasClass('uni-mob')) {
            if ($('.top-menu').hasClass('on')) {
                $('.top-menu,.logout-btn,.btn-fixed-area').removeClass('on');
                scrollAuto();
            } else {
                $('.top-menu,.logout-btn,.btn-fixed-area').addClass('on');
                scrollDim();
            }
        }

    });
    $('.top-menu ul').on('click', function (e) {
        e.stopImmediatePropagation();

    });
    $('.mob-btn-back').click(function () {
        window.parent.history.back();
    });
    //모바일 클래스
    function mobClass() {
        var windowWidth = $(window).width();
        if (windowWidth <= 768) {
            $('body').addClass('uni-mob');
            $('.sm-now').removeClass('on');
        } else {
            $('body').removeClass('uni-mob');
        }
    }
    mobClass();
    $(window).on('resize', function () {
        mobClass();
        scrollAuto();
        $('.top-menu,.logout-btn,.btn-fixed-area').removeClass('on');
        $('.condition-search-wrap').removeClass('on');
    });

    $('.alert').on('click', function (e) {
        e.preventDefault();
        alert('준비중입니다.');
    });

    //서브메뉴    
    $('.sm-now').on('click', function () {
        $(this).toggleClass('on');
    });

    //팝업
    $('.pop-open-btn').click(function () {
        let popNow = $('#' + $(this).data("popname") + '');
        popNow.addClass('on');
        //개발참고 //
        if (popNow.hasClass('pop-type-b')) {
            setTimeout(function () {
                popNow.removeClass('on');
            }, 5000)
        }
    });
    $('.pop-close-btn, .pop-back').click(function () {
        $(this).parents('.pop-layer').removeClass('on');
    });

    //탑스크롤버튼
    $('.top-btn-new').on('click', function () {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    });
    $( 'input').on('focus',function(){
        if ($('body').hasClass('uni-mob')) {
         $('.bottom-menu,.btn-fixed-area,.station-sub .btn-area').hide();  
        }
    }).on('blur',function(){
        if ($('body').hasClass('uni-mob')) {
            $('.bottom-menu,.btn-fixed-area,.station-sub .btn-area').show();  
        }
    });
    //탭박스
    $('.tab-list li > *').on('click', function (e) {
        e.preventDefault();
        let tl = $(this).parent();
        let tlIndex = tl.index();
        let nowTabBoxes = $(this).parents('.tab-wrap').find('.tab-box-wrap').find('.tab-box');
        tl.siblings().removeClass('on');
        tl.addClass('on');
        nowTabBoxes.removeClass('on');
        nowTabBoxes.eq(tlIndex).addClass('on');
    });
    //조회조건 버튼    
    $('.lc-btn').on('click', function () {
        let nowWrap = $(this).parents('.condition-wrap');
        nowWrap.removeClass('on');
        nowWrap.find('.lc-btn').removeClass('on');
        nowWrap.find('.cond-now').text($(this).text());
        $(this).addClass('on');

    });
    $('.cond-now').on('click', function () {
        let nowWrap = $(this).parents('.condition-wrap');
        nowWrap.toggleClass('on');
    });

    //체크박스        
    $(".chk-agree-all").on("change", function () {
        let checkallprop = $(".chk-agree-all").prop("checked");
        if (checkallprop == true) {
            $(".chk-agree").prop("checked", true);
            $('.btn-area .btn').removeClass('disabled');
        } else {
            $(".chk-agree").prop("checked", false);
            $('.btn-area .btn').addClass('disabled');
        }
    });
    $("[type=checkbox]:not('.chk-agree-all')").on("change", function () {
        let checkboxLength = $(".chk-agree:checked").length;
        let checkedLength = $(".chk-agree").length;
        if (checkboxLength == checkedLength) {
            $(".chk-agree-all").prop("checked", true);
            $('.btn-area .btn').removeClass('disabled');
        } else {
            $(".chk-agree-all").prop("checked", false);
            $('.btn-area .btn').addClass('disabled');
        }
    });
    //약관
    $('.btn-area .btn').on('click', function (e) {
        if ($(this).hasClass('disabled') == true) {
            e.preventDefault();
            alert('필수 이용 약관에 동의해 주세요!');
        }
    })

    //페이징
    $('.paging-wrap button').on('click', function () {
        var no = $(this).hasClass('paging-move');
        if (no == false) {

            $(this).siblings().removeClass('on');
            $(this).addClass('on');
        }


    });
    $('.paging-move').on('click', function () {
        var all = $('.paging-wrap').children().length - 2;
        var now = $('.paging-wrap button.on').index();
        var prev = $(this).hasClass('paging-previous');
        var next = $(this).hasClass('paging-next');
        if (prev == true && now > 1) {
            $('.paging-wrap .on').removeClass('on');
            $('.paging-wrap button').eq(now - 1).addClass('on');
        } else if (next == true && now < all) {
            $('.paging-wrap .on').removeClass('on');
            $('.paging-wrap button').eq(now + 1).addClass('on');

        }


    });

    // safari 브라우저    
    function safari() { 
        if(navigator.userAgent.indexOf("Safari") != -1)
        {
            var mobile = (/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));
            if (mobile) { 
                $('html, body').addClass('uni-safari');
            }
        }
    }
    safari() ;
});

