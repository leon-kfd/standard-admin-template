import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'

const baseURL = process.env.NODE_ENV === 'production' ? window.config.baseURL : '/api'

const instance = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// S:切换路由自动取消未完成请求功能
const axiosPendingListAutoCancel = window.axiosPendingListAutoCancel // 此为该功能开关
const axiosPendingList = [] // 当前pendding请求数组
// E

instance.interceptors.request.use(config => {
  if (axiosPendingListAutoCancel) {
    const mark = config.url
    const markIndex = axiosPendingList.findIndex(item => item.name === mark)
    if (markIndex > -1) {
      axiosPendingList[markIndex].cancel('重复请求')
      axiosPendingList.splice(markIndex, 1)
    }
    // 请求实例中添加notAllowCancel可禁止请求被自动取消
    if (!config.notAllowCancel) {
      const CancelToken = axios.CancelToken
      const source = CancelToken.source()
      config.cancelToken = source.token
      config._mark = mark
      axiosPendingList.push({
        name: mark,
        cancel: source.cancel
      })
    }
  }
  return config
})

instance.interceptors.response.use(
  response => {
    if (axiosPendingListAutoCancel) {
      const markIndex = axiosPendingList.findIndex(item => item.name === response.config._mark)
      if (markIndex > -1) {
        axiosPendingList.splice(markIndex, 1)
      }
    }
    const data = response.data
    if (data.errCode === 200) {
      return data.data
    } else {
      if (data.errCode === 300) {
        Message({
          showClose: true,
          message: data.errMsg,
          type: 'error',
          duration: 2000
        })
        router.push('/')
      } else if (data.errMsg) {
        Message({
          showClose: true,
          message: data.errMsg,
          type: 'error',
          duration: 2000
        })
      }
      return Promise.reject(response)
    }
  },
  err => {
    Message({
      showClose: true,
      message: '网络错误',
      type: 'error',
      duration: 2000
    })
    return Promise.reject(err)
  }
)

export { baseURL, axiosPendingList, axiosPendingListAutoCancel }

export default instance
