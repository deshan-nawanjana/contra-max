function JDBS(file_path) {
	this.dbs = {fld:[], dbs:[]};
	this.length = this.dbs['dbs'].length;
	this.fields = [];

	if(file_path != undefined) {
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", file_path + "?t=" + Date.now(), false);
		xhttp.send();
		try {
			this.dbs = JSON.parse(xhttp.responseText);
		}
		catch(err) {
			this.dbs = {fld:[], dbs:[]};
		}

		if(this.dbs['fld'] == undefined || this.dbs['dbs'] == undefined) {
			this.dbs = {fld:[], dbs:[]};
		}

		this.length = this.dbs['dbs'].length;
		this.fields = this.dbs['fld'];
	}

	this.loadFile = function(file_path) {
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", file_path + "?t=" + Date.now(), false);
		xhttp.send();
		this.dbs = JSON.parse(xhttp.responseText);

		this.length = this.dbs['dbs'].length;
		this.fields = this.dbs['fld'];
	}

	this.saveFile = function(file_path) {
		var xhttp = new XMLHttpRequest();
		var formData = new FormData();
		formData.append("file", file_path);
		formData.append("data", JSON.stringify(this.dbs));
		xhttp.open("POST", "jdbs.php?t=" + Date.now(), false);
		xhttp.send(formData);
	}

	this.loadString = function(JSON_string) {
		this.dbs = JSON.parse(JSON_string);

		this.length = this.dbs['dbs'].length;
		this.fields = this.dbs['fld'];
	}

	this.toString = function() {
		return JSON.stringify(this.dbs);
	}

	this.out = function() {
		return this.dbs;
	}

	this.setFields = function() {
		this.dbs['fld'] = [];
		if(typeof arguments[0] == 'object') {
			for(i = 0; i < arguments[0].length; i++){
				this.dbs['fld'].push(arguments[0][i]);
			}
		}
		else {
			for(i = 0; i < arguments.length; i++){
				this.dbs['fld'].push(arguments[i]);
			}
		}
	}

	this.addRecord = function() {
		if(this.dbs['fld'] == 0) {
			console.error('JDBS : No Fields')
		}
		if(typeof arguments[0] == 'object') {
			var obj = {};
			for(i = 0; i < this.dbs['fld'].length; i++){
				obj[this.dbs['fld'][i]] = arguments[0][i];
			}
			this.dbs['dbs'].push(obj);
		}
		else {
			var obj = {};
			for(i = 0; i < this.dbs['fld'].length; i++){
				obj[this.dbs['fld'][i]] = arguments[i];
			}
			this.dbs['dbs'].push(obj);
		}

		this.length = this.dbs['dbs'].length;
		this.fields = this.dbs['fld'];
	}

	this.getRecord = function() {
		if(arguments.length == 1 && typeof arguments[0] == 'string') {
			var l = [];
			for(i = 0; i < this.dbs['dbs'].length; i++) {
				if(this.dbs['dbs'][i][arguments[0]] != undefined && l.indexOf(this.dbs['dbs'][i][arguments[0]]) == -1) {
					l.push(this.dbs['dbs'][i][arguments[0]]);
				}
			}
			return l;
		}
		if(arguments.length == 1 && typeof arguments[0] == 'number') {
			return this.dbs['dbs'][arguments[0]];
		}
		if(arguments.length == 2) {
			var fld = arguments[0];
			var val = arguments[1];
			var l = [];
			for(i = 0; i < this.dbs['dbs'].length; i++) {
				if(this.dbs['dbs'][i][fld] == val) {
					l.push(this.dbs['dbs'][i]);
				}
			}
			if(l.length == 1) {
				return l[0];
			}
			else {
				return l;
			}
		}
	}

	this.delRecord = function() {
		if(arguments.length == 1) {
			var l = [];
			for(i = 0; i < this.dbs['dbs'].length; i++) {
				if(i != arguments[0]) {
					l.push(this.dbs['dbs'][i]);
				}
			}
			this.dbs['dbs'] = l;
		}
		if(arguments.length == 2) {
			var l = [];
			for(i = 0; i < this.dbs['dbs'].length; i++) {
				if(this.dbs['dbs'][i][arguments[0]] != arguments[1]) {
					l.push(this.dbs['dbs'][i]);
				}
			}
			this.dbs['dbs'] = l;
		}
		
		this.length = this.dbs['dbs'].length;
		this.fields = this.dbs['fld'];
	}

	this.auth = 'JDBS v1.0 [Javascript Database]\nby Deshan Nawanjana\nhttp://dn-w.blogspot.com/';
}