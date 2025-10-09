const {
  VITE_BEARER_TOKEN: BEARER_TOKEN,
  VITE_LIMIT: LIMIT,
  VITE_USER_AGENT: USER_AGENT,
  VITE_API_URL: API_URL,
} = import.meta.env

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export default class ProductService {
  
  async getProducts() {
    const products = []
    let page = 1
    let keepFetching = true

    while (keepFetching) {
      try {
        const response = await fetch(`${API_URL}/products?page=${page}&limit=${LIMIT}`, {
          method: 'GET',
          headers: {
            'Authentication': `bearer ${BEARER_TOKEN}`,
            'User-Agent': USER_AGENT,
          },
        })

        if (response.status === 404) {
          console.warn(`⚠️ Página ${page} no encontrada (404). Finalizando búsqueda de productos.`)
          keepFetching = false
          break
        }

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }

        const productsTiendaNube = await response.json()

        if (!Array.isArray(productsTiendaNube) || productsTiendaNube.length === 0) {
          keepFetching = false
        } else {
          products.push(...productsTiendaNube)

          if (productsTiendaNube.length < LIMIT) {
            keepFetching = false
          } else {
            page++
            await delay(150)
          }
        }
      } catch (err) {
        console.error(`❌ Fallo al cargar la página ${page}:`, err)
        
        // Si el error es 404, cortamos el bucle
        if (err.message.includes('404')) {
          console.warn(`Deteniendo fetch: recurso no encontrado en la página ${page}.`)
          keepFetching = false
          break
        }

        // Otros errores (ej. 429 o 500) → intentar continuar
        page++
        await delay(1000)
      }
    }

    return products
  }

  async getCategories() {
    let categories = []
    let page = 1
    let keepFetching = true

    while (keepFetching) {
      try {
        const response = await fetch(`${API_URL}/categories?page=${page}&limit=${LIMIT}`, {
          method: 'GET',
          headers: {
            'Authentication': `bearer ${BEARER_TOKEN}`,
            'User-Agent': `${USER_AGENT}`
          }
        })

        if (response.status === 404) {
          console.warn(`⚠️ Página ${page} de categorías no encontrada (404). Deteniendo fetch.`)
          keepFetching = false
          break
        }

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }

        const categoriesTiendaNube = await response.json()

        if (!Array.isArray(categoriesTiendaNube) || categoriesTiendaNube.length === 0) {
          keepFetching = false
        } else {
          categories.push(...categoriesTiendaNube)

          if (categoriesTiendaNube.length < LIMIT) {
            keepFetching = false
          } else {
            page++
            await delay(150)
          }
        }
      } catch (err) {
        console.error(`❌ Fallo al cargar la página ${page} de categorías:`, err)

        if (err.message.includes('404')) {
          console.warn(`Deteniendo fetch de categorías: página ${page} no encontrada.`)
          keepFetching = false
          break
        }

        page++
        await delay(1000)
      }
    }

    return categories
  }
}
