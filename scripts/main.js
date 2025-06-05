var MAIN = (function(){
	var 
		expose = {

		},hide = {
			//init
			setUpHandlers: setUpHandlers
		};
	(function init(){
		console.log("Ok let's get started");
		setUpHandlers();
		NAV.changePage("home");
	})();

	function setUpHandlers(msg_str){
		$(document).on("click", "[data-action='navigation']", NAV.goToPage);
	}

	return expose;

})();