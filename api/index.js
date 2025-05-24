const express = require('express')
const { PrismaClient } = require('./generated/prisma')
const bycrypt = require('bcrypt')

const PORT = 3000
const SALT_ROUNDS = 10

const app = express()
app.use(express.json())

const prisma = new PrismaClient()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/users', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const hashedPassword = await bycrypt.hash(password, SALT_ROUNDS)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })
  res.status(201).json({ id: user.id })
})

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`)
  console.log(`Press Ctrl+C to quit.`)
})
