import axios from '@/utils/axiosConfig'

export const uploadImg = (data) => {
  return axios({
    method: 'post',
    url: '/upload',
    data
  })
}
