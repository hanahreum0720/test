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

    function scrollAuto(scrollHeight) {
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
                if($('.condition-search-wrap.type03').hasClass('on')==true){

                }else{
                    scrollAuto(scrollHeight);
                }
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
        if( $(window).width() > 768){
            var scrollHeight = $(window).scrollTop();
            scrollAuto(scrollHeight);
            $('.top-menu,.logout-btn,.btn-fixed-area').removeClass('on');
            $('.condition-search-wrap').removeClass('on');   
            $('.bottom-menu,.btn-fixed-area,.station-sub .btn-area').removeClass('hide');    

        }  
    });

    $('.alert').on('click', function (e) {
        e.preventDefault();
        alert('준비중입니다.');
    });

    //서브메뉴    
    $('.sm-open').on('click', function () {
        $('.sm-now').toggleClass('on');
        $('.sb-mob-open').toggleClass('hide');
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
    //qna페이지 검색on시 스크롤 막기
    
    $('.sb-mob-open').on('click',function(){
        $('.condition-search-wrap').addClass('on');
        $('.bottom-menu, .btn-fixed-area').addClass('hide');
        scrollDim();
    });
    $('.sb-mob-close').on('click',function(){
        $('.condition-search-wrap').removeClass('on');     
        $('.bottom-menu, .btn-fixed-area').removeClass('hide');           
        scrollAuto(scrollHeight);
    });

    //모바일 키패드 on시 bottom fixed 요소 히든처리
    var UserAgent = navigator.userAgent;
    if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null){//모바일 check    
        var originalSize = jQuery(window).height();
        jQuery(window).resize(function(){
            if(jQuery(window).height() != originalSize) {
                $('.uni-mob .bottom-menu,.uni-mob .btn-fixed-area,.uni-mob.station-sub .btn-area,.uni-mob.qna-write .sub-menu,.uni-mob.service .condition-search-wrap.type03 .search').addClass('hide');  
            }else{
                $('.uni-mob .bottom-menu,.uni-mob .btn-fixed-area,.uni-mob.station-sub .btn-area,.uni-mob.qna-write .sub-menu,.uni-mob.service .condition-search-wrap.type03 .search').removeClass('hide');  
            }
        });
    }
    // safari 브라우저        
    function isBrowserCheck(){
        var agent = navigator.userAgent.toLowerCase();
        if(agent.indexOf("chrome") != -1){
            $('html, body').addClass('uni-chrome'); 
        }else if(agent.indexOf("safari") != -1){
            if ($('body').hasClass('uni-mob')) { 
                $('html, body').addClass('uni-safari'); 
                $("header,.content,footer").wrapAll("<div class='contentWrap'></div>");
            }
        }
    }
    //isBrowserCheck();
});
