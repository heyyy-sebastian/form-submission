$(document).ready(function(){
	//expand/collapse form on click

	function formExpansion(){
		$('#expand').click(function(){
			var $active = $('.feedback-form .active');
  			//trigger background-color change
  			$('.feedback-form').toggleClass('expanded');
  			//swap text colors in top row
  			$('.fa-envelope-o, h4').toggleClass('blue-text');
    		//show form
    		$('form').stop().slideDown("slow").addClass('active');
    		//hide form
    		$active.stop().slideUp("slow").removeClass('active');
   		}); 
   	} //end form expansion/collapse


	//helper function: show submission message, bind click event to OK button
   	function makeModal(message){
   		//disable submit button
   		$('form').find(':input[type=submit]').prop('disabled', true);

		//append notification modal to DOM, change background color
		$("body").append("<div class='submission-notice'><p class='blue-text'>"+ message + "</p><button id='ok'>OK</button></div>")
		.css('background-color', '#d3d3d3');

		//remove submission notice modal
		$('#ok').click(function(e){
			e.preventDefault();
			$('.submission-notice').remove();
			$("body").css('background-color', '#f5f5f5');
			//enable submit button again
			$('form').find(':input[type=submit]').prop('disabled', false);
		});
	}; //end make modal fn

	//helper function: check that form fields are complete
	function checkFields(message, form){
 		//remove whitespace & return empty form fields
		var emptyFields = $('form :input').filter(function() {
            	return $.trim(this.value) === "";
       		 });
		//if there are incomplete fields, trigger error notification
		//subtract 1 because the submit button counts as input and will always be empty
        	if (emptyFields.length - 1) {
          	makeModal(message);
          	return;
        	}
        	//give form back so post request can access it
        	return form;
	 };//end form fields check

	//attach handler to form submission
	function formSubmission(){
	$('form').submit(function(e){
		//prevent form from submitting normally
		e.preventDefault();
		//assign data from form fields to variables
		var form = $('form').serialize();
        	//set error message in case it's needed
        	var errorMessage = "There was an error completing your submission. Please check your information and try again."
        	//check that all fields are complete 
		//if form fields are complete, send data in post request	
		if (checkFields(errorMessage, form)){
		$.post(
			"https://httpbin.org/post", 
			form,			
			function(data, status){
				//hide feedback form after successful submission
				//i'm hiding the whole form because i'm assuming you'd want to avoid
				//multiple submissions for the same page from a single user
				$('.feedback-form').stop().slideUp("slow").removeClass('active');
				var successMessage = "Thank you! Your submission has been recorded."
				//trigger success notification
				makeModal(successMessage);
			})//end post request, add callback if the post request fails or if there's an error
			.fail(function(){
				//trigger errorMessage
				makeModal(errorMessage);
			})//end fail helper fn
		}//end conditional trigger for post request 
	}); 
	}//end form submission

//invoke functions
formExpansion();
makeModal();
checkFields();
formSubmission();

}); //end wrapper function
