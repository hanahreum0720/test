
var navigation = function(){
   /* header 유저메뉴 리스트 토글 */
   var userMenuIcon = $("header .userinfo .userMenu .btnUserMenu");
    $(userMenuIcon).on("click", function () {
        var nextEl = $(this).next("ul");
        $(this).toggleClass("on");
        nextEl.toggle(300);
    });
    $(document).mouseup(function (e) {
        var userMenu = $(".userMenu");
        if (!userMenu.is(e.target) && userMenu.has(e.target).length === 0) {
            $(".userMenu ul").hide(300);
            $(".userMenu .btns").removeClass("on");
        }
    });
    $(".navigation .hamburger").on("click", function () {
        $(".navigation").toggleClass("closed");
        $(".container").toggleClass("wide-view");
        if ($(".navigation").hasClass("closed")) {
            $(".navigation").animate({
                width: "70px",
            }, 400);
        } else {
            $(".navigation").animate({
                width: "250px",
            }, 400);
        }
    });
    
    $(".navigation > ul > li > a").on("click", function () {
      $(".navigation ul li:has(ul)").toggleClass("has-list");
        var nextEl = $(this).next();
        $(".navigation > ul > li").removeClass("active");
        $(".navigation > ul > li").removeClass("has-list");
        $(this).closest("li").addClass("active");
        if (nextEl.is("ul") && nextEl.is(":visible")) {
            $(this).closest("li").removeClass("active");
            nextEl.slideUp("fast");
        }
        if (nextEl.is("ul") && !nextEl.is(":visible")) {
            $(".navigation > ul > li > ul:visible").slideUp(300);
            nextEl.slideDown("fast");
        }
        if (nextEl.is("ul")) {
            return false;
        } else {
            return true;
        }    
    });
};

var daterangepicker = function () {
  var datePicker = ("#datePicker .calendar");
  $(datePicker).daterangepicker(
    {
      autoApply: true,
      locale: {
        format: "YYYY-MM-DD",
        daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
        monthNames: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ],
        customRangeLabel: "사용자 선택",
      },
      ranges: {
        오늘: [moment(), moment()],
        어제: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        이번달: [moment().startOf("month"), moment().endOf("month")],
        전월: [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ],
        전전월: [
          moment().subtract(2, "month").startOf("month"),
          moment().subtract(2, "month").endOf("month"),
        ],
        "최근 7일": [
          moment().subtract(7, "days"),
          moment().subtract(1, "days"),
        ],
        "최근 30일": [
          moment().subtract(30, "days"),
          moment().subtract(1, "days"),
        ],
        "최근 90일": [
          moment().subtract(90, "days"),
          moment().subtract(1, "days"),
        ],
        "최근 180일": [
          moment().subtract(180, "days"),
          moment().subtract(1, "days"),
        ],
      },
    },
    function (start, end, label) {
      console.log("Choice Date: " + start.format('YYYYMMD') + ' ~ ' + end.format('YYYYMMDD'));
      $("input[name=sDate]").val(start.format("YYYY-MM-DD"));
      $("input[name=eDate]").val(end.format("YYYY-MM-DD"));
      $("#searchForm").submit();
    }
  );

  /* input에 yyyy.mm.dd 형태로 날짜 입력 */
  $("input[name=sDate],input[name=eDate]").val($.datepicker.formatDate($.datepicker.ATOM, new Date()));    
};

var daterangepicker2 = function () {
  var datePicker = ("#datePicker2 .calendar");
  $(datePicker).daterangepicker(
    {
      autoApply: true,
      locale: {
        format: "YYYY-MM-DD",
        daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
        monthNames: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ],
        customRangeLabel: "사용자 선택",
      },
      ranges: {
        오늘: [moment(), moment()],
        어제: [moment().subtract(1, "days"), moment().subtract(1, "days")],
        이번달: [moment().startOf("month"), moment().endOf("month")],
        전월: [
          moment().subtract(1, "month").startOf("month"),
          moment().subtract(1, "month").endOf("month"),
        ],
        전전월: [
          moment().subtract(2, "month").startOf("month"),
          moment().subtract(2, "month").endOf("month"),
        ],
        "최근 7일": [
          moment().subtract(7, "days"),
          moment().subtract(1, "days"),
        ],
        "최근 30일": [
          moment().subtract(30, "days"),
          moment().subtract(1, "days"),
        ],
        "최근 90일": [
          moment().subtract(90, "days"),
          moment().subtract(1, "days"),
        ],
        "최근 180일": [
          moment().subtract(180, "days"),
          moment().subtract(1, "days"),
        ],
      },
    },
    function (start, end, label) {
      console.log("Choice Date: " + start.format('YYYYMMD') + ' ~ ' + end.format('YYYYMMDD'));
      $("input[name=sDate2]").val(start.format("YYYY-MM-DD"));
      $("input[name=eDate2]").val(end.format("YYYY-MM-DD"));
      $("#searchForm").submit();
    }
  );

  /* input에 yyyy.mm.dd 형태로 날짜 입력 */
  $("input[name=sDate2],input[name=eDate2]").val($.datepicker.formatDate($.datepicker.ATOM, new Date()));    
};

