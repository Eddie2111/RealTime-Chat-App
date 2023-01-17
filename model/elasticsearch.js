const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: 'https://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'changeme'
  }
})
try{
client.ping({}, { requestTimeout: 30000 }, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log('Everything is ok');
    }
});
}
catch(err){
    console.log(err);
}


module.exports = client;

