/*
 * 事件触发器
 * @Author: wujiang
 * @Date: 2018-11-11 22:50:43
 * @Last Modified by: wujiang
 * @Last Modified time: 2018-11-11 23:39:40
 */
const EventEmitter = require('events')
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

export default myEmitter