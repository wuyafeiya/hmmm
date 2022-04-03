/*
 * @Author: zhanglianchang
 * @Date: 2020-08-01 14:39:32
 * @Last Modified by: taoshiwei
 * @Last Modified time: 2019-04-29 14:49:44
 *
 * 题库有关的接口：自己写吧~~  已经被张老师删了 ^_^
 */

// ####基础题库#####  #####精选题库####  接口汇总  @ck
import { createAPI } from "@/utils/request";

// 简单学科列表
export const subjectsSimple = (data) => createAPI('/subjects/simple', 'get', data)

//学科列表
export const subjectsList = data => createAPI('/subjects', 'get', data)

//目录列表
export const directoryList = data => createAPI('/directorys', 'get', data)

//标签列表
export const tagList = data => createAPI('/tags', 'get', data)

//用户列表
export const userList = data => createAPI('/users', 'get', data)

//基础题库列表
export const questionList = data => createAPI('/questions', 'get', data)

//基础题库删除
export const questionDelete = id => createAPI(`/questions/${id}`, 'delete')

//基础题库详情
export const questionDetails = id => createAPI(`/questions/${id}`, 'get')

//精选题库列表
export const questionsChoice = data => createAPI('/questions/choice', 'get', data)

//试题审核
export const questionsAudit = data => createAPI(`/questions/check/${data.id}`, 'post', data)

// 精选题库上下架
export const choicePublish = data =>
  createAPI(`/questions/choice/${data.id}/${data.publishState}`, 'post', data)

// 加入精选
export const choiceAdd = data =>
  createAPI(`/questions/choice/${data.id}/${data.choiceState}`, 'patch', data)
