
        //Start navbar toggle fix top bottom
        $(document).on('click', '.toggle_fixing', function(e) {
            e.preventDefault();
            if ($('#main_navbar').hasClass('navbar-fixed-top')) {
                $('#main_navbar').toggleClass('navbar-fixed-bottom navbar-fixed-top');
                $(this).children('i').toggleClass('fa-chevron-down fa-chevron-up');
            } else {
                $('#main_navbar').toggleClass('navbar-fixed-bottom');
                $(this).children('i').toggleClass('fa-chevron-down fa-chevron-up');
                if ($('#main_navbar').parent('div').hasClass('container')) $('#main_navbar').children('div').addClass('container').removeClass('container-fluid');
                else if ($('#main_navbar').parent('div').hasClass('container-fluid')) $('#main_navbar').children('div').addClass('container-fluid').removeClass('container');
                FixMegaNavbar(navHeight);
            }
            if ($('#main_navbar').hasClass('navbar-fixed-top')) {$('body').css({'margin-top': $('#main_navbar').height()+'px', 'margin-bottom': ''});}
            else if ($('#main_navbar').hasClass('navbar-fixed-bottom')) {$('body').css({'margin-bottom': $('#main_navbar').height()+'px', 'margin-top': ''});}
        })
        //End navbar toggle fix top bottom

    	//Start Fix MegaNavbar on scroll page
    	var navHeight = $('#main_navbar').offset().top;
    	FixMegaNavbar(navHeight);
    	$(window).bind('scroll', function() {FixMegaNavbar(navHeight);});

    	function FixMegaNavbar(navHeight) {
    	    if (!$('#main_navbar').hasClass('navbar-fixed-bottom')) {
    	        if ($(window).scrollTop() > navHeight) {
    	            $('#main_navbar').addClass('navbar-fixed-top')
    	            $('body').css({'margin-top': $('#main_navbar').height()+'px'});
    	            if ($('#main_navbar').parent('div').hasClass('container')) $('#main_navbar').children('div').addClass('container').removeClass('container-fluid');
    	            else if ($('#main_navbar').parent('div').hasClass('container-fluid')) $('#main_navbar').children('div').addClass('container-fluid').removeClass('container');
    	        }
    	        else {
    	            $('#main_navbar').removeClass('navbar-fixed-top');
    	            $('#main_navbar').children('div').addClass('container-fluid').removeClass('container');
    	            $('body').css({'margin-top': ''});
    	        }
    	    }
    	}
    	//End Fix MegaNavbar on scroll page

    	//Next code used to prevent unexpected menu close when using some components (like accordion, tabs, forms, etc), please add the next JavaScript to your page
    	$( window ).load(function() {
    	    $(document).on('click', '.navbar .dropdown-menu', function(e) {e.stopPropagation();});
    	});
