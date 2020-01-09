import axios from '@/utils/axiosConfig'

export const getCollect = () => {
  return axios({
    url: '/user_star'
  })
}
