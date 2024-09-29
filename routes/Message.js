const express = require('express')
const nodemailer = require('nodemailer')

require('dotenv').config()

const message = express.Router()

var urlencodedParser = express.urlencoded({extended:true})

message.use(urlencodedParser);

message.use(express.json())

//const Message = require("../models/Message").Message




const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });





/* message.post('/new',async(req,res)=>{

    const data = req.body

    try {
        console.log("hello")
        const message = new Message(data)

        await message.save()

        res.status(201).json({message:"success"})
        
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }

   

})


message.delete('/delete/:id',async(req,res)=>{

    const id = req.params.id

    try {

        const deleted = await Message.findByIdAndDelete(id)

        if(deleted)
        {
            res.status(200).json({message:"successfully deleted!!"})
        }
        else
        {
            res.status(400).json({message:"could not find file"})
        }
     
      
    } catch (error) {
        res.status(400).json({message:error.message})
        
    }

   

})

message.get('/all',async(req,res)=>{

    try {

        const messages = await Message.find({})

        if(messages.length > 0)
        {
            res.status(200).json(messages)
        }
        else{
            res.status(404).json({message:"No messages found"})
        }
        
    } catch (error) {

        res.status(400).json({message:error.message})
        
    }


})





message.post("/send",async(req,res)=>{

    const data = req.body

    console.log(data.email)

    
  const mailOptions =  {
    from:{
        name: "MINA TECH",
        address: email
    }, // sender address
    to: data.email, // list of receivers
    subject: "Hello From MINA Tech ✔", // Subject line
    text: `${data.message}`, // plain text body
   // html: "<b>Hello world?</b>", // html body
  };

  try {

    sendMail(transporter,mailOptions)

    res.status(201).json({message:`email successfully sent to ${data.email}`})
    
  } catch (error) {

    console.log(error.message);
    res.status(400).json({message:"unable to send mail"})
    
  }



}) */

  const sendMail = async(transporter,mailOptions)=>{

    try {
        await transporter.sendMail(mailOptions)
        console.log("Sent mail")
        
    } catch (error) {

        console.error(error.message)
        
    }


}

message.post("/send",async(req,res)=>{

    const data = req.body

    console.log(data.email)

    
    const mailOptions = {
        from: {
          name: "MINA TECH",
          address: "contactminatech@gmail.com",
        },
        to: "imranhayredin89@gmail.com",
        subject: "Message from MINA Tech ✔",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2 style="color: #0077b6;">Message from MINA Tech</h2>
            <p>Hello,</p>
            <p>You have received a message from MINA Tech:</p>
            <table style="border-collapse: collapse; width: 100%;">
              <tr>
                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Name:</th>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.name}</td>
              </tr>
              <tr>
                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Phone:</th>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.phone}</td>
              </tr>
              <tr>
                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Email:</th>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.email}</td>
              </tr>
              <tr>
                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Message:</th>
                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${data.message}</td>
              </tr>
            </table>
          
          </div>
        `,
      };

  try {

    sendMail(transporter,mailOptions)

    res.status(201).json({message:`email successfully sent to ${data.email}`})
    
  } catch (error) {

    console.log(error.message);
    res.status(400).json({message:"unable to send mail"})
    
  }



})







module.exports = {message}