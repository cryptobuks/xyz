var NO = {lat: 48.90237, lng: 2.2454166};
var dim = {h: 0.086633, w: 0.1756134};
var crd = {lat: null, lng: null};
var id;
var options;
var path = "http://localhost:3000/layer"
var height = createRemap(0, dim.h, 0, 768);
var width = createRemap(0, dim.w, 0, 1024);
var err = 0;

options = {
	enableHighAccuracy: false,
	timeout: 5000,
	maximumAge: 0,
//	distanceFilter: 5,
};

function success(pos) {
	crd = {lat: pos.coords.latitude, lng:pos.coords.longitude};
	crd = {lat: height(NO.lat - crd.lat), lng: width(crd.lng - NO.lng)};
	if (err < 100)
		post(crd);
	console.log(err + " error(s).");
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
		success: function (data) {
			if (data.success)
			{
				console.log(data.message);
				err = 0;
			}
			else
			{
				console.log("server:: " + data.message);
				err++;
			}
		},
		error: function(xhr, textStatus, error){
			console.log("net::ERR_CONNECTION_REFUSED");
			err++;
		}
	})
}

function createRemap(inMin, inMax, outMin, outMax) {
	return function remaper(x) {
	    return (x - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
	};
}

id = navigator.geolocation.watchPosition(success, error, options);
