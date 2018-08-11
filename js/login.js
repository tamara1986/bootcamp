function signUp(){
	let user={
		id: makeid(),
		first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        image: null
	}
	errors.innerHTML='';
	success.innerHTML='';

	let format=/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
	let valid=true;

    if (user.first_name=='' || user.last_name=='' || user.username=='' || user.password=='' || user.email=='') {
        errors.innerHTML='<div class="error-msg">You have to fill all the fields</div>';
        valid=false;
    }

	if (format.test(user.username)) {
		errors.innerHTML='<div class="error-msg">Username can\'t contain special characters.</div>';
		valid=false;
	}
	if (format.test(user.password)) {
		errors.innerHTML='<div class="error-msg">Username can\'t contain special characters.</div>';
		valid=false;
	}
	if(user.username.length < 5 || user.username.length > 12) {
        errors.innerHTML += '<div class="error-msg">Username must contain between 5 and 12 characters.</div>';
        valid = false;
    }

    if(user.password.length < 5 || user.password.length > 12) {
        errors.innerHTML += '<div class="error-msg">Password must contain between 5 and 12 characters.</div>';
        valid = false;
    }
    if (valid) {
    	user.password=md5(user.password);
    	let http=new XMLHttpRequest();
    	http.open('POST','php/add_user.php',true);
    	http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    	 http.onreadystatechange = function() {
            if(http.readyState == 4 && http.status == 200) {
                // Converting JSON to JS object
                let data = JSON.parse(http.responseText);
                if(data.success != '') {
                    success.innerHTML = '<div class="success-msg">New user registered.</div>';
                }
            }
        }
    	let data=JSON.stringify(user);
    	http.send(data);
    }
}


function login(){
    let user={
        id: null,
        username: document.getElementById('usernameLog').value,
        password:document.getElementById('passwordLog').value
    }
    var http = new XMLHttpRequest();
    http.open('GET', 'php/get_users.php', true);
    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var data = JSON.parse(http.responseText);
            console.log(data);
            data.data.forEach(function(user_data) {
                if(user_data.username == user.username && user_data.password == md5(user.password)){
                    localStorage.setItem('user_id', user_data.id);
                    user.id = user_data.id;
                }
            });
            if(user.id != null) {
                document.location.replace('home.html');
            } else {
                error_div.innerHTML = 'Wrong username and password combination.';
            }
        }
    }
    http.send(null);
}