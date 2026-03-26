import request from './base'

export function getUserInfo() {
  return request.get('/user/info')
}
