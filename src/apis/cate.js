import axios from '@/utils/axiosConfig'

export const getCate = () => {
  return axios({
    url: '/category'
  })
}
