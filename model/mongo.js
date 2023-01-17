const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/test')
  .then(()=>{console.log("mongo → 200")})
  .catch(()=>{console.log("failed!")})
  
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
module.exports = mongoose;