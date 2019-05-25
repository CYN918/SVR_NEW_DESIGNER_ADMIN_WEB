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
		url:'/admin/AdminUser/setRole',method:'post',baseURL:0,isType:{suktip:true}
	},
	
	reviewInfo:{
		url:'/admin/Review/info',method:'post',baseURL:0
	},
	
	reviewCheck:{
		url:'/admin/Review/check',method:'post',baseURL:0,isType:{suktip:true}
	},
	todoCount:{
		url:'/admin/Review/todoCount',method:'post',baseURL:0
	},
	workList:{
		url:'/admin/work/list',method:'post',baseURL:0
	},
	workInfo:{
		url:'/admin/Work/info',method:'post',baseURL:0
	},
	setRecommendLevelwork:{
		url:'/admin/work/setRecommendLevel',method:'post',baseURL:0
	},
	offShelve:{
		url:'/admin/work/offShelve',method:'post',baseURL:0
	},
	getLevelCount:{
		url:'/admin/work/getLevelCount',method:'post',baseURL:0
	},
	categoryList:{
		url:'/admin/category/list',method:'post',baseURL:0
	},
	categoryAdd:{
		url:'/admin/category/add',method:'post',baseURL:0
	},
	categoryEdit:{
		url:'/admin/category/edit',method:'post',baseURL:0
	},
	workComment:{
		url:'/admin/work/comment',method:'post',baseURL:0
	},
	deleteComment:{
		url:'/admin/work/deleteComment',method:'post',baseURL:0
	},
	activitylist:{
		url:'/admin/activity/list',method:'post',baseURL:0
	},
	activitydelete:{
		url:'/admin/activity/delete',method:'post',baseURL:0
	},
	activityadd:{
		url:'/admin/activity/add',method:'post',baseURL:0
	},
	insertFile:{
		url:'/File/File/insert',method:'post',baseURL:0
	},
	reportlist:{
		url:'/admin/report/list',method:'post',baseURL:0
	},
	Worklabel:{
		url:'/admin/Work/label',method:'post',baseURL:0
	},
	activitywork:{
		url:'/admin/activity/work',method:'post',baseURL:0
	},
	templateList:{
		url:'/admin/template/list',method:'post',baseURL:0
	},
	templateDelete:{
		url:'/admin/template/delete',method:'post',baseURL:0,isType:{suktip:true}
	},
	bannerlist:{
		url:'/admin/banner/list',method:'post',baseURL:0
	},
	templateedit:{
		url:'/admin/template/edit',method:'post',baseURL:0,isType:{suktip:true}
	},
	bannerdelete:{
		url:'/admin/banner/delete',method:'post',baseURL:0,isType:{suktip:true}
	},
	
	
	
}