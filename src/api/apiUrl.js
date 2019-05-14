export default {
/*需求相关*/
	getUserList:{
		url:'/admin/User/getUserList',method:'post',baseURL:0
	},
	getUserInfo:{
		url:'/admin/User/getUserInfo',method:'post',baseURL:0
	},
	setRecommendLevel:{
		url:'/admin/User/setRecommendLevel',method:'post',baseURL:0
	},
	getContributorList:{
		url:'/admin/User/getContributorList',method:'post',baseURL:0
	},
	
	getContributorInfo:{
		url:'/admin/User/getContributorInfo',method:'post',baseURL:0
	},
	getRoleList:{
		url:'/admin/Role/getRoleList',method:'post',baseURL:0
	},
	addRole:{
		url:'/admin/Role/add',method:'post',baseURL:0
	},
	editRole:{
		url:'/admin/Role/edit',method:'post',baseURL:0
	},
	deleteRole:{
		url:'/admin/Role/delete',method:'post',baseURL:0
	},
	infoRole:{
		url:'/admin/Role/info',method:'post',baseURL:0
	},
	getAdminUserInfo:{
		url:'/admin/AdminUser/getAdminUserInfo',method:'post',baseURL:0
	},
	getAdminUserList:{
		url:'/admin/AdminUser/getAdminUserList',method:'post',baseURL:0
	},
	getMenuList:{
		url:'/admin/menu/getMenuList',method:'post',baseURL:0
	},
	reviewList:{
		url:'/admin/Review/list',method:'post',baseURL:0
	},
	access:{
		url:'/admin/Menu/access',method:'post',baseURL:0
	},
	
	setRole:{
		url:'/admin/AdminUser/setRole',method:'post',baseURL:0,suktip:true
	},
	
	reviewInfo:{
		url:'/admin/Review/info',method:'post',baseURL:0,suktip:true
	},
	
	reviewCheck:{
		url:'/admin/Review/check',method:'post',baseURL:0,suktip:true
	},
	todoCount:{
		url:'/admin/Review/todoCount',method:'post',baseURL:0,suktip:true
	}
	
}