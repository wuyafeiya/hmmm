/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:49:44
 *
 * 题库有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */
<<<<<<< HEAD
import createAPI from "@/utils/request";



=======
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
>>>>>>> feature/questions-new
