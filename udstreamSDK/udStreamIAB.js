var Module = null;

var euclideon = {};
(function (euclideon) {
	euclideon.create = function(canvasID, obj) {
		if (canvasID != "canvas") {
			throw "Canvas element must use 'canvas' as ID";
		}
		
		var domNode = document.getElementById(canvasID);
		
		if (domNode == null) {
			throw "Could not find canvas with id=" + canvasID;
		}
		
		function SupportsWebGL2() {
			var hasSupport = false;
			var canvas = document.createElement("canvas");
			try {
				var ctx = canvas.getContext("webgl2");
				hasSupport = (ctx != null);
			} catch (e) { }
			
			return hasSupport;
		}
		
		var supportsWebGL2 = SupportsWebGL2();
		
		if (!supportsWebGL2)
		{
			// Do something here
		}

		window.oncontextmenu = function(e) {
			e.preventDefault();
		}

		window.onkeydown = function(e) {
			if (e.keyCode === 9 // tab
				|| e.keyCode === 114 // F3
				|| e.keyCode === 117 // F6
				|| e.keyCode === 121 // F10
				)
			{
				e.preventDefault();
			}
		}
		
		// Disable trackpad pinch-to-zoom functionality
		domNode.addEventListener("wheel", function(e) { e.preventDefault(); });

		var args = [];
		
		if (typeof(obj["domain"]) == 'boolean' && obj["domain"]) {
			args.push("--domain");
		}
		
		if (typeof(obj["scene"]) == 'string') {
			args.push(obj["scene"]);
		}
		
		if (typeof(obj["uilevel"]) == 'number') {
			if (obj["uilevel"] < 0 || obj["uilevel"] > 2) {
				throw 'UI Level must be between 0 and 2';
			}
			args.push("--ui=" + obj["uilevel"]);
		}
		
		Module = {
			arguments: args,
			canvas: domNode,
			noInitialRun: !supportsWebGL2,
			mainScriptUrlOrBlob: "udStream.js",
			preRun: [
				function() {
					console.log("preRun");
					FS.mkdir("/libsdl");
					FS.mount(IDBFS, {}, "/libsdl");
					console.log("Mounted!");
				},
			],
			setStatus: function(text) {
				console.log(text);
			},
			onMainLoopStart: function() {
				//console.log("MainLoop");
				//document.getElementById("statusLoading").hidden = true;
			}
		};

		Module.setStatus('Downloading...');
		
		script = document.createElement('script');
		script.src = "./udstream/udStream.js";
		document.body.appendChild(script);
	};
	// Public methods
	euclideon.login = function (apikey, callback) {
		var callbackPtr = 0;
		if (callback) {
			callbackPtr = Module.addFunction(function () {
				callback();
				Module.removeFunction(callbackPtr);
			}, 'v');
		}
		Module.ccall('vcJavascriptHooks_Login', null, ['string', 'int'], [apikey, callbackPtr]);
	};
	euclideon.createProject = function (callback) {
		var callbackPtr = 0;
		if (callback) {
			callbackPtr = Module.addFunction(function (projectPtr) {
				callback(projectPtr);
				Module.removeFunction(callbackPtr);
			}, 'vi');
		}
		Module.ccall('vcJavascriptHooks_CreateProject', null, ['int'], [callbackPtr]);
	};
	euclideon.loadUds = function (url, callback) {
		var callbackPtr = 0;
		if (callback) {
			callbackPtr = Module.addFunction(function () {
				callback();
				Module.removeFunction(callbackPtr);
			}, 'v');
		}
		Module.ccall('vcJavascriptHooks_LoadFile', null, ['string', 'int'], [url, callbackPtr]);
	};
	euclideon.moveTo = function (x, y, z, speed, callback) {
		var callbackPtr = 0;
		if (callback) {
			callbackPtr = Module.addFunction(function () {
				callback();
				Module.removeFunction(callbackPtr);
			}, 'v');
		}
		Module.ccall('vcJavascriptHooks_MoveTo', null, ['number', 'number', 'number', 'number', 'int'], [x, y, z, speed, callbackPtr]);
	};
	euclideon.addPoint = function (x, y, z, name, callback) {
		var callbackPtr = 0;
		if (callback) {
			callbackPtr = Module.addFunction(function () {
				callback();
				Module.removeFunction(callbackPtr);
			}, 'v');
		}
		Module.ccall('vcJavascriptHooks_AddPoint', null, ['number', 'number', 'number', 'string', 'int'], [x, y, z, name, callbackPtr]);
	};
	euclideon.registerMouse3DPosCallback = function (callback) {
		var callbackPtr = 0;
		if (callback) {
			callbackPtr = Module.addFunction(function (x, y, z) {
				callback(x, y, z);
			}, 'vddd');
		}
		Module.ccall('vcJavascriptHooks_SetMouse3DPosCallback', null, ['int'], [callbackPtr]);
	};
	euclideon.setNodeVisibility = function (uuid, visibility, callback) {
		var callbackPtr = 0;
		if (callback) {
			callbackPtr = Module.addFunction(function (visibility) {
				callback(visibility != 0);
			}, 'vi');
		}
		Module.ccall('vcJavascriptHooks_SetNodeVisibility', null, ['string', 'int', 'int'], [uuid, visibility ? 1 : 0, callbackPtr]);
	};
	euclideon.toggleNodeVisibility = function (uuid, callback) {
		var callbackPtr = 0;
		if (callback) {
			callbackPtr = Module.addFunction(function (visibility) {
				callback(visibility != 0);
			}, 'vi');
		}
		Module.ccall('vcJavascriptHooks_ToggleNodeVisibility', null, ['string', 'int'], [uuid, callbackPtr]);
	};
}(euclideon || {}));