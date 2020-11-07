
$(document).ready(function () {

	$(".videopath").click(function(){
		// stuff
		FB.login();
	});


  var updateWithToken = function ( token ) {
    //https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=<token>
  };

    (function() {
       var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
       po.src = 'https://apis.google.com/js/client:plusone.js';
       var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
     })();

     window.signinCallback = function(authResult){
      if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    // Hide the sign-in button now that the user is authorized, for example:
    document.getElementById('signinButton').setAttribute('style', 'display: none');
    console.log(authResult.access_token);
    } else {
      // Update the app to reflect a signed out user
      // Possible error values:
      //   "user_signed_out" - User is signed-out
      //   "access_denied" - User denied access to your app
      //   "immediate_failed" - Could not automatically log in the user
      console.log('Sign-in state: ' + authResult['error']);
    }
     };

});

