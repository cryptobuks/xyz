function displayUI() {
	if (sessionStorage.getItem("token"))
	{
		document.getElementById("UI").style.display = "none";
	}
}

function authenticate() {
	var name = document.forms["FORM"]["fname"].value;
	var password = document.forms["FORM"]["fpassword"].value;
	var color = document.forms["FORM"]["fcolor"].value;

	var user = {name: name, password: password};

	$.ajax ({
		type: "POST",
		url: "http://localhost:3000/authenticate",
		async: true,
		data: user,
		success: function (data) {
			if (data.success)
			{
				console.log(data.message);
				sessionStorage.setItem("token", data.token);
				sessionStorage.setItem("color", color);
				document.getElementById("UI").style.display = "none";
			}
			else
			{
				console.log("server::" + data.message);
			}
		},
		error: function(xhr, textStatus, error){
			console.log("net::ERR_CONNECTION_REFUSED");
		}
	});
}

function watch() {
	document.getElementById("UI").style.display = "none";
}
