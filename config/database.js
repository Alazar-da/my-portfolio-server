const mongoose = require('mongoose')

mongoose.set('strictQuery',false)


const connect = async() =>{

    try {
        mongoose.connect("mongodb+srv://alazar-da:ale123@cluster0.eki1tpt.mongodb.net/my-portfolio?retryWrites=true&w=majority")
        console.log("connected")
    } catch (error) {
        console.log(error)
        
    }


}

module.exports = {connect}