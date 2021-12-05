function id(x) {return document.getElementById(x);}
function cl(x) {return document.getElementsByClassName(x);}
function tg(x) {return document.getElementsByTagName(x);}

function replaceAll(x, a, b) {
	if(typeof x == 'string') {
		while(x.indexOf(a) > -1) {
			x = x.replace(a, b);
		}
		return x;
	}
	if(typeof x == 'object') {
		var l = [];
		for(i = 0; i < x.length; i++) {
			if(x[i] == a) {
				l.push(b);
			}
			else {
				l.push(x[i]);
			}
		}
		return l;
	}
}

function removeAll(x, a) {
	if(typeof x == 'string') {
		while(x.indexOf(a) > -1) {
			x = x.replace(a, '');
		}
		return x;
	}
	if(typeof x == 'object') {
		var l = [];
		for(i = 0; i < x.length; i++) {
			if(x[i] != a) {
				l.push(x[i]);
			}
		}
		return l;
	}
}

function removeAt(x, a) {
	if(typeof x == 'string') {
		var k = '';
		for(i = 0; i < x.length; i++) {
			if(i != a) {
				k += x[i]
			}
		}
		return k;
	}
	if(typeof x == 'object') {
		var l = [];
		for(i = 0; i < x.length; i++) {
			if(i != a) {
				l.push(x[i]);
			}
		}
		return l;
	}
}

function getHTML(url) {
	var xhttp = new XMLHttpRequest();
	var formData = new FormData();
	xhttp.open("POST", url + "?t=" + Date.now(), false);
	xhttp.send();
	return xhttp.responseText;
}

function arrayMax(l) {
	var m = l[0];
	for(i = 0; i < l.length; i++) {
		if(l[i] > m) {
			m = l[i];
		}
	}
	return m;
}

function arrayMin(l) {
	var m = l[0];
	for(i = 0; i < l.length; i++) {
		if(l[i] < m) {
			m = l[i];
		}
	}
	return m;
}

function arrayTot(l) {
	var t = 0;
	for(i = 0; i < l.length; i++) {
		t += l[i]
	}
	return t;
}

function arrayAvg(l) {
	var t = 0;
	for(i = 0; i < l.length; i++) {
		t += l[i]
	}
	return t / l.length;
}

function getPos(e) {
	var mouseX, mouseY;
	if(e.offsetX) {
		mouseX = e.offsetX;
		mouseY = e.offsetY;
	}
	else if(e.layerX) {
		mouseX = e.layerX;
		mouseY = e.layerY;
	}
	return {x: mouseX, y: mouseY};
}