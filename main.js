// Generated by Haxe 3.3.0 (git build development @ b0a6270)
(function () { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
var JsonRpc = function() { };
JsonRpc.__name__ = true;
JsonRpc.error = function(code,message,data) {
	var error = { code : code, message : message};
	if(data != null) {
		error.data = data;
	}
	return error;
};
JsonRpc.notification = function(method,params) {
	var message = { jsonrpc : "2.0", method : method};
	if(params == null) {
		message.params = params;
	}
	return message;
};
JsonRpc.response = function(id,outcome) {
	var response = { jsonrpc : "2.0", id : id};
	switch(outcome[1]) {
	case 0:
		response.error = outcome[2];
		break;
	case 1:
		response.result = outcome[2];
		break;
	}
	return response;
};
var Main = function() { };
Main.__name__ = true;
Main.main = function() {
	var proto = new Protocol();
	proto.onInitialize = function(params,resolve,reject) {
		resolve({ capabilities : { completionProvider : { resolveProvider : true, triggerCharacters : [".","("]}}});
	};
	proto.onCompletion = function(params1,resolve1,reject1) {
		proto.sendMessage(JsonRpc.notification("window/showMessage",{ type : 3, message : "Hello"}));
		resolve1([{ label : "foo"},{ label : "bar"}]);
	};
	proto.onCompletionItemResolve = function(item,resolve2,reject2) {
		resolve2(item);
	};
	proto.sendMessage = function(message) {
		console.log("OUT MESSAGE: " + Std.string(message));
	};
	proto.handleMessage({ jsonrpc : "2.0", method : "textDocument/completion", id : 1});
};
Math.__name__ = true;
var Protocol = function() {
};
Protocol.__name__ = true;
Protocol.prototype = {
	handleMessage: function(message) {
		var _gthis = this;
		console.log("Handling message: " + Std.string(message));
		if(Object.prototype.hasOwnProperty.call(message,"id")) {
			var request = message;
			this.handleRequest(request,function(result) {
				_gthis.sendMessage(JsonRpc.response(request.id,haxe_ds_Either.Right(result)));
			},function(code,message1,data) {
				_gthis.sendMessage(JsonRpc.response(request.id,haxe_ds_Either.Left(JsonRpc.error(code,message1,data))));
			});
		} else {
			this.handleNotification(message);
		}
	}
	,sendMessage: function(message) {
	}
	,handleRequest: function(request,resolve,reject) {
		switch(request.method) {
		case "codeLens/resolve":
			this.onCodeLensResolve(request.params,resolve,function(c,m) {
				reject(c,m,null);
			});
			break;
		case "completionItem/resolve":
			this.onCompletionItemResolve(request.params,resolve,function(c1,m1) {
				reject(c1,m1,null);
			});
			break;
		case "initialize":
			this.onInitialize(request.params,resolve,reject);
			break;
		case "textDocument/codeAction":
			this.onCodeAction(request.params,resolve,function(c2,m2) {
				reject(c2,m2,null);
			});
			break;
		case "textDocument/codeLens":
			this.onCodeLens(request.params,resolve,function(c3,m3) {
				reject(c3,m3,null);
			});
			break;
		case "textDocument/completion":
			this.onCompletion(request.params,resolve,function(c4,m4) {
				reject(c4,m4,null);
			});
			break;
		case "textDocument/definition":
			this.onGotoDefinition(request.params,resolve,function(c5,m5) {
				reject(c5,m5,null);
			});
			break;
		case "textDocument/documentHighlight":
			this.onDocumentHighlights(request.params,resolve,function(c6,m6) {
				reject(c6,m6,null);
			});
			break;
		case "textDocument/documentSymbol":
			this.onDocumentSymbols(request.params,resolve,function(c7,m7) {
				reject(c7,m7,null);
			});
			break;
		case "textDocument/formatting":
			this.onDocumentFormatting(request.params,resolve,function(c8,m8) {
				reject(c8,m8,null);
			});
			break;
		case "textDocument/hover":
			this.onHover(request.params,resolve,function(c9,m9) {
				reject(c9,m9,null);
			});
			break;
		case "textDocument/onTypeFormatting":
			this.onDocumentOnTypeFormatting(request.params,resolve,function(c10,m10) {
				reject(c10,m10,null);
			});
			break;
		case "textDocument/references":
			this.onFindReferences(request.params,resolve,function(c11,m11) {
				reject(c11,m11,null);
			});
			break;
		case "textDocument/rename":
			this.onRename(request.params,resolve,function(c12,m12) {
				reject(c12,m12,null);
			});
			break;
		case "textDocument/signatureHelp":
			this.onSignatureHelp(request.params,resolve,function(c13,m13) {
				reject(c13,m13,null);
			});
			break;
		case "workspace/symbol":
			this.onWorkspaceSymbols(request.params,resolve,function(c14,m14) {
				reject(c14,m14,null);
			});
			break;
		default:
			reject(-32601,"Method '" + request.method + "' not found",null);
		}
	}
	,handleNotification: function(notification) {
		switch(notification.method) {
		case "exit":
			this.onExit();
			break;
		case "shutdown":
			this.onShutdown();
			break;
		case "textDocument/didChange":
			this.onDidChangeTextDocument(notification.params);
			break;
		case "textDocument/didClose":
			this.onDidCloseTextDocument(notification.params);
			break;
		case "textDocument/didOpen":
			this.onDidOpenTextDocument(notification.params);
			break;
		case "textDocument/didSave":
			this.onDidSaveTextDocument(notification.params);
			break;
		case "textDocument/publishDiagnostics":
			this.onPublishDiagnostics(notification.params);
			break;
		case "window/logMessage":
			this.onLogMessage(notification.params);
			break;
		case "window/showMessage":
			this.onShowMessage(notification.params);
			break;
		case "workspace/didChangeConfiguration":
			this.onDidChangeConfiguration(notification.params);
			break;
		case "workspace/didChangeWatchedFiles":
			this.onDidChangeWatchedFiles(notification.params);
			break;
		}
	}
	,onInitialize: function(params,resolve,reject) {
	}
	,onShutdown: function() {
	}
	,onExit: function() {
	}
	,onShowMessage: function(params) {
	}
	,onLogMessage: function(params) {
	}
	,onDidChangeConfiguration: function(params) {
	}
	,onDidOpenTextDocument: function(params) {
	}
	,onDidChangeTextDocument: function(params) {
	}
	,onDidCloseTextDocument: function(params) {
	}
	,onDidSaveTextDocument: function(params) {
	}
	,onDidChangeWatchedFiles: function(params) {
	}
	,onPublishDiagnostics: function(params) {
	}
	,onCompletion: function(params,resolve,reject) {
	}
	,onCompletionItemResolve: function(params,resolve,reject) {
	}
	,onHover: function(params,resolve,reject) {
	}
	,onSignatureHelp: function(params,resolve,reject) {
	}
	,onGotoDefinition: function(params,resolve,reject) {
	}
	,onFindReferences: function(params,resolve,reject) {
	}
	,onDocumentHighlights: function(params,resolve,reject) {
	}
	,onDocumentSymbols: function(params,resolve,reject) {
	}
	,onWorkspaceSymbols: function(params,resolve,reject) {
	}
	,onCodeAction: function(params,resolve,reject) {
	}
	,onCodeLens: function(params,resolve,reject) {
	}
	,onCodeLensResolve: function(params,resolve,reject) {
	}
	,onDocumentFormatting: function(params,resolve,reject) {
	}
	,onDocumentOnTypeFormatting: function(params,resolve,reject) {
	}
	,onRename: function(params,resolve,reject) {
	}
};
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
var haxe_ds_Either = { __ename__ : true, __constructs__ : ["Left","Right"] };
haxe_ds_Either.Left = function(v) { var $x = ["Left",0,v]; $x.__enum__ = haxe_ds_Either; $x.toString = $estr; return $x; };
haxe_ds_Either.Right = function(v) { var $x = ["Right",1,v]; $x.__enum__ = haxe_ds_Either; $x.toString = $estr; return $x; };
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) {
					return o[0];
				}
				var str = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i = _g1++;
					if(i != 2) {
						str += "," + js_Boot.__string_rec(o[i],s);
					} else {
						str += js_Boot.__string_rec(o[i],s);
					}
				}
				return str + ")";
			}
			var l = o.length;
			var i1;
			var str1 = "[";
			s += "\t";
			var _g11 = 0;
			var _g2 = l;
			while(_g11 < _g2) {
				var i2 = _g11++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var k = null;
		var str2 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str2.length != 2) {
			str2 += ", \n";
		}
		str2 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str2 += "\n" + s + "}";
		return str2;
	case "string":
		return o;
	default:
		return String(o);
	}
};
String.__name__ = true;
Array.__name__ = true;
Main.main();
})();
