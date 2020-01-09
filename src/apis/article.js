import axios from '@/utils/axiosConfig'

export const getPost = (params) => {
  return axios({
    url: '/post',
    params
  })
}

export const getPostById = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

export const getFollows = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}

export const unFollows = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}

export const clickZan = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}
