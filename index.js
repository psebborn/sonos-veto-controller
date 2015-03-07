"use strict()";
var SonosDiscovery = require("sonos-discovery"),
  Veto = require("./lib/sonos-veto"),
  discovery, sonosveto,
  gpio = require("onoff").Gpio;


function setupButton() {
  console.log("setting up");
  //Get the GPIO pin.
  vetoButton = new gpio(18, 'input', 'both', {
    debounceTimeout: 50
  });
  // Check to see if the button is pressed 
  vetoButton.watch(function(err, value) {
    if(err) {
      return console.error(err);
    }
    if(value == 1) {
      vetoSong();
    }
  });
}

function vetoSong() {
  console.log('Song Vetoed!!');  
  sonosveto.vetoTrack();
}


//On launch, look for a Sonos system
discovery = new SonosDiscovery();
// Initialise the veto plugin
sonosveto = new Veto(discovery, {
  callback: setupButton,
  roomName: 'Living Room'
});
//TODO: This is a bit of a kludge - it assumes that 'Living Room' will always be the coordinator
// Should be rewritten to grab the coordinater of the zone, just in case
var vetoButton;
