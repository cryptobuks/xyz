var init	= false;
var update	= false;
var id_watch	= null;
var id_inter	= null;
var NO		= {lat: 48.90237, lng: 2.2454166};
var dim		= {h: 0.086633, w: 0.1756134};
var height	= createRemap(0, dim.h, 0, 768);
var width	= createRemap(0, dim.w, 0, 1024);
var user 	= {lat: null, lng: null, token: null,}

function routine() {

	var token = sessionStorage.getItem("token");
	if (token)
	{
		if (!init)
			initialize(token);
		else
			post(user, update);
	}
	$("#layer").attr("src", "../server/img/layer.png?timestamp=" + new Date().getTime());
}

function initialize(token) {
	var opt = {
		enableHighAccuracy: true,
		timeout: 5000,
		maximumAge: 0,
	};

	id_watch = id = navigator.geolocation.watchPosition(w_success, w_error, opt);
	user.token = token;
	init = true;
}

function w_success(pos) {
	var	crd;
	
	crd = {lat: pos.coords.latitude, lng:pos.coords.longitude};
	user.lat = height(NO.lat - crd.lat);
	user.lng = width(crd.lng - NO.lng);
	update = true;
}

function w_error(err) {
	console.warn('ERROR(' + err.code + '): ' + err.message);
}

function post(user) {
	if (!user.lat || !user.lng || !user.token)
		return (console.log("Invalid User request."));
	if (!update)
		return (console.log("Deprecated Position."));
	$.ajax ({
		type: "POST",
		url: "http://localhost:3000/api/put_pixel",
		async: true,
		data: user,
		success: function (data) {
			if (data.success)
			{
				update = false;
				console.log(data.message);
			}
			else
			{
				console.log("server:: " + data.message);
			}
		},
		error: function(xhr, textStatus, error){
			console.log("net::ERR_CONNECTION_REFUSED");
		}
	})
}

function createRemap(inMin, inMax, outMin, outMax) {
	return (function remaper(x) {
		return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
	});
}

id_inter = window.setInterval(routine, 1000);
