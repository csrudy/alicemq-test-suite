const amqp = require('amqplib/callback_api');
const dotenv = require('dotenv').config();
const uri = process.env.URI;

//test default exchange
//no exchange - default exchange
//no type 

const script = {}

script.run = () => {

  const q = 'id557'; //queue name
  const loopItterations = 100;
  const window = 200;
  const type = 'fanout';
  const msg = 'hello i m pk'
  const ex = 'amq.fanout'
  
  
  amqp.connect(uri, (err, conn) => {
    conn.createChannel((err, ch) => {
      ch.assertExchange(ex, 'fanout');
      setInterval(()=> {
        for (let i = 0 ; i < loopItterations; i++){     
          ch.publish('amq.fanout', 'successful_txn', new Buffer.from(msg), {persistent: false});
          console.log('sending');
        }
      }, window)
    });
  });
}

module.exports = script;