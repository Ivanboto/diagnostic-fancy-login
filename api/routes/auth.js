const express = require("express");
const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const router = express.Router();

const prisma = new PrismaClient();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(401).json({ error: "User does not exist" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid password" });
  }

  res.status(200).json({ message: "Login successful" });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const token = crypto.randomUUID();
  const tokenExpiry = Date.now() + 1000 * 60 * 60;

  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken: token,
      resetTokenExpiry: new Date(tokenExpiry),
    },
  });

  const msg = {
    to: email,
    from: process.env.SENDGRID_SINGLE_SENDER_EMAIL,
    subject: "Reset your password",
    text:
      "Reset you password with this link: http://localhost:5173/reset-password?token=" +
      token,
    html:
      "<strong>Reset your password with this link: <a href='http://localhost:5173/reset-password?token=" +
      token +
      "'>Reset Password</a></strong>",
  };

  sgMail
    .send(msg)
    .then((response) => {
      console.log(response[0].statusCode);
      console.log(response[0].headers);
    })
    .catch((error) => {
      console.error(error);
    });

  res.status(200).json({ message: "Email sent" });
});

module.exports = router;
