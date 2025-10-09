const {
  VITE_BEARER_TOKEN: BEARER_TOKEN,
  VITE_LIMIT: LIMIT,
  VITE_USER_AGENT: USER_AGENT
} = import.meta.env

const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default class ProductService {

  async getProducts() {
    const products = []
    let page = 1
    let keepFetching = true

    while (keepFetching) {
      try {
        const response = await fetch(`/api/products?page=${page}&limit=${LIMIT}`, {
          method: 'GET',
          headers: {
            'Authentication': `bearer ${BEARER_TOKEN}`,
            'User-Agent': USER_AGENT,
          },
        })

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
            await delay(150) // pequeña pausa entre llamadas
          }
        }
      } catch (err) {
        console.error(`Fallo al cargar la página ${page}:`, err)
        
        // Decisión de manejo de error:
        // Si el error es recuperable (ej. 429 Too Many Requests), intenta de nuevo.
        // Si es un error grave (ej. 401 Unauthorized), deberías lanzar el error o cortar.
        // Aquí asumimos que es un error temporal y hacemos una pausa antes de continuar
        // a la siguiente página para evitar loops infinitos en una página errónea.
        page++ // Avanza a la siguiente página después del error
        await delay(1000) // espera más si hubo error (por ej. 429)
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
        const response = await fetch(`/api/categories?page=${page}&limit=${LIMIT}`, {
          method: 'GET',
          headers: {
            'Authentication': `bearer ${BEARER_TOKEN}`,
            'User-Agent': `${USER_AGENT}`
          }
        })

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`)
        }

        const categoriesTiendaNube = await response.json()

        categories = categories.concat(categoriesTiendaNube)

        if (categoriesTiendaNube.length < LIMIT) {
          keepFetching = false
        } else {
          page++
          await delay(150); // Añadimos un pequeño delay por buenas prácticas de API
        }
      } catch (err) {
        console.error(`Fallo al cargar la página ${page} de categorías:`, err)
        page++
        await delay(1000)
      }
    }

    return categories
  }
}
