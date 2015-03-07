"use strict()";
var SonosDiscovery = require("sonos-discovery");
//  tessel = require("tessel");
    // settings ={
    //   port: 5005,
    //   cacheDir: '/tmp/sonoscache'
    // },
    // discovery;

//On launch, look for a Sonos system

//When we find it, set it to the sonos variable
// sonos.system = [foundsystem]
//Once we've found it, we need to look for devices
// sonos.devices = []
//...and groups
// sonos.groups = []

//then set up a method that pauses all groups
//e.g. sonos.groups.forEach(function(group) {
//    group.pause();
//});
//tessel.button.on('push', function() {});
//TODO: Put this into a nice, packagable, module





function SonosVeto(discovery, settings) {
  var context = this,
    zones = [];

  this.discovery = discovery;
  this.settings = settings || {};

  this.getZones = function() {
    this.discovery.getZones(function(zones) {
      context.zones = zones;
    });
  };


  this.pauseAll = function(callback) {
    this.discovery.players.forEach(function(player) {
      // Chuck out the callback to console.log if we haven't got a funciton passed in
      var cb = callback || console.log;
      // TODO: something more logical here?
      player.pause(cb);
    });
  };

  this.playAll = function(callback) {
    // Chuck out the callback to console.log if we haven't got a funciton passed in
    var cb = callback || console.log;
    this.discovery.players.forEach(function(player) {
          // TODO: something more logical here?
      player.pause(cb);
    });
  };

  this.vetoTrack = function(callback) {
    // Chuck out the callback to console.log if we haven't got a funciton passed in
    console.log(this.discovery, settings.roomName);
    var cb = callback || console.log,
      player = this.discovery.getPlayer(settings.roomName);
      player.nextTrack(cb);

    //TODO: Implement something to register the track that was vetoed - that way we curate the lists properly
  };

}

module.exports = SonosVeto;
