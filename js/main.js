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

            /*setInterval(function(){
                ++one_start;
                var one_css = {
                    'backgroundPosition': (Math.sin(one_start * 0.0025) * 100) + 'px ' + Math.cos(one_start * 0.0025) * 100 + "px"
                };
                one.css(one_css);
            }, 1);*/

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
            var logModal = $('#modal1');
            var regModal = $('#modal2');
            var wrapperModal = $('#wrapper');
            loginButton.on('click', function(e){
                if(wrapperModal.html().trim() === '1')
                   wrapperModal.html(logModal.html());
                wrapperModal.modal({
                    dismissible: true, // Modal can be dismissed by clicking outside of the modal
                    opacity: 0, // Opacity of modal background
                    inDuration: 300, // Transition in duration
                    outDuration: 200, // Transition out duration
                    startingTop: '4%', // Starting top style attribute
                    endingTop: '10%', // Ending top style attribute
                    ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                    },
                    complete: function() {} // Callback for Modal close
                });
            });

            wrapperModal.delegate('#register', "click",  function() {
                wrapperModal.find('.modal-content, .modal-footer').animate({
                    opacity: 0
                }, 500, function() {
                    wrapperModal.addClass('reg-form').html(regModal.html());
                });
            });
            wrapperModal.delegate('#login', "click",  function() {
                wrapperModal.find('.modal-content, .modal-footer').animate({
                    opacity: 0
                }, 500, function() {
                    wrapperModal.removeClass('reg-form').html(logModal.html());
                });
            });

        /*
        Login-register validation
         */
            wrapperModal.delegate('form', "submit",  function(e) {
                e.preventDefault();
                var thisForm = $(this);
                var tooltipSpan = '<span class="my-tooltip">Заполните это поле!</span>';
                var name = thisForm.find('input[type="text"]');
                var email = thisForm.find('input[type="email"]');
                var password = thisForm.find('input[type="password"]');
                var errors = [], count = 1;
                thisForm.find('input').map(function(i,e){
                    if(!e.value){debugger;
                        count === 1?$(e).addClass('error').parent().append(tooltipSpan):$(e).addClass('error');
                        count++;
                    }
                });
                if(thisForm.find('.my-tooltip').length){
                    setTimeout(function(){
                        thisForm.find('.my-tooltip').remove();
                    }, 4000);
                }
                if(name.length){
                    if(name.val().length < 6 || name.val().length >40){
                        errors.push({'target':'name', 'message':'<strong>Имя</strong> должно быть от 5 до 40 символов.'});
                        name.addClass('error');
                    } else {
                        name.removeClass('error').addClass('valid');
                    }
                }
                if (!validateEmail(email.val())) {
                    errors.push({'target':'email', 'message':'<strong>Почта</strong> невалидна.'});
                    email.addClass('error');
                } else {
                    email.removeClass('error').addClass('valid');
                }
                if(validatePassword( password )){
                    errors.push({'target':'password', 'message':validatePassword( password )});
                    password.addClass('error');
                } else {
                    password.removeClass('error').addClass('valid');
                }
                if(errors.length){
                    var errorsList = '';
                    var modalAllertModal = $('.modal-alerts');
                    errors.forEach(function(e){
                        errorsList += '<li>'+e.message+'</li>';
                    });
                    modalAllertModal.addClass('rollup').find('ul').html(errorsList);
                    setTimeout(function(){
                        modalAllertModal.removeClass('rollup');
                    }, 5000);
                    return false;
                } else {
                    $.ajax({
                        url: thisForm.attr('action'),
                        method: 'POST',
                        data: thisForm.serialize(),
                        success: function(e){
                            debugger;
                        },
                        error: function(e){
                            debugger;
                        }
                    }).done(function() {
                        $( this ).addClass( "done" );
                    });

                }
            });
            function validateEmail(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }
            function validatePassword( p ) {
                var errors = [];
                if(p.length > 1){
                    if(p[0].value !== p[1].value)
                        errors.push("<strong>Пароли</strong> не совпадают!");
                    p = p[0].value;
                } else { p = p.val()}

                if (p.length < 6) {
                    errors.push("<strong>Пароль</strong> должен быть минимум 6 символов.");
                }
                if (p.search(/[a-z]/i) < 0) {
                    errors.push("<strong>Пароль</strong> должен содержать хотя бы 1 букву.");
                }
                if (p.search(/[0-9]/) < 0) {
                    errors.push("<strong>Пароль</strong> должен содержать хотя бы 1 цифру.");
                }
                if (errors.length > 0) {
                    return errors.join("<br>");
                }
                return false;
            }

    }); // end of document ready
})(jQuery);// end of jQuery name space

