	

	var clientname;
	var actualuserid;
	
	
	function postnewuser3(){
	
	var imagen = $('#imageprofile')[0].files[0];
	
	
	var fd = new FormData();
	
	fd.append("username", document.getElementById('registerusername').value);
	fd.append("first_name", document.getElementById('registername').value);
	fd.append("last_name", document.getElementById('registerlastname').value);
	fd.append("email", document.getElementById('registeremail').value);
	fd.append("password", document.getElementById('registerpass').value);
	fd.append("image", imagen);
	fd.append("phone", document.getElementById('registerphone').value);
	fd.append("identification.id", document.getElementById('registerid').value);

	
	axios.post('http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/Customers/', fd)
	
	.then(function (response) {
    console.log(response);
	$('#okmessage').modal('show')
	
	
	})
	.catch(function (error) {
    console.log(error);
	$('#badmessage').modal('show')
	});
	}
	
	function login(){
		
		var logindata = new FormData();
		
		logindata.append("username", document.getElementById('loginuser').value);
		logindata.append("password", document.getElementById('loginpass').value);
	
		
		axios.post('http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/token/', logindata)
		
		.then(function (response) {
		console.log(response);
		
		
		//console.log(response.data.access);
		//console.log(response.data.refresh);
		
		window.localStorage.setItem('accesstoken', response.data.access);
		window.localStorage.setItem('refreshtoken', response.data.refresh);
		
		console.log(window.localStorage.getItem('accesstoken'))
		console.log(window.localStorage.getItem('refreshtoken'))
		
		//window.location="index.html";
		
	
	
		})
		
		.catch(function (error) {
		console.log(error);
	
		});	
		
		
		var token = window.localStorage.getItem('accesstoken') ;

		var decoded = jwt_decode(token);
		console.log(decoded);
		
		var usertype=decoded.type;
		
			
		//SuperUser
		//Analyst
		//Auditor
		//Customer
		
		console.log(usertype.localeCompare('Customer'));
		
		
		var iscustomer=usertype.localeCompare('Customer');
		var issuperuser=usertype.localeCompare('SuperUser');
		var isauditor=usertype.localeCompare('Auditor');
		var isanalyst=usertype.localeCompare('Analyst');
		
		
	
		if(iscustomer==0){
			window.location="index.html";
		}
		if(issuperuser==0){
			//code for su
		}
		if(isauditor==0){
			//code for auditor
		}
		if(isanalyst==0){
			//code for analyst
		}
		
		
		
	}
	
	
	function loaddata(){
		
		var token = window.localStorage.getItem('accesstoken') ;

		var decoded = jwt_decode(token);
		console.log(decoded);
		
		useractualid=decoded.user_id;
		actualuserid=decoded.user_id;
		
		//console.log(useractualid);
		
		var urlstring= 'http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/Customers/'+useractualid+'/';
		
		
		
		//SuperUser
		//Analyst
		//Auditor
		//Customer
		
		//console.log(urlstring);
		
		var sendtoken='Bearer '+window.localStorage.getItem('accesstoken') ;
		
		axios.get(urlstring, {
			headers: {
			'Authorization': sendtoken
		}
		})
		
		.then(function (response) {
		
		//console.log(response);
		
		clientname=response.data.first_name+' '+response.data.last_name;
		
		//console.log(clientname);
		
		
		javascript:document.getElementById('visualusername').innerHTML=clientname;
		
		document.getElementById("profilepic").src=response.data.image;
		
		
		})
		
		.catch(function (error) {
		console.log(error);
		});
		
		
		}
		
		
	
	function createmeet(){
		
		console.log(useractualid);
		console.log(actualuserid);
		
		var urlstringmeet= 'http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/Customers/'+useractualid+'/Meetings/';
		
		console.log(urlstringmeet);
		console.log(useractualid);
		
		var sendtoken='Bearer '+window.localStorage.getItem('accesstoken') ;
		
		var meetdate=document.getElementById('meetdate').value;
		
		
		meetdate=meetdate+':00';
		
	
		$('#okmeet').modal('show')
		
		var payload = {"price": '50000', "date": meetdate, "description": document.getElementById('meetdescription').value, "customer": parseInt(useractualid,10), "meeting_type" : '1', "meeting_class" : '1'};

		
		
		axios.post(urlstringmeet, payload,{
			headers: {

			'Authorization': sendtoken,
			
		}
		})
		
		.then(function (response) {
		console.log(response);
	
	
		})
	
		.catch(function (error) {
		console.log(error);

		});
	
		
		
		
		
	}
	
	function gettoken(){
		console.log(window.localStorage.getItem('accesstoken'))
	}
	
	
	
	function getmeets(){
		

		

		
		var globalresponse=null;
		
		var getmeeturl= 'http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/Customers/'+actualuserid+'/Meetings/';
		
		
		var sendtoken='Bearer '+window.localStorage.getItem('accesstoken') ;
		
		axios.get(getmeeturl, {
			headers: {
			'Authorization': sendtoken
		}
		})
		
		.then(function (response) {
		
		console.log(response);
		
		globalresponse=response;
		
		console.log(response.data[0].id)
		console.log(globalresponse.data[0].id)
		
		
		window.localStorage.setItem('datasize', response.data.length);
		
		console.log(window.localStorage.getItem('datasize'));
	
		tabledef(response);
		
		})
		
		.catch(function (error) {
		console.log(error);
		});
		
		
		
		
	
		var table = document.getElementById("tablemeets");
		
		var size=window.localStorage.getItem('datasize');
		
		function tabledef(object){
			
		
		var responsedata=object;
		
		
		for (var i = 0; i < size; i++) {
				
				console.log('hola')
	
				var row = table.insertRow(i+1);
				
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				
				cell1.innerHTML = responsedata.data[i].id;
				cell2.innerHTML = responsedata.data[i].date;
				cell3.innerHTML = responsedata.data[i].price;
				cell4.innerHTML = responsedata.data[i].description;
			
		
		}
		
		var rowtodelete=parseInt(size)+1;
		
		document.getElementById("tablemeets").deleteRow(rowtodelete);
		
		
		}
		
	}
	
	function usermeetstart(){
		
		loaddata();
		getmeets();
		
		
	}
		
		
		
		
	
	
	
	
	
	
	
	
	
		
		
		
	
	
	