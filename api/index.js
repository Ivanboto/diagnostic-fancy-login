const express = require("express");
const { PrismaClient } = require("./generated/prisma");
const bcrypt = require("bcrypt");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const PORT = 3000;
const SALT_ROUNDS = 10;

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/users", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  res.status(201).json({ id: user.id });
});

app.post("/auth/login", async (req, res) => {
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

app.post("/auth/forgot-password", async (req, res) => {
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
    text: "Reset you password with this link: https://localhost:5173/reset-password?token=" + token,
    html: "<strong>Reset your password with this link: <a href='https://localhost:5173/reset-password?token=" + token + "'>Reset Password</a></strong>",
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

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to quit.`);
});
