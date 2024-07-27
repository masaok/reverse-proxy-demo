import express, { Request, Response } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'

const API_URL = 'https://dog.ceo/api/breeds/image/random'

// Create an instance of an Express app
const app = express()
const port = 8001

// Endpoint that returns "Hello World"
app.get('/hello', (req: Request, res: Response) => {
  res.send('Hello World')
})

// Proxy middleware options
const proxyOptions = {
  target: API_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api from the path
  },
}

// Endpoint that proxies requests to another API
app.use('/api', createProxyMiddleware(proxyOptions))

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
