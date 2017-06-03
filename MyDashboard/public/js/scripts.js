/*
 	Copyright Ralph Bisschops
	Version 1.0a001
	Base functions and routines used on the dashboard
*/

//== Global variables 
//
//## Used throughout the entire frontend
//## All global vars are starting with 'g'
//## Important vars are CAPITALS only 
var gSetDebug = true;
var SETTINGS = "config/configuration.json"; // declares the location of the configurations file, fixed, don't change!!
var gConfiguration;                         // holds all configuration parameters, used as object(s) 
var gLanguage;                              // hold all language parameters, used as object(s) 
var gTempSymbol = "°C";                     // Used to store the temperature symbol
var gCache;                                 // holds the cache time??
var gReq;                                   // Used for downloading data from Domoticz. Find out why used.
var gMobile = false                         // Check if the device is a mobile device, initiate as false
var gCache                                  // Used for storing the current timestamp
var gFiles = {                              // object for storing file locations, used as object(s)
    menu: null,
    language: null
    };
var gBlocks = []                            // Object for storing all configured blocks (from blocks.json)
var gSreens = []                            // Object for storing all configured screens (from screens.json)
var gButtons = []                           // Object for storing all configured buttons (from buttons.json)
var gDevices = []                           // Object for storing all Device data (from Domoticz)
var gSunRiseSet = []                        // Object for storing Sunrise and Sunset data (from Domoticz)

$('<link href="bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet" type="text/css">').appendTo("head");
$('<link href="bower_components/bootstrap/dist/css/bootstrap-theme.min.css" rel="stylesheet" type="text/css">').appendTo("head");
//$('<link href="bower_components/bootstrap/dist/css/ie10-viewport-bug-workaround.css" rel="stylesheet" type="text/css">').appendTo("head");
$('<link href="bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">').appendTo("head");
$('<link href="bower_components/open-sans/css/open-sans.min.css" rel="stylesheet" type="text/css">').appendTo("head");
$('<link href="css/theme.css" rel="stylesheet" type="text/css">').appendTo("head");
$('<link href="css/template.min.css" rel="stylesheet">').appendTo("head");

dashboard.get.script.js("bower_components/bootstrap/dist/js/bootstrap.min.js");
dashboard.get.script.js("bower_components/jquery-ui/jquery-ui.min.js");

//== Initial settings functions 
//
//## Function for running all initial configurations. Runs once at start or refresh

function initialSettings () {
   gCache = new Date ().getTime();
   // set locale 
   if (gConfiguration.locale.fahrenheid=true){ gTempSymbol="°F"}; 
   // device detection
   if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) gMobile = true;
   
   // get the information for blocks, screens and buttons from the configuration files
   gBlocks = dashboard.get.data.json(gFiles.blocks, false);
   gSreens = dashboard.get.data.json(gFiles.screens, false);
   gButtons = dashboard.get.data.json(gFiles.buttons, false);
   getAllDevices();
}

//== Fade progress bar 
//
//## Small function for fading out the progress bar after page load

$(window).on('load', function () {
    $('#dvLoading').fadeOut(500);
});

//== Load progress bar 
//
//##  Load a progress bar in the page 
//##  The progress bar fades out when the page is fully loaded with $window.on('load') function 

function loadProgressbar() {
    dashboard.dom.append.toid('dvLoading', '#page-top', '');
}

//== Load Page elements 
//
//##  Load elements on the page

var load =
{
    header: function () // Load the page header
    {
        var _html = "<div class='MainHeader'><p>" + gLanguage.maintitle + "</p></div>" +
            "<div class='SubHeader'><img src='images/Application_Icon.png' alt='Application'>" +
            "<p>" + gLanguage.subtitle + "</p></div>"
        dashboard.dom.append.toid("", "#header", _html);
        dashboard.debug.console("successfully loaded headers");
    },
    footer: function () // Load the page footer
    {
        var _html = ""
    },
    alert: function (message,weight) //Load an alert to the page, weight is: success, info, warning or danger
    {
        var _html = 
        "<div id='message'>" +
        "<div style='padding: 5px;'>"+ 
        "<div class='alert alert-" + weight + " alert-dismissable'>" +
            "<a href='#' class='close' data-dismiss='alert' aria-label='close'>&times</a>" +
            "<strong>"+ message + "." +
        "</div></div></div>"
        dashboard.dom.append.toid("", "#page-top", _html);
        dashboard.debug.console("successfully loaded alert");
    }
}

//== Get all devices from Domoticz
//
//##  Load all the devices and scenes from Domoticz. Uses call back function.
function getAllDevices () {
    gReq = dashboard.domoticz.receive.devices({
        url: gConfiguration.domoticz.host + "/json.htm?type=devices&filter=all&used=true&order=Name&jsoncallback=?",
        type: "GET",
        async: true,
        contentType: "application/json",
        error: function( jqXHR, textStatus ) {
            load.alert("Domoticz error!\nPlease, double check the path in _HOST_DOMOTICZ-variable!","danger"); 
        },
        success: function(data) {
            gDevices = data;
            dashboard.debug.console("successfully loaded All Domoticz data");
            dashboard.debug.console(gDevices);
        }	    
    });
}

//== Get Sunrise and Sunset from Domoticz
//
//##  Load all the devices and scenes from Domoticz. Uses call back function.
function getSunRiseSet () {
    gReq = dashboard.domoticz.receive.devices({
        url: gConfiguration.domoticz.host + "/json.htm?type=command&param=getSunRiseSet&jsoncallback=?",
        type: "GET",
        async: true,
        contentType: "application/json",
        error: function( jqXHR, textStatus ) {
            load.alert("Domoticz error!\nPlease, double check the path in _HOST_DOMOTICZ-variable!"); 
        },
        success: function(data) {
            gSunRiseSet = data;
            dashboard.debug.console("successfully loaded Sunrise and Sunset");
            dashboard.debug.console(gSunRiseSet);
        }	    
    });
}


$(document).ready(function () {
    // Resizing the text on the pages if the window size changes
    var resizeText = function () {
        // Standard height, for which the body font size is correct
        var preferredFontSize = 120; // %
        var preferredSize = 1920 * 1080;

        var currentSize = $(window).width() * $(window).height();
        var scalePercentage = Math.sqrt(currentSize) / Math.sqrt(preferredSize);
        var newFontSize = preferredFontSize * scalePercentage;
        $('body').css('font-size', newFontSize + '%');
    };
    $(window).bind('resize', function () {
        resizeText();
    }).trigger('resize');
    loadProgressbar(); // Load initial progress bar while page is loading content
    gConfiguration = dashboard.get.data.json(SETTINGS, false);  // Load the configuration files from the server
    gFiles.language = "lang/" + gConfiguration.language + "/translation.json"; // declares the location of the language file (based on base language)
    gLanguage = dashboard.get.data.json(gFiles.language, false);  // Load the language files from the server
    $.each(gConfiguration.filelocations, function (key, val) {
        gFiles[key] = gConfiguration.datafile.location + "/" + val + "." + gConfiguration.datafile.extension; // declares the location of the used data files
    });
    initialSettings ();
});