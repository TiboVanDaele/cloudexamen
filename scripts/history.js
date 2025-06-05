var HISTORY= (function(){
	var 
		expose = {
			addEntry: addEntry
		},hide = {
			handlePopstate: handlePopstate,
			//init
			setUpHandlers: setUpHandlers
		};

	function addEntry(destination_str){
		console.log("Change the URL, and add to history", destination_str);
		document.title = "Bird website: " + destination_str;
		if(destination_str === "home"){
			destination_str = "/"; //CF will use index.html not home
		}
		window.history.pushState({}, null, destination_str);
	}

	function handlePopstate(pse){
		var target_page_str = window.location.pathname.substring(1) || "home";
		console.log("PLEASE LOAD THIS PAGE: " +  target_page_str);
		NAV.changePage(target_page_str, true);
	}

	(function init(){
		setUpHandlers();
	})();

	function setUpHandlers(){
		console.log("Set up pop state listerner");
		window.addEventListener("popstate", handlePopstate);
	}

	return expose;

})();