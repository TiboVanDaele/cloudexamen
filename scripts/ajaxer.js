var AJAXER = (function(){
	var 
		expose = {
			post: post
		},hide = {
			//
		};

	function post(url_str, params, successHander, failureHandler){
		// debugger;
		//I guess this could be moved inot lab 2
		if(CONFIG.BASE_NODE_SERVER_STR === null){
			var html_str = '';
			html_str += '<h1>We do not have a server yet</h1>';
			html_str += '<p>We will fix this later in this lab.</p>';
			HELPER.showProblemModal(html_str);
			return;
		}

		var params = {
			url: CONFIG.BASE_NODE_SERVER_STR + "/" + url_str,
			method: "POST",
			data: JSON.stringify(params),
			success: successHander,
			error: failureHandler,

			statusCode: {
				0: function(){AUTH.handleLogout();HELPER.showProblemModal("<h1>CORS ISSUE</h1><p>Could not reach the server. Check cors is in place or that it even exists.</p>")},
				404: function(){AUTH.handleLogout();HELPER.showProblemModal("<h1>404</h1><p>Could not find that page</p>")},
				500: function(){AUTH.handleLogout();HELPER.showProblemModal("<h1>500</h1><p>Server Problem</p>")},
			}
		};

		if(url_str === "sightings" || url_str === "report-sightings"){
			var bearer_str = "";

			var temp_str = localStorage.getItem("bearer_str");

			if(temp_str === null){
				
				// HELPER.showProblemModal("<h1>You need to be logged in.</h1><p>This page is a protected resource.</p>");
				return;
			}

			//still here
			var bearer_str = temp_str;//parse??
			//attempt to add headers form Local Storage
			params.headers = "";//
			params.beforeSend = function(xhr){
				xhr.setRequestHeader ("Authorization", "Bearer " + bearer_str);
			};
		}

		$.ajax(params);
	}

	return expose;

})();