const baseURL = 'http://localhost:8080/api'

function request(options) {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token')

    uni.request({
      url: `${baseURL}${options.url}`,
      method: options.method || 'GET',
      data: options.data || {},
      timeout: 10000,
      header: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.header || {})
      },
      success: (response) => {
        resolve(response.data)
      },
      fail: (error) => {
        reject(error)
      }
    })
  })
}

export default {
  get(url, data = {}, options = {}) {
    return request({
      url,
      method: 'GET',
      data,
      ...options
    })
  },
  post(url, data = {}, options = {}) {
    return request({
      url,
      method: 'POST',
      data,
      ...options
    })
  },
  put(url, data = {}, options = {}) {
    return request({
      url,
      method: 'PUT',
      data,
      ...options
    })
  },
  delete(url, data = {}, options = {}) {
    return request({
      url,
      method: 'DELETE',
      data,
      ...options
    })
  }
}
