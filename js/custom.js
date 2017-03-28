// Main Nav Sticky Header ----------------------------------

$(document).ready(function () {

    var navHeight = $('#stickymain').offset().top;
    FixMegaNavbar(navHeight);
    $(window).bind('scroll', function () { FixMegaNavbar(navHeight); });

    function FixMegaNavbar(navHeight) {
        if (!$('#stickymain').hasClass('navbar-fixed-bottom')) {
            if ($(window).scrollTop() > navHeight) {
                $('#stickymain').addClass('navbar-fixed-top');
                $('body').css({ 'margin-top': $('#stickymain').height() + 'px' });

                if ($('#stickymain').parent('div').hasClass('container')) $('#stickymain ').children('div').addClass('container').removeClass('container-fluid');
                else if ($('#stickymain ').parent('div').hasClass('container-fluid')) $('#stickymain ').children('div').addClass('container-fluid').removeClass('container');
            }
            else {
                $('#stickymain ').removeClass('navbar-fixed-top');
                $('#stickymain ').children('div').addClass('container').removeClass('container-fluid');
                $('body').css({ 'margin-top': '' });
            }
        }
    }

});


// Main Nav Active Scrolling ----------------------------------

// Cache selectors
var lastId;
var topMenu = $("#top-menu");
var topMenuHeight = topMenu.outerHeight() + 10;
// All list items
var menuItems = topMenu.find("a");
// Anchors corresponding to menu items
var scrollItems = menuItems.map(function () {
    var refVal = $(this).attr("href");
    if ((typeof (refVal) != 'undefined') && (refVal.startsWith('.') || (refVal.startsWith('#')))) {
        var item = $(refVal);
        if (typeof (item) !== 'undefined' && item.length) { return item; }
    }
});

function setStickyNavMenuItems() {
    menuItems = topMenu.find("a");
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function (e) {
        var href = $(this).attr("href"),
            offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
        $('html, body').stop().animate({
            scrollTop: offsetTop
        }, 500);
        e.preventDefault();
    });
}

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function (e) {
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 500);
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
          .parent().removeClass("active")
          .end().filter("[href=#" + id + "]").parent().addClass("active");
    }
});


// Back to Top button ----------------------------------

var amountScrolled = 150;

$(window).scroll(function () {
    if ($(window).scrollTop() > amountScrolled) {
        $('a.back-to-top').fadeIn('slow');
    } else {
        $('a.back-to-top').fadeOut('slow');
    }
});

$('a.back-to-top').click(function () {
    $('html, body').animate({
        scrollTop: 0
    }, 500);
    return false;
});


// Mobile Nav Smooth Scrolling ----------------------------------

$(function () {
    $('.navbar-main .nav-justified a').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 700);
                return false;
            }
        }
    });
});

// Service Line Locations CTA Smooth Scrolling ----------------------------------

$(function() {
   $('.location-cta a').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});


// Tooltip & Popovers ----------------------------------

$("[data-toggle='tooltip']").tooltip()
.click(function (e) {
    e.preventDefault();
});

$("[data-toggle='popover']").popover({ html: true })
.click(function (e) {
    e.preventDefault();
});


// Link Open Tabs and Accordions ----------------------------------

$('a[data-toggle="tab"]').on('shown.bs.tab', function () {
    var target = this.href.split('#');
    $('.nav a').filter('a[href="#' + target[1] + '"]').tab('show');
});


// Service Thumbnail Hovertext ----------------------------------

$("[rel='tooltip']").tooltip();

$('.thumbnail-service').hover(
    function () {
        $(this).find('.hovertext').fadeIn(180)
    },
    function () {
        $(this).find('.hovertext').fadeOut(140)
    }
);

// Utility Nav Single Toggle ----------------------------------

$('.navbar-utility').on('show.bs.collapse', function () {
    var actives = $(this).find('.collapse.in'),
        hasData;

    if (actives && actives.length) {
        hasData = actives.data('collapse')
        if (hasData && hasData.transitioning) return
        actives.collapse('hide')
        hasData || actives.data('collapse', null)
    }
});

$(document).on('click', function () {
    $('.navbar-utility-block.collapse').collapse('hide');
})

// Utility Nav Icon Switch ----------------------------------

