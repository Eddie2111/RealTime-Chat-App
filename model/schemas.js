const mongoose = require('mongoose');
const ChatSchema = new mongoose.Schema({
    name: {
        type:String
    },
    message:{
        type:String
    }
  },
  {collection:"Chats"},
  {timestamps:true}
  );

const Chats = mongoose.model('Chat', ChatSchema);  
module.exports = Chats;