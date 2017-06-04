$(document).ready(function(){
	//expand/collapse form on click
	$('#expand').click(function(){
		var $active = $('.feedback-form').find('.active');
  		//trigger background-color change
  		$('.feedback-form').toggleClass('expanded');
  		//swap text colors in top row
  		$('.fa-envelope-o, h4').toggleClass('blue-text');
    	//show form
    	$('form').stop().slideDown("slow").addClass('active');
    	//hide form
    	$active.stop().slideUp("slow").removeClass('active');
   	}); //end form expansion/collapse

	//show success message
   	var makeModal = function(message){
		//append thank you modal to DOM
		$("body").append("<div class='submission-notice'><p class='blue-text'>"+ message + "</p><button id='ok'>OK</button></div>");
	};

	//attach handler to form submission
	$('form').submit(function(e){
		//prevent form from submitting normally
		e.preventDefault();
		//assign data from form fields to variables
		form = $('form').serialize();
		//send data in post request	
		$.post(
			"https://httpbin.org/post", 
			$('form').serialize(),			
			function(data, status){
				//hide feedback form after successful submission
				$('.feedback-form').stop().slideUp("slow").removeClass('active');
				var successMessage = "Thank you! Your submission has been recorded."
				//trigger success notification
				makeModal(successMessage);
			})//end post request

	}); //end form submission

	//to-do
	// ratings submission
	// show thank you message
	// error message

	//padding around top row on load
	//close/shrink form on submission

}); //end wrapper function
