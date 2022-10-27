const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const { errorResponse } = require("./common/helper/response")
require('dotenv').config();
const cors = require('cors')

//Routes Import
const userRoutes = require("./routes/user");

const app = express()

app.use(express.json());
app.use(cors())
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json())
app.use(express.static('public'));
_RESP= require("./common/helper/response");


//Routes
app.use("/user",userRoutes);

//mongoose connection
mongoose.connect(process.env.MONGO_URL,(err)=>{
    if(err){ 
      console.log(err)
    }else{
      console.log('Database connected succesfully');
    }
})

//Common error handling of application
app.use(function (err, req, res, next) {
  return errorResponse(res, err.statusCode, err.message)
  
});

app.listen(process.env.PORT, () =>
  console.log('Server listening on port',process.env.PORT),
);
