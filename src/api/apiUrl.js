export default {
/*需求相关*/
	getUserList:{
		url:'/admin/User/getUserList',method:'post',baseURL:0
	},
	getUserInfo:{
		url:'/admin/User/getUserInfo',method:'post',baseURL:0
	},
	setRecommendLevel:{
		url:'/admin/User/setRecommendLevel',method:'post',baseURL:0,isType:{suktip:true}
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
		url:'/admin/Role/add',method:'post',baseURL:0,isType:{suktip:true}
	},
	editRole:{
		url:'/admin/Role/edit',method:'post',baseURL:0,isType:{suktip:true}
	},
	deleteRole:{
		url:'/admin/Role/delete',method:'post',baseURL:0,isType:{suktip:true}
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
		url:'/admin/Menu/access',method:'post',baseURL:0,isType:{login:true}
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
		url:'/admin/work/setRecommendLevel',method:'post',baseURL:0,isType:{suktip:true}
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
		url:'/admin/category/add',method:'post',baseURL:0,isType:{suktip:true}
	},
	categoryEdit:{
		url:'/admin/category/edit',method:'post',baseURL:0,isType:{suktip:true}
	},
	workComment:{
		url:'/admin/work/comment',method:'post',baseURL:0
	},
	deleteComment:{
		url:'/admin/work/deleteComment',method:'post',baseURL:0,isType:{suktip:true}
	},
	activitylist:{
		url:'/admin/activity/list',method:'post',baseURL:0
	},
	activitydelete:{
		url:'/admin/activity/delete',method:'post',baseURL:0,isType:{suktip:true}
	},
	activityadd:{
		url:'/admin/activity/add',method:'post',baseURL:0,isType:{suktip:true}
	},
	activityedit:{
		url:'/admin/activity/edit',method:'post',baseURL:0,isType:{suktip:true}
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
	templateadd:{
		url:'/admin/template/add',method:'post',baseURL:0,isType:{suktip:true}
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
	banneradd:{
		url:'/admin/banner/add',method:'post',baseURL:0,isType:{suktip:true}
	},
	banneredit:{
		url:'/admin/banner/edit',method:'post',baseURL:0,isType:{suktip:true}
	},
	bannerprogramadd:{
		url:'/admin/bannerprogram/add',method:'post',baseURL:0,isType:{suktip:true}
	},
	bannerprogramlist:{
		url:'/admin/bannerprogram/list',method:'post',baseURL:0
	},
	bannerprogramedit:{
		url:'/admin/bannerprogram/edit',method:'post',baseURL:0,isType:{suktip:true}
	},
	bannerprogramdelete:{
		url:'/admin/bannerprogram/delete',method:'post',baseURL:0,isType:{suktip:true}
	},
	bannerprograminfo:{
		url:'/admin/bannerprogram/info',method:'post',baseURL:0
	},
	hotwordlist:{
		url:'/admin/hotword/list',method:'post',baseURL:0
	},
	hotworddelete:{
		url:'/admin/hotword/delete',method:'post',baseURL:0,isType:{suktip:true}
	},
	hotwordadd:{
		url:'/admin/hotword/add',method:'post',baseURL:0,isType:{suktip:true}
	},
	hotwordedit:{
		url:'/admin/hotword/edit',method:'post',baseURL:0,isType:{suktip:true}
	},
	
	recommendactivitylist:{
		url:'/admin/recommendactivity/list',method:'post',baseURL:0
	},
	recommendactivityadd:{
		url:'/admin/recommendactivity/add',method:'post',baseURL:0,isType:{suktip:true}
	},
	recommendactivityedit:{
		url:'/admin/recommendactivity/edit',method:'post',baseURL:0,isType:{suktip:true}
	},
	documentadd:{
		url:'/admin/document/add',method:'post',baseURL:0,isType:{suktip:true}
	},
	
	documentlist:{
		url:'/admin/document/list',method:'post',baseURL:0
	},
	documentdelete:{
		url:'/admin/document/delete',method:'post',baseURL:0,isType:{suktip:true}
	},
	orderlist:{
		url:'/admin/order/list',method:'post',baseURL:0
	},
	orderinfo:{
		url:'/admin/order/info',method:'post',baseURL:0
	},
	orderprofit:{
		url:'/admin/order/profit',method:'post',baseURL:0
	},
	Workmaterial:{
		url:'/admin/Work/material',method:'post',baseURL:0
	},
	reviewaddReason:{
		url:'/admin/review/addReason',method:'post',baseURL:0,isType:{suktip:true}
	},
	reviewreason:{
		url:'/admin/review/reason',method:'post',baseURL:0
	},
	reviewupdateReason:{
		url:'/admin/review/updateReason',method:'post',baseURL:0,isType:{suktip:true}
	},
	feedbacklist:{
		url:'/admin/feedback/list',method:'post',baseURL:0
	},
	feedbackclassify:{
		url:'/admin/feedback/classify',method:'post',baseURL:0
	},
	reportclassify:{
		url:'/admin/report/classify',method:'post',baseURL:0
	},
	noticelist:{
		url:'/admin/notice/list',method:'post',baseURL:0
	},
	noticetemplate:{
		url:'/admin/notice/template',method:'post',baseURL:0
	},
	usergetLevelCount:{
		url:'/admin/user/getLevelCount',method:'post',baseURL:0
	},
	materialDetail:{
		url:'/admin/Work/materialDetail',method:'post',baseURL:0
	},
	
	
	taskList:{
		url:'/admin/Homerec/taskList',method:'post',baseURL:0
	},
	Homerec_delete:{
		url:'/admin/Homerec/delete',method:'post',baseURL:0
	},
	
	Homerec_add:{
		url:'/admin/Homerec/add',method:'post',baseURL:0
	},
	
	Homerec_edit:{
		url:'/admin/Homerec/edit',method:'post',baseURL:0
	},
	
}