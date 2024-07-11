const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');

const prisma = new PrismaClient();
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/referral', async (req, res) => {
  const { referrer, referee, refereeEmail } = req.body;
  try {
    const referral = await prisma.referral.create({
      data: {
        referrer,
        referee,
        refereeEmail,
      },
    });
    res.status(201).json(referral);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
