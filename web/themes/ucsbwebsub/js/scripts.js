/**
 * @file
 * Overrride UI behaviors
 */

(function ($, Drupal) {

    'use strict';
    $(function () {
        $('body').leftPosition();
        $('body').equalHeightSlides();
        $('body').equalHeightPeopleProfiles();
    })

    $(document).ready(function(){
        $('body').equalHeightSlides();
        $('body').initializeCarousel();
        $('body').topOffset();
        $('body').classChangeObserver();
        $('body').equalHeightPeopleProfiles();
    })

    $(window).on('load', function(){
        $('body').leftPosition();
        $('body').equalHeightSlides();
        $('body').initializeCarousel();
        $('body').equalHeightPeopleProfiles();
    });

    $(window).on('resize', function () {
        $('body').leftPosition();
        $('body').equalHeightSlides();
        $('body').equalHeightPeopleProfiles();
    });    

    $.fn.leftPosition = function () {
        $('body:not(.toolbar-tray-open) ul.nav > li.dropdown').each(function () {
            var element = $(this);
            var thing = $(".ucsbwebsub-main-nav.primary-nav-block > ul > li:nth-child(1)");
            if(thing.length > 0){
                var offset = thing.offset();
                element.children('.dropdown-menu').css('padding-left', offset.left);
            }
        });
    }


    $.fn.classChangeObserver = function () {
        var $div = $(this);
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === "class") {
                    var attributeValue = $(mutation.target).prop(mutation.attributeName);
                    setTimeout(function(){ $('body').topOffset(); }, 200);
                }
            });
        });
        observer.observe($div[0], {
            attributes: true
        });

    }

    // this function is overriden from the ucsbweb\js\scripts.js 
    // purpose for overriding it is to simplify the breadcrumbs positioning
    $.fn.topOffset = function() {
        if($(window).width() > 767) {
            var navheight = $('#navbar').outerHeight();
            var bodytopmargin = parseInt($('#body').css('margin-top'));
            $('#body').css('margin-top', navheight); 

        } else {
            var navheight = parseInt($('#navbar .navbar-header').outerHeight());
            $('#body').css('margin-top', navheight);
        }
    }

    // Set active main nav item
    $.fn.setActiveMenuItem = function() {
        var $this = $('#body:not(.localist-body) #navbar li.active');
        $this.parents('li').last().addClass("active");
    }

    //initialize the Slideshow
    $.fn.equalHeightSlides = function() {
        $('.carousel').each(function() {
          var carousel = $(this);
          var carouselWidth = $(this).width();
          var imgWidth;
          var imgHeight;
            
          var myImage = new Image();
          myImage.onload = function(){
            imgWidth = this.width;
            imgHeight = this.height;

            imgHeight = parseFloat(carouselWidth/imgWidth) * myImage.height;
            imgHeight = Math.floor(imgHeight);
            var imgHalf = (imgHeight / 2);
            imgHalf = Math.floor(imgHalf);
            imgHeight = (imgHeight + 10);

            var controls = carousel.find('.carousel-control');
            controls.each(function() {
                $(this).attr('style', 'top: '+imgHalf+'px;');
            });

            var maxHeight = imgHeight-10;
            var elems = carousel.find('.item');
            elems.each(function() {
                maxHeight = $(this).height() > maxHeight ? $(this).height() : maxHeight;
            })
            .height(maxHeight);

            
            var indicators = carousel.find('.carousel-indicators');
            indicators.each(function() {
                $(this).attr('style', 'top: '+(maxHeight + 10)+'px;');
            });

          };
          myImage.src = carousel.find('.active img').attr('src');
          
        });
      }
    
    $.fn.initializeCarousel = function() {
    $('.carousel-static').find('.carousel').each(function(){
        $(this).carousel({
        pause: true,
        interval: false
        });
    });

    $('.carousel-autoscroll').find('.carousel').each(function(){
        $(this).carousel();
    });
    }


    $.fn.equalHeightPeopleProfiles = function () {
        var maxHeight = 0;

        $('.view-people-profiles .equal-height').each(function () {
            $(this).removeAttr('style');
            maxHeight = $(this).height() > maxHeight ? $(this).height() : maxHeight;
        })
            .height(maxHeight);
        

        $('.view-custom-container .equal-height').each(function () {
            $(this).removeAttr('style');
            maxHeight = $(this).height() > maxHeight ? $(this).height() : maxHeight;
        })
            .height(maxHeight);
    }


    $(function (){
        $("iframe").each(function (){
            var iframe = $(this);

            //remove the width HTML attribute
            iframe.removeAttr("width");
            iframe.removeAttr("frameborder");
            //set a CSS width attribute
            iframe.css("width","100%");
            if ((iframe.attr("title") == undefined) || (iframe.attr("title") == "")) {

                var url = iframe.prop("src");
                var hostname = $('<a>').prop('href', url).prop('hostname');
                var title ="";
                
                if (url.includes("statuspage.io")) {
                    title = "System Status Announcements";
                } else if (url.includes("google.com/maps")) {
                    title = "Google Map";
                } else if (url.includes("calendar.google.com")) {
                    title = "Google Calendar";
                } else if (url.includes("youtube.com")) {
                    title = "YouTube Video";
                } else if (url.includes("facebook.com")) {
                    title = "Facebook";
                } else if (url.includes("twitter.com")) {
                    title = "Twitter";
                } else if (url.includes("instagram.com")) {
                    title = "Instagram";
                } else if (url.includes("issuu.com")) {
                    title = "Issuu";
                } else if (url.includes("vimeo.com")) {
                    title = "Vimeo Video";
                } else if (url.includes("ucsb.dserec.com")) {
                    title = "Recreation";
                }
                
                iframe.attr("title",title);
            }
        });
    });

})(jQuery, Drupal);