$('#nav-patients').on('shown.bs.collapse', function () {
    $(".nav-patients").removeClass("fa-plus-square").addClass("fa-minus-square");
});

$('#nav-patients').on('hidden.bs.collapse', function () {
    $(".nav-patients").removeClass("fa-minus-square").addClass("fa-plus-square");
});

$('#nav-visitors').on('shown.bs.collapse', function () {
    $(".nav-visitors").removeClass("fa-plus-square").addClass("fa-minus-square");
});

$('#nav-visitors').on('hidden.bs.collapse', function () {
    $(".nav-visitors").removeClass("fa-minus-square").addClass("fa-plus-square");
});

$('#nav-professionals').on('shown.bs.collapse', function () {
    $(".nav-professionals").removeClass("fa-plus-square").addClass("fa-minus-square");
});

$('#nav-professionals').on('hidden.bs.collapse', function () {
    $(".nav-professionals").removeClass("fa-minus-square").addClass("fa-plus-square");
});


// Bootstrap Switch (location-index) ----------------------------------

$("[name='location-checkbox']").bootstrapSwitch();

$("[id='hospital-checkbox']").on("click", function () {
    var type;
    type = $(this).data("switch-set");
    return $("#switch-hospital-" + type).bootstrapSwitch(type, $(this).data("switch-value"));
});

$("[id='emergency-checkbox']").on("click", function () {
    var type;
    type = $(this).data("switch-set");
    return $("#switch-emergency-" + type).bootstrapSwitch(type, $(this).data("switch-value"));
});

$("[id='immediate-checkbox']").on("click", function () {
    var type;
    type = $(this).data("switch-set");
    return $("#switch-immediate-" + type).bootstrapSwitch(type, $(this).data("switch-value"));
});

$("[id='rehab-checkbox']").on("click", function () {
    var type;
    type = $(this).data("switch-set");
    return $("#switch-rehab-" + type).bootstrapSwitch(type, $(this).data("switch-value"));
});

$("[id='imaging-checkbox']").on("click", function () {
    var type;
    type = $(this).data("switch-set");
    return $("#switch-imaging-" + type).bootstrapSwitch(type, $(this).data("switch-value"));
});

$("[id='physician-checkbox']").on("click", function () {
    var type;
    type = $(this).data("switch-set");
    return $("#switch-physician-" + type).bootstrapSwitch(type, $(this).data("switch-value"));
});

$("[id='other-checkbox']").on("click", function () {
    var type;
    type = $(this).data("switch-set");
    return $("#switch-other-" + type).bootstrapSwitch(type, $(this).data("switch-value"));
});

// Carousel Time Delay ----------------------------------

$('.carousel').carousel({
    interval: 1000 * 7
});

// Typeahead ----------------------------------------

$('#multi-search').typeahead([
	{
	    highlight: true,
	    limit: 2,
	    name: 'physicians',
	    header: '<h3 class="tt-header">Physicians</h3>',
	    remote: {
	        url: "/webapi/search/TypeAhead?tag=physicians&term=%QUERY",
	        wildcard: "%QUERY"
	    }
	},

	{
	    highlight: true,
	    limit: 2,
	    name: 'locations',
	    header: '<h3 class="tt-header">Locations</h3>',
	    remote: {
	        url: "/webapi/search/TypeAhead?tag=locations&term=%QUERY",
	        wildcard: "%QUERY"
	    }
	},

	{
	    highlight: true,
	    limit: 2,
	    name: 'services',
	    header: '<h3 class="tt-header">Service Lines</h3>',
	    remote: {
	        url: "/webapi/search/TypeAhead?tag=services&term=%QUERY",
	        wildcard: "%QUERY"
	    }
	},
	{
	    highlight: true,
	    limit: 2,
	    name: 'treatments',
	    remote: {
	        url: "/webapi/search/TypeAhead?tag=healthlibrary&term=%QUERY",
	        wildcard: "%QUERY"
	    },
	    header: '<h3 class="tt-header">Health Library</h3>'
	},
	{
	    highlight: true,
	    limit: 2,
	    name: 'news',
	    remote: {
	        url: "/webapi/search/TypeAhead?tag=news&term=%QUERY",
	        wildcard: "%QUERY"
	    },
	    header: '<h3 class="tt-header">News Center</h3>'
	},

]);
