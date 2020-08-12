	

	var clientname;
	var actualuserid;
	var idtype;
	
	
	function setid(id){
		idtype=id;
	}
	

	var getUrlParameter = function getUrlParameter(sParam) {
		var sPageURL = window.location.search.substring(1),
			sURLVariables = sPageURL.split('&'),
			sParameterName,
			i;
	
		for (i = 0; i < sURLVariables.length; i++) {
			sParameterName = sURLVariables[i].split('=');
	
			if (sParameterName[0] === sParam) {
				return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
			}
		}
	};	

	
	
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
	
	function cleartokens(){
		window.localStorage.clear();
	}
	
	function login(){
		
		cleartokens();
		
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
		
		//console.log(window.localStorage.getItem('accesstoken'))
		//console.log(window.localStorage.getItem('refreshtoken'))
		
		//window.location="index.html";
		
		var token = window.localStorage.getItem('accesstoken') ;
		console.log('token decoded ' + token);

		var decoded = jwt_decode(token);
		console.log('token decoded ' + decoded);
		
		var usertype=decoded.type;
		
		window.localStorage.setItem('tipousuario', usertype);
		
		setid(usertype);
		
			
		//SuperUser
		//Analyst
		//Auditor
		//Customer
		
		console.log(usertype.localeCompare('Customer'));
		
		
		var iscustomer=usertype.localeCompare('Customer');
		var issuperuser=usertype.localeCompare('Super User');
		var isauditor=usertype.localeCompare('Auditor');
		var isanalyst=usertype.localeCompare('Analyst');
		
		
	
		if(iscustomer==0){
			window.location="index.html";
		}
		if(issuperuser==0){
			window.location="supanel.html";
		}
		if(isauditor==0){
			//code for auditor
			window.location="auditordashboard.html";
		}
		if(isanalyst==0){
			//code for analyst
			window.location="analystdashboard.html";
		}
		
		
		
		
	
		})
		
		.catch(function (error) {
		console.log(error);
	
		});	
		
		
		
		
		
		
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
		
	
		
		
		var payload = {"price": '50000', "date": meetdate, "description": document.getElementById('meetdescription').value, "customer": parseInt(useractualid,10), "meeting_type" : '1', "meeting_class" : '1'};

		console.log(payload);
		
		console.log(sendtoken);

		axios.post(urlstringmeet, payload,{
			headers: {

			'Authorization': sendtoken,
			
		}
		})
		
		.then(function (response) {
		console.log(response);
		$('#okmeet').modal('show')
		systemload();
	
		})
	
		.catch(function (error) {
		
		console.log(error.response);

		});
	
	}


	function systemload(){

		var sendtoken='Bearer '+window.localStorage.getItem('accesstoken') ;

		var systemurl= 'http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/Customers/'+useractualid+'/Systems/';

		console.log(window.localStorage.getItem('accesstoken'));

		console.log(systemurl);
	
		
		console.log(document.getElementById('osselect').value);
		console.log(document.getElementById('systemtselect').value);

		var systemload = {"name": document.getElementById('systemname').value, "description": document.getElementById('systemdescription').value, "OS": document.getElementById('osselect').value, "customer": parseInt(useractualid,10), "system_type" : document.getElementById('systemtselect').value};

		
		
		axios.post(systemurl, systemload,{
			headers: {

			'Authorization': sendtoken,
			
		}
		})
		
		.then(function (response) {
		console.log(response);
	
	
		})
	
		.catch(function (error) {
		console.log(error);
		console.log(error.response);

		});



	}





	
	function gettoken(){
		console.log(window.localStorage.getItem('accesstoken'))
	}
	
	
	



	function getreport(){

	



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

				console.log(responsedata.data[i]);
				
				console.log('hola')
	
				var row = table.insertRow(i+1);
				
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
			
				var cellInstruction = row.insertCell(5);


				var comparator=responsedata.data[i].state.name.localeCompare('Finished');
				
				if(comparator==0){

				cell1.innerHTML = responsedata.data[i].id;
				cell2.innerHTML = responsedata.data[i].date;
				cell3.innerHTML = responsedata.data[i].price;
				cell4.innerHTML = responsedata.data[i].description;
				cell5.innerHTML = responsedata.data[i].state.name;
				
				cellInstruction.innerHTML = '<button class="btn btn-primary btn-xs my-xs-btn" type="button" onClick="windows.location.href=\'report.html?meeting_id='+responsedata.data[i].id+'\'&report_id" >'
   				 + '<span class="glyphicon glyphicon-pencil"></span> Ver reporte</button>';
				
				}

				else {

				cell1.innerHTML = responsedata.data[i].id;
				cell2.innerHTML = responsedata.data[i].date;
				cell3.innerHTML = responsedata.data[i].price;
				cell4.innerHTML = responsedata.data[i].description;
				cell5.innerHTML = responsedata.data[i].state.name;

				}
			
		
		}
		
		var rowtodelete=parseInt(size)+1;
		
		document.getElementById("tablemeets").deleteRow(rowtodelete);
		
		
		}
		
	}

	function setData(){
		loaddataemployes();
		var meeting = getUrlParameter("meeting_id");
		var customer = getUrlParameter("customer_id");
		if (meeting != null & customer != null){
			$('#meeting').val(meeting);
			getMeetingInfo(customer, meeting);
		}else{
			window.location.href = "analystdashboard.html"
		}
	}

	function getMeetingInfo(customerId, meetingId){
		
		var globalresponse=null;
		
		var getmeeturl= 'http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/Customers/'+customerId+'/Meetings/'+meetingId+'/';
		
		
		var sendtoken='Bearer '+window.localStorage.getItem('accesstoken') ;
		
		axios.get(getmeeturl, {
			headers: {
				'Authorization': sendtoken
			}
		})
		
		.then(function (response) {
		$('#auditor').val(response.data.auditor);
		
		var getmeeturl= 'http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/Customers/'+customerId+'/Systems/';
		
		axios.get(getmeeturl, {
			headers: {
				'Authorization': sendtoken
			}
		}).then((response)=>{
			for (i in response.data){
				var o = new Option(response.data[i].name, response.data[i].id);
				/// jquerify the DOM object 'o' so we can use the html method
				$(o).html(response.data[i].name);
				$("#system").append(o);
			}

		}).catch((error) =>{
			console.log(error);
		});
	
		
		})
		
		.catch(function (error) {
		console.log(error);
		});
		
		
		
		
	
		var table = document.getElementById("tablemeets");
		
		var size=window.localStorage.getItem('datasize');
		
		
	}
	
	function usermeetstart(){
		
		loaddata();
		getmeets();
		
		
	}

