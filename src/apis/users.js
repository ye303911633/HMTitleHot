import axios from '@/utils/axiosConfig'

// 登录
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

// 注册
export const register = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}

export const getUser = (id) => {
  return axios({
    method: 'get',
    url: `/user/${id}`
  })
}

export const uploadFile = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}
