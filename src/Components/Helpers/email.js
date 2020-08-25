require('dotenv').config()
const email = require('emailjs')

export const emailClient = email.server.connect({
  user: process.env.NOMAEX_EMAIL,
  password: process.env.NOMAEX_EMAIL_PASSWORD,
  host: 'mail.privateemail.com',
  ssl: true,
});
