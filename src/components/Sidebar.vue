<template>
	<div class="wh">
		<div class="w hnav username ofh">
			<!-- <span class="fleft userlog"></span>
			<span class="fleft fontsize24">狮大大</span> -->
			<img src="../assets/img/houtai_logo.svg" alt="" style="display: block;margin: 12px 40px;">
		</div>
		<el-menu style="overflow-y: auto;" default-active="1" class="w sel-menu" @open="handleOpen" @close="handleClose" :default-active="defaultactive" :default-openeds="defaultopeneds"
		 active-text-color="#FF5121">
			<el-submenu :index="item.id" v-for="item in menuAccess" :key="item.id">
				<template slot="title">
					<i class="iconfont" v-html="iconfont[item.id]"></i>
					<span style="padding:15px;">{{ item.title }}</span>
				</template>
				<router-link v-if="item.child && item.child.length != 0"  v-for="citem in item.child" :key="citem.id" :to="url[citem.id] ? url[citem.id] : ''">
					<el-menu-item :index="url[citem.id]" >{{ citem.title }}</el-menu-item>
				</router-link>
			</el-submenu>
			<!-- <el-submenu index="7">
				<template slot="title">
					<i class="iconfont">&#xe781;</i>
					<span style="padding:15px;">作品管理</span>
				</template>
				<router-link to="/workManager/workInfo">
					<el-menu-item index="3-1" class="">作品信息表</el-menu-item>
				</router-link>
				<router-link to="/workManager/materialBank">
					<el-menu-item index="3-2">素材库</el-menu-item>
				</router-link>
				<router-link to="/workManager/labels">
					<el-menu-item index="3-3">作品标签</el-menu-item>
				</router-link>
				<router-link to="/workManager/commentManager">
					<el-menu-item index="3-4">评论回复管理</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="9">
				<template slot="title">
					<i class="iconfont">&#xe627;</i>
					<span style="padding:15px;">活动管理</span>
				</template>
				<router-link to="/activityManager/activityEmploy">
					<el-menu-item index="9-2">发布活动</el-menu-item>
				</router-link>
				<router-link to="/activityManager/activityClass">
					<el-menu-item index="9-1" class="">主题分类管理</el-menu-item>
				</router-link>
				
				<router-link to="/activityManager/activityworks">
					<el-menu-item index="9-4">参与活动的作品</el-menu-item>
				</router-link>
				<router-link to="/activityManager/solicitationTemplate">
					<el-menu-item index="9-3">征集模板文件</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="10">
				<template slot="title">
					<i class="iconfont">&#xe730;</i>
					<span style="padding:15px;">内容管理</span>
				</template>
				<router-link to="/contentManager/homeBanner">
					<el-menu-item index="10-2">首页banner</el-menu-item>
				</router-link>
				<router-link to="/contentManager/hotWordSearch">
					<el-menu-item index="10-3">热门搜素词</el-menu-item>
				</router-link>
				<router-link to="/contentManager/recommendedActivities">
					<el-menu-item index="10-4">我的收益-推荐活动</el-menu-item>
				</router-link>
				<router-link to="/contentManager/serviceCenter">
					<el-menu-item index="10-5">文档服务中心</el-menu-item>
				</router-link>
				<router-link to="/contentManager/listAd">
					<el-menu-item index="10-6">首页列表干预</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="11">
				<template slot="title">
					<i class="iconfont">&#xe62b;</i>
					<span style="padding:15px;">录用管理</span>
				</template>
				<router-link to="/employmentManager/employmentorder">
					<el-menu-item index="11-1" class="">录用订单</el-menu-item>
				</router-link>
				<router-link to="/employmentManager/channel">
					<el-menu-item index="11-2">分成渠道表</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="12">
				<template slot="title">
					<i class="el-icon-setting" style="margin-right: 0;width: auto;"></i>
					<span style="padding:15px;">其他信息及设置</span>
				</template>
				<router-link to="/otherInformation/embodyRecord">
					<el-menu-item index="12-1" class="">提现记录表</el-menu-item>
				</router-link>
				<router-link to="/otherInformation/presetReason">
					<el-menu-item index="12-2">审核驳回理由预设</el-menu-item>
				</router-link>
				<router-link to="/otherInformation/feedback">
					<el-menu-item index="12-3">意见反馈</el-menu-item>
				</router-link>
				<router-link to="/otherInformation/reportInfo">
					<el-menu-item index="12-4">举报信息</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="13">
				<template slot="title">
					<i class="iconfont">&#xe62b;</i>
					<span style="padding:15px;">消息通知管理</span>
				</template>
				<router-link to="/noticeManager/newsRelease">
					<el-menu-item index="12-1" class="">消息发布</el-menu-item>
				</router-link>
				<router-link to="/noticeManager/noticetemplate">
					<el-menu-item index="12-2">系统通知模板</el-menu-item>
				</router-link>
				
			</el-submenu> -->
			<!-- <el-submenu index="101">
				<template slot="title">
					<i class="iconfont">&#xe730;</i>
					<span style="padding:15px;">内容管理</span>
				</template>
				<router-link to="/contentManager/holdAll">
					<el-menu-item index="101-6">工具箱</el-menu-item>
				</router-link>
			</el-submenu> -->
		</el-menu>
	</div>
