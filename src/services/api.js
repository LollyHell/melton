// src/services/api.js
import axios from 'axios'

// Создаем экземпляр axios с базовыми настройками
const apiClient = axios.create({
  baseURL: 'https://sites.creatrix-digital.ru/clothes-store/api/v1',
  headers: {
    'Content-Type': 'application/json'
  }
})

export const api = {
  // 1. Получить товары (с фильтрами или без)
  // Сюда можно передавать объект типа: { page: 1, clothing_type_id: 1, color: 'Чёрный' }
  async getClothes(params = {}) {
    // Axios сам превратит объект params в "?page=1&clothing_type_id=1"
    const response = await apiClient.get('/clothes', { params })
    return response.data // У axios все данные от сервера лежат в поле .data
  },

  // 2. Получить один товар по ID
  async getProductById(id) {
    const response = await apiClient.get(`/clothes/${id}`)
    return response.data
  },

  // 3. Получить категории (одежда, обувь и т.д.)
  async getCategories() {
    const response = await apiClient.get('/clothing-types')
    return response.data
  },

  // 4. Получить размеры
  async getSizes() {
    const response = await apiClient.get('/sizes')
    return response.data
  },

  // 5. Отправить форму контактов (POST запрос)
  // Сюда передаешь объект с полями first_name, email и т.д.
  async sendContact(formData) {
    const response = await apiClient.post('/contacts', formData)
    return response.data
  }
}