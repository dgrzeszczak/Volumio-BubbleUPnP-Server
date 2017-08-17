'use strict';

var libQ = require('kew');
var fs=require('fs-extra');
var config = new (require('v-conf'))();
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;

module.exports = volumioBubbleupnpServer;
function volumioBubbleupnpServer(context) {
	var self = this;

	this.context = context;
	this.commandRouter = this.context.coreCommand;
	this.logger = this.context.logger;
	this.configManager = this.context.configManager;

}


volumioBubbleupnpServer.prototype.openSettings = function() {
    var self = this; 
    self.commandRouter.pushToastMessage('info', 'open settings');
}

volumioBubbleupnpServer.prototype.onVolumioStart = function()
{
	var self = this;
	var configFile=this.commandRouter.pluginManager.getConfigurationFile(this.context,'config.json');
	this.config = new (require('v-conf'))();
	this.config.loadFile(configFile);

    return libQ.resolve();
}

volumioBubbleupnpServer.prototype.onStart = function() {
    var self = this;
    var defer = libQ.defer();

    exec("/opt/bin/bubbleupnpserver start", function (error, stdout, stderr) {
	if (error) {
	    self.commandRouter.pushToastMessage('error', 'Starting BubbleUPnP Server failed with error: ' + error);
	    defer.reject();
	} else {
	    self.commandRouter.pushToastMessage('info', 'BubbleUPnP Server started');
	    defer.resolve();
	}
    });

    return defer.promise;
};

volumioBubbleupnpServer.prototype.onStop = function() {
    var self = this;
    var defer = libQ.defer();
    
    exec("/opt/bin/bubbleupnpserver stop", function (error, stdout, stderr) {
	if (error) {
	    self.commandRouter.pushToastMessage('error', 'Sopping BubbleUPnP Server failed with error: ' + error);
	    defer.reject();
	} else {
	    self.commandRouter.pushToastMessage('info', 'BubbleUPnP Server stopped');
	    defer.resolve();
	}
    });

    return defer.promise;
};

volumioBubbleupnpServer.prototype.onRestart = function() {
    var self = this;
    // Optional, use if you need it
};


// Configuration Methods -----------------------------------------------------------------------------

volumioBubbleupnpServer.prototype.getUIConfig = function() {
    var defer = libQ.defer();
    var self = this;

    var lang_code = this.commandRouter.sharedVars.get('language_code');

    self.commandRouter.i18nJson(__dirname+'/i18n/strings_'+lang_code+'.json',
        __dirname+'/i18n/strings_en.json',
        __dirname + '/UIConfig.json')
        .then(function(uiconf)
        {


            defer.resolve(uiconf);
        })
        .fail(function()
        {
            defer.reject(new Error());
        });

    return defer.promise;
};


volumioBubbleupnpServer.prototype.setUIConfig = function(data) {
	var self = this;
	//Perform your installation tasks here
};

volumioBubbleupnpServer.prototype.getConf = function(varName) {
	var self = this;
	//Perform your installation tasks here
};

volumioBubbleupnpServer.prototype.setConf = function(varName, varValue) {
	var self = this;
	//Perform your installation tasks here
};



// Playback Controls ---------------------------------------------------------------------------------------
// If your plugin is not a music_sevice don't use this part and delete it


volumioBubbleupnpServer.prototype.addToBrowseSources = function () {

	// Use this function to add your music service plugin to music sources
    //var data = {name: 'Spotify', uri: 'spotify',plugin_type:'music_service',plugin_name:'spop'};
    this.commandRouter.volumioAddToBrowseSources(data);
};

volumioBubbleupnpServer.prototype.handleBrowseUri = function (curUri) {
    var self = this;

    //self.commandRouter.logger.info(curUri);
    var response;


    return response;
};



// Define a method to clear, add, and play an array of tracks
volumioBubbleupnpServer.prototype.clearAddPlayTrack = function(track) {
	var self = this;
	self.commandRouter.pushConsoleMessage('[' + Date.now() + '] ' + 'volumioBubbleupnpServer::clearAddPlayTrack');

	self.commandRouter.logger.info(JSON.stringify(track));

	return self.sendSpopCommand('uplay', [track.uri]);
};

volumioBubbleupnpServer.prototype.seek = function (timepos) {
    this.commandRouter.pushConsoleMessage('[' + Date.now() + '] ' + 'volumioBubbleupnpServer::seek to ' + timepos);

    return this.sendSpopCommand('seek '+timepos, []);
};

// Stop
volumioBubbleupnpServer.prototype.stop = function() {
	var self = this;
	self.commandRouter.pushConsoleMessage('[' + Date.now() + '] ' + 'volumioBubbleupnpServer::stop');


};

// Spop pause
volumioBubbleupnpServer.prototype.pause = function() {
	var self = this;
	self.commandRouter.pushConsoleMessage('[' + Date.now() + '] ' + 'volumioBubbleupnpServer::pause');


};

// Get state
volumioBubbleupnpServer.prototype.getState = function() {
	var self = this;
	self.commandRouter.pushConsoleMessage('[' + Date.now() + '] ' + 'volumioBubbleupnpServer::getState');


};

//Parse state
volumioBubbleupnpServer.prototype.parseState = function(sState) {
	var self = this;
	self.commandRouter.pushConsoleMessage('[' + Date.now() + '] ' + 'volumioBubbleupnpServer::parseState');

	//Use this method to parse the state and eventually send it with the following function
};

// Announce updated State
volumioBubbleupnpServer.prototype.pushState = function(state) {
	var self = this;
	self.commandRouter.pushConsoleMessage('[' + Date.now() + '] ' + 'volumioBubbleupnpServer::pushState');

	return self.commandRouter.servicePushState(state, self.servicename);
};


volumioBubbleupnpServer.prototype.explodeUri = function(uri) {
	var self = this;
	var defer=libQ.defer();

	// Mandatory: retrieve all info for a given URI

	return defer.promise;
};

volumioBubbleupnpServer.prototype.getAlbumArt = function (data, path) {

	var artist, album;

	if (data != undefined && data.path != undefined) {
		path = data.path;
	}

	var web;

	if (data != undefined && data.artist != undefined) {
		artist = data.artist;
		if (data.album != undefined)
			album = data.album;
		else album = data.artist;

		web = '?web=' + nodetools.urlEncode(artist) + '/' + nodetools.urlEncode(album) + '/large'
	}

	var url = '/albumart';

	if (web != undefined)
		url = url + web;

	if (web != undefined && path != undefined)
		url = url + '&';
	else if (path != undefined)
		url = url + '?';

	if (path != undefined)
		url = url + 'path=' + nodetools.urlEncode(path);

	return url;
};





volumioBubbleupnpServer.prototype.search = function (query) {
	var self=this;
	var defer=libQ.defer();

	// Mandatory, search. You can divide the search in sections using following functions

	return defer.promise;
};

volumioBubbleupnpServer.prototype._searchArtists = function (results) {

};

volumioBubbleupnpServer.prototype._searchAlbums = function (results) {

};

volumioBubbleupnpServer.prototype._searchPlaylists = function (results) {


};

volumioBubbleupnpServer.prototype._searchTracks = function (results) {

};
