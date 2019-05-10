<template>
	<div class="wh">
		<div class="w hnav username">
			<span class="fleft userlog"></span>
			<span class="fleft fontsize24">狮大大</span>
		</div>
		<el-menu style="overflow-y: auto;" default-active="1" class="w sel-menu" @open="handleOpen" @close="handleClose"
		 active-text-color="#FF5121">
			<!-- <el-submenu :index="item.id" v-for="item in menuAccess" :key="item.id" >
				<template slot="title">
					<i class="iconfont">{{ iconfont[item.id] }}</i>
					<span style="padding:15px;">{{ item.title }}</span>
				</template>
				
				<router-link v-if="item.child" v-for="citem in item.child" :key="citem.id" :to="url[citem.id]">
					<el-menu-item :index="citem.id" class="">{{ citem.title }}</el-menu-item>
				</router-link>
			</el-submenu> -->
			
			
			<el-submenu index="1">
				<template slot="title">
					<i class="iconfont">&#xe602;</i>
					<span style="padding:15px;">用户管理</span>
				</template>
				<router-link to="/userBaseInfo">
					<el-menu-item index="1-1" class="">用户基本信息表</el-menu-item>
				</router-link>
				<router-link to="/userPersonalInfo">
					<el-menu-item index="1-2">供稿人信息表-个人</el-menu-item>
				</router-link>
				<router-link to="/userCompanyInfo">
					<el-menu-item index="1-3">供稿人信息表-企业/机构</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="2">
				<template slot="title">
					<i class="iconfont">&#xe730;</i>
					<span style="padding:15px;">内容管理</span>
				</template>
				<router-link to="/userBaseInfo">
					<el-menu-item index="2-1" class="">用户基本信息表</el-menu-item>
				</router-link>
				<router-link to="/userPersonalInfo">
					<el-menu-item index="2-2">供稿人信息表-个人</el-menu-item>
				</router-link>
				<router-link to="/userCompanyInfo">
					<el-menu-item index="2-3">供稿人信息表-企业/机构</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="3">
				<template slot="title">
					<i class="iconfont">&#xe781;</i>
					<span style="padding:15px;">作品管理</span>
				</template>
				<router-link to="/userBaseInfo">
					<el-menu-item index="3-1" class="">用户基本信息表</el-menu-item>
				</router-link>
				<router-link to="/userPersonalInfo">
					<el-menu-item index="3-2">供稿人信息表-个人</el-menu-item>
				</router-link>
				<router-link to="/userCompanyInfo">
					<el-menu-item index="3-3">供稿人信息表-企业/机构</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="4">
				<template slot="title">
					<i class="iconfont">&#xe627;</i>
					<span style="padding:15px;">活动管理</span>
				</template>
				<router-link to="/userBaseInfo">
					<el-menu-item index="4-1" class="">用户基本信息表</el-menu-item>
				</router-link>
				<router-link to="/userPersonalInfo">
					<el-menu-item index="4-2">供稿人信息表-个人</el-menu-item>
				</router-link>
				<router-link to="/userCompanyInfo">
					<el-menu-item index="4-3">供稿人信息表-企业/机构</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="5">
				<template slot="title">
					<i class="iconfont">&#xe62b;</i>
					<span style="padding:15px;">录用管理</span>
				</template>
				<router-link to="/userBaseInfo">
					<el-menu-item index="5-1" class="">用户基本信息表</el-menu-item>
				</router-link>
				<router-link to="/userPersonalInfo">
					<el-menu-item index="5-2">供稿人信息表-个人</el-menu-item>
				</router-link>
				<router-link to="/userCompanyInfo">
					<el-menu-item index="5-3">供稿人信息表-企业/机构</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="6">
				<template slot="title">
					<i class="iconfont">&#xe62b;</i>
					<span style="padding:15px;">消息管理</span>
				</template>
				<router-link to="/userBaseInfo">
					<el-menu-item index="6-1" class="">用户基本信息表</el-menu-item>
				</router-link>
				<router-link to="/userPersonalInfo">
					<el-menu-item index="6-2">供稿人信息表-个人</el-menu-item>
				</router-link>
				<router-link to="/userCompanyInfo">
					<el-menu-item index="6-3">供稿人信息表-企业/机构</el-menu-item>
				</router-link>
			</el-submenu>
			<el-submenu index="7">
				<template slot="title">
					<i class="iconfont">&#xe609;</i>
					<span style="padding:15px;">权限管理</span>
				</template>
				<router-link to="/power/roleManager">
					<el-menu-item index="7-1" class="">角色管理</el-menu-item>
				</router-link>
				<router-link to="/power/accountManager">
					<el-menu-item index="7-2">账号管理</el-menu-item>
				</router-link>
			</el-submenu>
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
				/* url:{
					"2":"/userBaseInfo",
					"4":"/userPersonalInfo",
					"3":"/userCompanyInfo"
				},
				iconfont:{
					"1": &#xe602;,
					"5": &#xe609;,
				} */
			}
		},
		watch: {},
		computed: {},
		methods: {
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			}
		},
		created() {
			if(localStorage.getItem("access")){
				this.menuAccess = JSON.parse(localStorage.getItem("access"));
				console.log(this.menuAccess);
			}
			
		},
		mounted() {}
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
		text-indent: 11px;
	}

	.userlog {
		width: 25px;
		height: 25px;
		margin: 17.5px 40px;
		margin-right: 0;
		background: red;
	}

	#app .el-submenu__title:hover i,
	#app .el-menu-item:focus i,
	#app .el-menu-item:hover i {
		color: #FF5121;
	}
</style>
