    // 'use strict';

    //     // Set a timeout of 300ms

    //     setTimeout(function () {
    //       // After 300ms has elapsed, print out 'TIMED OUT!'

    //       console.log('TIMED OUT!');
    //     }, 300);

    // 'use strict';

    // var promise = new Promise(function (fulfill, reject) {
    //     fulfill('I FIRED');
    //     reject(new Error('I DID NOT FIRE'));
    // });

    // function onReject(error) {
    //     console.log(error.message);
    //   }

    //   promise.then(console.log, onReject);

    // 'use strict';

    // var promise = new Promise(function (fulfill, reject) {
    //     fulfill('PROMISE VALUE');
    // });
    // promise.then(console.log);
    // console.log('MAIN PROGRAM');

    // 6.
    // 'use strict';

    // var message;
    // var promise;
    
    // function randomBytes(n) {
    //   return (Math.random() * Math.pow(256, n) | 0).toString(16);
    // }
    
    // message =
    //   'A fatal exception ' + randomBytes(1) + ' has occurred at ' +
    //   randomBytes(2) + ':' + randomBytes(4) + '. Your system\nwill be ' +
    //   'terminated in 3 seconds.';
    
    // promise = Promise.reject(new Error(message));
    
    // promise.catch(function (err) {
    //   var i = 3;
    
    //   process.stderr.write(err.message);
    
    //   setTimeout(function boom() {
    //     process.stderr.write('\rwill be terminated in ' + (--i) + ' seconds.');
    //     if (!i) {
    //       process.stderr.write('\n..... . . . boom . . . .....\n');
    //     } else {
    //       setTimeout(boom, 1000);
    //     }
    //   }, 1000);
    // });

    // 'use strict';

    // /* global first, second */

    // var firstPromise = first();

    // var secondPromise = firstPromise.then(function (val) {
    // return second(val);
    // });

    // secondPromise.then(console.log);

    // // As an alternative to the code above, you could also do this:
    // // first().then(second).then(console.log);

    var qhttp = require('q-io/http');

qhttp.read("http://localhost:1337")
.then(function (json) {
  console.log(JSON.parse(json));
})
.then(null, console.error)
.done()



