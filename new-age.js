(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 48)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });
    
    //modal stuff
    $('#login-form-link').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#register-form-link').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
    $('#regBtn').click(function(){
        $("#mymodal").modal('show'); 
    });
    
    //using regex to check if email has correct format
    function validateEmail(e){
        var test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return test.test(String(e).toLowerCase());
    }
    
    $(".btn-register").click(function(){
        var btn = $(this).val();
        
        if(btn == "Register Now"){
            var email = $("#email").val();
            var pass = $("#pass").val();
            var phone = $("#phone").val();
            var check = $("#notifs").is(":checked");
            console.log(validateEmail(email));
            //input validation, no blanks
            if(email == "" || pass == "" || phone == ""){
                $("#missing").css("display", "block");
            }else if(validateEmail(email) == false){
                $("#invalid").css("display", "block");
            }else{
                //convert the . in the email address since dots arent allowed as keys
                email = email.replace(".", "__dot__");

                var success = true;

                firebase.database().ref('web-users/'+email).set({
                    pass: pass,
                    phone: phone,
                    notify:check
                }).catch(function(){
                     success = false;
                }).finally(function(){
                    if(success){
                        console.log("register success");

                        //hide error in case it came out and then reg success
                        $("#used").css("display","none");
                        $("#invalid").css("display", "none");
                        $("#missing").css("display", "none");
                        $(".register-form").css("display", "none");
                        $(".success").css("display","block");
                        $(".btn-register").val("OK");
                    }else{
                        console.log("register fail");
                        $("#used").css("display", "block");
                    }
                });
            }
        }else{
            $("#mymodal").modal('hide');
        }
        //console.log(email+" "+pass+" "+phone+" "+check); 
    });
    
    //resets modal view on exit;
    $("#mymodal").on('hidden.bs.modal', function(){
        if($(".btn-register").val() == "OK"){
            //reset view
            $("#used").css("display","none");
            $("#invalid").css("display", "none");
            $("#missing").css("display", "none");
            $(".register-form").css("display", "block");
            $(".success").css("display","none");
            $(".btn-register").val("Register Now");
            
            //reset values
            $("#email").val("");
            $("#pass").val("");
            $("#phone").val("");
            $("#notifs").prop('checked',false);
        }
    });
    
  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
        $(".logoNavBar").css('background-image','url(img/betko_logo.png)');
    }else {
      $("#mainNav").removeClass("navbar-shrink");
        if(window.innerWidth > 992){
            $(".logoNavBar").css('background-image','url(img/betko_logo_white.png)');
        }
    }
      
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

})(jQuery); // End of use strict
