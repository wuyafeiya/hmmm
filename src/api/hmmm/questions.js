/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:49:44
 *
 * 题库有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */
import { createAPI } from '@/utils/request'

// 获取简单学科列表
export const getSubjectsSimple = () => createAPI('/subjects/simple', 'get')

// 获取目录列表
export const getDirectorys = (data) => createAPI('/directorys', 'get', data)

// 获取企业列表
export const getCompanys = (data) => createAPI('/companys', 'get', data)

// 获取标签列表
export const getTags = (data) => createAPI('/tags', 'get', data)

// 新增题库
export const addQuestion = (data) => createAPI('/questions', 'post', data)

// 获取题库详情
export const getQuestion = (id) => createAPI(`/questions/${id}`, 'get')

// 编辑题库
export const editQuestion = (data) => createAPI(`/questions/${data.id}`, 'put', data)

// 基础题库列表
export const list = data => createAPI('/questions', 'get', data)

// 基础题库详情
export const detail = data => createAPI(`/questions/${data.id}`, 'get', data)

// 批量导入题
export const batch = data => createAPI('/questions/batch', 'post', data)

// 基础题库添加
export const add = data => createAPI('/questions', 'post', data)

// 基础题库修改
export const update = data => createAPI(`/questions/${data.id}`, 'put', data)

// 基础题库删除
export const remove = data => createAPI(`/questions/${data.id}`, 'delete', data)

// 精选题库加入取消
export const choiceAdd = data => createAPI(`/questions/choice/${data.id}/${data.choiceState}`, 'patch', data)

// 精选题库列表
export const choice = data => createAPI('/questions/choice', 'get', data)

// 精选题库上下架
export const choicePublish = data => createAPI(`/questions/choice/${data.id}/${data.publishState}`, 'post', data)

// 试题审核
export const choiceCheck = data => createAPI(`/questions/check/${data.id}`, 'post', data)

// 试题审核意见列表
export const auditOpinions = data => createAPI(`/questions/${data.id}/auditOpinions`, 'get', data)

// 出题记录
export const setRecords = data => createAPI(`/questions/${data.id}/setRecords`, 'get', data)

// 组题列表
export const randoms = data => createAPI('/questions/randoms', 'get', data)

// 组题列表删除
export const removeRandoms = data => createAPI(`/questions/randoms/${data.id}`, 'delete', data)
