$(document).ready(function(){
	console.log("ready")

	//expand form function
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
   });

}); //end wrapper function
