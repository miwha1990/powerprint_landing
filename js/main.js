(function($){
    $(function(){
        //mobile-menu
        $('.button-collapse').sideNav();


        /*
        Diagonal Scroll
         */
        var controller = new ScrollMagic.Controller({globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

            // build scenes
            var xpos = -100;
            var ypos = -500;
            function myFunction(){
                xpos = xpos * 3;
            }
            var tween = new TimelineMax ()
                .add([
                    TweenMax.to(".blue-box", 1, {backgroundPositionX: xpos+"px",backgroundPositionY:ypos+'px', ease: Linear.easeNone, onUpdate:myFunction})
                ]);

            new ScrollMagic.Scene({triggerElement: ".blue-box"})
                .setTween(tween)
                .addTo(controller);

        /*
         In-page navigation
         */
        var rightNavi = $('.right-navigation li');
        var menuNavi = $('.nav-wrapper ul li');
            navigate(rightNavi);
            navigate(menuNavi);
            function navigate(elements){
                elements.on('click', function(e){
                    elements.removeClass('active');
                    $(this).addClass('active');
                    var anchor = $(this).find('a').attr('href');
                    $('html, body').animate({
                        'scrollTop':   $(anchor).offset().top
                    }, 2000);
                });
            }

            var prevScroll;
            $(document).scroll(function(e){
               $('#menu-banner, #ink-banner, #dark-section, #some-words, #articles, #feedback').map(function(i,e){
                   if($(e).offset().top - $(window).scrollTop() <= 100 && $(e).offset().top - $(window).scrollTop() >= 0){
                       var id = $(e).attr('id');
                       $('.right-navigation li').removeClass('active');
                       $('.right-navigation li a[href="#'+id+'"]').parent().addClass('active');
                   }
               });
               /*
               header animation
               */


            var float_panel = $('.float-panel');
                if($(window).scrollTop() > 600){
                    float_panel.addClass('fixed');
                    float_panel.removeClass('unfixed');
                }
                if(($(window).scrollTop() < 600) && (prevScroll > $(window).scrollTop())) {
                    float_panel.addClass('unfixed');
                    float_panel.removeClass('fixed');
                }
                prevScroll = $(window).scrollTop();
            });

        /*
        moving circles
         */
            var one = $('#menu-banner, #feedback');

            var one_start = 0;

            setInterval(function(){
                ++one_start;
                var one_css = {
                    'backgroundPosition': (Math.sin(one_start * 0.0025) * 100) + 'px ' + Math.cos(one_start * 0.0025) * 100 + "px"
                };
                one.css(one_css);
            }, 1);

        /*
         Second block animation
        */
            var trigger = false;
            $(document).scroll(function(e){
                var banner = $('#ink-banner');
                if(banner.offset().top - $(window).scrollTop() <= 100 && banner.offset().top - $(window).scrollTop() >= 0 && !trigger){
                    trigger = true;
                    var items = banner.find('.collection-item');
                    var i = 0;
                    var interval_items = setInterval(function(){
                        items.removeClass('active-list-item');
                        $(items[i]).addClass('active-list-item');
                        if((items.length) === i){
                            items.removeClass('active-list-item');
                            clearInterval(interval_items);
                        } else {
                            i++;
                        }
                    },700);
                    var counter = banner.find('.blue-circle span');
                    var inner_counter = 1;
                    var interval_counter = setInterval(function(){
                        counter.html(inner_counter);
                        if(inner_counter === 128)
                            clearInterval(interval_counter);
                        inner_counter++;
                    },34);
                } else{
                    if(interval_items)
                        clearInterval(interval_items);
                }
                var wh = window.innerHeight;
                var offset = (wh + $(window).scrollTop()) - (banner.offset().top + banner.outerHeight());
                (offset >= 350) ? banner.find('.blue-circle').addClass('circle-transform') : banner.find('.blue-circle').removeClass('circle-transform');
            });


        /*
        Max letters in article content
        */
            var content = $('.article-content p');
            content.map(function(i,e){
               if(e.innerHTML.length > 500){
                   var article_href = $(e).find('.article-href').attr('id');
                   var more_button = "<a href='"+article_href+"' class='show_more'>...</a>";
                   $(e).html(e.innerHTML.substring(0, 400)+more_button);
               }
            });
        /*
        Form validation
         */
            var form = $('form');
            var form_elements = $('input[type="text"], input[type="email"], textarea');
            form.find('input[type="submit"]').on('click',function(e){
                e.preventDefault();
                    form_elements.map(function(i,e){
                    if(!$(e).val()){
                        $(e).parent().parent().addClass('active-el');
                    } else {
                        $(e).parent().parent().removeClass('active-el');
                    }
                });
            });
            form_elements.on('click', function(){
               $(this).parent().parent().removeClass('active-el');
            });
        /*
        Login-register modal
        */
            var loginButton = $('.log');
            loginButton.on('click', function(){
                $('.modal-login').addClass('modal-appearing');
            });
            $('.modal-login span').click(function(){
                $('.modal-login').removeClass('modal-appearing');
            });
    }); // end of document ready
})(jQuery);// end of jQuery name space