</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				menuAccess:[],
				url:{
					"2":"/userManager/userBaseInfo",
					"3":"/userManager/userPersonalInfo",
					"4":"/userManager/userCompanyInfo",
					"6":"/power/roleManager",
					"7":"/power/accountManager",
					"30":"/contentManager/recommendedActivities",
					"31":"/contentManager/serviceCenter",
					"9":"/contentManager/homeBanner",
					"10":"/contentManager/hotWordSearch",
					"22":"/workManager/workInfo",
					"23":"/workManager/materialBank",
					"24":"/workManager/labels",
					"25":"/workManager/commentManager",
					"26":"/activityManager/activityEmploy",
					"27":"/activityManager/activityClass",
					"28":"/activityManager/activityworks",
					"29":"/activityManager/solicitationTemplate",
					"32":"/employmentManager/employmentorder",
					"34":"/otherInformation/embodyRecord",
					"35":"/otherInformation/presetReason",
					"36":"/otherInformation/feedback",
					"37":"/otherInformation/reportInfo",
					"38":"/noticeManager/newsRelease",
					"39":"/noticeManager/noticetemplate",
					"40":"/contentManager/listAd",
					"41":"/contentManager/holdAll",
					
				},
				iconfont:{
					"1": "&#xe602;",
					"18": "&#xe627;",
					"19": "&#xe62b;",
					"17": "&#xe781;",
					"5": "&#xe609;",
					"20": "&#xe730;",
					"21": "&#xe730;",
					"8": "&#xe730;",
				},
				defaultopeneds:[],
				fid:"",
				defaultactive:""
			}
		},
		watch: {},
		computed: {},
		methods: {
			handleOpen(key, keyPath) {
				//console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				//console.log(key, keyPath);
			},
			setfid(id){
				this.fid = id
				return id
			},
		},
		created() {
			
			//this.currentpageName = (this.$route.matched[this.$route.matched.length-1].meta.title).split("/")[1];
			this.defaultactive=this.$route.matched[this.$route.matched.length-1].path;
			//console.log(this.$route.matched[this.$route.matched.length-1].path)
		},
		mounted() {
			if(localStorage.getItem("access")){
				this.menuAccess = JSON.parse(localStorage.getItem("access")).menu_banner;
				//console.log(localStorage.getItem("access"));
			}
		}
	}
</script>
<style lang="scss">
	#app .sel-menu {
		border: 0;
		height: calc(100% - 60px);
	}

	.username {
		color: white;
		background: #545c64;
	}

	#app .el-icon-location {
		padding-left: 20px;
	}

	#app .el-submenu__title i {
		right: 40px;
	}

	#app .el-menu-item {
		text-indent: 48px;
	}
	
	#app .is-active .el-submenu__title {
		font-weight: 800;
	}
	
	#app .iconfont{
		padding-left: 24px;
	}

	.userlog {
		width: 25px;
		height: 25px;
		margin: 17.5px 40px;
		margin-right: 0;
		background: url(../assets/img/houtai_logo.svg) center center no-repeat;
		background-size: 100% 100%;
	}

	#app .el-submenu__title:hover i,
	#app .el-menu-item:focus i,
	#app .el-menu-item:hover i {
		color: #FF5121;
	}
	
	
</style>
