var NE = {
	lat: 48.90237,
	lng: 2.42103,
	};
var SW = {
	lat: 48.815737,
	lng: 2.2454166,
	}
var NO = {
	lat: 48.90237,
	lng: 2.2454166,
}
var SE = {
	lat: 48.815737,
	lng: 2.42103,
}
var pos = {
	lat: 48.8590323,
	lng: 2.3331661,
};

var overlay;
USGSOverlay.prototype = new google.maps.OverlayView();

function initMap() {
	var map = new google.maps.Map(document.getElementById('xyz_map'), {
		center: pos,
		disableDefaultUI: true,
		zoomControl: false,
		zoom: 13,
	});

	var bounds = new google.maps.LatLngBounds(SW, NE);

	var srcImage = '../backend/app/img/layer.png';

	overlay = new USGSOverlay(bounds, srcImage, map);
//	customize(map);
}

function customize(map) {

	var customMapTypeId = 'xyz';
	var customMapType = new google.maps.StyledMapType([
	{stylers: [
	{hue: '#890000'},
	{visibility: 'simplified'},
	{gamma: 0.5},
	{weight: 0.5}]},
	{featureType: 'all',
		stylers: [{color: '#FFFFFF'}]},
	{elementType: 'labels',
		stylers: [{visibility: 'off'}]},
	{elementType: 'labels.icon',
		stylers: [{visibility: 'off'}]},
	{featureType: 'road',
		stylers: [{color: '#000000'}]},
	{featureType: 'road.arterial',
		stylers: [{color: '#000000'}]},
	{featureType: 'road.highway',
		stylers: [{color: '#000000'}]},
	{featureType: 'road.local',
		stylers: [{color: '#000000'}]}],
	{name: 'Custom Style'});

	map.mapTypes.set(customMapTypeId, customMapType);
	map.setMapTypeId(customMapTypeId);
}

function USGSOverlay(bounds, image, map) {

	this.bounds_ = bounds;
	this.image_ = image;
	this.map_ = map;

	this.div_ = null;

	this.setMap(map);
}

USGSOverlay.prototype.onAdd = function() {

	var div = document.createElement('div');
	div.style.borderStyle = 'none';
	div.style.borderWidth = '0px';
	div.style.position = 'absolute';

	var img = document.createElement('img');
	img.src = this.image_;
	img.style.width = '100%';
	img.style.height = '100%';
	img.style.position = 'absolute';
	div.appendChild(img);

	this.div_ = div;

	var panes = this.getPanes();
	panes.overlayLayer.appendChild(div);
};

USGSOverlay.prototype.draw = function() {
	var overlayProjection = this.getProjection();

	var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
	var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

	var div = this.div_;
	div.style.left = sw.x + 'px';
	div.style.top = ne.y + 'px';
	div.style.width = (ne.x - sw.x) + 'px';
	div.style.height = (sw.y - ne.y) + 'px';
};

USGSOverlay.prototype.onRemove = function() {
	this.div_.parentNode.removeChild(this.div_);
	this.div_ = null;
};

google.maps.event.addDomListener(window, 'load', initMap);
