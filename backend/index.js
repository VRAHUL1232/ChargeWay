const express = require('express')
require('dotenv').config()
const cors = require('cors')
const app = express()

app.use(express.json())

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}));

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