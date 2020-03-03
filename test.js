const BeaconScanner = require('node-beacon-scanner');
const scanner = new BeaconScanner();
const mqtt = require('mqtt')
const os = require('os')
const client  = mqtt.connect('mqtt://192.168.1.110')



// Set an Event handler for becons
scanner.onadvertisement = (ad) => {
  console.log(os.hostname())
  console.log(JSON.stringify(ad, null, '  '));
  console.log(ad.id)
  client.publish(`beacon/${ad.id}`,JSON.stringify(ad, null, '  '))

};

// Start scanning
scanner.startScan().then(() => {
  console.log('Started to scan.')  ;
}).catch((error) => {
  console.error(error);
});