function createReport(){
		
		
		var urlstringmeet= 'http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/Analysts/'+useractualid+'/Reports/';
		
		var sendtoken= 'Bearer '+window.localStorage.getItem('accesstoken');
	
		var attacks = $('.attacks:checked');
		var attacks_values=[];
		
		if (attacks != null){
			for (let i=0; i<attacks.length; i++){
				attacks_values.push(attacks[i].value); 
			}
		}
		
	
		
		var payload = {
			"price": document.getElementById('price').value, 
			"diagnostic": document.getElementById('diagnostic').value,
			"solution": document.getElementById('solution').value,
			"cve_codes": document.getElementById('cve_codes').value,
			"analyst": parseInt(useractualid, 10),
			"auditor": document.getElementById('auditor').value, 
			"state": document.getElementById('state').value,
			"attacks": attacks_values,
			"meeting": document.getElementById('meeting').value,
			"system": document.getElementById('system').value,
		};

		console.log(payload);
		
		axios.post(urlstringmeet, payload,{
			headers: {
				'Authorization': sendtoken,			
			}
		})
		
		.then(function (response) {
			console.log(response);

			var urlupdte= 'http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/PendingAnalisis/'+payload.meeting+'/';

			var payload2 = {
				"state": 5,
			};

			axios.patch(urlupdte, payload2,{

				headers: {
					'Authorization': sendtoken,			
				}
			}).then((response2) =>{
				console.log(response2);
				$('#okmeet').modal('show')
			}).catch(function (error) {
				console.log(error.response.data);
		
				});
			
			})
	
		.catch(function (error) {
		console.log(error.response.data);

		});
	
		
		
		
		
	}
	
	
	function employestart(){
		loaddataemployes();
		getmeetsemploye();
	}

	function analyststart(){
		loaddataemployes();
		getpendignanalisis();


	}
	
	
	
	function createemployer(){

	
		
		var today = new Date();
		var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var dateTime = date+'T'+time;
		
		var sendtoken='Bearer '+window.localStorage.getItem('accesstoken') ;
		
		var imagen = $('#employerimageprofile')[0].files[0];

		var employerdata = new FormData();
	
		employerdata.append("first_name", document.getElementById('employername').value);
		employerdata.append("last_name", document.getElementById('employerlastname').value);
		employerdata.append("username", document.getElementById('employerusername').value);
		employerdata.append("password", document.getElementById('employerpass').value);
		employerdata.append("email", document.getElementById('employermail').value);
		employerdata.append("image", imagen);
		employerdata.append("phone", document.getElementById('employerphone').value);
		employerdata.append("identification.id", document.getElementById('employerid').value);
		employerdata.append("staff_profile.join_date", dateTime);
		employerdata.append("staff_profile.position", document.getElementById('jobselect').value);
		
		var url;
		
		var employertype= document.getElementById('jobselect').value;
		
		if(employertype==2){
			//analista
			url='http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/Analysts/';
			
		}
		if(employertype==3){
			//auditor
			url='http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/Auditors/';
		}
		
		console.log(url);

	
		axios.post(url, employerdata,{
				headers: {

			'Authorization': sendtoken,
			
		}
		})
		
		
		.then(function (response) {
		
	
		console.log(response);
		$('#okcreatedemployed').modal('show')
	
		
		})
		
		.catch(function (error) {
		console.log(error);
		console.log(error.response);

		});
			
	}
	
	
	
	function loaddataemployes(){
		
		
		
		
		
		var token = window.localStorage.getItem('accesstoken') ;

		var decoded = jwt_decode(token);
		console.log(decoded);
		
		useractualid=decoded.user_id;
		actualuserid=decoded.user_id;
		
		//console.log(useractualid);
		
		var cargo=window.localStorage.getItem('tipousuario') ;
		
		console.log(cargo);
		
		
		var urlstring= null;
		
		//http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/Analysts/
		//http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/Auditors/
		
		
		
		if(cargo.localeCompare('Auditor')==0){
			urlstring= 'http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/Auditors/'+useractualid+'/';
		}
		
		if(cargo.localeCompare('Analyst')==0){
			urlstring= 'http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/Analysts/'+useractualid+'/';
		}

		
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
		
		
		javascript:document.getElementById('visualemployename').innerHTML=clientname;
		
		document.getElementById("employerprofilepic").src=response.data.image;
		
		
		})
		
		.catch(function (error) {
		console.log(error);
		});
		
		
		}
		
		
		
		
		
	
		function getmeetsemploye(){
		

		

		
		var globalresponse=null;
		
		var getmeeturl= 'http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/PendingMeetings/';
		
		
		var sendtoken='Bearer '+window.localStorage.getItem('accesstoken') ;
		
		axios.get(getmeeturl, {
			headers: {
			'Authorization': sendtoken
		}
		})
		
		.then(function (response) {
			
		window.localStorage.setItem('meetsize', response.data.length);
		
		
		console.log(response);
		
		
		
	
		tabledef2(response);
		
		
		
		})
		
		.catch(function (error) {
		console.log(error);
		});
		
		
		
		
	
		var table2 = document.getElementById("auditortable");
		
		var tablesize=window.localStorage.getItem('meetsize');
		
		function tabledef2(object2){
			
		
		var responsedata2=object2;
		
		
		for (var i = 0; i < tablesize; i++) {
			
			/*orden en la tabla
			
			auditor->auditor
			id cliente->customer
			fecha->date
			description->description
			id reunion->id
			tipo reunion->meeting_class
			clase reunion->meeting_type
			precio->price
			estado->state
			
			*/
				
		
	
				var row = table2.insertRow(i+1);
				
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
				var cell6 = row.insertCell(5);
				var cell7 = row.insertCell(6);
				var cell8 = row.insertCell(7);
				var cell9 = row.insertCell(8);
			
				
				cell1.innerHTML = responsedata2.data[i].auditor;
				cell2.innerHTML = responsedata2.data[i].customer;
				cell3.innerHTML = responsedata2.data[i].date;
				cell4.innerHTML = responsedata2.data[i].description;
				cell5.innerHTML = responsedata2.data[i].id;
				cell6.innerHTML = responsedata2.data[i].meeting_class.name;
				cell7.innerHTML = responsedata2.data[i].meeting_type.name;
				cell8.innerHTML = responsedata2.data[i].price;
				cell9.innerHTML = responsedata2.data[i].state.name;
				
				
				var cellInstruction = row.insertCell(9);
				cellInstruction.innerHTML = '<button class="btn btn-primary btn-xs my-xs-btn" type="button" onClick="Auditar('+responsedata2.data[i].id+')" >'
				+ '<span class="glyphicon glyphicon-pencil"></span> Auditar</button>';
			
			
		
		}
		
		var rowtodelete=parseInt(tablesize)+1;
		
		document.getElementById("auditortable").deleteRow(rowtodelete);
		
		
		}
		
	}
	
	
	function Auditar(meetingid){

		var saver=meetingid;
		
		var sendtoken='Bearer '+window.localStorage.getItem('accesstoken') ;

		var auditurl='http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/PendingMeetings/'+meetingid+'/';

		var payload = {"auditor": actualuserid, "state": 4};

		axios.patch(auditurl, payload,{
			headers: {

			'Authorization': sendtoken,
			
		}
		})
		
		.then(function (response) {
		console.log(response);
	
	
		})
	
		.catch(function (error) {
		console.log(error);
		console.log(error.response.data);

		});


	}


	function getpendignanalisis(){
		

		

		
		var globalresponse=null;
		
		var getmeeturl= 'http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/PendingAnalisis/';
		
		
		var sendtoken='Bearer '+window.localStorage.getItem('accesstoken') ;
		
		axios.get(getmeeturl, {
			headers: {
			'Authorization': sendtoken
		}
		})
		
		.then(function (response) {
			
		window.localStorage.setItem('analistsize', response.data.length);
		
		
		console.log(response);
		
		
		
	
		tabledef3(response);
		
		
		
		})
		
		.catch(function (error) {
		console.log(error);
		});
		
		
		
		
	
		var table3 = document.getElementById("analistatable");
		
		var tablesize3=window.localStorage.getItem('analistsize');
		
		function tabledef3(object3){
			
		
		var responsedata3=object3;
		
		
		for (var i = 0; i < tablesize3; i++) {
			
			/*orden en la tabla
			
			auditor->auditor
			id cliente->customer
			fecha->date
			description->description
			id reunion->id
			tipo reunion->meeting_class
			clase reunion->meeting_type
			precio->price
			estado->state
			
			*/
				
		
	
				var row = table3.insertRow(i+1);
				
				var cell1 = row.insertCell(0);
				var cell2 = row.insertCell(1);
				var cell3 = row.insertCell(2);
				var cell4 = row.insertCell(3);
				var cell5 = row.insertCell(4);
				var cell6 = row.insertCell(5);
				var cell7 = row.insertCell(6);
				var cell8 = row.insertCell(7);
				var cell9 = row.insertCell(8);
			
				
				cell1.innerHTML = responsedata3.data[i].auditor;
				cell2.innerHTML = responsedata3.data[i].customer;
				cell3.innerHTML = responsedata3.data[i].date;
				cell4.innerHTML = responsedata3.data[i].description;
				cell5.innerHTML = responsedata3.data[i].id;
				cell6.innerHTML = responsedata3.data[i].meeting_class.name;
				cell7.innerHTML = responsedata3.data[i].meeting_type.name;
				cell8.innerHTML = responsedata3.data[i].price;
				cell9.innerHTML = responsedata3.data[i].state.name;
				
				
				var cellInstruction = row.insertCell(9);
				cellInstruction.innerHTML = '<button class="btn btn-primary btn-xs my-xs-btn" type="button" onClick="window.location.href = \'analyst-report-create.html?meeting_id='+responsedata3.data[i].id+'&customer_id='+responsedata3.data[i].customer+'\'" >'
				+ '<span class="glyphicon glyphicon-pencil"></span>Hacer reporte</button>';
			
			
		
		}
		
		console.log(tablesize3);

		var rowtodelete=parseInt(tablesize3)+1;
		
		document.getElementById("analistatable").deleteRow(rowtodelete);
		
		
		}
		
	}


	function CreateReport(meetingid){

		var saver=meetingid;
		
		var sendtoken='Bearer '+window.localStorage.getItem('accesstoken') ;

		var auditurl='http://itsecurityassistantapi-dev.us-east-1.elasticbeanstalk.com/api/PendingMeetings/'+meetingid+'/';

		var payload = {"auditor": actualuserid, "state": 4};

		axios.patch(auditurl, payload,{
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






	
		
		
		
	
	
	
	
	
	
	
	
	
		
		
		
	
	
	