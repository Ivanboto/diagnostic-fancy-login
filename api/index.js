const express = require('express')
const { PrismaClient } = require('./generated/prisma')
const bcrypt = require('bcrypt')
const cors = require('cors')

const PORT = 3000
const SALT_ROUNDS = 10

const app = express()
app.use(express.json())
app.use(cors())

const prisma = new PrismaClient()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/users', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  })
  res.status(201).json({ id: user.id })
})

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' })
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return res.status(401).json({ error: 'User does not exist' })
  }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return res.status(401).json({ error: 'Invalid password' })
  }

  res.status(200).json({ message: 'Login successful' })
})

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`)
  console.log(`Press Ctrl+C to quit.`)
})
