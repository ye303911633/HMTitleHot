import axios from '@/utils/axiosConfig'

export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}

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
