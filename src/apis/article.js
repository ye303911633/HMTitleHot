import axios from '@/utils/axiosConfig'

export const getPost = (params) => {
  return axios({
    url: '/post',
    params
  })
}
