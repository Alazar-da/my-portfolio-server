const mongoose = require('mongoose')



const messageSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true},
    location: { type: String, required: false},
    budget: { type: String, required: true},
    subject: { type: String, required: true},
    message: { type: String, required: true},
    
})

const Message = mongoose.model("Message",messageSchema)

module.exports = {Message}