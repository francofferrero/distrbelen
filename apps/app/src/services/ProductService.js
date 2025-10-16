export default class ProductService {

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL
  }

  async getProducts() {
    try {
      const response = await fetch(`${this.baseURL}/products`)
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }

      const data = await response.json()
      return data // { count, products }
    } catch (error) {
      console.error("❌ Error en getProducts:", error)
      throw error
    }
  }

  async getCategories() {
    try {
      const response = await fetch(`${this.baseURL}/categories`)
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`)
      }
      const data = await response.json()
      return data // { count, categories }
    } catch (error) {
      console.error("❌ Error en getCategories:", error)
      throw error;
    }
  }

}
