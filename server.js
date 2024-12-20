const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const reportRoutes = require('./routes/report');

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Could not connect to MongoDB:", err));


app.use('/auth', authRoutes);
app.use('/students', studentRoutes);
app.use('/report', reportRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
