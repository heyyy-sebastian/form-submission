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

	//show submission message, bind click event to OK button
   	var makeModal = function(message){
		//append notification modal to DOM
		$("body").append("<div class='submission-notice'><p class='blue-text'>"+ message + "</p><button id='ok'>OK</button></div>");
		//remove submission notice modal
		$('#ok').click(function(e){
			e.preventDefault();
			$('.submission-notice').remove();
		});
	}; //end make modal fn

	//check that form fields are not null
	var checkFields = function(message){
		//remove whitespace & check for empty form fields
		var emptyFields = $('form :input').filter(function() {
            return $.trim(this.value) === "";
        });
		//if there are incomplete fields, trigger error notification
        if (emptyFields.length) {
            makeModal(message);
            return
        }
	};//end form fields check

	//attach handler to form submission
	$('form').submit(function(e){
		//prevent form from submitting normally
		e.preventDefault();
		//assign data from form fields to variables
		var form = $('form').serialize();
		//set error message in case it's needed
		var errorMessage = "There was an error completing your submission. Please check your information and try again."
		//check that all fields are complete
		checkFields(errorMessage);
		//send data in post request	
		$.post(
			"https://httpbin.org/post", 
			form,			
			function(data, status){
				//hide feedback form after successful submission
				$('.feedback-form').stop().slideUp("slow").removeClass('active');
				var successMessage = "Thank you! Your submission has been recorded."
				//trigger success notification
				makeModal(successMessage);
			},
			"json")//end post request, add callback if the post request fails or if there's an error
			.fail(function(){
				//trigger errorMessage
				makeModal(errorMessage);
			})//end fail callback

	}); //end form submission

	//to-do
	// ratings submission
	// error message

	//padding around top row on load
	//media queries

}); //end wrapper function
