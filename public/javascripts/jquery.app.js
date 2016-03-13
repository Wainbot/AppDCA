/* Theme Name: Starto - Responsive Landing page template
   Author: Coderthemes
   Author e-mail: coderthemes@gmail.com
   Version: 1.0.0
   Created:Feb 2016
   File Description:Main JS file of the template
*/

/* ==============================================
Smooth Scroll To Anchor
=============================================== */
//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.navbar-nav a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 0
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});
/* ==============================================
Preloader
=============================================== */

$(window).load(function() {
    $('.status').fadeOut();
    $('.preloader').delay(350).fadeOut('slow');
});

/* ==============================================
WOW plugin triggers animate.css on scroll
=============================================== */
jQuery(document).ready(function () {
    wow = new WOW(
        {
            animateClass: 'animated',
            offset: 50,
            mobile: true
        }
    );
    wow.init();
});


//sticky header on scroll
$(window).load(function() {
    $(".sticky").sticky({topSpacing: 0});
});


$(window).scroll(function(){
    if ($(this).scrollTop() > 100) {
        $('.back-to-top').fadeIn();
    } else {
        $('.back-to-top').fadeOut();
    }
}); 

$('.back-to-top').click(function(){
    $("html, body").animate({ scrollTop: 0 }, 1000);
    return false;
});