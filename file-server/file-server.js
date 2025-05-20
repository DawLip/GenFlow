import express from 'express'
import fs from 'fs/promises'
import cors from 'cors'
import path from 'path'

const app = express()
const port = 3100
app.use(cors())

app.get('/load-node', async (req, res) => {
  const filePath = req.query.filePath

  if (!filePath || typeof filePath !== 'string') {
    return res.status(400).json({ error: 'Missing filePath query param' })
  }

  const normalizedPath = path.normalize('/home/david/workspace/GenFlow/file-server/files'+filePath)

  console.log(normalizedPath)
  try {
    const code = await fs.readFile(normalizedPath, 'utf-8')
    res.json({ code })
  } catch (err) {
    res.status(500).json({ error: 'Failed to read file', details: err.message })
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})