const express = require("express");
const { PrismaClient } = require("./generated/prisma");
const bcrypt = require("bcrypt");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const DEFAULT_PORT = 3000;
const PORT = process.env.PORT || DEFAULT_PORT;
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

const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
  console.log(`Press Ctrl+C to quit.`);
});
