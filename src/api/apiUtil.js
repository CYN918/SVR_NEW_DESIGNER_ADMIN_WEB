import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'
import router from '../router'
const generateApiMap = (map) => {
	let facade = {}
	for(let el in map){
		facade[el] = toMethod(map[el]);
	}
	return facade
};
// PASSPORT_HOST = 139.129.221.123;
// API_HOST = 139.129.221.123;
// UPLOAD_HOST = 139.129.221.123 ;
//const baseURLs = ['http://shiquaner.zookingsoft.com',];

//const baseURLs = ['http://shiquaner-admin-api.zookingsoft.com',];
//localStorage.setItem("URL","http://shiquaner.zookingsoft.com");

var baseURLs = ['http://dev-api-ndesigner-admin.idatachain.cn'];
localStorage.setItem("URL","http://dev-web-ndesigner.idatachain.cn");
localStorage.setItem("adminURL","http://dev-api-ndesigner-admin.idatachain.cn")

//console.log(window.location.host);
if(window.location.host=='shiquaner-admin.zookingsoft.com'){
   baseURLs = ['http://shiquaner-admin-api.zookingsoft.com',];
   localStorage.setItem("URL","http://shiquaner.zookingsoft.com")
   localStorage.setItem("adminURL","http://shiquaner-admin-api.zookingsoft.com");
}

if(window.location.host=='120.27.22.130:8082'){
   baseURLs = ['http://120.27.22.130:8083',];
   localStorage.setItem("URL","http://120.27.22.130:8080")
   localStorage.setItem("adminURL","http://120.27.22.130:8083");
}

localStorage.setItem("baseURLs",baseURLs+'/Admin');
const toMethod = (options) => {
	options.method = options.method || 'post'
	return (params = {}, attachedParams, config = {}) => {	
		return sendApiInstance(options.method, options.url, params, config,options.isType,options.baseURL,options.Type)
	}
}
// 创建axios实例
const createApiInstance = (config = {},on,Type) => {
	let ds = on?on:0;
	const _config = {
		withCredentials: true, // 跨域
		baseURL: baseURLs[ds],		
		headers:{
			//'Authorization':'Bearer '+localStorage.getItem('token'),
			'Content-Type':Type?Type:'application/x-www-form-urlencoded',
			// 'Content-Type': 'application/zip'
		},
	}	
	config = Object.assign(_config, config);
	return axios.create(config)
}
const sendApiInstance = (method, url, params, config = {},isType={},on,Type) => {
	
	if (method === 'post') {
		params = qs.stringify(params);
	}
	if(!url){return}		
	let instance = createApiInstance(config,on,Type)
	instance.interceptors.response.use(response => {
		let {result, msg, data} = response.data;
		//alert(result)
		if(result==0){
			///console.log(isType)
			if(isType.suktip){
				Message({message: '操作成功',type: 'success',duration: 2000});
			}
			
			if(isType.reload){	
				location.reload();	
			}
			/* if(isType.login) {
				//alert(2)
				localStorage.setItem("access",JSON.stringify(data));
				//router.push({path:"/userManager/userBaseInfo"});
			} */
			
			if(isType.isok){
				return response.data
			} else {
				return data
			}
			
			
		} else if(result == 201) {
			
			window.location.href = data;
		} else {
			Message({dangerouslyUseHTMLString:true,message: data});
		} 
	},error => {	  
		Message({message: '服务器故障',type: 'warning'});
		return Promise.reject(error).catch(() => {
		})
	});
	return instance[method](url, params, config)
}
export default {
	generateApiMap
}
