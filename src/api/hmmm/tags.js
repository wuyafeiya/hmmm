/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:57:26
 *
 * 标签有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */
import createAPI from '@/utils/request'

// 标签列表
export const list = data => {
  return createAPI({
    url: '/tags',
    method: 'get',
    params: data
  })
}

// 标签添加
export const add = data => {
  return createAPI({
    url: '/tags',
    method: 'POST',
    data
  })
}

// 标签修改
export const update = data => {
  return createAPI({
    url: `/tags/${data.id}`,
    method: 'PUT',
    data
  })
}

// 标签删除
export const remove = id => {
  return createAPI({
    url: `/tags/${id}`,
    method: 'delete'
  })
}
