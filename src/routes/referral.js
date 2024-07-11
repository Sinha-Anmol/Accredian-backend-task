const express = require('express');
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const router = express.Router();
const prisma = new PrismaClient();

router.post('/', async (req, res) => {
  const { referrer, referee, refereeEmail } = req.body;

  if (!referrer || !referee || !refereeEmail) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newReferral = await prisma.referral.create({
      data: { referrer, referee, refereeEmail },
    });

    // Send email using Nodemailer
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: refereeEmail,
      subject: 'Referral',
      text: `You have been referred by ${referrer}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ error: "Error sending email" });
      }
    });

    res.status(201).json(newReferral);
  } catch (error) {
    res.status(500).json({ error: "Error creating referral" });
  }
});

module.exports = router;
