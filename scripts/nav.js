var NAV = (function(){
	var 
		expose = {
			changePage: changePage, //as used by home
			goToPage: goToPage
		},hide = {
			//
		};

	function changePage(destination_str, from_pop_boo){
		$("[data-selected]")
				.removeAttr("data-selected");
		var 
			current_page_str = $("[data-selected]").attr("data-target"),
			html_str = '';

		if(destination_str === current_page_str){
			console.info("You are already on that page, nothing to do");
			return;
		}
		HELPER.purgeProblemModal();
		var msg_str = "";		
		if(destination_str === "birds"){
			if(from_pop_boo !== true){
				HISTORY.addEntry(destination_str);
			}
			TEMPLATES.birds();
		}else if(destination_str === "home"){
			if(from_pop_boo !== true){
				HISTORY.addEntry(destination_str);
			}
			TEMPLATES.home();
		}else if(destination_str === "sightings"){
			if(from_pop_boo !== true){
				HISTORY.addEntry(destination_str);
			}
			TEMPLATES.sightings();
		}else if(destination_str === "report"){
			if(from_pop_boo !== true){
				HISTORY.addEntry(destination_str);
			}
			TEMPLATES.report();
		}else{
			html_str += '<h1>404</h1>';
			html_str += '<p>';
			html_str += 	'That page does not exist';
			html_str += '</p>';
			HELPER.showProblemModal(html_str);
		}
	}

	function goToPage(ce){
		var 
			$this = $(this),
			destination_str = $this.data().target;
		changePage(destination_str);
	}

	return expose;
	
})();