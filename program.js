const { Gpio } = require( 'onoff' );

// set BCM 4 pin as 'output'
const led = new Gpio( '21', 'out' );
// const button = new Gpio( '20', 'in', 'both' );

led.writeSync(1);

//button.watch((err, value) => led.writeSync(value));

console.log("test");