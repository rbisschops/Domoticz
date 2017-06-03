/*
 	Copyright 2017 Ralph Bisschops
	Version 1.0a50
	Libary of functions used on the dashboard
*/	

var dashboard =
{
    event: /* --- Bind an event to the selected dom element --- */
    {
        "click":
        {
           bind: function(dom,target)
           {
               $(target).off('click', dom).on('click', dom, function () {});
           },
           unbind: function (dom, target)
           {
               $(target).off('click', dom, function () {});
           }
        }
    },

    dom:    /* --- Append HTML to DOM element --- */
	{
		"append":
		{
			toid: function(dom, target, content)
			{
				$("<div/>", {
                    "id": dom,
                    html: content
                }).appendTo(target);
				dashboard.debug.console("appended <div> element " + dom + " to " + target + " as id");
			},
			toclass: function(dom, target, content)
			{
                $("<div/>", {
                    "class": dom,
                    html: content
                }).appendTo(target);
                dashboard.debug.console("appended <div> element " + dom + " to " + target + " as class");
			},
			top: function(dom, target, content)
			{
                $("<p/>", {
                    "class": dom,
                    html: content
                }).appendTo(target);
                dashboard.debug.console("appended <div> element " + dom + " to " + target + " as class");
			}			
		},
		"prepend":
		{
			toid: function(dom,target,content)
			{
				$("<div/>", {
                    "id": dom,
                    html: content
				}).prependTo(target);
				dashboard.debug.console("prepended <div> element " + dom + " to " + target + " as id");

			},
			toclass: function(dom,target,content)
			{
				$("<div/>", {
                    "class": dom,
                    html: content
				}).prependTo(target);
				dashboard.debug.console("prepended <div> element " + dom + " to " + target + " as class");
			}
		},
		"remove":
		{
		    rmdom: function (dom)
		    {
		        $(dom).remove();
		    },
		    rmclass: function (dom, target)
			{
				$(target).remove(dom);
			},
			rmall: function (target)
			{
				$(target).empty();
			}
		}
	},
    get:
	{
		"data":
		{
			json: function (file, mode)
			{
				var _mydata=[];
				$.ajax({
					url: file,
					async: mode,
					cache: false,
					dataType:"json",
					success: function(){

					},
					error: function (request, status, error) {
                    	alert("Failed loading file. Reported error : " + " " + error + " " + file);
                    },
					complete: function(_data){
						_mydata = _data.responseJSON[0];
						dashboard.debug.console("successfully processed " + file);
					}	
				});
				return _mydata;	
			}
		},
		"script":
		{ 
			js: function (file)
			{
				$.getScript( file)
  				.done(function( script, textStatus ) {
    				dashboard.debug.console("successfully processed " + file);
				})
				.fail(function (jqxhr, settings, exception ) {
    				alert("Failed loading file. Reported error : " + " " + exception + " " + file);
				});
  			}
		}
	},
    debug:
    {
        console: function (message)
        {
            if (gSetDebug == true) {
                console.log(message);
            };
        }
    },
	domoticz:
    {
        /*--- Sent data to Domoticz ---*/
        "sent":{
			//sent functions go here
            
        },
		/*--- Receive data from Domoticz ---*/
        "receive": {
			devices: function (link)
			{
				link.dataType = 'jsonp';
				$.ajax(link);

				// figure out what the callback fn is
				var _script = $(document.getElementsByTagName('head')[0].firstChild);
				var _url = _script.attr('src') || '';
				var _cb = (_url.match(/callback=(\w+)/)||[])[1];
				if (!_cb)
					return; // bail
				var _t = 0, _cbFn = window[_cb];

				_script[0].onerror = function(e) {
					_script.remove();
					handleError(link, {}, "error", e);
					clearTimeout(_t);
				};

				if (!link.timeout)
					return;

				window[_cb] = function(json) {
					clearTimeout(_t);
					_cbFn(json);
					_cbFn = null;
				};

				_t = setTimeout(function() {
					_script.remove();
					handleError(link, {}, "timeout");
					if (_cbFn)
						window[_cb] = function(){};
				}, link.timeout);

				function handleError(link, o, msg, e) {
					// support jquery versions before and after 1.4.3
					($.ajax.handleError || $.handleError)(s, o, msg, e);
				}
			}
        }
    }	
}

$.handleError = function(s, xhr, status, e) {
    // If a local callback was specified, fire it
    if ( s.error ) {
        s.error.call( s.context || window, xhr, status, e );
    }

    // Fire the global callback
    if ( s.global ) {
        (s.context ? jQuery(s.context) : jQuery.event).trigger( "ajaxError", [xhr, s, e] );
    }
};