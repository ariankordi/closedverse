//! Modifications by Arian K and Lane B
var splatoon = true;
if(innerWidth <= 480 || navigator.userAgent.indexOf('Nintendo') > 0) {
   splatoon = false;
}
//var loading_animate = false;
var loading_animate = true;
var pjax_container = '#container';
// Edge lies about being WebKit but it works anyway
// Edit: This used to match 'WebKit' but it's now Gecko because WebKit will have that in here anyway
var webkit = navigator.userAgent.indexOf('WebKit') > 0 || navigator.userAgent.indexOf('Firefox') > 0;


function setupDrawboard() {
var canvas = document.getElementById("artwork-canvas");
var ctx = canvas.getContext('2d');

	var haval = $("input[type=hidden][name=painting]");
	if(haval.length) {
		dds = new Image();
		dds.src = "data:image/png;base64," + haval.val();
		dds.onload = function() {
		    ctx.drawImage(dds,0,0);
		};
	}

var undoCanvas = document.getElementById('artwork-canvas-undo');
var undoCtx = undoCanvas.getContext('2d');
var redoCanvas = document.getElementById('artwork-canvas-redo');
var redoCtx = redoCanvas.getContext('2d');
undoCanvas.width = 320; undoCanvas.height = 120; 
redoCanvas.width = 320; redoCanvas.height = 120; 
canvas.width = 320; canvas.height = 120; 
var mousePosOld = 0;
var artworkTool = {type: 0, size: 1};
var sizeSmall = 1;
var sizeMedium = 2;
var sizeLarge = 4;
var artworkColor = "#000000";
var artworkZoomFactor = 1;
function getMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
if(evt.type == 'touchmove') {
	var clientX = evt.touches[0].clientX;
	var clientY = evt.touches[0].clientY;
} else {
var clientX = evt.clientX;
var clientY = evt.clientY;
}
  return {
		x: (clientX - rect.left) / artworkZoomFactor,
		y: (clientY - rect.top) / artworkZoomFactor
  };
}
function drawLineNoAliasing(ctx, sx, sy, tx, ty) {
    var dist = Math.sqrt((tx-sx)*(tx-sx)+(ty-sy)*(ty-sy));
		var ang = Math.atan((ty-sy)/((tx-sx)==0?0.01:(tx-sx)))+((tx-sx)<0?Math.PI:0);
    for(var i=0;i<dist;i++) {
        ctx.fillRect(Math.round(sx + Math.cos(ang)*i),
                     Math.round(sy + Math.sin(ang)*i),
                     artworkTool.size, artworkTool.size);
    }
}
function artworkUpdate(evt) {
	//console.log('artworkUpdate()');
	var mousePos = getMousePos(evt);
	if(artworkTool.type < 2) {
	if(mousePosOld == 0) mousePosOld = mousePos;
	if(evt.which == 1 || evt.type == 'touchmove') {
		if(artworkTool.type == 0) {
			ctx.fillStyle = artworkColor;
		} else {
    	ctx.fillStyle = "#fff";
    }
  	drawLineNoAliasing(ctx, mousePosOld.x,mousePosOld.y,mousePos.x,mousePos.y);
  }
	mousePosOld = mousePos;
	}
}
function artworkDrawOnce(evt) {
	//console.log('artworkDrawOnce()');
	var mousePos = getMousePos(evt);
	if(artworkTool.type < 2) {
	if(evt.which == 1) {
		if(artworkTool.type == 0) {
			ctx.fillStyle = artworkColor;
		} else {
    	ctx.fillStyle = "#fff";
    }
		ctx.fillRect(Math.round(mousePos.x), Math.round(mousePos.y), artworkTool.size, artworkTool.size);
  }
	} else {
  	ctx.fillStyle = artworkColor;
    ctx.fillFlood(mousePos.x, mousePos.y, 0);
  }
}
function artworkClear() {
doTheThing();
	//console.log('artworkClear()');

artworkUndoDown();
	//console.log('artworkUndoDown()');
ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, 320, 120);
}
function artworkUndoDown() {
undoCtx.drawImage(canvas, 0, 0);
}
function artworkUndo() {
redoCtx.drawImage(canvas, 0, 0);
ctx.drawImage(undoCanvas, 0, 0);
undoCtx.drawImage(redoCanvas, 0, 0);
}
function artworkToolUpdate() {
	//console.log('artworkToolUpdate()');
	if($(this).hasClass('artwork-eraser')) {
		var toolType = 1;
	} else if($(this).hasClass('artwork-fill')) {
		var toolType = 2;
	} else {
		var toolType = 0;
	}
	if($(this).hasClass('selected')) {
		if($(this).hasClass('small')) {
			artworkTool = {type: toolType, size: sizeMedium};
			$(this).removeClass('small');
			$(this).addClass('medium');
		} else if ($(this).hasClass('medium')) {
artworkTool = {type: toolType, size: sizeLarge};
$(this).removeClass('medium');
$(this).addClass('large');
} else if ($(this).hasClass('large')) {
artworkTool = {type: toolType, size: sizeSmall};
$(this).removeClass('large');
$(this).addClass('small');
} else {
artworkTool = {type: toolType};
}
} else {
$('.memo-buttons button').removeClass('selected');
$(this).addClass('selected');
if($(this).hasClass('small')) {
artworkTool = {type: toolType, size: sizeSmall};
} else if ($(this).hasClass('medium')) {
artworkTool = {type: toolType, size: sizeMedium};
} else if ($(this).hasClass('large')) {
artworkTool = {type: toolType, size: sizeLarge};
} else {
artworkTool = {type: toolType};
}
}
}
function artworkZoomUpdate(evt) {
	//console.log('artworkZoomUpdate()');
	if(artworkZoomFactor == 1) {
  	artworkZoomFactor = 2;
		$('#artwork-canvas').css('width', '640px');
  } else if(artworkZoomFactor == 2) {
  	artworkZoomFactor = 4;
		$('#artwork-canvas').css('width', '1280px');
		$(this).addClass('out');
  } else {
  	artworkZoomFactor = 1;
		$('#artwork-canvas').css('width', '320px');
		$(this).removeClass('out');
  }
}
artworkClear();
$(document).on('mousemove', artworkUpdate);
$(document).on('touchstart', function(){
	mousePosOld = 0;
});
$(document).on('touchmove', artworkUpdate);
$('#artwork-canvas').on('mousedown', artworkDrawOnce);
$('#artwork-canvas').on('mousedown', artworkUndoDown);
$('button').contextmenu(function() { $(this).click(); return false });
$('.artwork-clear').click(artworkClear);
$('.artwork-undo').click(artworkUndo);
$('.artwork-pencil, .artwork-eraser, .artwork-fill').click(artworkToolUpdate);
$(".artwork-color").spectrum({
    color: "#000000",
		preferredFormat: "hex",
    showInput: true,
    showPalette: true,
    change: function(color) {
        artworkColor = color;
    },
    palette: [["#000000", "#808080"], ["#ff0000",
        "#804000"], ["#ff8000", "#c08000"], ["#ffff00",
        "#fff8dc"], ["#00c700", "#008000"], ["#00ffff",
        "#00a0a0"], ["#0000ff", "#0080ff"], ["#ff00ff",
        "#800080"]]
});
$('.artwork-zoom').click(artworkZoomUpdate);
function doTheThing(){
var canvas = document.getElementById("artwork-canvas");
var ctx = canvas.getContext('2d');
  //console.log('doing the thing');
	var pixelArray = [];
	for(var i = 0; i < canvas.clientHeight; i++) {
		pixelArray[i] = [];
		for(var j = 0; j < canvas.clientWidth; j++) {
			var data = ctx.getImageData(j, i, 1, 1).data;
			if(data[0] + data[1] + data[2] < 382) {
				pixelArray[i].push(0);
      } else {
				pixelArray[i].push(1);
      }
		}
	}
}
$('.memo-finish-btn').on('click',function(){
	var dataURL = canvas.toDataURL();
        if(typeof dataURL !== undefined) {
			var img = dataURL.split(",")[1];
        //$("input[type=hidden][name=painting]").val(b.Closed.chksum(img) + img);
		$("input[type=hidden][name=painting]").val(img);
		}
	$("#drawing").remove();
	$(".textarea-memo").append("<img id=\"drawing\" src=\"" + dataURL + "\" style=\"background:white;\"></img>");
	$("#memo-drawboard-page button").off('click');
	$('body').css('overflow', '');
});
}
var fixe = false;
function openDrawboardModal() {
		if(innerWidth <= 800) {
			fixe = true;
		}
			var g = new Olv.ModalWindow($('#memo-drawboard-page'));g.open();
		//fixe = false;
		return true;
}
function setupPostForm2() {
            var letters = ["a", "b", "c", "d", "e"]; // lazy as fuck but who cares lol
            $("label.textarea-menu-memo > input").on("click", function(e) {
				if (openDrawboardModal()) {
                    var menu = $("div.textarea-with-menu");
                    var memo = $("div.textarea-memo");
                    var text = $("div.textarea-container");
                    var poll = $("div.textarea-poll");
                    if (menu.hasClass("active-text") || menu.hasClass("active-poll")) {
                        menu.removeClass("active-text");
                        menu.removeClass("active-poll");
                        menu.addClass("active-memo");
                        memo.removeClass("none");
                        text.addClass("none");
                        poll.addClass("none");
                    }
                    Olv.Form.toggleDisabled($("input.post-button"), false);

                    setupDrawboard();
                }
            });
            
$("label.textarea-menu-text").on("click", switchtext);

//$("label.textarea-menu-poll").on("click", switchpoll);

//$('button.add-option').on('click', addOption);
//$('button.delete').on('click', deleteOption);

$(".post-button").on("click", switchtext);
function switchtext() {
var menu = $("div.textarea-with-menu");
menu.removeClass("active-memo");
menu.removeClass("active-poll");
menu.addClass("active-text");
$("div.textarea-container").removeClass("none");
$("div.textarea-memo").addClass("none");
$("div.textarea-poll").addClass("none");
$("textarea[name=body]").attr("data-required", "");
//Olv.EntryForm.setupFormStatus($("#post-form"), d);
}
/* 'Commented because it\'s broken'
function switchpoll() {
var menu = $("div.textarea-with-menu");
menu.removeClass("active-text");
menu.removeClass("active-memo");
menu.addClass("active-poll");
$("div.textarea-poll").removeClass("none");
$("div.textarea-container").removeClass("none");
$("div.textarea-memo").addClass("none");
$("textarea[name=body]").removeAttr("data-required");
Olv.EntryForm.setupFormStatus($("#post-form"), d);
}
function addOption() {
    var options = $(".option").length;
	// lol it's Nintendo Switch
	switch(options) {
		case 2:
			$(this).before('<button type="button" class="delete" option="option-c"></button><input type="text" class="url-form option" name="option-c" placeholder="Option C" maxlength="64" data-required>');
			$(".delete").removeClass("none");
		break;
		case 3:
			$(this).before('<button type="button" class="delete" option="option-d"></button><input type="text" class="url-form option" name="option-d" placeholder="Option D" maxlength="64" data-required>');
		break;
		case 4:
			$(this).before('<button type="button" class="delete" option="option-e"></button><input type="text" class="url-form option" name="option-e" placeholder="Option E" maxlength="64" data-required>');
			$(this).attr("disabled", "true");
		break;
		default:
			$('.textarea-poll').html('<button type="button" class="delete" option="option-a"></button><input type="text" class="url-form option" name="option-a" placeholder="Option A" maxlength="64" data-required><button type="button" class="delete" option="option-b"></button><input type="text" class="url-form option" name="option-b" placeholder="Option B" maxlength="64" data-required><button type="button" class="delete" option="option-c"></button><input type="text" class="url-form option" name="option-c" placeholder="Option C" maxlength="64" data-required><button type="button" class="button symbol add-option">Add Option</button>');
			$("button.add-option").on("click", addOption);
		break;
	}
    $("button.delete").off("click");
    $("button.delete").on("click", deleteOption);
    Olv.EntryForm.setupFormStatus($("#post-form"), d);
}
function deleteOption() {
    var options = $(".option").length;
    if(options == 5 || options == 4) {
        $(".add-option").removeAttr("disabled");
        $(".option[name=" + $(this).attr("option") + "]").remove();
        $(this).remove();
        for(var i = 0; i < options - 1; i++) {
            $(".option").eq(i).attr("name", "option-" + letters[i]);
            $(".option").eq(i).attr("placeholder", "Option " + letters[i].toUpperCase());
            $(".delete").eq(i).attr("option", "option-" + letters[i]);
        }
    } else if(options == 3) {
        $(".option[name=" + $(this).attr("option") + "]").remove();
        $(this).remove();
        for(var i = 0; i < options - 1; i++) {
            $(".option").eq(i).attr("name", "option-" + letters[i]);
            $(".option").eq(i).attr("placeholder", "Option " + letters[i].toUpperCase());
            $(".delete").not(this).eq(i).attr("option", "option-" + letters[i]);
        }
        $(".delete").addClass("none");
    } else {
        $('.textarea-poll').html('<button type="button" class="delete none" option="option-a"></button><input type="text" class="url-form option" name="option-a" placeholder="Option A" maxlength="64" data-required><button type="button" class="delete none" option="option-b"></button><input type="text" class="url-form option" name="option-b" placeholder="Option B" maxlength="64" data-required><button type="button" class="button symbol add-option">Add Option</button>');
        $("button.add-option").on("click", addOption);
        $("button.delete").on("click", deleteOption);
    }
    Olv.EntryForm.setupFormStatus($("#post-form"), d);
}
*/
}
//!© Nintendo/Hatena 2012-2017 copyright@hatena.com
var Olv = Olv || {};
(function(a, b) {
    b.init || (b.init = a.Deferred(function() {
        a(this.resolve)
    }).promise(),
    b.Router = function() {
        this.routes = [],
        this.guard = a.Deferred()
    }
    ,
    a.extend(b.Router.prototype, {
        connect: function(a, b) {
            a instanceof RegExp || (a = new RegExp(a)),
            this.routes.push([a, b])
        },
        dispatch: function(b) {
            a("#global-menu-list > ul > li.selected").removeClass("selected");
			this.guard.resolve(b),
            this.guard = a.Deferred();
            for (var c, d = b.pathname, e = 0; c = this.routes[e]; e++) {
                var f = d.match(c[0]);
                f && c[1].call(this, f, b, this.guard.promise())
            }
        }
    }),
    b.router = new b.Router,
    a(document).on("pjax:end", function(c, d) {
        a(document).trigger("olv:pagechange", [d]),
        b.router.dispatch(location)
    }),
    b.init.done(function() {
        b.init.done(function() {
            b.router.dispatch(location)
        })
    }),
    b.Locale = {
        Data: {},
        text: function(a) {
            var c = Array.prototype.slice.call(arguments);
            return c.splice(1, 0, -1),
            b.Locale.textN.apply(this, c)
        },
        textN: function(a, c) {
            //if (b.Cookie.get("plain_msgid"))
            //    return a;
            c = +c || 0;
            var d = b.Locale.Data[a];
            if (!d)
                return a;
            var e, f, g = d.quanttype || "o", h = "1_o" === g && 1 === c || "01_o" === g && (0 === c || 1 === c);
            if (h ? (e = d.text_value_1 || d.value_1,
            f = d.text_args_1 || d.args_1) : (e = d.text_value || d.value,
            f = d.text_args || d.args),
            !f)
                return e;
            var i = Array.prototype.slice.call(arguments, 2)
              , j = 0;
            return e.replace(/%s/g, function() {
                return i[f[j++] - 1]
            })
        }
    },
    b.loc = b.Locale.text,
    b.loc_n = b.Locale.textN,
    b.print = function(a) {
        "undefined" != typeof console && console.log(a)
    }
    ,
    b.deferredAlert = function(b) {
        var c = a.Deferred();
        return setTimeout(function() {
            alert(b),
            c.resolve()
        }, 0),
        c.promise()
    }
    ,
    b.deferredConfirm = function(b) {
        var c = a.Deferred();
        return setTimeout(function() {
            var a = confirm(b);
            c.resolve(a)
        }, 0),
        c.promise()
    }
    ,
	b.Closed = {
		blank: /^[\s\u00A0\u3000]*$/,
		open_spinner: '<span class=open-spin></span>',
		lights: function() {
			$('#darkness').prop('disabled',function(a,b){return !b})
			Olv.Form.get('/lights')
		},
		prlinkConf: function() {
			$('#container').prepend('<div class="dialog linkc none"><div class=dialog-inner><div class=window><h1 class=window-title>Confirm link</h1><div class=window-body><p class=window-body-content>Are you sure you want to visit <b>'+ass+'</b>?</p><div class=form-buttons><button class="olv-modal-close-button gray-button" type=button data-event-type=ok onclick="$(\'.linkc\').remove()">No</button><button class="olv-modal-close-button black-button" type=button onclick="Olv.Net.lo(\''+ass+'\');$(\'.linkc\').remove()">Yes</button></div></div></div></div></div>');
			var g = new Olv.ModalWindow($('.linkc'));g.open();
		},
		changesel: function(a) {
			$("li#global-menu-" + a).addClass("selected");
		}
		/*,
		chksum: function(r) {
			for(var e=0,t=new Array(256),a=0;256!=a;++a)e=1&(e=1&(e=1&(e=1&(e=1&(e=1&(e=1&(e=1&(e=a)?-306674912^e>>>1:e>>>1)?-306674912^e>>>1:e>>>1)?-306674912^e>>>1:e>>>1)?-306674912^e>>>1:e>>>1)?-306674912^e>>>1:e>>>1)?-306674912^e>>>1:e>>>1)?-306674912^e>>>1:e>>>1)?-306674912^e>>>1:e>>>1,t[a]=e;for(var o,c="undefined"!=typeof Int32Array?new Int32Array(t):t,f=-1^0,A=0,d=r.length;A<d;)(e=r.charCodeAt(A++))<128?f=f>>>8^c[255&(f^e)]:e<2048?f=(f=f>>>8^c[255&(f^(192|e>>6&31))])>>>8^c[255&(f^(128|63&e))]:e>=55296&&e<57344?(e=64+(1023&e),o=1023&r.charCodeAt(A++),f=(f=(f=(f=f>>>8^c[255&(f^(240|e>>8&7))])>>>8^c[255&(f^(128|e>>2&63))])>>>8^c[255&(f^(128|o>>6&15|(3&e)<<4))])>>>8^c[255&(f^(128|63&o))]):f=(f=(f=f>>>8^c[255&(f^(224|e>>12&15))])>>>8^c[255&(f^(128|e>>6&63))])>>>8^c[255&(f^(128|63&e))];
			return (-1^f) + '----/'
		}
		*/
	},
    b.Net = {
        ajax: function(c) {
            var d = a.ajax(c)
              , e = b.Net._pageId
              , f = d.then(function(c, d, f) {
                var g = b.Net._pageId === e
                  /*, h = c && "object" == typeof c && !c.success || !g*/
                  , i = [c, d, f, g];
                return a.Deferred().resolveWith(this, i)
            }, function(c, d) {
                var f = b.Net.getDataFromXHR(c);
                void 0 === f && (f = c.responseText);
                var g = b.Net._pageId === e;
                return a.Deferred().rejectWith(this, [f, d, c, g])
            });
            return f.fail(b.Net.errorFeedbackHandler),
            f.promise(d),
            d
        },
        _pageId: 1,
        getDataFromXHR: function(b) {
            var c = b.responseText
              , d = b.getResponseHeader("Content-Type");
            if (c && d && /^application\/json(?:;|$)/.test(d))
                try {
                    return a.parseJSON(c)
                } catch (e) {}
            return void 0
        },
        getErrorFromXHR: function(a) {
            var c = b.Net.getDataFromXHR(a)
              , d = c && c.errors && c.errors[0];
            if (d && "object" == typeof d)
                return d;
            var e = a.status;
			if((!('responseText' in a) || a.responseText.length < 2) && e == 400) {
			return {
				error_code: "Bad Request",
				message: "The request or action sent was invalid. Try again?"
				}
			}
			switch(e) {
			case 404:
				return {
				error_code: "Not Found",
				message: "The resource or action couldn't be found.\n"
				}
			break;
			case 403:
				return {
				error_code: "Not Allowed (Forbidden)",
				message: "Try refreshing the page or logging back in.\n"
				}
			break;
			case 500:
				errmsg = "An error has been encountered in the server.\n";
				if(a.getResponseHeader('Content-Type').indexOf('html') < 0) {
					errmsg += "Error information is available; please send this to an administrator:\n";
					if(innerWidth <= 480) {
						errmsg += a.responseText.substr(0, 400);
					} else {
						errmsg += a.responseText.substr(0, 1000);
					}
				}
				return {
				error_code: "Internal server error",
				message: errmsg
				}
			break;
			case 503:
				return {
				error_code: "Service temporarily unavailable",
				message: "Unfortunately, it's down now. Come back later, or try reloading for now.\n"
				}
			break;
			case 420:
				return {
				error_code: "Service is probably down",
				message: "You've just recieved an error code that's usually recieved after a shutdown or some kind of service downage. So, don't refresh!\n"
				}
			break;
			case 502:
				return {
				error_code: "Bad gateway",
				message: "There's an issue with the application server right now. Wait for it to come back later, and inform an admin about this (because they probably don't do and therefore cannot fix it).\n"
				}
			break;
			case 521:
				return {
				error_code: "Web server is down",
				message: "Oops, something has probably gone terminally wrong. Come back later?\n"
				}
			break;
			default:
			return e ? 500 > e ? {
                error_code: e,
                message: b.loc("olv.portal.error.failed_to_connect.for_offdevice")
            } : {
                error_code: 1219999,
                message: b.loc("olv.portal.error.500.for_offdevice")
            } : {
                error_code: "Connection error",
                message: "Couldn't connect to the server, try again later."
            }
			break;
			}
			
        },
        _isLeavingPage: !1,
        willLeavePage: function() {
            b.Net._isLeavingPage = !0,
            setTimeout(function() {
                b.Net._isLeavingPage = !1
            }, 100)
        },
        errorFeedbackHandler: function(a, c, d, e) {
            if ("abort" !== c && e && (d.status || !b.Net._isLeavingPage)) {
                var f = this
                  , g = arguments;
                setTimeout(function() {
                    b.Net._errorFeedbackHandler.apply(f, g)
                }, d.status ? 0 : 1507)
            }
        },
        _errorFeedbackHandler: function(c, d, e, f) {
            var g = b.Net.getErrorFromXHR(e);
            this.silent || b.ErrorViewer.open(g),
            a(document).trigger("olv:ajax:error", [g, d, e])
        },
        get: function(a, c, d, e) {
            return b.Net.ajax({
                method: "GET",
                url: a,
                data: c,
                success: d,
                dataType: e,
				beforeSend:function(){NProgress.start()},complete:function(){NProgress.done()}
            })
        },
        post: function(a, c, d, e) {
            return b.Net.ajax({
                method: "POST",
                url: a,
                data: c,
                success: d,
                dataType: e,
				beforeSend:function(){NProgress.start()},complete:function(){NProgress.done()}
            })
        },
		go: function(a) {
			$.pjax({url: a, container: pjax_container});
		},
		lo: function(cation) {
			location.href = cation;
		},
		reload: function() {
			$.pjax.reload(pjax_container);
		}
    },
    b.Browsing = {
        setup: function() {
            a(document).on("click", "[data-href]", this.onDataHrefClick),
            a(window).on("click submit", this.onMayLeavePage)
        },
        onDataHrefClick: function(c) {
			if (a(c.target).attr("data-href")) {
                b.Net.go($(this).attr("data-href"));
			}
            if (!c.isDefaultPrevented() && !a(c.target).closest("a,button").length) {
                var d = a(this);
                if (!d.hasClass("disabled")) {
                    var e = d.attr("data-href");
                    b.Net.go(e);
                }
            }
        },
        onMayLeavePage: function(c) {
            c.isDefaultPrevented() || "click" === c.type && !a(c.target).closest("[href]").length || b.Net.willLeavePage()
        }
    },
    b.init.done(function() {
        b.Browsing.setup()
    }),
    b.Utils = {},
    b.Utils.toJSONString = "undefined" != typeof JSON ? JSON.stringify : function() {
        function a(a) {
            return "\\u" + (65536 + a.charCodeAt(0)).toString(16).substring(1)
        }
        function b(c) {
            switch (typeof c) {
            case "string":
                return '"' + c.replace(/[\u0000-\u001f\"\\\u2028\u2029]/g, a) + '"';
            case "number":
            case "boolean":
                return "" + c;
            case "object":
                if (!c)
                    return "null";
                var d = Object.prototype.toString.call(c).slice(8, -1);
                switch (d) {
                case "String":
                case "Number":
                case "Boolean":
                    return b(c.valueOf());
                case "Array":
                    for (var e = [], f = 0; f < c.length; f++)
                        e.push(b(c[f]));
                    return "[" + e.join(",") + "]";
                case "Object":
                    var e = [];
                    for (var f in c)
                        c.hasOwnProperty(f) && e.push(b(f) + ":" + b(c[f]));
                    return "{" + e.join(",") + "}"
                }
                return "null"
            }
            return "null"
        }
        return b
    }(),
    b.Utils._staticRoot = null,
    b.Utils.staticURL = function(c) {
        if (/^https?:/.test(c))
            return c;
        var d = b.Utils._staticRoot;
        return null === d && document.getElementById("main-body") && (d = b.Utils._staticRoot = (a("#main-body").attr("data-static-root") || "").replace(/\/$/, "")),
        (d || "") + c.replace(/^(?!\/)/, "/")
    }
    ,
    b.Utils.isIE8AndEarlierStyle = !!document.createStyleSheet && "undefined" == typeof document.documentElement.style.opacity,
    b.Utils.isIEStyle = !!window.TextRange,
    b.Utils.addPlatformClass = function() {
        var c = a(document.documentElement)
          , d = navigator.userAgent
          , e = /\bWin/.test(d) ? "win" : /\bMac/.test(d) ? "mac" : "other";
        c.addClass("os-" + e),
        b.Utils.isIE8AndEarlierStyle && c.addClass("ie8-earlier"),
        b.Utils.isIEStyle && c.addClass("ie")
    }
    ,
    b.Utils.addPlatformClass(),
    b.Utils.fixWebFontLoadTiming = function() {
        var a = document.createStyleSheet();
        a.cssText = ":before, :after { content: none !important; }",
        setTimeout(function() {
            var b = a.owningElement;
            b.parentNode.removeChild(b)
        }, 20)
    }
    ,
    b.Utils.isIE8AndEarlierStyle && b.init.done(b.Utils.fixWebFontLoadTiming),
    b.Utils.triggerHandlers = {
        keypress: function(b) {
            13 !== b.which || b.isDefaultPrevented() || (b.preventDefault(),
            a(this).click())
        },
        mouseup: function(a) {
            this.blur()
        }
    },
    b.init.done(function(a) {
        a(document).on(b.Utils.triggerHandlers, ".trigger")
    }),
    b.Content = {},
    b.Content.autopagerize = function(c, d) {
        function e() {
            if (!(k._disabledCount || h.scrollTop() + h.height() + 200 < f.offset().top + f.outerHeight())) {
                var d = a("<div/>").attr("class", "post-list-loading").append(a(b.Closed.open_spinner)).appendTo(f);
                i = a.ajax({
                    url: g,
                    headers: {
                        "X-AUTOPAGERIZE": !0
                    }
                }).done(function(b) {
                    var h = a("<div>" + b + "</div>").find(c);
                    g = h.attr("data-next-page-url") || "",
                    g || j.resolve(),
                    f.trigger("olv:autopagerize", [h, g, d]),
                    h.children().each(function() {
                        this.id && a("#" + this.id).length && a(this).detach()
                    }),
                    f.attr("data-next-page-url", g),
                    f.append(h.children()),
                    g && setTimeout(e, 0)
                }).always(function() {
                    d.remove(),
                    i = null
                }),
                k.disable(i)
            }
        }
        var f = a(c)
          , g = f.attr("data-next-page-url");
        if (g) {
            a("#main-body").addClass("is-autopagerized");
            var h = a(window)
              , i = null
              , j = a.Deferred()
              , k = b.Content.autopagerize;
            h.on("scroll", e),
            j.done(function() {
                h.off("scroll", e),
                i && i.abort(),
                a("#main-body").removeClass("is-autopagerized")
            }),
            setTimeout(e, 0),
            d.done(j.resolve)
        }
    }
    ,
    b.Content.autopagerize._disabledCount = 0,
    b.Content.autopagerize.disable = function(a) {
        var c = b.Content.autopagerize;
        c._disabledCount++,
        a.always(function() {
            c._disabledCount--
        })
    }
    ,
    b.Content.preloadImages = function() {
        for (var a = arguments.length, b = a; b--; ) {
            var c = document.createElement("img");
            c.src = arguments[b]
        }
    }
    ,
    b.Form = {
        toggleDisabled: function(c, d) {
            var e = void 0 === d;
            return c.each(function() {
                var c = a(this)
                  , f = e ? !b.Form.isDisabled(c) : d;
                if (c.toggleClass("disabled", f),
                "undefined" != typeof this.form)
                    c.prop("disabled", f);
                else {
                    var g = f ? "href" : "data-disabled-href"
                      , h = f ? "data-disabled-href" : "href"
                      , i = c.attr(g);
                    void 0 !== i && (c.removeAttr(g),
                    c.attr(h, i))
                }
            }),
            c
        },
        isDisabled: function(a) {
            return a.length && "undefined" != typeof a[0].form ? a.prop("disabled") : a.hasClass("disabled")
        },
        disable: function(a, c) {
            return b.Form.toggleDisabled(a, !0),
            c.always(function() {
                b.Form.toggleDisabled(a, !1)
            }),
            a
        },
        disableSoon: function(a, c) {
            return setTimeout(function() {
                "pending" === c.state() && b.Form.toggleDisabled(a, !0)
            }, 0),
            c.always(function() {
                b.Form.toggleDisabled(a, !1)
            }),
            a
        },
        emulateInputEvent: function(b, c) {
            if (b.length && "undefined" == typeof b[0].oninput) {
                var d = a.map(b, function(a) {
                    return a.value
                })
                  , e = setInterval(function() {
                    for (var c = 0, e = b.length; e > c; c++) {
                        var f = b[c].value;
                        f !== d[c] && (d[c] = f,
                        a(b[c]).trigger("input"))
                    }
                }, 100);
                c.always(function() {
                    clearInterval(e)
                })
            }
        },
        submit: function(b, c) {
            b.trigger("olv:form:submit", [c || a()]);
				if(a('input[type=file]').length) {
					var d = new FormData(b[0])
					d.append('screen', $('input[type=file]')[0].files[0])
					sucky = true
				} else {
					var d = b.serializeArray()
					sucky = false
				}
			var e = c && c.is("input, button") && c.prop("name");
            e && d.push({
                name: e,
                value: c.val()
            });
            var f = {
                method: b.prop("method"),
                url: b.attr("action"),
                data: d
            };
			if(sucky) {
				f.processData = false;
				f.contentType = false;
			}
            return this.send(f, c)
        },
        get: function(a, b, c) {
            var d = {
                method: "GET",
                url: a,
                data: b
            };
            return this.send(d, c)
        },
        _csrfmiddlewaretoken: null,
        csrfmiddlewaretoken: function() {
            return null === b.Form._csrfmiddlewaretoken && (b.Form._csrfmiddlewaretoken = a("#main-body").attr("csrf-token")),
            b.Form._csrfmiddlewaretoken
        },
		csrftoken: function(a) {
			a.csrfmiddlewaretoken = b.Form.csrfmiddlewaretoken()
			return a
		},
        post: function(c, d, e) {
            d || (d = {}),
            a.isArray(d) ? d.push({
                name: "csrfmiddlewaretoken",
                value: b.Form.csrfmiddlewaretoken()
            }) : d.csrfmiddlewaretoken = b.Form.csrfmiddlewaretoken();
            var f = {
                method: "POST",
                url: c,
                data: d
            };
            return this.send(f, e)
        },
        send: function(c, d) {
            var e = b.Net.ajax(c);
            return a(document).trigger("olv:form:send", [e, c, d || a()]),
            d && (b.Form.disableSoon(d, e),
            d.addClass("loading"),
            e.always(function() {
                d.removeClass("loading")
            })),
            e
        },
        updateParentClass: function(c) {
            switch (c.type) {
            case "radio":
                var d = a(c.form ? c.form.elements[c.name] : 'input[name="' + c.name + '"]');
                d.each(function() {
                    a(this).parent().toggleClass("checked", this.checked)
                }),
                b.Utils.isIE8AndEarlierStyle && d.parent().addClass("changing").removeClass("changing");
                break;
            case "checkbox":
                a(c).parent().toggleClass("checked", c.checked)
            }
        },
        setup: function() {
            a(document).on("click", "input", function(a) {
                a.isDefaultPrevented() || b.Form.updateParentClass(this)
            })
        },
        setupForPage: function() {
            a("input:checked").each(function() {
                b.Form.updateParentClass(this)
            })
        },
        reset: function(c) {
            c.each(function() {
                this.reset(),
                a(this).find("input").each(function() {
                    b.Form.updateParentClass(this)
                })
            })
        },
        validateValueLength: function(b) {
            var c = a(this);
            c.find("[minlength], [maxlength]").each(function() {
                var c = a(this)
                  , d = +c.attr("minlength");
                isNaN(d) && (d = -(1 / 0));
                var e = +c.attr("maxlength");
                isNaN(e) && (e = 1 / 0);
                var f = c.val();
                return f.length >= d && f.length <= e ? void 0 : void b.preventDefault()
            })
        }
    },
    b.init.done(b.Form.setup),
    b.router.connect("", b.Form.setupForPage),
    b.Guest = {
        isGuest: function() {
            return a("main-body").hasClass("guest")
        }
    },
    b.DecreasingTimer = function(a, b, c) {
        this.callback_ = a,
        this.initialInterval_ = b || 1e4,
        this.maxInterval_ = c || 1 / 0,
        this.interval_ = this.initialInterval_,
        this.timeouts_ = []
    }
    ,
    b.DecreasingTimer.prototype.resetInterval = function() {
        this.interval_ = this.initialInterval_,
        this.clearAllTimeouts(),
        this.invoke()
    }
    ,
    b.DecreasingTimer.prototype.clearAllTimeouts = function() {
        a(this.timeouts_).each(a.proxy(function(a, b) {
            this.clearTimeout(b)
        }, this))
    }
    ,
    b.DecreasingTimer.prototype.clearTimeout = function(a) {
        for (var b = 0, c = this.timeouts_.length; c > b; ++b)
            if (this.timeouts_[b] == a) {
                clearTimeout(this.timeouts_[b]),
                this.timeouts_.splice(b, 1);
                break
            }
    }
    ,
    b.DecreasingTimer.prototype.invoke = function() {
        this.callback_();
        var b;
        b = setTimeout(a.proxy(function() {
            this.invoke(),
            this.clearTimeout(b)
        }, this), this.interval_),
        this.timeouts_.push(b),
        this.interval_ = Math.min(Math.floor(1.5 * this.interval_), this.maxInterval_)
    }
    ,
    b.UpdateChecker = function(a, c) {
        this._settings = {},
        b.DecreasingTimer.call(this, this.callback_, a, c)
    }
    ,
    b.UpdateChecker.prototype = new b.DecreasingTimer,
    b.UpdateChecker.getInstance = function() {
        return void 0 == b.UpdateChecker.instance && (b.UpdateChecker.instance = new b.UpdateChecker(2e4,18e5)),
        b.UpdateChecker.instance
    }
    ,
    b.UpdateChecker.prototype.callback_ = function() {
		
        var c = {};
        a.each(this._settings, a.proxy(function(d) {
            void 0 != this._settings[d].pathname && this._settings[d].pathname != location.pathname ? delete this._settings[d] : a.each(this._settings[d].params, a.proxy(function(a, d) {
                c[a] = b.Utils.toJSONString(d)
            }, this))
        }, this)),
        b.Net.ajax({
            url: "/alive",
            silent: !0,
            cache: !1
        }).done(a.proxy(function(b) {
            a(this).triggerHandler("update", [b])
        }, this))
		
    }
    ,
    b.UpdateChecker.prototype.onUpdate = function(a, b, c, d) {
        this._settings[a] = {
            params: b,
            update: c
        },
        d && (this._settings[a].pathname = location.pathname)
    }
    ,
    b.OpenTruncatedTextButton = {},
    b.OpenTruncatedTextButton.setup = function(b) {
        var c = a(b);
        c.on("click", ".js-open-truncated-text-button", function(a) {
            a.preventDefault(),
            c.find(".js-truncated-text, .js-open-truncated-text-button").addClass("none"),
            c.find(".js-full-text").removeClass("none")
        })
    }
    ,
    b.ModalWindowManager = {},
    b.ModalWindowManager._windows = [],
    b.ModalWindowManager.currentWindow = null,
    b.ModalWindowManager.closeAll = function() {
		//b.ModalWindowManager._windows = [];
		
        for (; this.currentWindow; )
            this.currentWindow.close()
		
    }
    ,
    b.ModalWindowManager.closeUntil = function(a) {
        if (a.guard)
            for (var b; (b = this.currentWindow) && (b.close(),
            b !== a); )
                ;
    }
    ,
    b.ModalWindowManager.register = function(a) {
        var b = this._windows;
        b.length ? b[b.length - 1].element.removeClass("active-dialog") : this.toggleMask(!0),
        a.element.addClass("active-dialog"),
        b.push(a),
        this.currentWindow = a
    }
    ,
    b.ModalWindowManager.unregister = function(a) {
        if (this.currentWindow !== a)
            throw new Error("Failed to unregister modal window");
        var b = this._windows;
        b.pop().element.removeClass("active-dialog");
        var c = b.length ? b[b.length - 1] : null;
        c ? c.element.addClass("active-dialog") : this.toggleMask(!1),
        this.currentWindow = c
    }
    ,
    b.ModalWindowManager._mask = null,
    b.ModalWindowManager.toggleMask = function(b) {
		 if(a(".mask").length) {
					a('body').css('position', '');
           a(".mask").remove();
         } else {
			    if(fixe) {
					a('body').css('position', 'fixed');
				}
           a("#main-body").append("<div class=mask>");
         }
    }
    ,
    b.ModalWindowManager.setup = function() {
        a(document).on("click", "[data-modal-open]", function(c) {
            var d = a(this);
            if (!b.Form.isDisabled(d) && !c.isDefaultPrevented()) {
                c.preventDefault();
                var e = a.Event("olv:modalopen");
                if (d.trigger(e),
                !e.isDefaultPrevented()) {
                    var f = a(d.attr("data-modal-open"));
                    f.attr("data-is-template") && (f = f.clone().removeAttr("id"));
                    var g = new b.ModalWindow(f,this);
                    g.open()
                }
            }
        }),
        a(document).on("click", ".olv-modal-close-button", function(a) {
            if (!a.isDefaultPrevented()) {
                a.preventDefault();
                var c = b.ModalWindowManager.currentWindow;
                c && c.close()
            }
        }),
        a(document).on("olv:modal", function(a, c, d) {
            b.Content.autopagerize.disable(d)
        })
    }
    ,
    b.init.done(function() {
        b.ModalWindowManager.setup()
    }),
    a(document).on("olv:pagechange", function() {
        b.ModalWindowManager.closeAll();
    }),
    b.ModalWindow = function(b, c) {
        this.element = a(b),
        this.triggerElement = a(c),
        this.temporary = !this.element.parent().length;
        var d = a.trim(this.element.attr("data-modal-types"));
        this.types = d ? d.split(/\s+/) : [],
        this.guard = null
    }
    ,
    b.ModalWindow.prototype.open = function() {
        return this.guard ? void 0 : (document.activeElement && document.activeElement.blur(),
        b.ModalWindowManager.register(this),
        b.Form.toggleDisabled(this.triggerElement, !0),
        this.element.addClass("modal-window-open").removeClass("none"),
        this.temporary && this.element.appendTo(document.getElementById("main-body")),
        this.triggerOpenHandlers(a.Deferred()),
        this)
    }
    ,
    b.ModalWindow.prototype.triggerOpenHandlers = function(a) {
        this.guard = a;
        for (var b, c = [this, a.promise()], d = 0; b = this.types[d]; d++)
            this.element.trigger("olv:modal:" + b, c);
        this.element.trigger("olv:modal", c)
    }
    ,
    b.ModalWindow.prototype.close = function() {
        return this.guard ? (this.guard.resolve(),
        this.guard = null,
        b.ModalWindowManager.unregister(this),
        this.temporary && this.element.remove(),
        this.element.addClass("none").removeClass("modal-window-open"),
        b.Form.toggleDisabled(this.triggerElement, !1),
        this) : void 0
    }
    ,
    b.SimpleDialog = {
        _element: null,
        element: function() {
            var b = this._element || (this._element = a("<div>", {
                "class": "dialog"
            }).append(a("<div>", {
                "class": "dialog-inner"
            }).append(a("<div>", {
                "class": "window"
            }).append(a("<h1>", {
                "class": "window-title"
            }), a("<div>", {
                "class": "window-body"
            }).append(a("<p>", {
                "class": "window-body-content"
            }), a("<div>", {
                "class": "form-buttons"
            }).append(a("<button>", {
                "class": "cancel-button gray-button",
                type: "button",
                "data-event-type": "cancel"
            }), a("<button>", {
                "class": "ok-button black-button",
                type: "button",
                "data-event-type": "ok"
            })))))));
            return b.clone()
        },
        htmlLineBreak: function(a) {
            var b = {
                "<": "&lt;",
                ">": "&gt",
                "&": "&amp;",
                '"': "&quot"
            };
            return a.replace(/[<>&\"]/g, function(a) {
                return b[a]
            }).replace(/\n|\r\n?/g, function(a) {
                return "<br>" + a
            })
        },
        create: function(c) {
            var d = this.element()
              , e = new b.ModalWindow(d)
              , f = a.trim(c.modalTypes || "");
            e.types = f ? f.split(/\s+/) : [],
            d.find(".window-title").text(c.title || "");
            var g = this.htmlLineBreak(c.body || "");
            d.find(".window-body-content").html(g),
            d.find(".ok-button").text(c.okLabel || b.loc("olv.portal.ok"));
            var h = d.find(".cancel-button");
            c.isConfirm ? h.text(c.cancelLabel || b.loc("olv.portal.cancel")) : h.detach();
            var i = a.Deferred()
              , j = {
                ok: !0,
                cancel: !1
            };
            return d.find("button").on("click", function(b) {
                if (!b.isDefaultPrevented()) {
                    b.preventDefault();
                    var c = a(this).attr("data-event-type")
                      , d = a.Event(c);
                    a(e).trigger(d),
                    d.isDefaultPrevented() || (e.close(),
                    i.resolveWith(e, [j[c]]))
                }
            }),
            i.promise(e),
            e
        },
        show: function(a) {
            var b = this.create(a);
            return b.open(),
            b.element.find(".ok-button")[0].focus(),
            b
        }
    },
    b.showMessage = function(c, d, e) {
        var f = a.extend({
            title: c,
            body: d
        }, e);
        return b.SimpleDialog.show(f)
    }
    ,
    b.showConfirm = function(c, d, e) {
        var f = a.extend({
            title: c,
            body: d,
            isConfirm: !0
        }, e);
        return b.SimpleDialog.show(f)
    }
    ,
    b.ErrorViewer = {
        open: function(a) {
            a = a || {};
			if(!(Number.isInteger(a.error_code))) {
			return b.showMessage(a.error_code, a.message);
			}
            
			var c = +a.error_code
              , d = a.message || a.msgid && b.loc(a.msgid);
            c || (c = 0,
            d = d || b.loc("olv.portal.error.500.for_offdevice"));
            // NOTE: This (OFFICIAL) regex is for ***-**** type errors
			var e = String(c).match(/^([0-9]{3})([0-9]{4})$/);
            e && (c = e[1] + "-" + e[2]);
			if(c == 0) {
			var f = 'Error';
			} else {
            var f = b.loc("olv.portal.error.code", c);
			}
            return b.showMessage(f, d || "")
        }
    },
    b.Entry = {},
	b.Entry.checkEvent = function(c) {
		// Non-WebKit browsers will probably fail this anyway
		if(!webkit) return true;
		var d = c.originalEvent;
		//console.log(d);
		// d.composed and d.isTrusted are indicators don't work on iOS 9 Safari
		// d.webkitForce and d.timestamp work on Safari only
		//console.log(d.detail, d.webkitForce, d.timestamp);
		if(d.clientX && d.clientY && d.pageX && d.pageY && d.screenX && d.screenY && d.which && d.detail) {
			return true;
		} else {
			return false;
		}
	},
    b.Entry.incrementReplyCount = function(b) {
        var c = a("div.post-meta div.reply");
        if (0 !== !c.length && void 0 != b && 0 != b) {
            var d = c.find(".reply-count")
              , e = +d.text() + b;
            d.text(e),
            a(".no-reply-content").toggleClass("none", 0 !== e)
        }
    }
    ,
    b.Entry.setupEditButtons = function(c) {
        function d(c) {
            var d = b.Form.post(c.action, {
                format: "html"
            }, c.button).done(function(b) {
                a("#main-body").replaceWith(a(a.parseHTML(b)).find("#main-body"))
            });
            return c.modal.element.trigger("olv:entry:post:delete", c),
            d
        }
        function e(c) {
            var d = b.Form.post(c.action, null, c.button).done(function() {
                var b = a("#post-content, #post-permalink-comments");
                c.option.prop("disabled", !0);
                var d = function() {
                    b.find(".spoiler-status").fadeIn(400, function() {
                        a(this).addClass("spoiler")
                    })
                };
                c.modal.guard.done(function() {
                    setTimeout(d, 0)
                })
            });
            return d
        }
        function f(a) {
            a.modal.close();
            var c = b.showConfirm(b.loc("olv.portal.profile_post"), b.loc("olv.portal.profile_post.confirm_update"), {
                okLabel: b.loc("olv.portal.profile_post.confirm_update.yes"),
                cancelLabel: b.loc("olv.portal.cancel")
            }).done(function(c) {
                if (c) {
                    var d = this;
                    d.element.find("button").prop("disabled", !0),
                    b.Form.post(a.action, null, a.button, !0).done(function() {
                        a.modal.triggerElement.trigger("olv:entry:profile-post:set"),
                        d.close(),
                        b.showConfirm(b.loc("olv.portal.profile_post"), b.loc("olv.portal.profile_post.done"), {
                            okLabel: b.loc("olv.portal.user.search.go"),
                            cancelLabel: b.loc("olv.portal.close")
                        }).done(function(a) {
                            a && (b.Net.go("/users/@me"))
                        })
                    })
                }
            });
            return c
        }
        function g(a, c, g) {
            function h() {
                var a = k.find(":selected");
                l.text(a.text());
                var c = a.attr("data-action");
                j.attr("action", c),
                b.Form.toggleDisabled(m, !c)
            }
            function i(a) {
                if (!b.Form.isDisabled(m) && !a.isDefaultPrevented()) {
                    a.preventDefault();
                    var g, h = {
                        action: j.attr("action"),
                        button: m,
                        modal: c,
                        option: k.find(":selected")
                    }, i = k.val();
                    g = "delete" == i ? d(h) : "painting-profile-post" === i || "screenshot-profile-post" === i ? f(h) : e(h),
                    g.always(function() {
                        c.close()
                    })
                }
            }
            var j = (c.triggerElement,
            c.element.find("form.edit-post-form"))
              , k = j.find('select[name="edit-type"]')
              , l = j.find("span.select-button-content")
              , m = j.find(".post-button");
            k.val(""),
            h(),
            k.on("change", h),
            m.on("click", i),
            g.done(function() {
                k.off("change", h),
                m.off("click", i)
            })
        }
        a(document).on("olv:modal:edit-post", g),
        c.done(function() {
            a(document).off("olv:modal:edit-post", g)
        })
    }
    ,
    b.Entry.setupMoreRepliesButtons = function(c) {
        function d(c) {
            c.preventDefault();
            var d = a(this);
            if (!f && !b.Form.isDisabled(d)) {
                var g = d.text();
                d.text("").append(a(b.Closed.open_spinner)),
                f = b.Form.get(d.attr("data-fragment-url"), null, d).done(function(b) {
                    var c = a(a.parseHTML(b));
                    if (d.hasClass("newest-replies-button") || d.hasClass("oldest-replies-button"))
                        return e.find(".more-button, .reply-list, .info-reply-list").remove(),
                        void e.append(c);
                    var f = c.filter(".reply-list").children().filter(function() {
                        return !a("#" + this.id).length
                    });
                    if (d.hasClass("all-replies-button") && (d.remove(),
                    e.find(".reply-list:not(.info-reply-list)").prepend(f)),
                    d.hasClass("newer-replies-button") || d.hasClass("older-replies-button")) {
                        var g = d.hasClass("newer-replies-button") ? "newer" : "older"
                          , h = c.filter("." + g + "-replies-button");
                        h.length ? d.replaceWith(h) : e.find(".more-button").remove(),
                        e.find(".reply-list:not(.info-reply-list)")["newer" == g ? "append" : "prepend"](f)
                    }
                }).always(function() {
                    d.text(g),
                    f = null
                }),
                d.trigger("olv:entry:reply:button")
            }
        }
        var e = a("#reply-content")
          , f = null;
        a(document).on("click", ".more-button", d),
        c.done(function() {
            a(document).off("click", ".more-button", d),
            f && f.abort()
        })
    }
    ,
    b.Entry.setupHiddenContents = function(h) {
        function c(b) {
            if (!b.isDefaultPrevented()) {
                b.preventDefault();
                var c = a(this)
                  , d = (!!c.closest(".post").length,
                c.closest(".hidden"));
                d.removeClass("hidden"),
                d.filter("[data-href-hidden]").add(d.find("[data-href-hidden]")).each(function() {
                    var b = a(this);
                    b.attr(b.is("a") ? "href" : "data-href", b.attr("data-href-hidden"))
                }),
                c.closest(".hidden-content").remove()
            }
        }
        a(document).on("click", ".hidden-content-button", c),
        h.done(function() {
            a(document).off("click", ".hidden-content-button", c)
        })
		a('.link-confirm').on('click', function(g) {
			ass = a(this).attr('href');
			g.preventDefault();
			b.Closed.prlinkConf();
		});
    }
    ,
    b.Entry.toggleEmpathy = function(a) {
        var c = b.Entry.isEmpathyAdded(a)
          , d = !c
          , e = a.attr("data-action");
        c && (e += "u"),
        a.trigger("olv:entry:empathy:toggle", [d]);
        var f = b.Form.post(e, null, a).done(function() {
            a.trigger("olv:entry:empathy:toggle:done", [d])
        }).fail(function() {
            a.trigger("olv:entry:empathy:toggle:fail", [c])
        });
        return f
    }
    ,
    b.Entry.isEmpathyAdded = function(a) {
        return a.hasClass("empathy-added")
    }
    ,
    b.Entry.onEmpathyClick = function(c) {
		if (b.Entry.checkEvent(c)) {
			if (!c.isDefaultPrevented()) {
				c.preventDefault();
				var d = a(this);
				b.Form.isDisabled(d) || b.Entry.toggleEmpathy(d)
			}
		}
    }
    ,
    b.Entry.onEmpathyToggle = function(c, d) {
        var e = a(this);
        e.toggleClass("empathy-added", d);
        var f = e.attr("data-feeling") || "normal";
        e.find(".yeah-button-text").text(b.loc("olv.portal.miitoo." + f + (d ? ".delete" : "")));
        var g;
        g = +e.attr("data-is-in-reply-list") ? e.closest(".reply-meta").find(".empathy-count") : e.closest(".post-meta").find(".empathy-count"),
        g.text(+g.text() + (d ? 1 : -1));
        var h = a(document).find("#js-my-empathy-count");
        if (h[0] && h.text(+h.text() + (d ? 1 : -1)),
        b.Utils.isIE8AndEarlierStyle) {
            var i = e.closest(".post-meta").find(".empathy");
            i.addClass("changing"),
            setTimeout(function() {
                i.removeClass("changing")
            }, 0)
        }
    }
    ,
    b.Entry.setupEmpathyButtons = function(c) {
        a(document).on("olv:entry:empathy:toggle olv:entry:empathy:toggle:fail", ".yeah-button", b.Entry.onEmpathyToggle),
        a(document).on("click", ".yeah-button", b.Entry.onEmpathyClick),
        c.done(function() {
            a(document).off("olv:entry:empathy:toggle olv:entry:empathy:toggle:fail", ".yeah-button", b.Entry.onEmpathyToggle),
            a(document).off("click", ".yeah-button", b.Entry.onEmpathyClick)
        })
    }
    ,
    b.Entry.setupPostEmpathyButton = function(c) {
        function d(c, d) {
            b.Entry.onEmpathyToggle.apply(this, arguments);
            var e = a(c.target);
            if (!+e.attr("data-is-in-reply-list")) {
                var f = a("#empathy-content")
                  , g = +e.closest(".post-meta").find(".empathy-count").text();
                f.find(".visitor").toggle(d),
                f.find(".extra").toggle(!d),
                f.toggleClass("none", 0 === g)
            }
        }
        a(document).on("olv:entry:empathy:toggle olv:entry:empathy:toggle:fail", ".yeah-button", d),
        a(document).on("click", ".yeah-button", b.Entry.onEmpathyClick),
        c.done(function() {
            a(document).off("click", ".yeah-button", b.Entry.onEmpathyClick),
            a(document).off("olv:entry:empathy:toggle olv:entry:empathy:toggle:fail", ".yeah-button", d)
        })
    }
    ,
    b.Entry.setupBodyLanguageSelector = function(b) {
        function c(b) {
            var c = a(b.target)
              , d = c.val();
            a("#body-language-" + d).toggleClass("none", !1).siblings(".multi-language-body").toggleClass("none", !0)
        }
        a(document).on("change", "#body-language-selector", c),
        b.done(function() {
            a(document).off("change", "#body-language-selector", c)
        })
    }
    ,
    b.Entry.setupMoreContentButton = function(c) {
        function d(b) {
            b.preventDefault();
            var c = a(b.target);
            c.prev().find(".wrapped").removeClass("none"),
            c.remove()
        }
        var e = a("#post-content.official-user.post-subtype-default .post-content-text");
        e && 0 != e.length && (e.each(function() {
            var c = a(this)
              , d = c.text().match(/([\s\S]+)(\n+---+\n[\s\S]+)/);
            if (d) {
                c.text(d[1]);
                var e = a('<span class="wrapped none"></span>').text(d[2]);
                c.append(e);
                var f = a('<a href="#" class="more-content-button"></a>');
                f.text(b.loc("olv.portal.read_more_content")),
                c.after(f)
            }
        }),
        a(document).on("click", ".more-content-button", d),
        c.done(function() {
            a(document).off("click", ".more-content-button", d)
        }))
    }
    ,
    a(document).on("olv:modal:report", function(a, c, d) {
        var e = c.element.find("form")
          , f = e.find(".post-button");
        f.on("click", function(a) {
            b.Form.isDisabled(f) || a.isDefaultPrevented() || (a.preventDefault(),
            b.Form.submit(e, f).done(function() {
                c.close(),
                c.triggerElement.trigger("olv:report:done");
                var a = e.attr("action");
                /\/violations$/.test(a) ? b.showMessage("", b.loc("olv.portal.dialog.report_violation_done")) : /\/violators$/.test(a) && b.showMessage("", b.loc("olv.portal.dialog.report_violation_done"))
            }))
        }),
        d.done(function() {
            f.off("click")
        })
    }),
    a(document).on("olv:modal:report-violator", function(a, c, d) {
        function e() {
            var a = !!f.val();
            g.css("display", a ? "" : "none"),
            b.Form.toggleDisabled(h, !a),
            "" == g.val() && g.val(" ").val("")
        }
        var f = c.element.find('select[name="type"]')
          , g = c.element.find('textarea[name="body"]')
          , h = c.element.find(".post-button");
        e(),
        f.on("change", e),
        d.done(function() {
            f.off("change", e)
        })
    }),
    a(document).on("olv:modal:report-violation", function(c, d, e) {
        function f() {
            var b = a(m[0].options[m[0].selectedIndex]);
            p.text(b.text());
            var c = !!m.val();
            n.css("display", c ? "" : "none")
        }
        function g() {
            var c = a(m[0].options[m[0].selectedIndex])
              , d = !!c.attr("data-body-required")
              , e = !!m.val()
              , f = d && /^\s*$/.test(n.val()) || !e;
            b.Form.toggleDisabled(o, f)
        }
        var h = !!d.triggerElement.attr("data-is-post")
          , i = !!d.triggerElement.attr("data-is-message")
          , j = b.loc(h ? "olv.portal.report.report_violation" : i ? "olv.portal.report.report_violation_message" : "olv.portal.report.report_violation_comment", d.triggerElement.attr("data-screen-name"))
          , k = b.loc(h ? "olv.portal.report.report_post_id" : i ? "olv.portal.report.report_message_id" : "olv.portal.report.report_comment_id", d.triggerElement.attr("data-support-text"));
        d.element.find(".window-title").text(j),
        d.element.find(".post-id").text(k),
        d.element.find("form").attr("action", d.triggerElement.attr("data-action"));
        var l = "1" === d.triggerElement.attr("data-can-report-spoiler")
          , m = l ? d.element.find("select.can-report-spoiler") : d.element.find("select.cannot-report-spoiler");
        d.element.find('select[name="type"]').hide().prop("disabled", !0),
        m.show().prop("disabled", !1);
        var n = d.element.find('textarea[name="body"]')
          , o = d.element.find(".post-button")
          , p = d.element.find("span.select-button-content");
        n.attr("placeholder", n.attr("data-placeholder")),
        f(),
        g(),
        n.on("input", g),
        m.on("change", f),
        m.on("change", g),
        b.Form.emulateInputEvent(n, e),
        e.done(function() {
            n.off("input", g),
            m.off("change", f),
            m.off("change", g)
        })
    }),
    b.EntryForm = {},
    b.EntryForm.setupAlbumImageSelector = function(b, c) {
        function d(a) {
            g.toggleClass("none")
        }
        function e(a) {
            g.addClass("none")
        }
        function f(c) {
            var d = a(c.target)
              , e = d.attr("data-album-image-preview-src");
            b.find('input[name="album_image_id"]').val(d.attr("data-album-image-id")),
            b.find(".js-album-image-preview").attr("src", e),
            b.find(".js-album-preview-wrapper").toggleClass("none", 0 == e.length),
            b.find('textarea[name="body"]').toggleClass("with-image", e.length > 0),
            b.trigger("olv:entryform:updatescreenshot")
        }
        if (b.length) {
            var g = b.find(".js-album-image-selector")
              , h = b.find(".js-album-list-pager");
            if (h.length) {
                var i = function(a) {
                    var c = parseInt(h.attr("data-max-page-number"));
                    a > c || 1 > a || (b.find(".js-album-selector-page[data-page-number=" + a + "]").removeClass("none").siblings(".js-album-selector-page").addClass("none"),
                    h.toggleClass("back-button-disabled", 1 === a),
                    h.toggleClass("next-button-disabled", a === c),
                    h.attr("data-current-page-number", a),
                    h.find(".js-curent-page-number").text(a))
                }
                  , j = function(a) {
                    h.hasClass("back-button-disabled") || i(parseInt(h.attr("data-current-page-number")) - 1)
                }
                  , k = function(a) {
                    h.hasClass("next-button-disabled") || i(parseInt(h.attr("data-current-page-number")) + 1)
                }
                  , l = b.find(".js-page-back-button");
                l.on("click", j);
                var m = b.find(".js-page-next-button");
                m.on("click", k),
                i(1),
                c.done(function() {
                    l.off("click", j),
                    m.off("click", k)
                })
            }
            var n = b.find(".js-toggle-album-image-selector");
            n.on("click", d);
            var o = g.find(".js-close-album-image-selector");
            o.on("click", e);
            var p = b.find(".js-album-image-link");
            p.on("click", f);
            var q = function(a) {
                b.find('input[name="album_image_id"]').val(""),
                b.find(".js-album-image-preview").attr("src", ""),
                b.find(".js-album-preview-wrapper").addClass("none"),
                b.find('textarea[name="body"]').removeClass("with-image")
            };
            b.on("reset", q),
            c.done(function() {
                n.off("click", d),
                o.off("click", e),
                p.off("click", f),
                b.off("reset", q)
            })
        }
    }
    ,
    b.EntryForm.setupSubmission = function(c, d) {
        function e(d) {
            var e = a(this);
				b.Form.isDisabled(e) || !b.Entry.checkEvent(d) || d.isDefaultPrevented() || (d.preventDefault(),
				b.Form.submit(c, e).done(function(a) {
					if (b.Form.reset(c),
					"topic" === c.attr("data-post-subtype") && !c.attr("data-is-identified")) {
						var d = c.find('textarea[name="body"]');
						d.prop("disabled", !0),
						d.attr("placeholder", d.attr("data-open-topic-post-existing-placeholder"))
					}
					e.trigger("olv:entryform:post:done", arguments)
				}).fail(function() {
					e.trigger("olv:entryform:post:fail", arguments)
				}).always(function() {
					c.find('textarea[name="body"]').trigger("input")
				}))
        }
        function f(a) {
            return 13 !== a.which
        }
        function g(a) {
            b.Form.isDisabled(h) && a.preventDefault()
        }
        if (c.length) {
            c.on("keypress", "input:not(.allow_submit)", f);
            var h = c.find('input[type="submit"], button[type="submit"]');
            h.on("click", e),
            c.on("submit", g),
            d.done(function() {
                c.off("keypress", "input:not(.allow_submit)", f),
                h.off("click", e),
                c.off("submit", g)
            })
        }
    }
    ,
    b.EntryForm.onTopicPostCreated = function(b, c) {
        var d = a(".js-post-list").children(".post").attr("data-href");
        b.find(".js-existing-open-topic-post-link").attr("href", d);
        var e = a("#post-form");
        e.hasClass("for-identified-user") || (b.find(".js-cannnot-topic-post").removeClass("none"),
        b.find(".js-feeling-selector").addClass("none"),
        b.find(".js-topic-categories-container").addClass("none"),
        b.find(".js-post-form-spoiler").addClass("none"),
        b.find('input[type="text"],textarea').prop("readonly", !0)),
        b.toggleClass("folded")
    }
    ,
    b.EntryForm.setupFormStatus = function(c, d) {
        function e(l) {
            var d = l.filter(function() {
                return !b.Closed.blank.test(a(this).val())
            });
            return d.length === l.length
        }
        function f(c) {
            var d = h.filter("[data-required]:visible")
              , f = d.length > 0 && e(d)
              , g = i.filter(function() {
                return !a(this).val()
            }).length > 0;
            //Olv.Form.toggleDisabled will make the disabled button disabled IF parameter #2 equals true, will make it un-disabled if it's false (first parameter is the send button)
            b.Form.toggleDisabled(k, !f && !j.val() && !$('label.textarea-menu-memo').hasClass('checked') || g)
        }
        function g(a) {
            c.trigger("olv:entryform:reset")
        }
        if (c.length) {
            var h = c.find('input[type="text"], textarea')
              , i = c.find("select[data-required]")
              , j = c.find('input[name="painting"]').siblings("input:file")
              , k = c.find('input[type="submit"], button[type="submit"]');
            h.on("input", f),
            j.on("change", f),
            i.on("change", f),
            c.on("reset", g);
            var l = h.filter(":visible").first();
            b.Form.emulateInputEvent(l, d),
            h.filter(":visible").first().trigger("input"),
            d.done(function() {
                h.off("input", f),
                j.off("change", f),
                c.off("reset", g),
                i.off("change", f)
            })
        }
    }
    ,
    b.EntryForm.setupFoldedForm = function(a, b) {
        function c(b) {
            var c = d.offset().top;
            a.removeClass("folded");
            var e = d.offset().top - c;
            window.scrollBy(0, e)
        }
        if (a.hasClass("folded")) {
            var d = a.find("[data-open-folded-form]");
            if (d.is(document.activeElement) || d.val() !== d.prop("defaultValue"))
                return void a.removeClass("folded");
            if ("#js_open_post_form" == location.hash)
                return location.hash = "",
                void a.removeClass("folded");
            d.one("focus", c),
            b.done(function() {
                d.off("focus", c)
            })
        }
    }
    ,
    b.EntryForm.setupIdentifiedUserForm = function(c, d) {
        function e() {
            c.find('textarea[name="body"]').trigger("input")
        }
        function f(a) {
            var d = "1" == c.find('input[name="is_multi_language"]:checked').val();
            b.Form.reset(c),
            c.find('input[name="is_multi_language"]').val([d ? "1" : "0"]),
            c.find(".language-id-selector").toggleClass("none", !d),
            c.find(".language-bodies").toggleClass("none", !d),
            c.find('input[name="painting"]').parent().toggleClass("none", d),
            c.find('textarea[name="body"]').toggleClass("none", d),
            g();
            e()
        }
        function g(b) {
            l.each(function(b, d) {
                c.find(".js-language-body-" + a(d).val()).toggleClass("none", !d.checked)
            }),
            e()
        }
        function h(d) {
            /*var e = a(d.target).siblings().filter("input")
              , f = d.target.files[0];
            if (!f)
                return void e.val("");
            var g = new FileReader;
            g.onload = function(a) {
                var b = a.target.result.split(",")[1];
                e.val(b);
                e.trigger("olv:entryform:fileselect", c);
                c.find('textarea[name="body"]').trigger("input")
            }
            ,*/
            /*b.Form.toggleDisabled(j, !0),
            g.readAsDataURL(f)*/
        }
        function i(a) {
            k.siblings().filter("input[type=hidden]").val(""),
            f()
        }
        var j = c.find('input[type="submit"]')
          , k = c.find(".file-button")
          , l = c.find('input[name="language_ids"]')
          , m = c.find('input[name="is_multi_language"]');
        "undefined" == typeof FileReader && b.Form.toggleDisabled(k, !0),
        k.on("change", h),
        l.on("change", g),
        m.on("change", f),
        c.on("olv:entryform:post:done", i),
        f(),
        d.done(function() {
            k.off("change", h),
            l.off("change", g),
            m.off("change", f),
            c.off("olv:entryform:post:done", b.Form.reset(c))
        })
    }
    ,
	-1 != navigator.userAgent.indexOf("iPhone;") && b.init.done(function(a) {
        setTimeout(function() {
            0 === window.pageYOffset && window.scrollBy(0, 1)
        }, 100)
    }),
    b.Community = {},
    b.Community.setupFavoriteButtons = function(c) {
        function d(a, c) {
            a.toggleClass("checked", c),
            b.Utils.isIEStyle && a.addClass("changing").removeClass("changing")
        }
        function e(c) {
            var e = a(this);
            if (!b.Form.isDisabled(e) && !c.isDefaultPrevented()) {
                c.preventDefault();
                var f = e.hasClass("checked");
                d(e);
                var g = e.attr(f ? "data-action-unfavorite" : "data-action-favorite");
                b.Form.post(g, null, e).done(function() {
                    f = !f,
                    e.trigger("olv:community:favorite:toggle", [f])
                }).fail(function() {
                    d(e, f)
                })
            }
        }
        a(document).on("click", ".favorite-button", e),
        c.done(function() {
            a(document).off("click", ".favorite-button", e)
        })
    }
    ,
    b.Community.setupAgeGateDialog = function(c) {
        function d(a, b, c) {
            if (isNaN(a) || isNaN(b) || isNaN(c))
                return !1;
            var d = new Date(a,b - 1,c);
            return d.getFullYear() !== a || d.getMonth() + 1 !== b || d.getDate() !== c ? !1 : !0
        }
        function e(a, b, c) {
            var d = new Date
              , e = 100 * b + c > 100 * (d.getMonth() + 1) + d.getDate() ? 1 : 0;
            return d.getFullYear() - a - e
        }
        function f(a, b, c) {
            return e(a, b, c) >= 18
        }
        function g(b, c) {
            var d = r[c]
              , e = a(b[0].options[b[0].selectedIndex]);
            isNaN(e.val()) && (b.find('[value="' + d + '"]').prop("selected", !0),
            b.trigger("change"),
            i(),
            e.remove())
        }
        function h(b) {
            var c = a(b.currentTarget);
            g(c, c.attr("name"))
        }
        function i() {
            var b = +o.val()
              , c = +p.val()
              , d = +q.val();
            if (!isNaN(c)) {
                var e = new Date(d,c,0).getDate()
                  , f = +o.find("option").last().val();
                if (f > e)
                    o.find("option").slice(e - f).remove();
                else if (e > f)
                    for (var g = f + 1; e >= g; g++)
                        o.append(a("<option>").val(g).text(g));
                !isNaN(b) && b > e && (o.find('[value="' + e + '"]').prop("selected", !0),
                o.trigger("change"))
            }
        }
        function j() {
            a(".age-gate-dialog").remove(),
            a("#main-body").children().show();
            //b.Cookie.set("age_gate_done", "1")
        }
        function k(a) {
            i()
        }
        function l(c) {
            var e = +q.val()
              , g = +p.val()
              , h = +o.val();
			/*
            b.Cookie.get("age_gate_done") ? j() : d(e, g, h) ? f(e, g, h) ? j() : (a(".age-gate").addClass("none"),
            a(".back-dialog").removeClass("none")) : b.deferredAlert(b.loc("olv.portal.age_gate.select_label"))
			*/
        }
        function m(a) {
            // Why do we need this
			//history.back()
        }
        a("#main-body").children().filter(function() {
            return !a(this).hasClass("age-gate-dialog")
        }).hide();
        var n = a(".age-gate-dialog")
          , o = n.find(".day")
          , p = n.find(".month")
          , q = n.find(".year")
          , r = {
            year: 1990,
            month: 1,
            day: 1
        };
        a(document).on("click", ".age-confirm-button", l),
        a(document).on("mousedown", ".age-gate select", h),
        a(document).on("change", ".age-gate select", k),
        a(document).on("click", ".cancel-button", m),
        c.done(function() {
            a(document).off("click", ".age-confirm-button", l),
            a(document).off("mousedown", ".age-gate select", h),
            a(document).off("change", ".age-gate select", k),
            a(document).off("click", ".cancel-button", m)
        })
    }
    ,
    b.Community.setupHotDiaryPostSlideShow = function(b) {
        function c(a, b) {
            var c = 0;
            return function() {
                function d(a, b, d) {
                    var e = b + d;
                    if (b >= a.length)
                        return c = 0,
                        a[0];
                    if (e < a.length) {
                        var f = a[e];
                        return f
                    }
                    return a[0]
                }
                for (var e = [], f = 0; a > f; f++)
                    e = e.concat(d(b, c, f));
                return c++,
                e
            }
        }
        function d(a, b) {
            setTimeout(function() {
                a.addClass(g)
            }, 0),
            setTimeout(function() {
                b.removeClass(g)
            }, 0)
        }
        function e(b) {
            var c = b()
              , e = a(c[0])
              , f = a(c[1]);
            d(e, f)
        }
        function f(c, d) {
            a(document).on("transitionend", c, function(a) {
                e(d)
            })
        }
        var g = "invisible"
          , h = a("#community-eyecatch-main")
          , i = h.find(".js-eyecatch-diary-post")
          , j = c(2, i.get())
          , k = [".js-eyecatch-diary-post", ":not(." + g + ")"].join("");
        setTimeout(function() {
            e(j)
        }, 1e3),
        f(k, j)
    }
    ,
    b.Community.setupCommunitySidebar = function(a) {
        b.Community.setupFavoriteButtons(a),
        b.OpenTruncatedTextButton.setup(".js-community-description")
    }
    ,
    b.Community.setupPostFilter = function(b) {
        function c(b) {
            if (!b.isDefaultPrevented()) {
                b.preventDefault();
                var c = a(this).find('select[name="post"]').val();
                window.location.href = c
            }
        }
        var d = a("#post-filter-select-page form");
        d.on("submit", c),
        b.done(function() {
            d.off("submit", c)
        })
    }
    ,
    b.User = {},
    b.User.setupFollowButton = function(c, d) {
        function e(c) {
            var e = a(this);
            b.Form.isDisabled(e) || !b.Entry.checkEvent(c) || (b.Form.post(e.attr("data-action"), null, e).done(function(b) {
                e.addClass("none").siblings().removeClass("none");
                // !! DO THIS WHEN A FOLLOW LIMIT IS IMPLEMENTO
				//e.hasClass("relationship-button") && (d.noReloadOnFollow && b.can_follow_more === !0 || b.Net.reload()),
                "following_count" in b && a(e).trigger("olv:visitor:following-count:change", [b.following_count])
            }),
            c.preventDefault())
        }
        function f(c) {
            var d = a(this)
              , e = d.siblings();
            if (!b.Form.isDisabled(d)) {
                var f = b.showConfirm(b.loc("olv.portal.unfollow"), b.loc("olv.portal.followlist.confirm_unfollow_with_name", d.attr("data-screen-name")), {
                    cancelLabel: b.loc("olv.portal.cancel"),
                    okLabel: b.loc("olv.portal.button.remove"),
                    modalTypes: "unfollow"
                });
                f.done(function(a) {
                    a && b.Form.post(d.attr("data-action"), null, d).done(function() {
                        // Maybe don't use the b.Net.reload() here
						d.hasClass("relationship-button") ? b.Net.reload() : (d.addClass("none"),
                        e.removeClass("none"),
                        b.Form.toggleDisabled(e, !1))
                    })
                }),
                c.preventDefault()
            }
        }
        d = a.extend({
            noReloadOnFollow: !1,
            container: document
        }, d);
        var g = a(d.container);
        g.on("click", ".toggle-button .follow-button", e),
        g.on("click", ".toggle-button .unfollow-button", f),
        c.done(function() {
            g.off("click", ".toggle-button .follow-button", e),
            g.off("click", ".toggle-button .unfollow-button", f)
        })
    }
    ,
    b.User.setupUserSidebar = function(a) {
        b.OpenTruncatedTextButton.setup(".profile-comment"),
        b.User.setupFollowButton(a, {
            container: "#sidebar"
        })

    }
    ,
    b.Global = {},
    b.Global.atOutsideOfMyMenu = function(b) {
        var c = a(b);
        return !c.hasClass("js-open-global-my-menu") && "global-my-menu" !== c.attr("id")
    }
    ,
    b.Global.setupMyMenu = function() {
        var c = a("#global-my-menu");
        a(".js-open-global-my-menu").on("click", function(a) {
			a.preventDefault(),
            c.toggleClass("none");
        }),
        a(document).on("click", function(a) {
            !c.hasClass("none") && b.Global.atOutsideOfMyMenu(a.target) && c.addClass("none")
        })
		
		// Thing
		$('.my-menu-white-power').on('click', function(e) {
		e.preventDefault()
				$('#wrapper').prepend('<div class="dialog feedback-dialog none"><div class=dialog-inner><div class=window><h1 class=window-title>Feedback</h1><div class=window-body><form id=feedback-form><p class=window-body-content>What\'s this?<br><input type=radio name=a value=0 checked>Issue/bug report<input type=radio name=a value=1>Suggestion<input type=radio name=a value=2>I want something<div class=textarea-container><textarea name=b id=feedbackbody class="textarea-text textarea" maxlength="5000" placeholder="Write your feedback, suggestions, bug report, whatever you want here." required></textarea></div><p></p></p></form><div class=form-buttons><button class="olv-modal-close-button gray-button" type=button data-event-type=ok onclick="$(\'.feedback-dialog\').remove()">Cancel</button><button class="black-button d-send disabled" disabled type=button>Send it</button></div></div></div></div></div>');
		var g = new b.ModalWindow($('.feedback-dialog'));g.open();
		$('#feedbackbody').on('input', function() {
				b.Form.toggleDisabled($('.d-send'), !$(this).length < 0 || (b.Closed.blank.test($(this).val())))
        });
		$('.d-send').on('click', function() {
			b.Form.post('/complaints', $('#feedback-form').serializeArray()).done(function() { 
				g.close();$('.feedback-dialog').remove()
				b.showMessage("", "That was successfully submitted, and hopefully someone will see it. Thank you!")
			})
		})
		});
		
		$('.my-menu-account-setting').on('click', function(e) {
			e.preventDefault();
				$.ajax({url: '/pref',
					success: function(a) {
						yeah_notifications = a[0] ? ' checked' : '';
						lights_off = a[1] ? ' checked' : '';
						online_status = a[2] ? ' checked' : '';
						
						$('#wrapper').prepend('<div class="dialog acc-set none"><div class=dialog-inner><div class=window><h1 class=window-title>Account preferences</h1><div class=window-body><form id=feedback-form><p class=window-body-content> These are your account\'s preferences, pretty self-explanatory.</p><br> <input type=checkbox value=1 name=a'+ yeah_notifications +'> Enable notifications for Yeahs<br><input type=checkbox onclick=Olv.Closed.lights()'+ lights_off +'> Enable dark mode<br> <input type=checkbox value=1 name=b'+ online_status +'> Hide my latest time seen and online status from others</form><div class=form-buttons><button class="olv-modal-close-button gray-button" type=button data-event-type=ok onclick="$(\'.acc-set\').remove()">Cancel</button><button class="black-button ac-send" type="button">Save</button></div></div></div></div></div>');
						var g = new b.ModalWindow($('.acc-set'));g.open();
						$('.ac-send').on('click',function() {
							b.Form.post('/pref', $('#feedback-form').serializeArray())
							g.close();
							$('.acc-set').remove();
						})
						}, error: function() {
						b.showMessage('', "Can't open your account preferences because getting your current preferences failed.")
						}
				});
			
		});
		// Unthing
    }
    ,
	b.init.done(function() {
		$('#wrapper').attr('class', $('#main-body').attr('class'));
        b.Global.setupMyMenu()
	}),
    b.init.done(function(a) {
        if (a("#global-menu-news").length) {
            a("#global-menu-news > a").on("click", function(b) {
                a(b.currentTarget).find(".badge").hide()
            });
            var c = b.UpdateChecker.getInstance();
            a(c).on("update", function(b, d) {
                a.each(c._settings, function(b, c) {
                    var e = !0;
                    a.each(c.params, function(a, b) {
                        void 0 === d[a] && (this.success = !1)
                    }),
                    e && c.update.call(void 0, d, c.params)
                })
            }),
            c.onUpdate("check_update", {
                n: {},
				msg: {}
            }, function(b, c) {
				// If the response is blank, set both of the counts as 0.
				if(!b || b.length > 2) {
				b = [unescape('\x00'), unescape('\x00')];
				}
					// Notification
					var d = a("#global-menu-news")
					  , e = d.find(".badge");
					0 === e.length && (e = a("<span>", {
						"class": "badge"
					}),
					e.hide().appendTo(d.find("a")));
					var f = 0;
						f += b[0].charCodeAt()
					e.text(f),
					e.toggle(f > 0)
					
					// Message
					var g = a("#global-menu-message")
					  , h = g.find(".badge");
					0 === h.length && (h = a("<span>", {
						"class": "badge"
					}),
					h.hide().appendTo(g.find("a")));
					var j = 0;
						j += b[1].charCodeAt()
					h.text(j),
					h.toggle(j > 0)
            }),
            a(document).on("pjax:complete", function(a) {
                c.resetInterval()
            }),
            c.invoke()
        }
    }),
    b.router.connect("^/activity$", function(c, d, e) {
		b.Closed.changesel("feed");
        function f() {
            var c = a("#post-form");
            b.Form.setupForPage(),
            b.EntryForm.setupSubmission(c, e),
            b.EntryForm.setupFormStatus(c, e),
            b.EntryForm.setupFoldedForm(c, e);
				if($('#post-form').length) {
					setupPostForm2();
				}
            b.User.setupFollowButton(e),
            c.hasClass("for-identified-user") && b.EntryForm.setupIdentifiedUserForm(c, e),
            c.on("olv:entryform:post:done", g),
            e.done(function() {
                a("form.search").off("submit", b.Form.validateValueLength)
            })
        }
        function g(b, c) {
            var d = a(".js-post-list");
            d.length || (d = a("<div>", {
                "class": "list post-list js-post-list"
            }).replaceAll(".no-content"));
            var e = a(a.parseHTML(c)).filter("*");
            e.hide().fadeIn(400).prependTo(d);
            var f = a(window);
            f.scrollTop(e.offset().top + e.outerHeight() / 2 - f.height() / 2)
        }
		$('form.search').on('submit', function(s) {
			s.preventDefault();
			b.Net.go($(this).attr('action') + '?'+$(this).serialize());
		});
        b.Entry.setupEmpathyButtons(e);
        a("form.search").on("submit", b.Form.validateValueLength);
        var h, i, j = a(".content-loading-window");
        if (j.length) {
            var k = d.search.substring(1);
            k && (k = "&" + k),
            h = b.Net.ajax({
                type: "GET",
				url: window.location.href,/*
                url: d.pathname + "?" + a.param({
                    fragment: "activityfeed"
                }) + k,*/
                silent: !0, beforeSend:function(){NProgress.start()},complete:function(){NProgress.done()},
            }).done(function(l) {
                a("#js-main").html(l),
                a(document).trigger("olv:activity:success", [l, c, d])
					pf = $('div.post-form')
					if(pf.length) {
						$('#js-main').prepend($('div.post-form'))
						pf.removeClass('none')
						f()
					}
					b.Content.autopagerize(".js-post-list", e),
					b.Entry.setupHiddenContents(e);
            }).fail(function() {
                setTimeout(function() {
                    j.remove(),
                    a(".content-load-error-window").removeClass("none")
                }, 5e3)
            });
			
			/*
            var l = "friend" !== b.Cookie.get("view_activity_filter");
			i = l ? b.Net.ajax({
                type: "GET",
                url: "/my/latest_following_related_profile_posts",
                silent: !0
            }) : a.Deferred().resolve().promise()
			*/
			
        }  else
            h = a.Deferred().resolve().promise(),
            //i = a.Deferred().resolve().promise();
        h.then(function() {
            f()
        }); 
		/*
		a.when(h).done(function(b) {
            var d = a(a.parseHTML(a.trim(c[0])));
            e.each(function(b, c) {
                var e = d.get(b);
                e && (a(c).html(e),
                f.push(c))
            }),
            a(f).removeClass("none")
        }),
        e.done(function() {
            h.abort && h.abort()
        })
		*/
	
	$('div.post-filter > form > input[type=checkbox]').on('click', function() {
		b.Net.go(d.pathname + "?" + $(this).attr('name') + "=" + $(this).attr('value'))
	});
    }),
    b.router.connect("^(?:/|/communities)$", function(c, d, e) {
		b.Closed.changesel("community");
		/*
			if(a("#header-news").length) {
			o = a("#header-news");
			l = a(".header-news-button").attr("href") + "/read.json";
				a(".close-button").on("click", function(s) {
				s.preventDefault();
				a.post(o);
				alert("POSTed to " + l);
				o.remove();
				});
				o.on("click", function(){
				a.post(o);
				alert("POSTed to " + l);
				b.Net.go(o.attr("href"));
				});
			}
		*/
        function f(b) {
            a(".tab-body").addClass("none"),
            a("#tab-" + b + "-body").removeClass("none"),
            a(".platform-tab a").removeClass("selected"),
            a("#tab-" + b).addClass("selected")
        }
        function g(c) {
            var d = a(this);
            if (!b.Form.isDisabled(d) && !c.isDefaultPrevented()) {
                c.preventDefault();
                var e = a(this).attr("data-platform");
                f(e);
                //b.Cookie.set("view_platform", e)
            }
        }
        function h(b) {
            if (!b.isDefaultPrevented()) {
                b.preventDefault();
                var c = a(this).find('select[name="category"]').val();
                window.location.href = c
            }
        }
        //var i = b.Cookie.get("view_platform");
        //i && f(i),
        // !! RE-ENABLE THIS WHEN WE WAND the HoT Diary Post Slide Show
		//b.Community.setupHotDiaryPostSlideShow(e),
        a(".platform-tab a").on("click", g),
        a(".filter-select-page form").on("submit", h),
        a("form.search").on("submit", b.Form.validateValueLength),
        e.done(function() {
            a(".platform-tab a").off("click", g),
            a(".filter-select-page form").off("submit", h),
            a("form.search").off("submit", b.Form.validateValueLength)
        })
		$('form.search').on('submit', function(s) {
			s.preventDefault();
			b.Net.go($(this).attr('action') + '?'+$(this).serialize())
		})
    }),
    b.router.connect("^/communities/all$", function(c, d, e) {
		b.Closed.changesel("community");
		gsl = function(e) {
			e.preventDefault();
			$('.community-switcher-tab.selected').removeClass('selected');
			$(this).addClass('selected');
			cl = $(this).attr('class').split(' ')[1],
			$('.' + cl).removeClass('none')
			$('.communities:not(.none):not(.'+ cl +')').addClass('none')
		}
        $('.community-switcher-tab.gen').on('click',gsl),
		$('.community-switcher-tab.game').on('click',gsl),
		$('.community-switcher-tab.special').on('click',gsl);
    }),
	b.router.connect("^/communities.search$", function(c) {
		$('form.search').on('submit', function(s) {
			s.preventDefault();
			b.Net.go($(this).attr('action') + '?'+$(this).serialize())
		})
		$("form.search").off("submit", b.Form.validateValueLength);
	}),
    b.router.connect("^/(identified_user_posts|notifications)+$", function(a, c, d) {
        b.Guest.isGuest() || b.User.setupFollowButton(d),
        b.Content.autopagerize(".js-post-list", d)
    }),
	b.router.connect("/notifications(\/)?$", function(a, c, d) {
	   b.Closed.changesel("news");
	   $('button.rm').on('click', function() {
		   $(this).parent().parent().remove()
		   b.Form.post('/notifications/' + $(this).parent().parent().attr('id') + '.rm')
	   })
	}),
	b.router.connect('/notifications/friend_requests(\/)?$', function(a, c, d) {
		b.Closed.changesel("news");
		b.Form.post("/notifications/set_read?fr=1")
		$('.received-request-button').on('click', function(a) {
			a.preventDefault()
			fr = new b.ModalWindow($('div[data-modal-types=accept-friend-request][uuid='+ $(this).parent().parent().attr('id') +']'));fr.open();
		})
		$('div[data-modal-types=accept-friend-request] .ok-button.post-button').on('click', function(a){
					a.preventDefault();
					b.Form.toggleDisabled($(this), true);
				b.Form.post($(a.target).parents().eq(4).attr('data-action')).done(function(){
								b.Form.toggleDisabled($(this), false);
								fr.close();
								b.Net.reload();
							})
			})
		$('div[data-modal-types=accept-friend-request] .cancel-button').on('click', function(a){
					a.preventDefault();
				b.showConfirm('Reject Friend Request', 'Are you sure you really want to reject '+ b.SimpleDialog.htmlLineBreak($(a.target).parents().eq(4).attr('data-screen-name')) +'\'s friend request?', {
                    cancelLabel: "No",
                    okLabel: "Yes"
                })
						$('.ok-button.black-button').on('click', function() {
							b.Form.toggleDisabled($(this), true);
							b.Form.post($(a.target).parents().eq(4).attr('data-reject-action')).done(function(){
								b.Form.toggleDisabled($(this), false);
								fr.close();
								b.Net.reload()
							})
					})
			})
	}),
	b.router.connect("^/messages(\/)?$", function(a, c, d) {
	   b.Closed.changesel("message");
	   b.Content.autopagerize(".list-content-with-icon-and-text", d);
	   
	   	$('form.search').on('submit', function(s) {
			s.preventDefault();
			b.Net.go($(this).attr('action') + '?'+$(this).serialize());
		});
	   
	   $('h2 > span > input[type=checkbox]').on('click', function() {
		b.Net.go(location.pathname + "?" + $(this).attr('name') + "=" + $(this).attr('value'))
		});
	   
	}),
	b.router.connect("^/messages/([^\/]+)/?$", function(a, c, d) {
		b.Closed.changesel("message");
		b.Content.autopagerize(".list.messages", d)
			var ff = $('#post-form')
		    b.EntryForm.setupSubmission(ff, d),
            b.EntryForm.setupFormStatus(ff, d),
            b.EntryForm.setupFoldedForm(ff, d),
            b.EntryForm.setupIdentifiedUserForm(ff, d)
			ff.on("olv:entryform:post:done", g)
        function g(k, c) {
            var p = $(".list.messages");
            p.length || (p = $("<div>", {
                "class": "list post-list js-post-list"
            }).replaceAll(".no-content"));
            var e = $($.parseHTML(c)).filter("*");
            e.hide().fadeIn(400).prependTo(p);
            var f = $(window);
            f.scrollTop(e.offset().top + e.outerHeight() / 2 - f.height() / 2)
        }

			        if($("#post-form").length) {
var mode_post = 0;
$("label.textarea-menu-memo > input").on("click", function() {
	if(openDrawboardModal()) {
var menu = $("div.textarea-with-menu");
var memo = $("div.textarea-memo");
var text = $("div.textarea-container");
    if(menu.hasClass("active-text")) {
        menu.removeClass("active-text");
        menu.addClass("active-memo");
        memo.removeClass("none");
        text.addClass("none");
    }
b.Form.toggleDisabled($("input.post-button"), false);
mode_post = 1;

setupDrawboard();
	}
});
$("label.textarea-menu-text").on("click", switchtext);

$(".post-button").on("click", switchtext);

function switchtext() {
var menu = $("div.textarea-with-menu");
        menu.removeClass("active-memo");
        menu.addClass("active-text");
        $("div.textarea-container").removeClass("none");
        $("div.textarea-memo").addClass("none");
mode_post = 0;
    }
}

	function msg_rm_load() {
		var rm_btn = $('.rm-post-button')
		if(rm_btn.length) {
			rm_btn.on('click',function(){
				var thingy = $(this);
				b.showConfirm("Delete message", "Really delete this message?")
					$('.ok-button').on('click',function(){
						b.Form.post(thingy.attr('data-action'));
						thingy.parent().parent().remove();
					})
			})
		}
	}

	msg_rm_load();
	
	$('button.msg-update').on('click',function(e){
			msglist = $('.list.messages')
			NProgress.start();
			$.ajax({
				url: window.location.href,
				headers: {
					"X-AUTOPAGERIZE": !0
				}
			}).done(function(g) {
				NProgress.done();
				msglist.replaceWith(g);
				msg_rm_load();
			});
		});
	}),
    b.router.connect("^/communities/(?:favorites|played)$", function(a, c, d) {
		b.Closed.changesel("community");
        b.Content.autopagerize(".community-list", d)
    }),
    b.router.connect("^/communities/search$", function(c, d, e) {
		b.Closed.changesel("community");
        a("form.search").on("submit", b.Form.validateValueLength),
        e.done(function() {
            a("form.search").off("submit", b.Form.validateValueLength)
        })
    }),
    b.router.connect("^/communities/[0-9]+(/diary|/new|/hot|/in_game|/old)?$", function(c, d, e) {
		b.Closed.changesel("community");
        function f() {
            var b = a(".multi_timeline-topic-filter");
            b.addClass("open")
        }
        function g(b, c) {
            var d = a(b.currentTarget).attr("data-post-list-container-selector")
              , e = !!d
              , f = e ? d + " .js-post-list" : ".js-post-list"
              , g = a(f);
            e ? g.hasClass("empty") && g.removeClass("empty").children().remove() : g.length || (g = a("<div>", {
                "class": "list post-list js-post-list"
            }).replaceAll(".no-content"));
            var h = a(a.parseHTML(c)).filter("*");
            h.hide().fadeIn(400).prependTo(g);
            var i = a(window);
            i.scrollTop(h.offset().top + h.outerHeight() / 2 - i.height() / 2)
        }
        b.Entry.setupHiddenContents(e),
        b.Content.autopagerize(".js-post-list", e),
        b.Community.setupPostFilter(e);
        var h = a("#post-form");
        b.Guest.isGuest() || (b.Entry.setupEmpathyButtons(e),
        b.EntryForm.setupSubmission(h, e),
        b.EntryForm.setupFormStatus(h, e),
        b.EntryForm.setupFoldedForm(h, e),
        b.EntryForm.setupAlbumImageSelector(h, e),
        h.hasClass("for-identified-user") && b.EntryForm.setupIdentifiedUserForm(h, e),
        a(".toggle-button").length && b.User.setupFollowButton(e),
        a(document).on("click", ".js-topic-post-button", f),
        e.done(function() {
            a(document).off("click", ".js-topic-post-button", f)
        })),
        a(".age-gate-dialog").length && b.Community.setupAgeGateDialog(e),
        h.on("olv:entryform:post:done", g),
        e.done(function() {
            h.off("olv:entryform:post:done", g)
        })
		// I might do this again later
		/*
		$('button.reload-btn').on('click',function(e){
				NProgress.start();
				$.ajax({
                    url: window.location.href,
                    headers: {
                        "X-AUTOPAGERIZE": !0
                    }
                }).done(function(m) {
					NProgress.done();
                    $('.js-post-list').replaceWith(m);
				});
		});
		*/
    }),
    b.router.connect("^/communities/[0-9]+(/artwork(/hot|/new)?|/topic(/new|/open)?)$", function(c, d, e) {
		b.Closed.changesel("community");
        function f(d, f) {
            var h = a(".js-post-list");
            h.length || (h = a("<div>", {
                "class": "list multi-timeline-post-list js-post-list"
            }).replaceAll(".no-content"));
            var i = a(a.parseHTML(f)).filter("*");
            i.hide().fadeIn(400).prependTo(h),
            /^\/topic(?:\/(?:new|open))?$/.test(c[1]) && (b.EntryForm.onTopicPostCreated(g, e),
            b.EntryForm.setupFoldedForm(g, e));
            var j = a(window);
            j.scrollTop(i.offset().top + i.outerHeight() / 2 - j.height() / 2)
        }
        b.Entry.setupHiddenContents(e),
        b.Content.autopagerize(".js-post-list", e),
        b.Community.setupPostFilter(e);
        var g = a("#post-form");
        b.Guest.isGuest() || (b.Entry.setupEmpathyButtons(e),
        b.EntryForm.setupSubmission(g, e),
        b.EntryForm.setupFormStatus(g, e),
        b.EntryForm.setupFoldedForm(g, e),
        b.EntryForm.setupAlbumImageSelector(g, e),
        g.hasClass("for-identified-user") && b.EntryForm.setupIdentifiedUserForm(g, e),
        a(".toggle-button").length && b.User.setupFollowButton(e)),
        a(".age-gate-dialog").length && b.Community.setupAgeGateDialog(e),
        g.on("olv:entryform:post:done", f),
        e.done(function() {
            g.off("olv:entryform:post:done", f)
        })
    }),
    b.router.connect(/^\/posts\/([0-9A-Za-z\-_]+)$/, function(c, d, e) {
        function f(c, d) {
            var e = a(window)
              , f = a(a.parseHTML(d)).filter("*");
            f.hide().fadeIn(400).appendTo(".reply-list"),
            e.scrollTop(f.offset().top + f.outerHeight() / 2 - e.height() / 2),
            b.Entry.incrementReplyCount(1)
        }
        function g(c, d) {
            var e = a(c.target);
            e.attr("data-is-post") ? b.Form.toggleDisabled(e, !0) : e.remove()
        }
        b.Entry.setupHiddenContents(e),
        b.Entry.setupMoreRepliesButtons(e);
        var h = a("#reply-form");
        b.Guest.isGuest() || (b.Entry.setupPostEmpathyButton(e),
        b.Entry.setupEditButtons(e),
        b.EntryForm.setupSubmission(h, e),
        b.EntryForm.setupFormStatus(h, e),
        b.EntryForm.setupAlbumImageSelector(h, e),
        h.hasClass("for-identified-user") && b.EntryForm.setupIdentifiedUserForm(h, e)),
        b.Entry.setupBodyLanguageSelector(e),
        b.Entry.setupMoreContentButton(e),
        a(document).on("olv:entryform:post:done", f),
        a(document).on("olv:report:done", g),
        e.done(function() {
            a(document).off("olv:entryform:post:done", f),
            a(document).off("olv:report:done", g)
        })
// CCC
if($('.post-poll').length) {
add = function(a, b){ return a + b; }
function recalculateVotes(pollOptions){
	var voteArray = [];
	for(var j = 0; j < pollOptions.length; j++) {
		var votes = parseInt(pollOptions.eq(j).attr('votes'));
		if(pollOptions.eq(j).hasClass('selected')) {
    	voteArray.push(votes + 1);
    }	else {
    	voteArray.push(votes);
    }
  }
	var voteCount = voteArray.reduce(add, 0)
	pollOptions.siblings('.poll-votes').text(voteCount + ' vote' + (voteCount == 1 ? '' : 's'));
	for(var i = 0; i < pollOptions.length; i++) {
		var voteArrayCopy = voteArray;
		voteArrayCopy.slice(i, 1);
		var otherNumbers = voteArrayCopy.reduce(add, 0);
		var percentage = Math.abs(100 - (((otherNumbers - voteArray[i]) / otherNumbers) * 100));
		pollOptions.eq(i).children('.poll-background').attr('style', 'width:' + percentage + '%');
		pollOptions.eq(i).children('.percentage').text(Math.round(percentage) + '%');
  }
}

function pollSuccess(response) {
	var pollOptions = $('.post-poll .poll-option');
	for(i = 0; i < response.votes.length; i++) {
		pollOptions.eq(i).attr('votes', response.votes[i]);
  }
	recalculateVotes(pollOptions);
}

$('.post-poll .poll-option').on('click', function() {
	if(!$(this).hasClass('selected')) {
		$(this).siblings('.poll-option').removeClass('selected');
		$(this).addClass('selected');
		recalculateVotes($(this).siblings('.poll-option'));
		$(this).parents('.post-poll').addClass('selected');
    b.Form.post($(this).parents('.post-poll').attr('data-action'), {'a': parseInt($(this).index())}).done(pollSuccess)
  } else {
  	$(this).parents('.post-poll').removeClass('selected');
		$(this).removeClass('selected');
		recalculateVotes($(this).siblings('.poll-option'));
		
		b.Form.post($(this).parents('.post-poll').attr('data-action-unvote'), {'a': '0'}).done(pollSuccess)

  }
});
$('.post-poll .poll-votes').on('click', function() {
	b.showMessage("Poll Voters", "Insert list of poll voters here.");
});
// EndC
}

	if($('.edit-post-button').length) {
		var t = $("#edit-form");
		var submit_btn = $('#edit-form div.form-buttons button.post-button.black-button')
		function et() {
						$('#post-edit').toggleClass('none')
						$('#the-post').toggleClass('none')
					}
		$('.cancel-button').on('click',function(){et()})
				b.EntryForm.setupFormStatus(t, e);
		$('.edit-post-button').on('click',function(){
			if($('.post-content-memo').length) {
				b.showMessage("", "You can't edit a drawing, sorry.");
			} else {
					et();
					b.Form.toggleDisabled(submit_btn, true);
			}
		})
		submit_btn.on('click',function(a) {
			a.preventDefault();
			b.Form.toggleDisabled($(this), true);
			cereal = t.serializeArray();
			b.Form.post(t.attr('data-action'), cereal).done(function() {
				$('.post-content-text').html(cereal.body); b.Net.reload();
			})
		})
	}
	rm_btn = $('.rm-post-button')
	if(rm_btn.length) {
		rm_btn.on('click',function(){
			b.showConfirm("Delete post", "Really delete this post?")
				$('.ok-button').on('click',function(){
					b.Form.post(rm_btn.attr('data-action')).done(b.showMessage("", "Deleted."))
				})
		})
	}
	fav_btn = $('.profile-post-button')
	if(fav_btn.length) {
			if(fav_btn.hasClass('done')) {
				fav_btn.on('click',function(){
					b.showConfirm("Profile post unset", "Unset your profile picture?")
						$('.ok-button').on('click',function(){
							b.Form.post(fav_btn.attr('data-action')).done(fav_btn.removeClass('done',b.Net.reload()))
						})
				})
			}
			else {
				fav_btn.on('click',function(){
					b.showConfirm("Profile post", "Set this as your profile picture?")
						$('.ok-button').on('click',function(){
							b.Form.post(fav_btn.attr('data-action')).done(fav_btn.addClass('done'),b.Net.reload())
						})
				})
			}
	}
		
if($("#reply-form").length) {
var mode_post = 0;
$("label.textarea-menu-memo > input").on("click", function() {
		if(openDrawboardModal()) {
var menu = $("div.textarea-with-menu");
var memo = $("div.textarea-memo");
var text = $("div.textarea-container");
    if(menu.hasClass("active-text")) {
        menu.removeClass("active-text");
        menu.addClass("active-memo");
        memo.removeClass("none");
        text.addClass("none");
    }
b.Form.toggleDisabled($("input.reply-button"), false);
mode_post = 1;

setupDrawboard();
}
});
$("label.textarea-menu-text").on("click", switchtext);

$(".reply-button").on("click", switchtext);

function switchtext() {
var menu = $("div.textarea-with-menu");
        menu.removeClass("active-memo");
        menu.addClass("active-text");
        $("div.textarea-container").removeClass("none");
        $("div.textarea-memo").addClass("none");
mode_post = 0;
    }
}
    }),
    b.router.connect(/^\/comments\/([0-9A-Za-z\-_]+)$/, function(c, d, e) {
        function f(c, d) {
            var e = a(c.target);
            e.attr("data-is-post") ? b.Form.toggleDisabled(e, !0) : e.remove()
        }
        var g = a("#reply-form");
        b.Guest.isGuest() || (b.Entry.setupPostEmpathyButton(e),
        b.Entry.setupEditButtons(e),
        b.EntryForm.setupSubmission(g, e),
        b.EntryForm.setupFormStatus(g, e)),
        b.Entry.setupBodyLanguageSelector(e),
        a(document).on("olv:report:done", f),
        e.done(function() {
            a(document).off("olv:report:done", f)
        })
		
				if($('.edit-post-button').length) {
			var t = $("#edit-form");
			var submit_btn = $('#edit-form div.form-buttons button.post-button.black-button')
			function et() {
							$('#post-edit').toggleClass('none')
							$('#the-post').toggleClass('none')
						}
			$('.cancel-button').on('click',function(){et()})
					b.EntryForm.setupFormStatus(t, e);
			$('.edit-post-button').on('click',function(){
				if($('.reply-content-memo').length) {
					b.showMessage("", "You can't edit a drawing, sorry.")
				} else {
						et();
						b.Form.toggleDisabled(submit_btn, true)
				}
			})
			submit_btn.on('click',function(a) {
				a.preventDefault()
				b.Form.toggleDisabled($(this), true)
				cereal = t.serializeArray()
				b.Form.post(t.attr('data-action'), cereal).done(function() {
					$('.post-content-text').html(cereal.body); b.Net.reload()
				})
			})
		}
			rm_btn = $('.rm-post-button')
			if(rm_btn.length) {
				rm_btn.on('click',function(){
					b.showConfirm("Delete post", "Really delete this post?")
						$('.ok-button').on('click',function(){
							b.Form.post(rm_btn.attr('data-action')).done(b.showMessage("", "Deleted."))
						})
				})
			}
    }),
    b.router.connect("^/users\.search$", function(c, d, e) {
		b.Closed.changesel("feed");
        b.Content.autopagerize("#searched-user-list", e),
        b.Guest.isGuest() || b.User.setupFollowButton(e),
        a("form.search").on("submit", function(s) {
		b.Form.validateValueLength(s),
			s.preventDefault();
		b.Net.go($(this).attr('action') + '?'+$(this).serialize())
		}),
        e.done(function() {
            a("form.search").off("submit", b.Form.validateValueLength)
        })
    }),
    b.router.connect("^/users/[^\/]+/(yeahs|posts|comments)$", function(a, c, d) {
        b.Content.autopagerize(".js-post-list", d)
    }),
    b.router.connect("^/users/[^\/]+(/friends|/following|/followers)$", function(a, c, d) {
        b.Content.autopagerize("#friend-list-content", d)
    }),
    b.router.connect("^/users/[^\/]+(/diary)$", function(c, d, e) {
        function f(b, c) {
            var e = a(".js-post-list");
            e.find(".no-content").addClass("none");
            var f = a(a.parseHTML(c)).filter("*");
            f.hide().fadeIn(400).prependTo(e),
            i.remove();
			// Why do we need to replace state????????
            //window.history.replaceState(window.history.state, "", d.href.replace(/\?.*/, ""));
            var g = a(document).find("#js-my-post-count");
            g[0] && g.text(+g.text() + 1);
            var h = a(window);
            h.scrollTop(f.offset().top + f.outerHeight() / 2 - h.height() / 2)
        }
        function g(a, b) {
            i.remove()
        }
        function h(c, d) {
            b.Form.toggleDisabled(a(c.target), !0)
        }
        b.Entry.setupHiddenContents(e),
        b.Content.autopagerize(".js-post-list", e);
        var i = a("#post-form");
        b.Guest.isGuest() || (b.Entry.setupEmpathyButtons(e),
        b.EntryForm.setupSubmission(i, e),
        b.EntryForm.setupFormStatus(i, e),
        i.hasClass("for-identified-user") && b.EntryForm.setupIdentifiedUserForm(i, e)),
        a(document).on("olv:report:done", h),
        i.on("olv:entryform:post:done", f);
        var j = i.find(".cancel-button");
        j.on("click", g),
        e.done(function() {
            //showButton.off("click"),
            a(document).off("olv:report:done", h),
            i.off("olv:entryform:post:done", f),
            j.off("click", g)
        })
    }),
    b.router.connect("^/users/[^\/]+(/friends|/following|/followers|/yeahs|/posts|/comments)?$", function(c, d, e) {
		if($("body").attr("sess-usern") == (c[0].split('/users/')[1])) {
		b.Closed.changesel('mymenu');
		}
        function f(c, d) {
            b.Form.toggleDisabled(a(c.target), !0)
        }
        function g(b, c) {
            a("#user-content.is-visitor").length && a("#js-following-count").text(c)
        }
        b.User.setupFollowButton(e, {
            container: ".main-column",
            noReloadOnFollow: !0
        }),
		$('.friend-button.create').on('click', function(a) {
			a.preventDefault()
			fr = new b.ModalWindow($('div[data-modal-types=post-friend-request]'));fr.open();
		})
		$('div[data-modal-types=post-friend-request] input.post-button').on('click', function(g){
					g.preventDefault();
					b.Form.toggleDisabled($(this), true);
					b.Form.post($('.friend-button.create').attr('data-action'), $('div[data-modal-types=post-friend-request] form').serializeArray()).done(function() {
						fr.close();
						b.Form.toggleDisabled($(this), false);
						b.Net.reload()
				})
			})
		
		$('.friend-button.accept').on('click', function(g) {
			g.preventDefault()
			fr = new b.ModalWindow($('div[data-modal-types=accept-friend-request]'));fr.open();
		})
		$('div[data-modal-types=accept-friend-request] .ok-button.post-button').on('click', function(g){
					g.preventDefault();
					b.Form.toggleDisabled($(this), true);
				b.Form.post($('div[data-modal-types=accept-friend-request]').attr('data-action')).done(function(){
								b.Form.toggleDisabled($(this), false);
								fr.close();
								b.Net.reload();
							})
			})
		$('div[data-modal-types=accept-friend-request] .cancel-button').on('click', function(g){
					g.preventDefault();
				b.showConfirm('Reject Friend Request', 'Are you sure you really want to reject '+ b.SimpleDialog.htmlLineBreak($('div[data-modal-types=accept-friend-request]').attr('data-screen-name')) +'\'s friend request?', {
                    cancelLabel: "No",
                    okLabel: "Yes"
                })
						$('.ok-button.black-button').on('click', function(g) {
							b.Form.post($('div[data-modal-types=accept-friend-request]').attr('data-reject-action')).done(function(){
								fr.close();
								b.Net.reload()
							})
					})
			})
		$('.friend-button.cancel').on('click', function(g) {
			g.preventDefault()
			b.showConfirm('Cancel Friend Request', 'Are you sure you really want to cancel your friend request to '+ b.SimpleDialog.htmlLineBreak($('.friend-button.cancel').attr('data-screen-name')) +'?', {
                    cancelLabel: "No",
                    okLabel: "Yes"
                })
						$('.ok-button.black-button').on('click', function(g) {
							b.Form.post($('.friend-button.cancel').attr('data-action')).done(function(){
								b.Net.reload()
							})
					})
		})
		$('.friend-button.delete').on('click', function(g) {
			g.preventDefault()
			b.showConfirm('Unfriend', 'Are you sure you really want to unfriend '+ b.SimpleDialog.htmlLineBreak($('.friend-button.delete').attr('data-screen-name')) +"? Your messages will not be deleted.", {
                    cancelLabel: "No",
                    okLabel: "Yes"
                })
						$('.ok-button.black-button').on('click', function(g) {
							b.Form.toggleDisabled($(this), true);
							b.Form.post($('.friend-button.delete').attr('data-action')).done(function(){
								b.Form.toggleDisabled($(this), false);
								b.Net.reload();
							})
					})
		})
		b.User.setupUserSidebar(e)
        b.Entry.setupHiddenContents(e),
        a(document).on("olv:report:done", f),
        a(document).on("olv:visitor:following-count:change", g),
        e.done(function() {
            //showButton.off("click"),
            a(document).off("olv:report:done", f),
            a(document).off("olv:visitor:following-count:change", g)
        }),
        b.Entry.setupEmpathyButtons(e)
    }),
    b.router.connect("^/users/[^\/]+/favorites$", function(a, c, d) {
        b.Content.autopagerize(".community-list", d)
    }),
	b.router.connect("^/login/$|^/signup/$", function(c, d, e) {
		function lfinish(b) {
		window.location.href=b
		//a('body').attr('sess-usern', a('input[name=username]').val())
		//b.Net.go(b)
		}
		cac = function (){
			$.ajax({
				type: 'POST',
				url: window.location.href,
				data: $('form').serialize(),
				success: lfinish,
				error: function(e){
					$('p.red').text(e.responseText);
				}, beforeSend:function(){NProgress.start()},complete:function(){NProgress.done()}})
		};
		a("form[method=post]").on("submit", function(e) {
			e.preventDefault();
				a.ajax({
				type: 'POST', url: window.location.href, data: a("form").serialize(),
				success: function(s) {
				lfinish(s);
				},
				error: function(s) {
				$("p.red").text(s.responseText);
					if(window.grecaptcha) grecaptcha.reset();
				},
				beforeSend: function() {
				NProgress.start();
				},
				complete: function() {
				NProgress.done();
				}
				});
		});
			
			// Is there an NNID field? (signup)
			// TODO: Make this way better and don't have this duplicated like it is now
			if($('h3.label.nnid').length) {
					inp = $('input[type=text][name=origin_id]')
					icon = $('h3.label.nnid > label > img')
						function getmiim() {
							if(b.Closed.blank.test(inp.val())) {
								icon.addClass('none');
								icon.attr('src', '');
								$('p.red').html(null);
								return false;
							}
							if(!inp.val().match(/^[^\/]{6,16}$/)) {
								$('p.red').html('The NNID provided is invalid.')
								return false;
							} else {
								$('p.red').html(null);
							}
								$.ajax({
									url: inp.attr('data-action'),
									type: 'POST', data: b.Form.csrftoken({'a': inp.val()}),
									success: function(a) {
										if(a == '') {
											icon.addClass('none');
											icon.attr('src', '');
										} else {
											icon.removeClass('none');
											icon.attr('src', 'https://mii-secure.cdn.nintendo.net/' + a + '_happy_face.png');
										}
									}, error: function(a) {
										$('p.red').html(a.responseText);
										icon.addClass('none');
										icon.attr('src', '');
									},
									beforeSend:function(){NProgress.start()},complete:function(){NProgress.done()}
								})
						}
							var timer;
					inp.on('input', function() {
						clearTimeout(timer);
						timer = setTimeout(getmiim, 500);
					})
			}
	}),
	b.router.connect("^/reset/$", function(d, c, f) {
		$("form[method=post]").on("submit", function(e) {
			e.preventDefault();
				$.ajax({
				type: 'POST', url: window.location.href, data: $("form").serialize(),
				success: function(s) {
				$("p.red").addClass("green"),$("p.red").text(s)
				},
				error: function(s) {
				$("p.red").text(s.responseText)
				},
				beforeSend: function() {
				NProgress.start();
				},
				complete: function() {
				NProgress.done();
				}
				});
		})
	}),
	b.router.connect("^/server$", function() {
		$('button.reload-btn').on('click',function(e){
			NProgress.start();
			var thing = $.getJSON(window.location.href, { json: '1' }, function(tt) {
				NProgress.done();
				$('#guide > div > ul > li:nth-child(1) > strong').html(tt['communities']),
				$('#guide > div > ul > li:nth-child(2) > strong').html(tt['posts']),
				$('#guide > div > ul > li:nth-child(3) > strong').html(tt['users']),
				$('#guide > div > ul > li:nth-child(4) > strong').html(tt['comments']),
				$('#guide > div > ul > li:nth-child(5) > strong').html(tt['messages']),
				$('#guide > div > ul > li:nth-child(6) > strong').html(tt['yeahs']),
				$('#guide > div > ul > li:nth-child(7) > strong').html(tt['complaints']),
				$('#guide > div > ul > li:nth-child(8) > strong').html(tt['notifications']),
				$('#guide > div > ul > li:nth-child(9) > strong').html(tt['follows']),
				$('#guide > div > ul > li:nth-child(10) > strong').html(tt['friendships']);
			});
		})
	}),
		b.router.connect("^/man/?$", function(c, d, e) {
			$('li.setting-pruge1 > form > button').click(function(a) {
				a.preventDefault();
				if(confirm("Really? This is PERMANENT!!!!!!!!")) {
					Olv.Form.post(location.href, $('li.setting-pruge1 > form').serializeArray()).done(function(response) {
						Olv.showMessage('', response);
					});
				}
			});
			$('li.setting-pruge2 > form > button').click(function(a) {
				a.preventDefault();
				if(confirm("Really? This is recoverable.")) {
					Olv.Form.post(location.href, $('li.setting-pruge2 > form').serializeArray()).done(function(response) {
						Olv.showMessage('', response);
					});
				}
			});
			$('li.setting-pruge3 > form > button').click(function(a) {
				a.preventDefault();
				if(confirm("Really? Friendships can't be recovered.")) {
					Olv.Form.post(location.href, $('li.setting-pruge3 > form').serializeArray()).done(function(response) {
						Olv.showMessage('', response);
					});
				}
			});
			$('li.setting-pruge4 > form > button').click(function(a) {
				a.preventDefault();
				if(confirm("Really? This is permanent.")) {
					Olv.Form.post(location.href, $('li.setting-pruge4 > form').serializeArray()).done(function(response) {
						Olv.showMessage('', response);
					});
				}
			});
			$('li.setting-pruge5 > form > button').click(function(a) {
				a.preventDefault();
				if(confirm("Really? This is permanent.")) {
					Olv.Form.post(location.href, $('li.setting-pruge5 > form').serializeArray()).done(function(response) {
						Olv.showMessage('', response);
					});
				}
			});
			$('li.setting-unpurge1 > form > button').click(function(a) {
				a.preventDefault();
				if(confirm("Really? This is permanent.")) {
					Olv.Form.post(location.href, $('li.setting-unpurge1 > form').serializeArray()).done(function(response) {
						Olv.showMessage('', response);
					});
				}
			});
		}),
    	b.router.connect("^/man/users$", function(c, d, e) {
			function openUserModal(user) {
				$('#user-man-template > div > div > h1.window-title').text('Manage "' + user.username + '"');
				$('div.user-info').html(user.html);
				$('input[name=username]').val(user.username);
				$('input[name=email]').val(user.email);
				$('input[name=addr]').val(user.addr);
				$('form.goodform').attr('data-action', user.manager);
				if(user.is_active) {
					$('input[name=active]').prop('checked', true);
				} else {
					$('input[name=active]').prop('checked', false);
				}
				
				var g = new b.ModalWindow($('#user-man-template'));g.open();
				$('form.goodform').submit(function(a) {
					a.preventDefault();
					//alert('doing it');
					b.Form.post($('form.goodform').attr('data-action'), $('form.goodform').serializeArray()).done(g.close());
				})
			}
		b.Form.get('/man/users_list' + location.search).done(function(a) {
			$('.user-loads').html(a);
			b.Content.autopagerize('#user-man-list', e);
			$('button.user-manage').on('click',function() {
				NProgress.start();
				b.Form.get($(this).parent().parent().attr('data-action')).done(function(a) {
					NProgress.done();
					openUserModal(a);
					b.print(a);
				});
			});
		});
	}),
    b.router.connect("^/settings/(?:account|profile)$", function(c, d, e) {
		b.Closed.changesel('mymenu')
			// If we are on profile settings..
			if(c[0][10] == 'p') {
			$('.get-ipinfo').on('click', function(e){
					e.preventDefault();
					$.ajax({url: 'https://ipinfo.io/region',
					beforeSend:function(){NProgress.start()},complete:function(){NProgress.done()},
					success: function(a) {
						$('input[name=country]').val($.trim(a))
						b.showMessage('', "Your region has been recieved from ipinfo.io as \"" + $.trim(a) + "\". Please note that this was recieved by your browser. If it's inaccurate, you might be using a proxy.\n\nThis has not been saved. Please be sure you want to share your region when you save.")
						}, error: function() {
						b.showMessage('', "Failed to get your region from ipinfo.io for some reason.")
						}
					})
				})
//			if($('.setting-nnid').length) {
				
				inp = $('input[type=text][name=origin_id]')
					function getmiimtwo() {
						if(!inp.val().match(/^[^\/]{6,16}$/)) {
							$('p.error').html('The NNID provided is invalid.')
							return false
						} else {
							$('p.error').html(null)
						}
							$.ajax({
								url: inp.attr('data-action'),
								type: 'POST', data: b.Form.csrftoken({'a': inp.val()}),
								success: function(a) {
									if(a == '') {
										$('.nnid-icon.mii').attr('src', '');
									} else {
										$('.nnid-icon.mii').attr('src', 'https://mii-secure.cdn.nintendo.net/' + a + '_normal_face.png');
									}
									$('input[name=mh]').val(a);
								}, error: function(a) {
									$('p.error').html(a.responseText);
								},
								beforeSend:function(){NProgress.start()},complete:function(){NProgress.done()}
							})
					}
						var timer;
				inp.on('input', function() {
				    clearTimeout(timer);
					if(inp.val()) {
						timer = setTimeout(getmiimtwo, 500);
					}
				})
				
				$('input[name=avatar][value=0]').change(function() {
						$('.setting-avatar > .icon-container > .nnid-icon.mii').removeClass('none');
						$('.nnid-icon.gravatar').addClass('none');
				})
				$('input[name=avatar][value=1]').change(function() {
						$('.setting-avatar > .icon-container > .nnid-icon.mii').addClass('none');
						$('.nnid-icon.gravatar').removeClass('none');
				})
				$('.color-thing').click(function(a) {
					a.preventDefault();
						$('.color-thing').spectrum({
							color: $('input[name=color]'),
							preferredFormat: "hex",
							showInput: true,
							flat: true,
							change: function(color) {
								$('.nick-name').attr('style', 'color:' + color);
								$('input[name=color]').val(color);
							}
						});
					$('div.form-buttons > input').click(function(a) {
						$('.color-thing').spectrum('destroy');
					});
				});
//			}
	}
		b.User.setupUserSidebar(e)
        function f(c) {
            var d = a(this)
              , e = d.closest("form");
            b.Form.isDisabled(d) || c.isDefaultPrevented() || (c.preventDefault(),
            b.Form.submit(e, d).done(function(a) {
                b.Net.reload()
            }))
        }
        function g(c) {
            var d = a(this);
            b.showConfirm(b.loc("olv.portal.profile_post"), b.loc("olv.portal.profile_post.confirm_remove"), {
                okLabel: b.loc("olv.portal.button.remove"),
                cancelLabel: b.loc("olv.portal.stop")
            }).done(function(a) {
                a && b.Form.post("/settings/profile_post.unset.json", null, d).done(function() {
                    d.trigger("olv:entry:profile-post:remove"),
                    d.remove()
                })
            })
        }
        function h(b) {
            var c = a()
              , d = a()
              , e = a("#favorite-game-genre select");
            e.each(function() {
                var b = a(this)
                  , d = b.find("option[value=" + b.val() + "]").attr("data-is-configurable")
                  , f = null != d && "0" != d;
                if (f) {
                    var g = e.filter(function() {
                        return !a(this).is(b)
                    });
                    g.each(function() {
                        var d = a(this)
                          , e = d.find("option[value=" + b.val() + "]");
                        c = c.add(e)
                    })
                }
            }),
            d = e.find("option").filter(function() {
                return !a(this).is(c)
            }),
            c.prop("disabled", !0),
            d.prop("disabled", !1)
        }
        h(),
        a(document).on("click", ".apply-button", f),
        a(document).on("click", "#profile-post", g),
        a(document).on("change", "#favorite-game-genre select", h),
        e.done(function() {
            a(document).off("click", ".apply-button", f),
            a(document).off("click", "#profile-post", g),
            a(document).off("change", "#favorite-game-genre select", h)
        })
    }),
    b.router.connect("^(/users/[^\/]+/communities/(favorites|played)|/my_menu)", function(a, c, d) {
		b.Closed.changesel('community');
        b.User.setupUserSidebar(d)
    }),
    b.router.connect("^/communities/[0-9]+", function(a, c, d) {
		b.Closed.changesel("community");
        if($("#post-form").length) {
			setupPostForm2()
		}
        b.Community.setupCommunitySidebar(d);
    }),
	/*
	b.router.connect("^/news/.*$", function(c, d, e) {
	b.Closed.changesel("news");
	}),
	*/
    b.init.done(function(a) {
        a(document).on("olv:modal:report-violation olv:modal:report-violator", function(a, b, c) {
            function d() {
                var a = g.find("option:selected").attr("data-track-action");
                e.attr("data-track-action", a)
            }
            var e = b.element.find(".post-button")
              , f = b.triggerElement.attr("data-can-report-spoiler")
              , g = "1" === f ? b.element.find("select.can-report-spoiler") : "0" === f ? b.element.find("select.cannot-report-spoiler") : b.element.find('select[name="type"]')
              , h = b.triggerElement.attr("data-track-label")
              , i = b.triggerElement.attr("data-url-id") || "";
            e.attr("data-track-label", h),
            e.attr("data-url-id", i),
            g.on("change", d),
            c.done(function() {
                g.off("change", d)
            })
        });
        var c = function(a) {
            var b = a.find("input[type=submit]")
              , c = a.find('input[name="album_image_id"]').length && a.find('input[name="album_image_id"]').val().length > 0
              , d = a.find('input[name="screenshot"]').length && a.find('input[name="screenshot"]').val().length > 0;
            b.attr("data-post-with-screenshot", c || d ? "screenshot" : "nodata")
        };
        a(document).on("olv:entryform:updatescreenshot", function(b) {
            var d = a(b.target);
            c(d)
        }),
        a(document).on("olv:entryform:fileselect", function(b, c) {
            var d = a(b.target)
              , e = a(c).find('input[type="submit"]');
            "screenshot" === d.attr("name") ? e.attr("data-post-with-screenshot", "screenshot") : "painting" === d.attr("name") && e.attr("data-post-content-type", "draw")
        }),
        a(document).on("olv:entryform:reset", function(b) {
            var d = a(b.target)
              , e = d.find("input[type=submit]");
            e.attr("data-post-content-type", "text"),
            setTimeout(function() {
                c(d)
            }, 0)
			    if($("input[name=painting]").val()) {
				$("#drawing").remove();
				$("input[name=painting]").attr("value", "");
					}
        })
		a(document).on("olv:entryform:post:done", function(b) {
			var d = $("span.remaining-today-post-count");
			if(d.length) {
				d.text(+(d.text()) - 1);
			}
		})
    }))
}
).call(this, jQuery, Olv);
// TODO: Make this locale way better, remove unnecessary things, actually use stuff from this
Olv.Locale.Data={
"olv.portal.age_gate.select_label":{value:"Please enter your date of birth."},"olv.portal.album.delete_confirm":{value:"Are you sure you want to delete this?"},"olv.portal.button.remove":{value:"Yes"},"olv.portal.cancel":{value:"Cancel"},"olv.portal.close":{value:"Close"},"olv.portal.dialog.apply_settings_done":{value:"Settings saved."},"olv.portal.dialog.report_spoiler_done":{value:"Spoiler reported. Thank you for your help!"},"olv.portal.dialog.report_violation_done":{value:"Violation reported. Thank you for your help!"},"olv.portal.edit.action.close_topic_post":{value:"Close for Comments"},"olv.portal.edit.action.close_topic_post.confirm":{value:"It will no longer be possible to post comments on this discussion. Is that OK? (This action cannot be reversed.)"},"olv.portal.edit.edit_post":{value:"Edit Post"},"olv.portal.edit.edit_reply":{value:"Edit Comment"},"olv.portal.error.500.for_offdevice":{value:"An error occurred.\nPlease try again later."},"olv.portal.error.album_limit_exceeded":{value:"Unable to save because the maximum number of screenshots that can be saved has been reached. Please delete some saved screenshots, and then try again."},"olv.portal.error.code":{args:[1],value:"Error Code: %s"},"olv.portal.error.code %1":{args:[1],value:"Error Code: %s"},"olv.portal.error.code [_1]":{args:[1],value:"Error Code: %s"},"olv.portal.error.daily_post_limit_exceeded":{value:"You have already exceeded the number of posts that you can contribute in a single day. Please try again tomorrow."},"olv.portal.error.failed_to_connect.for_offdevice":{value:"An error occurred."},"olv.portal.error.network_unavailable.for_offdevice":{value:"Cannot connect to the Internet. Please check your network connection and try again."},"olv.portal.error.post_time_restriction":{args:[],value:"Multiple posts cannot be made in such a short period of time. Please try posting again later."},"olv.portal.error.post_time_restriction %1":{args:[],value:"Multiple posts cannot be made in such a short period of time. Please try posting again later."},"olv.portal.error.post_time_restriction [_1]":{args:[],value:"Multiple posts cannot be made in such a short period of time. Please try posting again later."},"olv.portal.followlist.confirm_unfollow_with_name":{args:[1],value:"Remove %s from your follow list?"},"olv.portal.followlist.confirm_unfollow_with_name %1":{args:[1],value:"Remove %s from your follow list?"},"olv.portal.followlist.confirm_unfollow_with_name [_1]":{args:[1],value:"Remove %s from your follow list?"},"olv.portal.miitoo.frustrated":{value:"Yeah..."},"olv.portal.miitoo.frustrated.delete":{value:"Unyeah"},"olv.portal.miitoo.happy":{value:"Yeah!"},"olv.portal.miitoo.happy.delete":{value:"Unyeah"},"olv.portal.miitoo.like":{value:"Yeah♥"},"olv.portal.miitoo.like.delete":{value:"Unyeah"},"olv.portal.miitoo.normal":{value:"Yeah!"},"olv.portal.miitoo.normal.delete":{value:"Unyeah"},"olv.portal.miitoo.puzzled":{value:"Yeah..."},"olv.portal.miitoo.puzzled.delete":{value:"Unyeah"},"olv.portal.miitoo.surprised":{value:"Yeah!?"},"olv.portal.miitoo.surprised.delete":{value:"Unyeah"},"olv.portal.ok":{value:"OK"},"olv.portal.post.delete_confirm":{value:"Delete this post?"},"olv.portal.profile_post":{value:"Favorite Post"},"olv.portal.profile_post.confirm_remove":{value:"Remove this post from your profile?\nThe original post will not be deleted."},"olv.portal.profile_post.confirm_update":{value:"Set this post as your favorite?\nPlease note, it will replace any existing favorite post."},"olv.portal.profile_post.confirm_update.yes":{value:"OK"},"olv.portal.profile_post.done":{value:"Your favorite post has been set.\nWould you like to view your profile?"},"olv.portal.read_more_content":{value:"Read More"},"olv.portal.reply.delete_confirm":{value:"Delete this comment?"},"olv.portal.report.report_comment_id":{args:[1],value:"Comment ID: %s"},"olv.portal.report.report_comment_id %1":{args:[1],value:"Comment ID: %s"},"olv.portal.report.report_comment_id [_1]":{args:[1],value:"Comment ID: %s"},"olv.portal.report.report_post_id":{args:[1],value:"Post ID: %s"},"olv.portal.report.report_post_id %1":{args:[1],value:"Post ID: %s"},"olv.portal.report.report_post_id [_1]":{args:[1],value:"Post ID: %s"},"olv.portal.report.report_spoiler":{args:[],value:"Report Spoilers to Openverse Administrators"},"olv.portal.report.report_spoiler %1":{args:[],value:"Report Spoilers to Openverse Administrators"},"olv.portal.report.report_spoiler [_1]":{args:[],value:"Report Spoilers to Openverse Administrators"},"olv.portal.report.report_spoiler_comment":{args:[],value:"Report Spoilers to Openverse Administrators"},"olv.portal.report.report_spoiler_comment %1":{args:[],value:"Report Spoilers to Openverse Administrators"},"olv.portal.report.report_spoiler_comment [_1]":{args:[],value:"Report Spoilers to Openverse Administrators"},"olv.portal.report.report_violation":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.report.report_violation %1":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.report.report_violation [_1]":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.report.report_violation_comment":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.report.report_violation_comment %1":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.report.report_violation_comment [_1]":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.report.report_violation_message":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.report.report_violation_message %1":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.report.report_violation_message [_1]":{args:[],value:"Report Violation to Openverse Administrators"},"olv.portal.setup":{value:"Set Up"},"olv.portal.show_more_content":{value:"View Entire Post"},"olv.portal.stop":{value:"Cancel"},"olv.portal.unfollow":{value:"Unfollow"},"olv.portal.user.search.go":{value:"View Profile"},"olv.portal.yes":{value:"Yes"}};
$(document).pjax("a",pjax_container),$(document).on('pjax:timeout',function(){return false});
$(document).on('pjax:error', function(event, xhr, textStatus, errorThrown, options) {
Olv.Net.errorFeedbackHandler(event, textStatus, xhr, options);
if(textStatus != 'abort') 
	history.back();
return false;
});
if(loading_animate) {
$(document).on('pjax:send',function(){NProgress.start()});
$(document).on('pjax:complete', function(){NProgress.done()});
}

$(document).on('pjax:complete',function(){
Olv.init.done();
});
