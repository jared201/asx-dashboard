const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
let sass = require('sass');

express()
  .use(express.static(path.join(__dirname, 'dist')))
  .set('views', path.join(__dirname, 'dist'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('index.ejs'))

  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// sass.render({file: '/dist/css/styles.scss'}, function(err, result) {
//     if (err) throw err;
//      console.log("css", result);

/* ... */
