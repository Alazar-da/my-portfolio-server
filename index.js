require('dotenv').config()
require("./config/database").connect()
const path = require('path')
const cors = require('cors')




const express = require('express')
//var bodyparser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


var corsOptions = {
  origin: "http://localhost:3000"
};




const app = express()

const message = require("./routes/Message").message
app.use(cookieParser())
app.use(cors())
app.use("/message",message)

app.get('/',(req,res)=>{
  console.log("Server is running" )
  res.send("Hello World!")

})






var urlencodedParser2 = express.urlencoded({extended:true})

app.use(urlencodedParser2);

app.use(express.json())



var port = 8800


app.listen(port,()=>{
    console.log(`listning at port ${port}`)
})




  

  









