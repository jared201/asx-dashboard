
exports.processPSEdata = function (callback){

  const fetch = require('node-fetch');
  let url = 'http://phisix-api.appspot.com/stocks.json';
  fetch (url)
    .then(res => res.text())
    .then(body => {
      //console.log(body);
      let doc = JSON.parse(body);
      let stock = doc.stock;
      let pseData = {};
      let pseDataArray = [];
      for (let i in stock){
        pseData.name = stock[i].name;
        let price = stock[i].price;
        let currency = price.currency;
        let amount = price.amount;
        pseData.currency = currency;
        pseData.amount = amount;
        pseData.change = stock[i].percent_change;
        pseData.volume = stock[i].volume;
        pseData.symbol = stock[i].symbol;
        pseData.as_of = new Date(doc.as_of);
        let volume = pseData.volume;
        pseData.value = (volume * amount);
        console.log(JSON.stringify(pseData));
        pseDataArray.push(pseData);
        pseData = {};
      }
      savePSEdata(pseDataArray)
      callback(pseDataArray);

    });

}


/**
 *
 * Loads data extracted from PSE live
 *
 */
 function savePSEdata(pseData) {


  const { dbPool } = require ('./dbmodule');
  const db = new dbPool();
  let dataQuery = {};
  dataQuery.text = 'INSERT INTO SWAG (last_closing_price, name, pct_change, volume, symbol, trans_date, value)' +
    ' VALUES ($1, $2, $3, $4, $5, $6, $7)';
  (async () => {
    console.log("Connecting to DB...");
    const client = await db.connect();
    try {
      for (let i in pseData){
        dataQuery.values = [pseData[i].amount, pseData[i].name, pseData[i].change, pseData[i].volume, pseData[i].symbol,
          new Date(pseData[i].as_of), pseData[i].value];
        await client.query('BEGIN');
        await client.query(dataQuery, (err, result) => {
          if (err) throw err;
          console.log ("Rows affected: ", result.rowCount);
        });
        await client.query('COMMIT;');

        i++;
      }


    } catch (error) {
      console.log("Rolling back:" , error);
      await client.query('ROLLBACK;');

    } finally {
       console.log("Releasing connection");
       await client.release();
    }

  })().catch(e => console.log(e.stack));


}