/* input에 yyyy.mm.dd 형태로 날짜 입력 */
// var inputDay = function () {
//    $("input[name=sDate],input[name=eDate]").val($.datepicker.formatDate($.datepicker.ATOM, new Date()));    
// };


var monthpicker = function () {
  $("input[id^='monthpicker']").each(function() {
    var _this = this.id;
    
    $('#'+_this).monthpicker({
        autoApply: true,
        dateFormat: 'yy-mm',  
        showOn:"both",
        // Button: '<button type="button" class="ui-datepicker-trig11ger">...</button>',
        // buttonImage: "../../image/component/ico_calendar.svg",
        // buttonImageOnly: true,
        monthNamesShort: [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
          ],
        ranges: false,
      },
    );
  });
};

/* input에 yyyy-mm 형태로 날짜 입력 */
var inputMonth = function () {
  /* 달력 MM 까지 출력 > YYYY - MM */
  //var month = new Date().toISOString().slice(0, 7);
 /* 달력 형식 YYYY.MM 형식으로 출력 */
  var month = new Intl.DateTimeFormat('kr').format(new Date()).slice(0,8).replace(/\./g,'-').replace(/\s/g,'');
    $("input[name=monthpicker]").attr('value', month);
};


/* dateTimePicker 달력 시계  */
var dateTimePicker = function () {
  /* 달력, 시계, 달력, 시계 */
  var dataTime = ("#dateTime, #dateTime2, #dateTime3");
  $(dataTime).daterangepicker({
    autoApply: true,
    timePicker: true,
    timePicker24Hour: true,
    startDate: moment().startOf('hour'),
    endDate: moment().startOf('hour').add(32, 'hour'),
    locale: {
      format: "YYYY-MM-DD",
      daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
      monthNames: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      customRangeLabel: "사용자 선택",
    },
  },
   function (start, end, label) {
      // console.log("Choice Date: " + start.format('YYYYMMDD') + ' ~ ' + end.format('YYYYMMDD'));
      $("input[name=sDate]").val(start.format("YYYY-MM-DD"));
      $("input[name=eDate]").val(end.format("YYYY-MM-DD"));
      $("input[name=sTime]").val(start.format("hh:mm A"));
      $("input[name=eTime]").val(end.format("hh:MM A"));
      // $("#searchForm").submit();
  });
};

var tab = function () {
    $(".tab li").click(function (e) {
    $(this).closest("section").find(".tab li").removeClass("on");
    var tabIndex = $(this).addClass("on").index();
    var tabListIndex = $(this).closest("section").find(".tabView > .tabViewList");
    $(tabListIndex).removeClass("show");
    $(tabListIndex).eq(tabIndex).addClass("show");
    });
};

/* tabButton  li로 만든 탭의 형태 */
var tabButton = function () {
    $(".tabButton li").click(function (e) {
    $(this).closest(".tabButton").find("li").removeClass("on");
    $(this).addClass("on");
    });
};

/* iMark 마우스 오버 & 마우스 아웃시 말풍선 효과 */
var iBubble = function () {
  var iBubble = $(".Qmark, .iMark");
  var iBubbleHover = $(".QmarkHover, .iMarkHover");
    $(iBubble).on('mouseover', function () {
        $(this).siblings(iBubbleHover).css('display', 'block');
    }).on('mouseout', function () {
        $(iBubbleHover).css('display', 'none');
    });
};

/* 팝업 */ 
var modalOpen = function () {
  $('.modalOpen').click(function(){
        $('#'+$(this).data("popname")+'').addClass('modalOn');
    }); 
    $('.modalClose, .modalDim').click(function(){
        $(this).parents('.modalWrap').removeClass('modalOn');
    }); 
};


$(function () {
  navigation();
  daterangepicker();
  daterangepicker2();
  // inputDay();
  monthpicker();
  inputMonth();
  dateTimePicker();
  tab();
  tabButton();
  iBubble();
  //modalOpen();
});

