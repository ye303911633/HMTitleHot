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

// 用户关注列表
export const getUserAttention = () => {
  return axios({
    url: '/user_follows'
  })
}

// 获取收藏文章列表
export const getPostList = () => {
  return axios({
    url: '/user_star'
  })
}

// 评论列表
export const getCommentList = (id, data) => {
  return axios({
    url: `/post_comment/${id}`,
    data
  })
}

// 发布评论
export const postCommentList = (id, data) => {
  return axios({
    method: 'post',
    url: `/post_comment/${id}`,
    data
  })
}
