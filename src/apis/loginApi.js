import axios from '@/utils/axiosConfig'

export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
