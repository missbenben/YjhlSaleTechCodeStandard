/* 公共的Action函数 */
import { request } from '../function';

// 添加权限
/**
 * 权限模板
[
	{
		"bosclass": "",
		"key": "",
		"flags": "g",
		"principal":"roles/_ALL",
		"permissions": "rwdc"
	}
]
 */
export const addGaclRequest: Function = request({
  url: window.config.prototype,
  method: 'POST'
});