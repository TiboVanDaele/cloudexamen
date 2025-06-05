var TEMPLATES = (function(){
	var 
		expose = {
			birds: birds,
			home: home,
			report: report,
			sightings: sightings
		},hide = {
			//init
			reportSightingsFailure: reportSightingsFailure,
			reportSightingsSuccess: reportSightingsSuccess,
			sightingsFailure: sightingsFailure,
			sightingsSuccess: sightingsSuccess,

			setUpHandlers: setUpHandlers
		};

	function birds(){
		console.info("showing the all birds page");
		var 
			bird = {},
			html_str = '';
		html_str += 	'<section>';
		html_str += 		'<p>Tap on a bird picture for more details.</p>';
		html_str += 		'<div data-role="bird_wrapper">';
		$.get("bird_info.json", function(bird_info_obj_arr){
			//auto parses
			for(var i_int = 0; i_int < bird_info_obj_arr.length; i_int += 1){
				bird = bird_info_obj_arr[i_int];
				html_str += 	'<a href="javascript:void(0);" data-action="show_bird_detail" data-image="' + bird.image_name_str + '" data-name="' + bird.bird_type_str + '" title="' + bird.bird_type_str + '" data-description="' + bird.description_str + '">';
				html_str += 		'<figure>';
				html_str += 			'<img width="120" height="80" alt="' + bird.bird_type_str + '" src="images/' + bird.image_name_str + '" />';
				html_str += 			'<figcaption>';
				html_str += 				bird.bird_type_str;
				html_str += 			'</figcaption>';
				html_str += 		'</figure>';
				html_str += 	'</a>';
			}
			html_str += 	'</div>';
			html_str += '</section>';
			$("[data-role='page_header'] > h1").text("the bird page");
			$("[data-role='page_content']").html(html_str);
			$("[data-target]").removeAttr("data-selected");
			$("[data-target='birds']").attr("data-selected", "selected");
		});
	}

	function home(){
		console.info("showing the home page");
		var html_str = '';
		html_str += '<section>';
		html_str += 	'<h2>Welcome Students!</h2>';
		html_str += 	'<p>';
		html_str += 		'This school year, you will be learning to identify different kinds of birds. Whenever you spot a bird, you will save your sighting details in the bird sightings log. The more you look, the more birds you will notice. You may be surprised how many you can spot around your home, local, parks, or even inside a store!';
		html_str += 	'</p><p>';
		html_str += 		'You can use the all birds page to help identify birds that you have found. Simply choose a bird image to find out the bird’s name and common characteristics.';
		html_str +=  	'</p><p>';
		html_str += 		'You will need to login to get to the secret page where you will add your bird sightings.';
		html_str += '</section>';

		$("[data-role='page_header'] > h1").text("home page");
		$("[data-role='page_content']").html(html_str);
		$("[data-target]").removeAttr("data-selected");
		$("[data-target='home']").attr("data-selected", "selected");
	}

	(function init(){
		setUpHandlers();
	})();


	function report(){
		console.info("showing the report page");
		var html_str = '';

		html_str += '<section>';
		html_str += 	'<p>Report a sighting</p>';
		html_str += 	'<p>This page now requires a login</p>';
		html_str += 	'<span data-action="login">login</span>';


		html_str += '</section>';

		$("[data-role='page_header'] > h1").text("report page");
		$("[data-role='page_content']").html(html_str);
		$("[data-target]").removeAttr("data-selected");
		$("[data-target='report']").attr("data-selected", "selected");

		var params = {

		};

		AJAXER.post("report-sightings", params, reportSightingsSuccess, reportSightingsFailure);

	}

	function reportSightingsFailure(e, response){
		if(e.status === 0 || e.status === 404 || e.status == 500){
			return; //we handled this already
		}
		//403 likely
		var html_str = '';
		// debugger;
		html_str += '<h1>Could not authenticate you.</h1>'; //403 || 412 (correct info not passed)
		html_str += '<p>' + e.responseJSON.msg_str + '</p>';
		AUTH.handleLogout();//clears the token so they have to login 
		HELPER.showProblemModal(html_str);
	}

	function reportSightingsSuccess(response){
		var html_str = '';
		if(response && response.cognito_username_str){
			html_str += 	'<section>';
			html_str += 		'<p>Report a sighting</p>';
			html_str += 		'<span data-role="loggedin_in_student_name">Hello ' + response.cognito_username_str + '</span>';
			html_str += 		'<span data-action="logout">logout</span>';
			html_str += 		'<section data-role="report_container">';
			html_str += 			'<p>You are logged in, so you should also now have temporary credentials on this device.</p>';
			html_str += 			'<span data-action="validate_credentials">validate my temporary AWS credentials</span>';
			html_str += 			'<output data-role="validate_credentials_output"></output>'; //add data returned from DDB API
			html_str += 	'</section>';
			$("[data-role='page_content']").html(html_str);
		}else{
			html_str += '<h2>Something went wrong</h2>';
			html_str += '<p>Check the server is set up correctly</p>';
			return HELPER.showProblemModal(html_str);
		}
	}


	function sightings(){
		console.info("showing the sightings page");
		var 
			html_str = '',
			bird_image_name_str = "";
		html_str += '<section>';
		html_str += 	'<p>Sightings by students</p>';
		html_str += 	'<p>This page now requires a login</p>';
		html_str += 	'<span data-action="login">login</span>';
		// html_str += 	'<p>Some more text can go here...</p>';
		html_str += 	'<section data-role="secret_container">';
		html_str += 	'</section>';
		$("[data-role='page_content']").html(html_str);
		$("[data-role='page_header'] > h1").text("sightings page");
		$("[data-target]").removeAttr("data-selected");
		$("[data-target='sightings']").attr("data-selected", "selected");
		

		var params = {

		};

		AJAXER.post("sightings", params, sightingsSuccess, sightingsFailure);
	}

	function sightingsFailure(e, response){
		if(e.status === 0 || e.status === 404 || e.status == 500){
			return; //we handled this already
		}
		//403 likely
		var html_str = '';
		// debugger;
		html_str += '<h1>Could not authenticate you.</h1>'; //403 || 412 (correct info not passed)
		html_str += '<p>' + e.responseJSON.msg_str + '</p>';
		AUTH.handleLogout();//clears the token so they have to login 
		HELPER.showProblemModal(html_str);
	}

	function sightingsSuccess(response){
		var html_str = '';
		if(response && response.sightings_obj_arr && response.cognito_username_str){
				html_str += 	'<section>';
				html_str += 		'<p>Sightings by students</p>';
				html_str += 		'<span data-role="loggedin_in_student_name">Hello ' + response.cognito_username_str + '</span>';
				html_str += 		'<span data-action="logout">logout</span>';
				html_str += 		'<section data-role="secret_container">';
			for(var i_int = 0; i_int < response.sightings_obj_arr.length; i_int += 1){
				student = response.sightings_obj_arr[i_int];
				bird_image_name_str = student.bird_name_str.replace(/ /gi, "_").toLowerCase() + ".png";
				html_str += 			'<div data-role="student_info">';
				html_str += 				'<img width="48" height="auto" alt="' + student.bird_name_str + '" src="/images/' + bird_image_name_str + '" />';
				html_str += 				'<span data-role="bird_name">' + student.bird_name_str + '<em>(' + student.count_int.toString() + ')</em></span>';
				html_str += 				'<span data-role="student_name">' + student.student_name_str + '<em>(' + student.class_level_int.toString() + ')</em></span>';
				html_str += 				'<section data-role="bird_finder_detail">';
				html_str += 					'<span data-role="location">' + student.location_str + '</span>';
				html_str += 				'</section>';
				html_str += 			'</div>';
			}
			html_str +=  			'</section>';//end secret contaoner
			html_str += 		'</section>';
			$("[data-role='page_content']").html(html_str);
		}else{
			html_str += '<h2>Something went wrong</h2>';
			html_str += '<p>Check the server is set up correctly</p>';
			return showProblemModal(html_str);
		}
	}


	function setUpHandlers(){
		$(document).on("click", "[data-action='validate_credentials']", AUTH.validateCredentials);
		$(document).on("click", "[data-action='show_bird_detail']", showBirdDetail);
	}

	function showBirdDetail(){
		var bird = $(this).data();
		HELPER.showBirdModal(bird);
	}

	return expose;

})();