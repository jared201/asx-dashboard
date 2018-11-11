const start = 'START'


console.log(start);
const pse = require('./server/pse_loader');
let timerId = setInterval(() => {
  console.log('tick');
  pse.processPSEdata((body) => {
      console.log(body);
  })
}, 120000);

//setTimeout(() => { clearInterval(timerId); console.log('stop'); }, 3000);
