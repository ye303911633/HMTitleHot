import axios from '@/utils/axiosConfig'

export const getUserAttention = () => {
  return axios({
    url: '/user_follows'
  })
}
