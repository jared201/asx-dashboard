const start = 'START'

console.log(start);

let timerId = setInterval(() => console.log('tick'), 2000);

//setTimeout(() => { clearInterval(timerId); console.log('stop'); }, 3000);
