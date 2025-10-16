import express from 'express'
import axios from 'axios'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const {
  API_KEY,
  USER_AGENT,
  API_URL,
} = process.env

const LIMIT = 30

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Authentication: `bearer ${API_KEY}`,
    'User-Agent': USER_AGENT,
    'Content-Type': 'application/json'
  }
})

const app = express()

// --- Middlewares ---
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'User-Agent']
}))

app.use(morgan('combined'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// --- Rutas ---
app.get('/', (req, res) => {
  res.send('Hello from Sueldos API <3')
})

// ----- Productos -----
app.get('/products', async (req, res) => {
  const PER_PAGE = 200
  try {
    const head = await instance.head('/products')
    const totalCount = head.headers.get('x-total-count')
    const pages = Math.ceil(totalCount / PER_PAGE)
    const products = []

    for (let page = 1; page <= pages; page++) {
      try {
        const response = await instance.get(`/products?per_page=${PER_PAGE}&page=${page}`)
        products.push(...response.data)
      } catch (err) {
        console.error(`❌ Error al cargar productos página ${page}:`, err.message)
      }
      await delay(150)
    }

    res.send({ count: totalCount, products })
  } catch (err) {
    console.error('❌ Error al cargar productos:', err.message)
    res.status(500).send({ error: 'Error al cargar productos', details: err.message })
  }
})

// ----- Categorías -----
app.get('/categories', async (req, res) => {
  const PER_PAGE = 200
  try {
    const head = await instance.head('/categories')
    const totalCount = head.headers.get('x-total-count')
    const pages = Math.ceil(totalCount / PER_PAGE)
    const categories = []

    for (let page = 1; page <= pages; page++) {
      try {
        const response = await instance.get(`/categories?per_page=${PER_PAGE}&page=${page}`)
        categories.push(...response.data)
      } catch (err) {
        console.error(`❌ Error al cargar categorías página ${page}:`, err.message)
      }
      await delay(150)
    }

    res.send({ count: totalCount, categories })
  } catch (err) {
    console.error('❌ Error al cargar categorías:', err.message)
    res.status(500).send({ error: 'Error al cargar categorías', details: err.message })
  }
})

// ----- Rutas deprecated (opcional) -----
app.get('/products-deprecated', async (req, res) => {
  const products = []
  let page = 1
  let keepFetching = true

  while (keepFetching) {
    try {
      const response = await fetch(`${API_URL}/products?limit=${LIMIT}&page=${page}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'User-Agent': USER_AGENT
        }
      })

      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      if (!Array.isArray(data) || data.length === 0) break

      products.push(...data)
      if (data.length < LIMIT) break

      page++
      await delay(150)
    } catch (err) {
      console.error(`❌ Error en products-deprecated página ${page}:`, err.message)
      page++
      await delay(1000)
    }
  }

  res.send({ products })
})

app.get('/categories-deprecated', async (req, res) => {
  const categories = []
  let page = 1
  let keepFetching = true

  while (keepFetching) {
    try {
      const response = await fetch(`${API_URL}/categories?limit=${LIMIT}&page=${page}`, {
        method: 'GET',
        headers: {
          Authentication: `bearer ${API_KEY}`,
          'User-Agent': USER_AGENT
        }
      })

      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      const data = await response.json()
      if (!Array.isArray(data) || data.length === 0) break

      categories.push(...data)
      if (data.length < LIMIT) break

      page++
      await delay(150)
    } catch (err) {
      console.error(`❌ Error en categories-deprecated página ${page}:`, err.message)
      page++
      await delay(1000)
    }
  }

  res.send({ categories })
})

// ----- Test -----
app.get('/test', async (req, res) => {
  try {
    const resp = await instance.get('/products')
    res.send({ products: resp.data })
  } catch (error) {
    res.send({ error })
  }
})


// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`\x1b[36mAPI ready on http://localhost:${PORT}\x1b[0m`)
  })
}

export default app
