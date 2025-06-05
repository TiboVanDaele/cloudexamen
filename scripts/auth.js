var AUTH = (function(){
	var 
		expose = {
			handleLogout: handleLogout,
			validateCredentials: validateCredentials
		},hide = {
			constructHostedURL: constructHostedURL,
			handleLogin: handleLogin,
			
			//init
			setUpHandlers: setUpHandlers
		};

	function constructHostedURL(){
		var 
			url_str = '',
			user_pool_id_str = CONFIG.COGNITO_USER_POOL_ID_STR,
			user_pool_client_id_str = CONFIG.COGNITO_USER_POOL_CLIENT_ID_STR,
			cloudfront_distro_str = CONFIG.CLOUDFRONT_DISTRO_STR,
			cognito_domain_str = CONFIG.COGNITO_DOMAIN_STR
		
		if(cognito_domain_str 
				&& user_pool_id_str 
				&& cloudfront_distro_str 
				&& cloudfront_distro_str ){
			//
		}else{
			return null;
		}
	
		url_str += 'https://';
		url_str +=  cognito_domain_str		//"mrs-12-20-2021"
		url_str += '.auth.us-east-1.amazoncognito.com'
		url_str += '/login?client_id=';
		url_str +=  user_pool_client_id_str;//'5olv7ne7l29hf4i47q562612p8'; //var 2
		url_str += '&response_type=token';
		url_str += '&scope=email+openid';
		url_str += '&redirect_uri=';
		url_str += 'https://';
		url_str += 	cloudfront_distro_str;			//'d3eyicoznbvd9u';
		url_str += '.cloudfront.net/';
		url_str += 'callback.html';

		return url_str;
	}

	(function init(){
		setUpHandlers();
	})();

	function handleLogin(ce){
		var hosted_url_str = constructHostedURL();
		if(hosted_url_str === null){
			var html_str = '';
			html_str += '<h1>You do not have access to cognito.</h1>';
			html_str += '<p>Please check you have updated the config file with the cognito url.</p>';
			return HELPER.showProblemModal(html_str);
		}
		console.log("Attempt a login. Redirect to " + hosted_url_str);
		window.location = hosted_url_str;
	}

	function handleLogout(ce){
		//you could use cognit logout feature here?
		
		window.localStorage.clear();
		NAV.changePage("home");

	}


	function setUpHandlers(){
		$(document).on("click", "[data-action='login']", handleLogin);
		$(document).on("click", "[data-action='logout']", handleLogout);
	}

	async function validateCredentials(){
		var msg_str = "We are verifying that your temporary AWS credentials can access dynamoDB. One moment...";
		$("[data-role='validate_credentials_output']").text(msg_str);
		
		
		var token_str_or_null = localStorage.getItem("bearer_str");
		console.log('Getting token from Local Storage');
		
		AWS.config.update({region: "us-east-1"});
		
		// Using Cognito Identity to retrieve temporary AWS Credentials
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        	IdentityPoolId : CONFIG.COGNITO_IDENTITY_POOL_ID_STR,
	    	Logins : {
       		   "cognito-idp.us-east-1.amazonaws.com/<cognito-user-pool-id>": token_str_or_null
       		}
		});
		
		var docClient = new AWS.DynamoDB.DocumentClient({region: "us-east-1"});
		
		var params = {
        	TableName: "BirdSightings"
    	};
    	
    	// testing communitaction with DynamoDB
    	async function testDDBConnection(){
        	try {
        	    const data = await docClient.scan(params).promise()
        	    msg_str = "Your temporary AWS credentials have been configured.";
       	    	return msg_str
       		} catch (err) {
       			msg_str = "There was a problem with your credentials.";
       	    	return msg_str
       		}
    	}
		
		var testDDBConnectionResponse = await testDDBConnection();
		
		$("[data-role='validate_credentials_output']").text(msg_str);
		
	}

	return expose;

})();