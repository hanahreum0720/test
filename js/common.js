$(document).ready(function(){    
    $('.tabListWrap, .subTitleArea a').on('touchstart',function(e){
        e.stopImmediatePropagation();
   });
   
    $('.tabList li button').on('click',function (e) {
        e.stopImmediatePropagation();
        let tabWrap = $(this).parents('.tabWrap');
        let tabLi = tabWrap.find('.tabList li');
        let tabBox = tabWrap.find('.tabBox');
        let tabIndex = $(this).parent().index();
        tabLi.removeClass('on');
        tabBox.removeClass('on');
        tabLi.eq(tabIndex).addClass('on');
        tabBox.eq(tabIndex).addClass('on');
    });

    $('.topBtn').on('click',function(){
        current = 0;
        wheel();
    });
    
    $('.mobMenuBtn').on('click',function(){
        $(this).toggleClass('on');
    });
    
    $('.popOpenBtn').click(function(){
        $('.popBack').addClass('on');
        var thispop = $('#'+$(this).data("popname")+'');
        thispop.addClass('on');
    }); 
    $('.popCloseBtn, .popBack').click(function(){
        $('.popBack').removeClass('on');
        $('.popLayer').removeClass('on');
    });

    //스크롤
    let pageWrap = document.querySelector('.pageWrap');  
    let page = document.querySelectorAll('.page'); 
    let pageLength = page.length;
    let current = 0;
    let windowHeight = window.innerHeight;      
    let footerHeight = $('.page.footer').innerHeight();
    let scrollHeight = 0;
    let animation = true;    
            
    function ani(){
        animation = false;
        pageWrap.addEventListener('transitionend',function(){
            animation = true;
        });
    }
    function wheel(){
        if(current == pageLength-1){
            scrollHeight = windowHeight*(current-1) + footerHeight; 
        }else{
            scrollHeight = windowHeight*current; 
        }
        $(".pageWrap").css('transform','translateY(-'+scrollHeight+'px)');
        $(".page").removeClass('now');
        $(".page").eq(current).addClass('now on');
    }     
    window.addEventListener('resize',function(){
        windowHeight = window.innerHeight;   
        footerHeight = $('.page.footer').innerHeight();
        //windowHeight =  $(".page").eq(current).innerHeight();  
        wheel();  
    })
    function up(){   
        if( current > 0 && $(".page").eq(current).children('.scrollBox').scrollTop() == 0 && animation == true){
            current--; 
            ani();
            wheel();    
        }   
    }
    function down(){
        if( current < pageLength-1 && animation == true){
            if($(".page").eq(current).children('.scrollBox').scrollTop() + $(".page").eq(current).children('.scrollBox').innerHeight() >= $(".page").eq(current).children('.scrollBox').prop('scrollHeight')){
                current++; 
                ani();
                wheel();
            }
        }
    }        
    window.addEventListener("wheel",function(e){               
        if(e.deltaY<0){
            up(); 
        }else{ 
            down();
        }
    });
    
    
    let percentage = 0;
    function progressBar(cont){
        percentage = Math.floor((cont.scrollTop() /
            (cont.prop("scrollHeight") - cont.prop("clientHeight"))
            ) * 100);     
        cont.find('i').css('height',percentage+'%');
    }
    $('.progressBarBox').on('scroll',function(){
        progressBar($(this));
    });

    let circleLength = $('.animateCircleList>li').length;
    let circleIndex = 0;
    let circleScroll = 0;
    let circleScrollNow;
    let circleHeight = $('.animateCircleList').data("height");
    let animation02 = true;    
    function ani02(){
        animation02 = false;
        $('.animateCircleScroll').on('transitionend',function(){
            animation02 = true;
        });
    }
    function circleFunction(circleScrollNow){        
        if(circleScrollNow > circleScroll){
            if(circleIndex < circleLength && animation02 == true){
                ani02();
                circleIndex += 1;
            }
        }else{
            if(circleIndex > 0 && animation02 == true){
                ani02();
                circleIndex -= 1;
            }
        }    
        if(circleIndex == 0){
         $('.aniCirclePrevDiv').removeClass('no');
        }else{
            $('.aniCirclePrevDiv').addClass('no');
        }
        $('.aniCircle').removeClass('circle00 circle01 circle02 circle03 circle04');
        $('.aniCircle').addClass('circle0'+circleIndex+'');
        $('.animateCircleList li').eq(circleIndex - 1).addClass('on');
        $('.animateCircleScroll').css('transform','translateY(-'+circleHeight*circleIndex+'rem)');
        circleScroll = circleScrollNow;
    }
    $('.animateCircleBox').on('scroll',function(){    
        circleScrollNow = $(this).scrollTop();        
        circleFunction(circleScrollNow);
    });

    






    let fadeLi = $('.animateFadeList>li');
    let fadeLength = fadeLi.length;
    let fadeCont = fadeLi.find('.fadeCont');
    let fadeSection = Math.floor(($('.animateFadeWrap').prop("clientHeight"))/fadeLength);
    let fadeIndex = 1;
    let fadeScroll = 0;
    let fadeArray = new Array();
    let indexEq = 1;
    for( var i = 0; i <= fadeLength ; i++){
        fadeArray.push(fadeSection * i);
    }
    function fadeWheelDown(eq){
        fadeCont.removeClass('wheelup active next prev');
        fadeLi.removeClass('now start');
        fadeLi.eq(eq).addClass('now');
        fadeLi.eq(eq).prev().find('.fadeCont').addClass('wheeldown prev');
        fadeLi.eq(eq).find('.fadeCont').addClass('wheeldown active on'); 
        if( fadeLi.eq(eq).find('input[type="checkbox"]').prop("checked") == false){
            fadeLi.eq(eq).find('input[type="checkbox"]').prop('checked',true).trigger("change");            
        }
    }
    function fadeWheelUp(eq){
        fadeCont.removeClass('wheeldown active next prev');
        fadeLi.removeClass('now');
        fadeLi.eq(eq).prev().addClass('now');
        fadeLi.eq(eq).find('.fadeCont').addClass('wheelup active');       
        fadeLi.eq(eq).prev().find('.fadeCont').addClass('wheelup next');
    }
    $('.animateFadeWrap').each(function(){
        let indexLength = $(this).find('.animateFadeList>li').length;
        $(this).append('<ul class="mobSlideIndexWrap"></ul>');
        for(let i = 0; i<indexLength; i++){
            $(this).find('.mobSlideIndexWrap').append('<li></li>');
        }
        $(this).find('.mobSlideIndexWrap li').eq(0).addClass('now');
    });

    $('.animateFadeWrap .mobSlideIndexWrap li').on('click',function(e){
        e.stopImmediatePropagation();
        indexEq = $(this).index();
        let mbli = $(this).parents('.animateFadeWrap').find('.animateFadeList').find('>li');
        mbli.removeClass('now start');
        mbli.eq(indexEq).addClass('now');
        mbli.find('.fadeCont').removeClass('start wheelup wheeldown active next prev')
        mbli.eq(indexEq).find('.fadeCont').addClass('wheeldown active');
        $(this).siblings().removeClass('now');
        $(this).addClass('now');
        fadeIndex = indexEq;
    });

    var UserAgent = navigator.userAgent;
    if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null){//모바일
        console.log('mobile js');
        var mobClass = document.querySelector('.container');
        mobClass.classList.add('is-mob');
        $(window).on('touchstart',function(e){
            e.stopImmediatePropagation();
            startY = e.originalEvent.changedTouches[0].screenY;
        });
        $(window).on('touchend',function(e){
            endY=e.originalEvent.changedTouches[0].screenY;  
            touchY = endY - startY;
            if( touchY <= 0){   
                if( current < pageLength-1 && animation == true){
                    down();
                }
            }else{
                up(); 
            }
        });
        $('.animateFadeBox a, .animateFadeBox .popOpenBtn ').on('touchend',function(e){
            e.stopImmediatePropagation();
        });
        $('.animateFadeList').on('touchstart',function(e){
            startX = e.originalEvent.changedTouches[0].screenX;
        });
        $('.animateFadeList').on('touchend',function(e){
            endX=e.originalEvent.changedTouches[0].screenX;  
            touchX = endX - startX;
            indexEq = fadeIndex-1;
            if( touchX <= 0){   
                if( fadeIndex < fadeLength){
                    fadeIndex += 1;
                    indexEq++;
                    fadeWheelDown(fadeIndex-1);
                    
                }
            }else{
                if(fadeIndex > 1){
                    fadeIndex -= 1;
                    indexEq--;
                    fadeWheelUp(fadeIndex);
                }                
            }
            $('.animateFadeWrap .mobSlideIndexWrap li').removeClass('now');
            $('.animateFadeWrap .mobSlideIndexWrap li').eq(indexEq).addClass('now');
        });
        
    }else{ //PC 
        console.log('pc js');   
        $('.animateFadeBox').on('scroll',function(){       
            fadeScrollNow = $(this).scrollTop();  
            indexEq = fadeIndex-1;         
            if( fadeScrollNow > fadeArray[fadeIndex-1] && fadeScrollNow <= fadeArray[fadeIndex]){
                // console.log(fadeIndex);               
            }else{
                if(fadeScrollNow > fadeScroll){
                    if( fadeIndex < fadeLength){
                        fadeIndex += 1;
                        fadeWheelDown(fadeIndex-1);
                    }
                }else{
                    if(fadeIndex > 1){
                        fadeIndex -= 1;
                        fadeWheelUp(fadeIndex);
                    }
                }
            }
            fadeScroll = fadeScrollNow;
            $('.animateFadeWrap .mobSlideIndexWrap li').removeClass('now');
            $('.animateFadeWrap .mobSlideIndexWrap li').eq(indexEq).addClass('now');
        });     
    }


    $('.mobSlideWrap').each(function(){
        let indexLength = $(this).find('.mobSlide>li').length;
        $(this).append('<ul class="mobSlideIndexWrap"></ul>');
        for(let i = 0; i<indexLength; i++){
            $(this).find('.mobSlideIndexWrap').append('<li></li>');
        }
        $(this).find('.mobSlideIndexWrap li').eq(0).addClass('now');
    });
    $('.mobSlideWrap .mobSlideIndexWrap li').on('click',function(e){
        e.stopImmediatePropagation();
        let indexEq = $(this).index();
        let mbli = $(this).parents().find('.mobSlide').find('>li');
        mbli.removeClass('prev now next')
        mbli.eq(indexEq-1).addClass('prev');
        mbli.eq(indexEq).addClass('now');
        mbli.eq(indexEq+1).addClass('next');
        $(this).siblings().removeClass('now');
        $(this).addClass('now');
        $('.mobSlideWrap .aniCircle').removeClass('circle00 circle01 circle02 circle03 circle04');
        $('.mobSlideWrap .aniCircle').addClass('circle0'+ (indexEq+1) +'');
    });
    
    let touchX,mouseX;
    $('.mobSlide>li').on('mousedown touchstart',function(e){
        e.stopImmediatePropagation();
        if( $('.container').hasClass('is-mob')==true){
            startX = e.originalEvent.changedTouches[0].screenX;
        }else{
            mouseStartX = e.pageX;
        }
    });
    $('.mobSlide>li').on('mouseup touchend',function(e){
        e.stopImmediatePropagation();
        if( $('.container').hasClass('is-mob')==true){
            endX=e.originalEvent.changedTouches[0].screenX;  
            touchX = endX - startX;
        }else{
            mouseEndX = e.pageX;
            mouseX = mouseEndX - mouseStartX;
        }
        let mobSlideNow = $(this).index();
        let mobSlideLength = $(this).parent().children().length;
        if( touchX <= 0 || mouseX <= 0){   
            if(mobSlideNow < mobSlideLength-1){
                $(this).removeClass('now').addClass('prev');
                $(this).next().removeClass('next').addClass('now');
                $(this).siblings().eq(mobSlideNow+1).addClass('next');
                $(this).parents().find('.mobSlideIndexWrap').find('li').removeClass('now');
                $(this).parents().find('.mobSlideIndexWrap').find('li').eq(mobSlideNow+1).addClass('now');
                $('.mobSlideWrap .aniCircle').removeClass('circle00 circle01 circle02 circle03 circle04');
                $('.mobSlideWrap .aniCircle').addClass('circle0'+ (mobSlideNow+2) +'');
            }
        }else{
            if(mobSlideNow > 0){
                $(this).prev().removeClass('prev').addClass('now');
                $(this).removeClass('now').addClass('next');
                $(this).next().removeClass('next')
                $(this).parents().find('.mobSlideIndexWrap').find('li').removeClass('now');
                $(this).parents().find('.mobSlideIndexWrap').find('li').eq(mobSlideNow-1).addClass('now');
                $('.mobSlideWrap .aniCircle').removeClass('circle00 circle01 circle02 circle03 circle04');
                $('.mobSlideWrap .aniCircle').addClass('circle0'+ mobSlideNow +'');
            }
        }        
    });












});

 
