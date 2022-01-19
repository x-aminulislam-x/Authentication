require('dotenv').config({ path: "/config.env" })
const express = require('express');
const connectDB = require('./config/db');


// Connect DB
// connectDB();

console.log(process.env.MONGO_URI)

const app = express();


app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))