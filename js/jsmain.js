	
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
	
	