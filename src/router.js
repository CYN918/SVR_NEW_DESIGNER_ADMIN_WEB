import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout.vue'
import loading from '@/components/loading.vue'
Vue.use(Router)

var router = new Router({
	//mode: 'history',
	//base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'loading',
			component: loading,
		},
		{
			path: '/userManager',
			name: 'Layout',
			component: Layout,
			redirect: '/userManager/userBaseInfo',
			meta: {
				title: "用户"
			},
			children: [{
					path: 'userBaseInfo',
					name: 'userBaseInfo',
					meta: {
						title: "用户基本信息",
						pagetitle: "用户基本信息-狮圈儿运营管理平台"
					},
					component: () => import('@/views/userManager/userBaseInfo.vue')
				},
				{
					path: 'userInfo',
					name: 'userInfo',
					meta: {
						title: "供稿人信息表",
						pagetitle: "用户基本信息-狮圈儿运营管理平台"
					},
					component: () => import('@/views/userManager/userInfo.vue')
				},
				{
					path: 'userBaseInfo/userBaseInfoDetail',
					name: 'userBaseInfoDetail',
					meta: {
						title: "用户基本信息 / 查看用户信息",
					},
					component: () => import('@/views/userManager/userBaseInfoDetail.vue')
				},
				{
					path: 'blackList',
					name: 'blackList',
					meta: {
						title: "黑名单管理",
						pagetitle: "黑名单管理-狮圈儿运营管理平台"
					},
					component: () => import('@/views/userManager/blackList.vue')
				},
				{
					path: 'blackList/addblack',
					name: 'addblack',
					meta: {
						title: "黑名单管理 / 添加用户",
					},
					component: () => import('@/views/userManager/addblack.vue')
				},
				{
					path: 'blackList/editblack',
					name: 'editblack',
					meta: {
						title: "黑名单管理 / 编辑用户",
					},
					component: () => import('@/views/userManager/addblack.vue')
				},
				{
					path: 'userPersonalInfo',
					name: 'userPersonalInfo',
					meta: {
						title: "供稿人信息表-个人",
						pagetitle: "供稿人信息表个人-狮圈儿运营管理平台"
					},
					component: () => import('@/views/userManager/userPersonalInfo.vue')
				},
				{
					path: 'userPersonalInfo/userPersonalInfoDetail',
					name: 'userPersonalInfoDetail',
					meta: {
						title: "供稿人信息表-个人 / 查看用户信息"
					},
					component: () => import('@/views/userManager/userPersonalInfoDetail.vue')
				},
				{
					path: 'userCompanyInfo',
					name: 'userCompanyInfo',
					meta: {
						title: "供稿人信息表-企业-机构",
						pagetitle: "供稿人信息表企业/机构-狮圈儿运营管理平台"
					},
					component: () => import('@/views/userManager/userCompanyInfo.vue')
				},
				{
					path: 'userCompanyInfo/userCompanyInfoDetail',
					name: 'userCompanyInfoDetail',
					meta: {
						title: "供稿人信息表-企业-机构  /  查看机构信息"
					},
					component: () => import('@/views/userManager/userCompanyInfoDetail.vue')
				},
			]
		},
		{
			path: '/review',
			component: Layout,
			name: 'Layout',
			redirect:"/review/publishWork",
			meta:{
				title:"审核台"
			},
			children: [{
					path: 'publishWork',
					name: 'publishWork',
					meta: {
						title: "作品发布",
						pagetitle: "作品发布-审核台-狮圈儿运营管理平台"
					},
					component: () => import('@/views/review/publishWork.vue')
				},
				{
					path: 'publishWork/workDetial',
					name: 'workDetial',
					meta: {
						title: "作品发布 / 审核详情"
					},
					component: () => import('@/views/review/workDetial.vue')
				},
				{
					path: 'finalistsWork',
					name: 'finalistsWork',
					meta: {
						title: "作品入围",
						pagetitle: "作品入围-审核台-狮圈儿运营管理平台"
					},
					component: () => import('@/views/review/finalistsWork.vue')
				},
				{
					path: 'projectreview',
					name: 'projectreview',
					meta: {
						title: "项目验收",
						pagetitle: "项目验收-审核台-狮圈儿运营管理平台"
					},
					component: () => import('@/views/review/projectreview.vue')
				},
				{
					path: 'projectreview/projectrepending',
					name: 'projectrepending',
					meta: {
						title: "项目验收 / 我的待审",
					},
					component: () => import('@/views/review/projectrepending.vue')
				},
				{
					path: 'projectreview/projectrethrough',
					name: 'projectrethrough',
					meta: {
						title: "项目验收 / 我通过的",
					},
					component: () => import('@/views/review/projectrethrough.vue')
				},
				{
					path: 'projectreview/projectrerejected',
					name: 'projectrerejected',
					meta: {
						title: "项目验收 / 我驳回的",
					},
					component: () => import('@/views/review/projectrerejected.vue')
				},
				{
					path: 'projectreview/projectreallrecords',
					name: 'projectreallrecords',
					meta: {
						title: "项目验收 / 全部记录",
					},
					component: () => import('@/views/review/projectreallrecords.vue')
				},
				{
					path: 'projectreview/projectdetial',
					name: 'projectdetial',
					meta: {
						title: "项目验收 / 审核详情"
					},
					component: () => import('@/views/review/projectdetial.vue')
				},
				{
					path: 'finalistsWork/workDetial',
					name: 'workDetial',
					meta: {
						title: "作品入围 / 审核详情"
					},
					component: () => import('@/views/review/workDetial.vue')
				},
				{
					path: 'employWork',
					name: 'employWork',
					meta: {
						title: "作品录用",
						pagetitle: "作品录用-审核台-狮圈儿运营管理平台"
					},
					component: () => import('@/views/review/employWork.vue')
				},
				{
					path: 'employWork/workDetial',
					name: 'workDetial',
					meta: {
						title: "作品录用 / 审核详情"
					},
					component: () => import('@/views/review/workDetial.vue')
				},
				{
					path: 'applyPerson',
					name: 'applyPerson',
					meta: {
						title: "供稿人申请",
						pagetitle: "供稿人申请-审核台-狮圈儿运营管理平台"
					},
					component: () => import('@/views/review/applyPerson.vue')
				},
				{
					path: 'applyPerson/workDetial',
					name: 'workDetial',
					meta: {
						title: "供稿人申请 / 审核详情"
					},
					component: () => import('@/views/review/workDetial.vue')
				},
			]
		},
		{
			path:"/power",
			component: Layout,
			name: 'Layout',
			redirect:"/power/roleManager",
			meta: {
				title: "权限"
			},
			children: [
				{
					path: 'roleManager',
					name: 'roleManager',
					meta: {
						title: "角色管理",
						pagetitle: "角色管理-狮圈儿运营管理平台"
					},
					component: () => import('@/views/power/roleManager.vue'),
				},
				{
					path: 'roleManager/seeRoles',
					name: 'seeRoles',
					meta: {
						title: "角色管理 / 查看页面"
					},
					component: () => import('@/views/power/seeRoles.vue'),
				},
				{
					path: 'roleManager/editRoles',
					name: 'editRoles',
					meta: {
						title: "角色管理 / 编辑角色"
					},
					component: () => import('@/views/power/editRoles.vue'),
				},
				{
					path: 'roleManager/createRoles',
					name: 'createRoles',
					meta: {
						title: "角色管理 / 添加角色"
					},
					component: () => import('@/views/power/createRoles.vue'),
				},
				{
					path: 'accountManager',
					name: 'accountManager',
					meta: {
						title: "账号管理",
						pagetitle: "账号管理-狮圈儿运营管理平台"
					},
					component: () => import('@/views/power/accountManager.vue')
				},
				{
					path: 'accountManager/seeaccount',
					name: 'seeaccount',
					meta: {
						title: "账号管理 / 查看页面"
					},
					component: () => import('@/views/power/seeaccount.vue'),
				},
				{
					path: 'accountManager/setRoles',
					name: 'setRoles',
					meta: {
						title: "账号管理 / 设置角色"
					},
					component: () => import('@/views/power/setRoles.vue'),
				}
				
			]
		},
		{
			path:"/workManager",
			component: Layout,
			name: 'Layout',
			redirect:"/workManager/workInfo",
			meta: {
				title: "作品"
			},
			children:[
				{
					path: "workInfo",
					name: 'workInfo',
					meta: {
						title: "作品信息表",
						pagetitle: "作品信息表-狮圈儿运营管理平台"
					},
					component: () => import('@/views/workManager/workInfo.vue'),
				},
				{
					path: "workInfo/workInfoDetial",
					name: 'workInfoDetial',
					meta: {
						title: "作品信息表 / 作品查看"
					},
					component: () => import('@/views/workManager/workInfoDetial.vue'),
				},
				{
					path: "workInfo/worksShelves",
					name: 'worksShelves',
					meta: {
						title: "作品信息表 / 作品下架"
					},
					component: () => import('@/views/workManager/worksShelves.vue'),
				},
				{
					path: "workInfo/workEmploy",
					name: 'workEmploy',
					meta: {
						title: "作品信息表 / 作品录用"
					},
					component: () => import('@/views/workManager/workEmploy.vue'),
				},
				{
					path: "materialBank",
					name: 'materialBank',
					meta: {
						title: "素材库",
						pagetitle: "素材库-狮圈儿运营管理平台"
					},
					component: () => import('@/views/workManager/materialBank.vue'),
				},
				{
					path: "materialBank/materialBankdetail",
					name: 'materialBankdetail',
					meta: {
						title: "素材库 / 查看素材信息"
					},
					component: () => import('@/views/workManager/materialBankdetail.vue'),
				},
				
				{
					path: "commentManager",
					name: 'commentManager',
					meta: {
						title: "评论回复管理",
						pagetitle: "评论回复管理-狮圈儿运营管理平台"
					},
					component: () => import('@/views/workManager/commentManager.vue'),
				},
				{
					path: "labels",
					name: 'labels',
					meta: {
						title: "作品标签",
						pagetitle: "作品标签-狮圈儿运营管理平台"
					},
					component: () => import('@/views/workManager/labels.vue'),
				},
				
			]
		},
		{
			path:"/activityManager",
			component: Layout,
			name: 'Layout',
			redirect:"/activityManager/activityClass",
			meta: {
				title: "活动"
			},
			children:[
				{
					path: "activityClass",
					name: 'activityClass',
					meta: {
						title: "主题分类管理",
						pagetitle: "主题分类管理-狮圈儿运营管理平台"
					},
					component: () => import('@/views/activityManager/activityClass.vue'),
				},
				{
					path: "activityClass/addActivity",
					name: 'addActivity',
					meta: {
						title: "主题分类管理 / 新建主题分类"
					},
					component: () => import('@/views/activityManager/reviseActivity.vue'),
				},
				{
					path: "activityClass/editActivity",
					name: 'editActivity',
					meta: {
						title: "主题分类管理 / 编辑主题分类"
					},
					component: () => import('@/views/activityManager/reviseActivity.vue'),
				},
				{
					path: "activityEmploy",
					name: 'activityEmploy',
					meta: {
						title: "发布活动",
						pagetitle: "发布活动-狮圈儿运营管理平台"
					},
					component: () => import('@/views/activityManager/activityEmploy.vue'),
				},
				{
					path: "activityEmploy/newActivity",
					name: 'newActivity',
					meta: {
						title: "发布活动 / 新建活动"
					},
					component: () => import('@/views/activityManager/newActivity.vue'),
				},
				{
					path: "activityEmploy/editActivity",
					name: 'editActivity',
					meta: {
						title: "发布活动 / 编辑活动"
					},
					component: () => import('@/views/activityManager/newActivity.vue'),
				},
				{
					path: "activityworks",
					name: 'activityworks',
					meta: {
						title: "活动作品",
						pagetitle: "活动作品-狮圈儿运营管理平台"
					},
					component: () => import('@/views/activityManager/activityworks.vue'),
				},
				
			]
		},
		{
			path:"/contentManager",
			component: Layout,
			name: 'Layout',
			redirect:"/contentManager/homeBanner",
			meta: {
				title: "内容"
			},
			children:[
				{
					path: "homeBanner",
					name: 'homeBanner',
					meta: {
						title: "首页banner",
						pagetitle: "首页banner-狮圈儿运营管理平台"
					},
					component: () => import('@/views/contentManager/homeBanner.vue'),
				},
				{
					path: "workconfig",
					name: 'workconfig',
					meta: {
						title: "作品展示配置",
						pagetitle: "作品展示配置-狮圈儿运营管理平台"
					},
					component: () => import('@/views/contentManager/workconfig.vue'),
				},
				{
					path: "workconfig/newworkconfig",
					name: 'newworkconfig',
					meta: {
						title: "新建专题",
						pagetitle: "作品展示配置-狮圈儿运营管理平台"
					},
					component: () => import('@/views/contentManager/newworkconfig.vue'),
				},
				{
					path: "workconfig/editworkconfig",
					name: 'editworkconfig',
					meta: {
						title: "编辑专题",
						pagetitle: "作品展示配置-狮圈儿运营管理平台"
					},
					component: () => import('@/views/contentManager/newworkconfig.vue'),
				},
				{
					path: "holdAll",
					name: 'holdAll',
					meta: {
						title: "运营工具箱",
						pagetitle: "工具箱-狮圈儿运营管理平台"
					},
					component: () => import('@/views/contentManager/holdAll.vue'),
				},
				{
					path: "holdAll/holdAlltab",
					name: 'holdAlltab',
					meta: {
						title: "运营工具箱 / 首次上传原创作品+认证奖励",
						pagetitle: "运营工具箱-狮圈儿运营管理平台"
					},
					component: () => import('@/views/contentManager/holdAlltab.vue'),
				},
				{
					path: "homeBanner/addHomeBanner",
					name: 'addHomeBanner',
					meta: {
						title: "首页banner / 新建banner素材"
					},
					component: () => import('@/views/contentManager/addHomeBanner.vue'),
				},
				{
					path: "homeBanner/editHomeBanner",
					name: 'editHomeBanner',
					meta: {
						title: "首页banner / 编辑banner素材"
					},
					component: () => import('@/views/contentManager/addHomeBanner.vue'),
				},
				{
					path: "homeBanner/addbannerScheme",
					name: 'addbannerScheme',
					meta: {
						title: "首页banner / 新建banner方案"
					},
					component: () => import('@/views/contentManager/addbannerScheme.vue'),
				},
				{
					path: "homeBanner/seebannerScheme",
					name: 'seebannerScheme',
					meta: {
						title: "首页banner / 查看banner方案"
					},
					component: () => import('@/views/contentManager/seebannerScheme.vue'),
				},
				{
					path: "homeBanner/editbannerScheme",
					name: 'editbannerScheme',
					meta: {
						title: "首页banner / 编辑banner方案"
					},
					component: () => import('@/views/contentManager/seebannerScheme.vue'),
				},
				{
					path: "hotWordSearch",
					name: 'hotWordSearch',
					meta: {
						title: "热门搜素词",
						pagetitle: "热门搜素词-狮圈儿运营管理平台"
					},
					component: () => import('@/views/contentManager/hotWordSearch.vue'),
				},
				{
					path: "hotWordSearch/newhotword",
					name: 'newhotword',
					meta: {
						title: "热门搜素词 / 新建干预任务"
					},
					component: () => import('@/views/contentManager/newhotword.vue'),
				},
				{
					path: "hotWordSearch/edithotword",
					name: 'edithotword',
					meta: {
						title: "热门搜素词 / 编辑干预任务"
					},
					component: () => import('@/views/contentManager/newhotword.vue'),
				},
				{
					path: "recommendedActivities",
					name: 'recommendedActivities',
					meta: {
						title: "我的收益-推荐活动",
						pagetitle: "我的收益-推荐活动-狮圈儿运营管理平台"
					},
					component: () => import('@/views/contentManager/recommendedActivities.vue'),
				},
				{
					path: "projectrecommende",
					name: 'projectrecommende',
					meta: {
						title: "我的收益-推荐项目",
						pagetitle: "我的收益-推荐项目-狮圈儿运营管理平台"
					},
					component: () => import('@/views/contentManager/projectrecommende.vue'),
				},
				{
					path: "projectrecommende/newprojectrecommende",
					name: 'newprojectrecommende',
					meta: {
						title: "新建页面",
						pagetitle: "我的收益-推荐项目-狮圈儿运营管理平台"
					},
					component: () => import('@/views/contentManager/newprojectrecommende.vue'),
				},
				
				{
					path: "projectrecommende/editprojectrecommende",
					name: 'editprojectrecommende',
					meta: {
						title: "编辑页面",
						pagetitle: "我的收益-推荐项目-狮圈儿运营管理平台"
					},
					component: () => import('@/views/contentManager/newprojectrecommende.vue'),
				},
				{
					path: "recommendedActivities/newrecommendedActivities",
					name: 'newrecommendedActivities',
					meta: {
						title: "我的收益-推荐活动 / 新建干预任务"
					},
					component: () => import('@/views/contentManager/newrecommendedActivities.vue'),
				},
				{
					path: "recommendedActivities/editrecommendedActivities",
					name: 'editrecommendedActivities',
					meta: {
						title: "我的收益-推荐活动 / 编辑干预任务"
					},
					component: () => import('@/views/contentManager/newrecommendedActivities.vue'),
				},
				{
					path: "serviceCenter",
					name: 'serviceCenter',
					meta: {
						title: "文档服务中心",
						pagetitle: "文档服务中心-狮圈儿运营管理平台"
					},
					component: () => import('@/views/contentManager/serviceCenter.vue'),
				},
				{
					path: "serviceCenter/newserviceCenter",
					name: 'newserviceCenter',
					meta: {
						title: "文档服务中心 / 新建文档"
					},
					component: () => import('@/views/contentManager/newserviceCenter.vue'),
				},
				{
					path: "serviceCenter/editserviceCenter",
					name: 'editserviceCenter',
					meta: {
						title: "文档服务中心 / 编辑文档"
					},
					component: () => import('@/views/contentManager/newserviceCenter.vue'),
				},
				{
					path: "listAd",
					name: 'serviceCenter_listAd',
					meta: {
						title: "首页推荐干预",
						pagetitle: "首页推荐干预-狮圈儿运营管理平台"
					},
					component: () => import('@/views/contentManager/listAd.vue'),
				},
				{
					path: "newlistAd",
					name: 'serviceCenter_newlistAd',
					meta: {
						title: "首页推荐干预 / 新建推荐干预"
					},
					component: () => import('@/views/contentManager/newlistAd.vue'),
				},
				{
					path: "editlistAd",
					name: 'serviceCenter_editlistAd',
					meta: {
						title: "首页推荐干预 / 编辑推荐干预"
					},
					component: () => import('@/views/contentManager/newlistAd.vue'),
				},
			]
		},
		{
			path:"/employmentManager",
			component: Layout,
			name: 'Layout',
			redirect:"/employmentManager/employmentorder",
			meta: {
				title: "录用"
			},
			children:[
				{
					path: "employmentorder",
					name: 'employmentorder',
					meta: {
						title: "录用订单",
						pagetitle: "录用订单-狮圈儿运营管理平台"
					},
					component: () => import('@/views/employmentManager/employmentorder.vue'),
				},
				{
					path: "employmentorder/orderDetial",
					name: 'orderDetial',
					meta: {
						title: "录用订单 / 查看详情"
					},
					component: () => import('@/views/employmentManager/orderDetial.vue'),
				},
				{
					path: "channel",
					name: 'channel',
					meta: {
						title: "分享收益表",
						pagetitle: "分享收益表-狮圈儿运营管理平台"
					},
					component: () => import('@/views/employmentManager/channel.vue'),
				},
			],
		},
		{
			path:"/otherInformation",
			component: Layout,
			name: 'Layout',
			redirect:"/otherInformation/embodyRecord",
			meta: {
				title: "其他"
			},
			children:[
				{
					path: "solicitationTemplate",
					name: 'solicitationTemplate',
					meta: {
						title: "文件管理",
						pagetitle: "文件管理-狮圈儿运营管理平台"
					},
					component: () => import('@/views/activityManager/solicitationTemplate.vue'),
				},
				{
					path: "embodyRecord",
					name: 'embodyRecord',
					meta: {
						title: "提现记录表",
						pagetitle: "提现记录表-狮圈儿运营管理平台"
					},
					component: () => import('@/views/otherInformation/embodyRecord.vue'),
				},
				{
					path: "embodyRecord/seeembodyRecord",
					name: 'seeembodyRecord',
					meta: {
						title: "提现记录表 / 提现记录详情"
					},
					component: () => import('@/views/otherInformation/seeembodyRecord.vue'),
				},
				{
					path: "presetReason",
					name: 'presetReason',
					meta: {
						title: "审核驳回理由预设",
						pagetitle: "审核驳回理由预设-狮圈儿运营管理平台"
					},
					component: () => import('@/views/otherInformation/presetReason.vue'),
				},
				{
					path: "presetReason/revisePresetReason",
					name: 'revisePresetReason',
					meta: {
						title: "审核驳回理由预设 / 添加驳回理由"
					},
					component: () => import('@/views/otherInformation/revisePresetReason.vue'),
				},
				{
					path: "feedback",
					name: 'feedback',
					meta: {
						title: "意见反馈",
						pagetitle: "意见反馈-狮圈儿运营管理平台"
					},
					component: () => import('@/views/otherInformation/feedback.vue'),
				},
				{
					path: "feedback/newfeedback",
					name: 'newfeedback',
					meta: {
						title: "意见反馈 / 新建问题类型预设"
					},
					component: () => import('@/views/otherInformation/newfeedback.vue'),
				},
				{
					path: "feedback/seefeedback",
					name: 'seefeedback',
					meta: {
						title: "意见反馈 / 反馈内容 / 查看页面"
					},
					component: () => import('@/views/otherInformation/seefeedback.vue'),
				},
				{
					path: "reportInfo",
					name: 'reportInfo',
					meta: {
						title: "举报信息",
						pagetitle: "举报信息-狮圈儿运营管理平台"
					},
					component: () => import('@/views/otherInformation/reportInfo.vue'),
				},
				{
					path: "reportInfo/seereportInfo",
					name: 'seereportInfo',
					meta: {
						title: "举报信息 / 举报内容 / 查看页面"
					},
					component: () => import('@/views/otherInformation/seereportInfo.vue'),
				},
				{
					path: "reportInfo/newreportInfo",
					name: 'newreportInfo',
					meta: {
						title: "举报信息 / 新建举报分类预设"
					},
					component: () => import('@/views/otherInformation/newreportInfo.vue'),
				},
			],
		},
		{
			path:"/noticeManager",
			component: Layout,
			name: 'Layout',
			redirect:"/noticeManager/newsRelease",
			meta: {
				title: "通知"
			},
			children:[
				{
					path:"newsRelease",
					name: 'newsRelease',
					meta: {
						title: "发布通知",
						pagetitle: "发布通知-狮圈儿运营管理平台"
					},
					component: () => import('@/views/noticeManager/newsRelease.vue'),
				},
				{
					path:"newsRelease/addrelease",
					name: 'addrelease',
					meta: {
						title: "发布通知 / 新建通知"
					},
					component: () => import('@/views/noticeManager/addrelease.vue'),
				},
				{
					path:"newsRelease/editrelease",
					name: 'editrelease',
					meta: {
						title: "发布通知 / 编辑通知"
					},
					component: () => import('@/views/noticeManager/addrelease.vue'),
				},
				{
					path:"noticetemplate",
					name: 'noticetemplate',
					meta: {
						title: "系统通知模板",
						pagetitle: "系统通知模板-狮圈儿运营管理平台"
					},
					component: () => import('@/views/noticeManager/noticetemplate.vue'),
				},
			]
		},
		
		{
			path:"/projectManagement",
			component: Layout,
			name: 'Layout',
			redirect:"/projectManagement/projectclass",
			meta: {
				title: "项目"
			},
			children:[
				{
					path:"projectclass",
					name: 'projectclass',
					meta: {
						title: "项目分类预设",
						pagetitle: "项目发布-狮圈儿运营管理平台"
					},
					component: () => import('@/views/projectManagement/projectclass.vue'),
				},
				{
					path:"projectclass/newprojectclass",
					name: 'newprojectclass',
					meta: {
						title: "新建项目发布",
						pagetitle: "项目发布-狮圈儿运营管理平台"
					},
					component: () => import('@/views/projectManagement/newprojectclass.vue'),
				},
				{
					path:"projectclass/editprojectclass",
					name: 'editprojectclass',
					meta: {
						title: "编辑项目发布",
						pagetitle: "项目发布-狮圈儿运营管理平台"
					},
					component: () => import('@/views/projectManagement/newprojectclass.vue'),
				},
				{
					path:"projectclass/newtemplate",
					name: 'newtemplate',
					meta: {
						title: "项目分类预设 / 模板预设 / 新建预设模板",
						pagetitle: "项目发布-狮圈儿运营管理平台"
					},
					component: () => import('@/views/projectManagement/newtemplate.vue'),
				},
				{
					path:"projectclass/edittemplate",
					name: 'edittemplate',
					meta: {
						title: "项目分类预设 / 模板预设 / 编辑项目发布",
						pagetitle: "项目发布-狮圈儿运营管理平台"
					},
					component: () => import('@/views/projectManagement/newtemplate.vue'),
				},
				{
					path:"projectclass/seetemplate",
					name: 'seetemplate',
					meta: {
						title: "查看页面",
						pagetitle: "项目发布-狮圈儿运营管理平台"
					},
					component: () => import('@/views/projectManagement/seetemplate.vue'),
				},
				{
					path:"projectList",
					name: 'projectList',
					meta: {
						title: "项目发布",
						pagetitle: "项目发布-狮圈儿运营管理平台"
					},
					component: () => import('@/views/projectManagement/projectList.vue'),
				},
				{
					path:"Profit",
					name: 'Profit',
					meta: {
						title: "收益成长设置",
						pagetitle: "项目发布-狮圈儿运营管理平台"
					},
					component: () => import('@/views/projectManagement/Profit.vue'),
				},
				{
					path:"settlement",
					name: 'settlement',
					meta: {
						title: "分成结算表",
						pagetitle: "项目发布-狮圈儿运营管理平台"
					},
					component: () => import('@/views/projectManagement/settlement.vue'),
				},
				{
					path:"projectList/newproject",
					name: 'newproject',
					meta: {
						title: "新建项目",
						pagetitle: "项目发布-狮圈儿运营管理平台"
					},
					component: () => import('@/views/projectManagement/newproject.vue'),
				},
				{
					path:"projectList/projectDetial",
					name: 'projectDetial',
					meta: {
						title: "查看页面",
						pagetitle: "项目发布-狮圈儿运营管理平台"
					},
					component: () => import('@/views/projectManagement/projectDetial.vue'),
				},
				{
					path:"projectList/editproject",
					name: 'editproject',
					meta: {
						title: "编辑页面",
						pagetitle: "项目发布-狮圈儿运营管理平台"
					},
					component: () => import('@/views/projectManagement/newproject.vue'),
				},
				{
					path:"projectList/presentation",
					name: 'presentation',
					meta: {
						title: "验收报告",
						pagetitle: "项目发布-狮圈儿运营管理平台"
					},
					component: () => import('@/views/projectManagement/presentation.vue'),
				},
				{
					path:"projectList/newproject/openproject",
					name: 'presentation',
					meta: {
						title: "预览项目",
						pagetitle: "项目发布-狮圈儿运营管理平台"
					},
					component: () => import('@/views/projectweb/cents.vue'),
				},
			]
		},
		
		{
			path: '/userinfo',
			name: 'Layout',
			component: Layout,
			meta: {
				title: "首页"
			},
			children:[
				{
					path: 'user',
					name: 'user',
					meta: {
						title: "账号信息",
						pagetitle: "账号信息-狮圈儿运营管理平台"
					},
					component: () => import('@/components/userinfo.vue')
				}
			]
			
		},
		
		{
			path:"/quan",
			name: 'quan',
			meta: {
				title: "验收报告",
				pagetitle: "项目发布-狮圈儿运营管理平台"
			},
			component: () => import('@/views/quan/quan.vue'),
		},
	]
})

export default router

