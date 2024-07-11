require('dotenv').config();
const express = require('express');
const referralRoutes = require('./routes/referral');
const app = express();
app.use(express.json());

app.use('/api/referral', referralRoutes);

module.exports = app;
