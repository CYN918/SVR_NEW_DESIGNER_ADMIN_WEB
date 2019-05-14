import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/components/Layout.vue'

Vue.use(Router)

export default new Router({
	//mode: 'history',
	//base: process.env.BASE_URL,
	routes: [{
			path: '/',
			name: 'Layout',
			component: Layout,
			redirect: '/userBaseInfo',
			meta: {
				title: "用户管理"
			},
			children: [{
					path: 'userBaseInfo',
					name: 'userBaseInfo',
					meta: {
						title: "用户基本信息"
					},
					component: () => import('@/views/userManager/userBaseInfo.vue')
				},
				{
					path: 'userBaseInfo/userBaseInfoDetail',
					name: 'userBaseInfoDetail',
					meta: {
						title: "用户基本信息 / 查看用户信息"
					},
					component: () => import('@/views/userManager/userBaseInfoDetail.vue')
				},
				{
					path: 'userPersonalInfo',
					name: 'userPersonalInfo',
					meta: {
						title: "供稿人信息表-个人"
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
						title: "供稿人信息表-企业-机构"
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
						title: "作品发布"
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
						title: "作品入围"
					},
					component: () => import('@/views/review/finalistsWork.vue')
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
						title: "作品录用"
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
						title: "供稿人申请"
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
				title: "权限管理"
			},
			children: [
				{
					path: 'roleManager',
					name: 'roleManager',
					meta: {
						title: "角色管理"
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
						title: "账号管理"
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
		}
	]
})
