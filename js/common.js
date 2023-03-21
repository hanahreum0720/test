$(function(){  
    //해상도 클래스
    function responsiveCheck(){
        if($(window).width() <= 768){
            $('body').addClass('mode_mob');
            $('.gnb_menu').off('mouseover');
            $('header .center').off('mouseleave');
        }else{
            $('body').removeClass('mode_mob');
            $('.gnb_menu').on('mouseover',function(){
                $('header .center').addClass('on');
            });
            $('header .center').on('mouseleave',function(){
                $('header .center').removeClass('on');
            });
        }
    }
    responsiveCheck();

    //윈도우 리사이즈 이벤트     
    const windowWidth= $(window).width(); 
    const windowHeight= $(window).height();    
    $(window).resize(function(){
        responsiveCheck();
        if($(window).width() > 768){
            //모바일 해제시 모바일메뉴 remove on
            $('header .center,.mobMenuClose').removeClass('on');
            scrollAuto(scrollHeight);
        }
        //모바일 fixed bottom 요소 inherit (디바이스 키패드on시 화면 리사이즈)
        if($('body').hasClass('device_mob')){
            if($(window).height() != windowHeight){
                $('.bottomFixedWrap').addClass('hide'); 
            }else{
                $('.bottomFixedWrap').removeClass('hide'); 
            }
        }
    });

    //헤더 메뉴
    $('.mobMenuOpen').click(function(){
        $('header .center').addClass('on');
        $('.mobMenuClose').addClass('on');
        scrollDim();
    });
    $('.gnb_menu>li>span').click(function(){
        $(this).parent().siblings().removeClass('on');
        $(this).parent().toggleClass('on');
    });
    $('.mobMenuClose').click(function(){
        $(this).removeClass('on');
        $('header .center').removeClass('on');
        scrollAuto(scrollHeight);
    });

    //스크롤 통제
    let scrollHeight = 0;
    function scrollDim() {
        scrollHeight = $(window).scrollTop();
        $("body").css({"position": "fixed","top": -scrollHeight});
    } 
    function scrollAuto(scrollHeight) {
        $("body").css({"position": "relative","top": 0 });
        $(window).scrollTop(scrollHeight);
    }
    
    //탑스크롤버튼
    $('.topBtn').on('click', function () {
        window.scroll({
            top: 0,
            behavior: 'smooth'
        });
    });
        
    const contentHeight= $('.content').height();   
    function stView(){
        if( contentHeight > 1080){
            if($(window).scrollTop() > 0){
                $('.topBtn').css('display','block');
            }else{
                $('.topBtn').css('display','none');
            }
        }
    }
    stView();
    $(window).scroll(function(){
        stView();
    });


    //팝업
    $('.popOpenBtn').on('click',function(){
        let popNow = $('#' + $(this).data("popname") + '');
        let clickContent = $(this);
        popNow.addClass('on');
        scrollDim();
        if (popNow.hasClass('typeTimer')) {
            setTimeout(function () {
                popNow.find('.popDim').trigger("click");
            }, 5000)
        }
    });
    $('.popCloseBtn, .popDim').on('click',function(){
        $(this).parents('.popLayer').removeClass('on').removeAttr('tabindex');
        scrollAuto(scrollHeight);
        tabAuto();
    });

    
    //탭박스
    $('.tabList li').on('click',function () {
        let tabWrap = $(this).parents('.tabWrap');
        let tabLi = tabWrap.find('.tabList li');
        let tabBox = tabWrap.find('.tabBox');
        let tabIndex = $(this).index();
        tabLi.removeClass('on');
        tabBox.removeClass('on');
        tabLi.eq(tabIndex).addClass('on');
        tabBox.eq(tabIndex).addClass('on');
    });
    $('.dataTabList li button').on('click',function () {
        $(this).parent().siblings().removeClass('on');
        $(this).parent().addClass('on');
    });
    $('.openListWrap li > a[href="#"]').on('click',function (e) {
        //$(this).parent().siblings().removeClass('on');
        e.preventDefault();
        $(this).parent().toggleClass('on');
    });

    //정보입력 버튼 on event
    $('.certificationFrom>ul>li:first-child button').on('click',function () {
        $(this).siblings().removeClass('on');
        $(this).addClass('on');
    });

    //이중 체크박스     
    $(".checkWrap input[type='checkbox']").on("change", function () {
        let chkWrap = $(this).closest('.checkWrap');
        let chkAll = chkWrap.find(".chkAll");
        let chkBox = chkWrap.find(".chk");
        let chkBoxLength = chkBox.length;
        let checkedLength = chkWrap.find(".chk:checked").length;

        let topWrap = $(this).parents('.checkWrap');
        let chkAllTop = topWrap.find('.chkAllTop');
        let allBox = topWrap.find('input[type="checkbox"]');
        let allBoxLength = allBox.length - 1;
        let allCheckedLength = topWrap.find('input[type="checkbox"]:checked').length;
        let chknum = 0;

        if($(this).hasClass('chkAll')){
            if($(this).prop("checked") == true){
                chkBox.prop("checked", true);
            }else{
                chkBox.prop("checked", false);
                chkAllTop.prop("checked", false);
            }
        }else if($(this).hasClass('chk')){
            if(chkBoxLength == checkedLength){
                chkAll.prop("checked", true);
            }else{
                chkAll.prop("checked", false);
                chkAllTop.prop("checked", false);
            }                    
        }else if($(this).hasClass('chkAllTop')){
            if($(this).prop("checked") == true){
                allBox.prop("checked", true);
            }else{
                allBox.prop("checked", false);
            }
        }
        $(allBox).each(function () {
            if($(this).prop("checked") == true){
                chknum++;
            }
        });	
        if(allBoxLength == chknum){
            chkAllTop.prop("checked", true);
        }
    });
    

    //얼럿버튼
    $('.btn-alert.disabled').on('click',function(e){
        e.preventDefault();
        let notice = $(this).data("notice");
        alert(notice);
    });
    

});