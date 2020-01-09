import axios from '@/utils/axiosConfig'

// 获取文章栏目
export const getPost = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 收藏文章
export const getPostStar = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}

// 获取文章详情
export const getPostById = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 关注用户
export const getFollows = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}

// 取消关注用户
export const unFollows = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}

// 点赞
export const clickZan = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}
