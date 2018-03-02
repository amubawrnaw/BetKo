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
        openModal(1);
    });
    $(".login").click(function(){
        $("#mymodal").modal('show');
        openModal(0);
    });
    $("#regTab").click(function(){
        openModal(1);
    });
    $("#loginTab").click(function(){
        openModal(0);
    });
    $(".badge-link").click(function(){
        $("#mymodal").modal('show'); 
    });
    function openModal(index){
        hideErrors();
        //login
        if(index == 0){
            $("#regTab").removeClass("active");
            $("#loginTab").addClass("active");
            
            $(".register-div").css("display","none");
            $(".login-div").css("display","block");
            
            $("#submit-form").val("Login");
        }else if(index == 1){//register
            $("#loginTab").removeClass("active");
            $("#regTab").addClass("active");
            
            $(".login-div").css("display","none");
            $(".register-div").css("display","block");
            
            $("#submit-form").val("Register");
        }
    }
    //using regex to check if email has correct format
    function validateEmail(e){
        var test = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        return test.test(String(e).toLowerCase());
    }
    
    $("#logout").click(function(){
        document.cookie =  "user=''; expires=Thu, 18 Dec 2013 12:00:00 UTC";
        window.location.reload();
    });
    
    $("#submit-form").click(function(){
        var btn = $(this).val();
        hideErrors();
        if(btn == "Register"){
            console.log("sumulod");
            var user = $("#user").val();
            var email = $("#email").val();
            var pass = $("#pass").val();
            var pass2 = $("#pass2").val();
            var phone = $("#phone").val();
            var check = $("#notifs").is(":checked");
            
            console.log(validateEmail(email));
            if(pass != pass2){
                $("#mismatch").css("display", "block");
            }else if(email == "" || pass == "" || phone == "" || pass2 == "" || user == ""){
                $("#missing").css("display", "block");
            }else if(validateEmail(email) == false){
                $("#invalid").css("display", "block");
            }else{
                //convert the . in the email address since dots arent allowed as keys
                user = user.replace(".", "__dot__");

                var success = true;
                //
                firebase.database().ref('web-users/'+user).set({
                    email:email,
                    pass: pass,
                    phone: phone,
                    notify:check
                }).catch(function(){
                     success = false;
                }).finally(function(){
                    if(success){
                        console.log("register success");
                        //hide error in case it came out and then reg success
                        hideErrors();
                        $(".register-form").css("display", "none");
                        $(".success").css("display","block");
                        $("#submit-form").val("OK");
                    }else{
                        console.log("register fail");
                        $("#used").css("display", "block");
                    }
                });
            }
        }else if(btn == "Login"){
            var user = $("#user-login").val();
            var pass = $("#pass-login").val();
            var pass2;
            var success = true;
            
            user = user.replace(".", "__dot__");
            
            if(user == "" || pass == ""){
                $("#missing").css("display", "block");
            }else{
                firebase.database().ref('web-users/'+user).once('value').then(function(snapshot){
                    pass2 = snapshot.val().pass;
                    console.log(pass2 + " " + pass + " " + user + " " + success);
                }).catch(function(){
                    success = false;
                }).finally(function(){
                    console.log(pass2 + " " + pass + " " + user + " " + success);
                    if(success == false || pass2!=pass){
                        $("#userpass").css("display", "block");
                    }else{
                        document.cookie = "user="+user;                        window.location.replace("landing.html");
                        //window.close();
                    }
                });
            }
            
            
            
        }else{
            $("#mymodal").modal('hide');
        }
        //console.log(email+" "+pass+" "+phone+" "+check); 
    });
    
    function hideErrors(){
        $("#used").css("display","none");
        $("#invalid").css("display", "none");
        $("#missing").css("display", "none");
        $("#mismatch").css("display", "none");
        $("#userpass").css("display", "none");
    }
    //close modal
    $(".exit").click(function(){
        $("#mymodal").modal('hide');
    });
    
    //resets modal view on exit;
    $("#mymodal").on('hidden.bs.modal', function(){
        if($("#submit-form").val() == "OK"){
            //reset view
            hideErrors();
            
            $(".register-form").css("display", "block");
            $(".success").css("display","none");
            $("#submit-form").val("Register");
            
            //reset values
            $("#email").val("");
            $("#pass").val("");
            $("#phone").val("");
            $("#pass2").val("");
            $("#user").val("");
            $("#notifs").prop('checked',false);
        }
    });
    
  // Collapse Navbar
    $(document).ready(function(){
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
    });
  

})(jQuery); // End of use strict
