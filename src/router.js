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
					path: 'userPersonalInfo',
					name: 'userPersonalInfo',
					meta: {
						title: "供稿人信息表-个人"
					},
					component: () => import('@/views/userManager/userPersonalInfo.vue')
				},
				{
					path: 'userCompanyInfo',
					name: 'userCompanyInfo',
					meta: {
						title: "供稿人信息表-企业/机构"
					},
					component: () => import('@/views/userManager/userCompanyInfo.vue')
				}
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
					path: 'finalistsWork',
					name: 'finalistsWork',
					meta: {
						title: "作品入围"
					},
					component: () => import('@/views/review/finalistsWork.vue')
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
					path: 'applyPerson',
					name: 'applyPerson',
					meta: {
						title: "供稿人申请"
					},
					component: () => import('@/views/review/applyPerson.vue')
				}
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
					name: 'Layout',
					meta: {
						title: "角色管理"
					},
					component: () => import('@/views/power/roleManager.vue'),
					children:[
						{
							path: 'seeRoles',
							name: 'seeRoles',
							meta: {
								title: "查看页面"
							},
							component: () => import('@/views/power/seeRoles.vue'),
						}
					]
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
					path: 'contributorManager',
					name: 'contributorManager',
					meta: {
						title: "供稿人管理"
					},
					component: () => import('@/views/power/contributorManager.vue')
				}
			]
		}
	]
})
