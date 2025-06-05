var HELPER = (function(){
	var 
		expose = {
			showBirdModal: showBirdModal,
			showProblemModal: showProblemModal,
			purgeBirdModal, purgeBirdModal,
			purgeProblemModal: purgeProblemModal
		},hide = {
			// init
			setUpHandlers: setUpHandlers
		};

	(function init(){
		setUpHandlers();
	})();

	function setUpHandlers(){
		$(document).on("click", "[data-action='purge_bird_modal']", purgeBirdModal);
		$(document).on("click", "[data-action='purge_problem_modal']", purgeProblemModal);
	}

	function showBirdModal(bird){
		purgeBirdModal();//incase there was one already
		console.log("show this bird: " + bird.name);
		
		var inner_html_str = '';
		inner_html_str += 	'<h1>' + bird.name + '</h1>';
		inner_html_str +=   '<img width="100%" height="auto" src="images/' + bird.image + '" alt="' + bird.description + '" />';
		inner_html_str +=   '<p>';
		inner_html_str += 		bird.description;
		inner_html_str +=   '</p>';

		var html_str = '';
		html_str += '<aside data-role="bird_modal">';
		html_str += 	inner_html_str;
		html_str += 	'<section>';
		html_str += 		'<span data-action="purge_bird_modal">back</span>';
		html_str += 	'</section>';
		html_str += '</aside>';
		$("[data-role='wrapper']").prepend(html_str);
	}

	function showProblemModal(inner_html_str){
		var html_str = '';
		html_str += '<aside data-role="problem_modal">';
		html_str += 	inner_html_str;
		html_str += 	'<section>';
		html_str += 		'<span data-action="purge_problem_modal">dismiss</span>';
		html_str += 	'</section>';
		html_str += '</aside>';
		$("[data-role='wrapper']").prepend(html_str);
	}

	function purgeProblemModal(html_str){
		$("[data-role='problem_modal").remove();
	}

	function purgeBirdModal(bird){
		$("[data-role='bird_modal").remove();
	}



	return expose;

})();