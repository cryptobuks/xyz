var crd = {lat: null, lng: null};
var id;
var options;
var path = "http://localhost:3000/layer"

options = {
	enableHighAccuracy: false,
	timeout: 5000,
	maximumAge: 0,
};

function success(pos) {
	crd = {lat: pos.coords.latitude, lng:pos.coords.longitude};
	post(crd);
	setTimeout(console.log("...delay..."), 1000);
}

function error(err) {
	console.warn('ERROR(' + err.code + '): ' + err.message);
}

function post(crd) {
	if (!crd.lat || !crd.lng)
	{
		console.log("Error");
		return (null);
	}
	$.ajax ({
		type: "POST",
		url: path,
		async: true,
		data: crd,
		success: function () {
			console.log("Send" + " " + crd.lat + "/" + crd.lng); 
		}
	})
}

id = navigator.geolocation.watchPosition(success, error, options);
