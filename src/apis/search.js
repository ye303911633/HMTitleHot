import axios from '@/utils/axiosConfig'

export const postSearch = (params) => {
  return axios({
    url: '/post_search',
    params
  })
}
