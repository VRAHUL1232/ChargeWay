const express = require('express')
require('dotenv').config()

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 3000
const query = require('./models/authQuery')
const authRoute = require('./routes/authRoute')

query.createTables();

app.get('/',(req,res)=>{
    res.send("Hello everyone");
})

app.use('/',authRoute);

app.listen(PORT,()=>{
    console.log(`Server is running in ${PORT}`);
})