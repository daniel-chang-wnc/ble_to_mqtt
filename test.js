const BeaconScanner = require('node-beacon-scanner');
const scanner = new BeaconScanner();
const mqtt = require('mqtt')
const KalmanFilter = require('kalmanjs');
const os = require('os')
const client  = mqtt.connect('mqtt://raspberrypi1.local')

const kf = new KalmanFilter();


// Set an Event handler for becons
scanner.onadvertisement = (ad) => {
  console.log(os.hostname())
  //console.log(JSON.stringify(ad, null, '  '));
  console.log(ad.id)
  console.log(ad.rssi)
  console.log(kf.filter(ad.rssi))
  obj_pub ={
    host: os.hostname(),
    id: ad.id, 
    origin_rssi: ad.rssi, 
    kf_rssi: kf.filter(ad.rssi)
  }

  client.publish(`beacon/${ad.id}`,JSON.stringify(obj_pub, null, '  '))

};

// Start scanning
scanner.startScan().then(() => {
  console.log('Started to scan.')  ;
}).catch((error) => {
  console.error(error);
});
