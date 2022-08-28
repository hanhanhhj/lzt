import request from '@/utils/request'
export const searchResultList = params => request({
  url: '/cloudsearch',
  params
})